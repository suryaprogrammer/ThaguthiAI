import os
import logging
import pymongo
from pymongo import MongoClient

try:
    import certifi
    ca_file = certifi.where()
except ImportError:
    ca_file = None

logger = logging.getLogger(__name__)


def sanitize_mongodb_uri(uri: str) -> str:
    """Safely extract cluster hostname without credentials."""
    if not uri:
        return "Not Set"
    try:
        cleaned = uri.strip().strip("'").strip('"')
        if "@" in cleaned:
            host_part = cleaned.split("@")[-1].split("/")[0].split("?")[0]
        else:
            host_part = cleaned.replace("mongodb+srv://", "").replace("mongodb://", "").split("/")[0].split("?")[0]
        return host_part
    except Exception:
        return "Unknown Host"


class MongoDB:
    """MongoDB connection manager with production diagnostics."""
    _client = None
    _db = None
    _connected = False
    _last_error = None
    
    @classmethod
    def connect(cls):
        raw_uri = os.getenv('MONGODB_URI')
        raw_db_name = os.getenv('DATABASE_NAME', 'thaguthiai')
        
        if not raw_uri or not raw_uri.strip():
            logger.warning('MONGODB_URI not set. Running without database.')
            cls._connected = False
            cls._last_error = "MONGODB_URI environment variable is missing or empty."
            return

        uri = raw_uri.strip().strip("'").strip('"')
        db_name = raw_db_name.strip().strip("'").strip('"') if raw_db_name else 'thaguthiai'
        
        try:
            client_kwargs = {
                'serverSelectionTimeoutMS': 15000,
                'connectTimeoutMS': 15000,
                'socketTimeoutMS': 15000,
                'retryWrites': True,
                'tls': True,
                'appName': 'ThaguthiAI'
            }
            if ca_file:
                client_kwargs['tlsCAFile'] = ca_file

            cls._client = MongoClient(uri, **client_kwargs)
            # Perform ping command to test network connection and TLS handshake
            cls._client.admin.command('ping')
            cls._db = cls._client[db_name]
            cls._connected = True
            cls._last_error = None
            logger.info(f'Connected to MongoDB: {db_name} at {sanitize_mongodb_uri(uri)}')
        except Exception as e:
            error_str = str(e)
            if "@" in error_str:
                parts = error_str.split("@")
                error_str = "Connection error near host " + parts[-1]
            cls._last_error = error_str
            logger.warning(f'MongoDB connection failed: {error_str}. Running without database.')
            cls._connected = False
            cls._client = None
            cls._db = None

    @classmethod
    def get_db(cls):
        return cls._db if cls._connected else None
    
    @classmethod
    def is_connected(cls):
        return cls._connected

    @classmethod
    def get_diagnostics(cls) -> dict:
        raw_uri = os.getenv('MONGODB_URI')
        raw_db_name = os.getenv('DATABASE_NAME', 'thaguthiai')
        db_name = raw_db_name.strip().strip("'").strip('"') if raw_db_name else 'thaguthiai'
        
        return {
            'mongodb_uri_set': bool(raw_uri and len(raw_uri.strip()) > 0),
            'connected': cls._connected,
            'driver_version': pymongo.__version__,
            'database_name': db_name if cls._connected else (db_name or 'thaguthiai'),
            'host_sanitized': sanitize_mongodb_uri(raw_uri),
            'ca_file_available': bool(ca_file),
            'last_error': cls._last_error
        }
    
    @classmethod
    def close(cls):
        if cls._client:
            try:
                cls._client.close()
            except Exception:
                pass
            cls._connected = False
            cls._client = None
            cls._db = None
