import os
import logging
from pymongo import MongoClient

try:
    import certifi
    ca_file = certifi.where()
except ImportError:
    ca_file = None

logger = logging.getLogger(__name__)

class MongoDB:
    """MongoDB connection manager."""
    _client = None
    _db = None
    _connected = False
    
    @classmethod
    def connect(cls):
        uri = os.getenv('MONGODB_URI')
        if uri:
            uri = uri.strip()
        db_name = os.getenv('DATABASE_NAME', 'thaguthiai').strip() if os.getenv('DATABASE_NAME') else 'thaguthiai'
        
        if not uri:
            logger.warning('MONGODB_URI not set. Running without database.')
            cls._connected = False
            return
            
        try:
            client_kwargs = {
                'serverSelectionTimeoutMS': 10000,
                'connectTimeoutMS': 10000,
            }
            if ca_file:
                client_kwargs['tlsCAFile'] = ca_file

            cls._client = MongoClient(uri, **client_kwargs)
            cls._client.admin.command('ping')
            cls._db = cls._client[db_name]
            cls._connected = True
            logger.info(f'Connected to MongoDB: {db_name}')
        except Exception as e:
            logger.warning(f'MongoDB connection failed: {e}. Running without database.')
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
    def close(cls):
        if cls._client:
            try:
                cls._client.close()
            except Exception:
                pass
            cls._connected = False
            cls._client = None
            cls._db = None
