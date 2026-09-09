import logging
from contextlib import asynccontextmanager
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Import routers
from app.api.schemes import router as schemes_router
from app.api.profile import router as profile_router
from app.api.eligibility import router as eligibility_router
from app.api.conflicts import router as conflicts_router
from app.api.recommendation import router as recommendation_router
from app.api.explanation import router as explanation_router
from app.database.mongodb import MongoDB


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan: startup and shutdown."""
    # Startup
    logger.info('Starting ThaguthiAI Backend...')
    MongoDB.connect()
    if MongoDB.is_connected():
        logger.info('MongoDB connected.')
    else:
        logger.info('Running without MongoDB. Core features still work.')
    yield
    # Shutdown
    logger.info('Shutting down ThaguthiAI Backend...')
    MongoDB.close()


app = FastAPI(
    title='ThaguthiAI',
    description=(
        'AI-powered Tamil Nadu student scholarship and government-scheme eligibility assistant.\n\n'
        '**"Know what you\'re eligible for."**\n\n'
        '## Architecture\n'
        '- **Rule Engine**: Deterministic Python eligibility engine (source of truth)\n'
        '- **Conflict Detection**: Identifies incompatible scheme combinations\n'
        '- **Recommendation Engine**: Ranks and recommends best scheme combinations\n'
        '- **Gemini AI**: Explains results in simple language (never decides eligibility)\n\n'
        '## Important Notes\n'
        '- All scheme data is demo/sample data for hackathon purposes\n'
        '- Verify against current government notifications before relying on results\n'
        '- MongoDB is optional — the API works without it'
    ),
    version='1.0.0',
    lifespan=lifespan
)

# CORS configuration for future React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        'http://localhost:3000',
        'http://localhost:5173',
        'http://localhost:8080',
    ],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Register routers
app.include_router(schemes_router)
app.include_router(profile_router)
app.include_router(eligibility_router)
app.include_router(conflicts_router)
app.include_router(recommendation_router)
app.include_router(explanation_router)


@app.get(
    '/health',
    tags=['Health'],
    summary='Health check',
    description='Check if the ThaguthiAI backend is running.'
)
async def health_check():
    """Health check endpoint."""
    return {
        'status': 'ok',
        'service': 'ThaguthiAI Backend',
        'mongodb': 'connected' if MongoDB.is_connected() else 'not connected',
        'mongodb_details': MongoDB.get_diagnostics()
    }


@app.get(
    '/api/db-health',
    tags=['Health'],
    summary='Database diagnostic check',
    description='Returns sanitized production MongoDB diagnostics without exposing credentials.'
)
async def db_health_check():
    """Database diagnostic check endpoint."""
    return MongoDB.get_diagnostics()
