import json
import logging
from pathlib import Path
from app.database.mongodb import MongoDB

logger = logging.getLogger(__name__)

def seed_schemes():
    """
    Idempotent seeding of government schemes into MongoDB.
    Uses update_one with upsert=True on unique scheme `id` to prevent duplicates.
    """
    db = MongoDB.get_db()
    if db is None:
        logger.info("MongoDB not connected. Skipping scheme seeding.")
        return 0

    possible_paths = [
        Path(__file__).parent.parent.parent / 'data' / 'schemes.json',
        Path('data/schemes.json'),
        Path(__file__).resolve().parent.parent.parent / 'data' / 'schemes.json',
    ]

    schemes_data = []
    for path in possible_paths:
        if path.exists():
            with open(path, 'r', encoding='utf-8') as f:
                schemes_data = json.load(f)
            break

    if not schemes_data:
        logger.warning("No schemes found in schemes.json to seed.")
        return 0

    collection = db.schemes
    
    # Ensure index on 'id' for performance and uniqueness
    try:
        collection.create_index("id", unique=True)
    except Exception as e:
        logger.debug(f"Index creation notice: {e}")

    seeded_count = 0
    for scheme in schemes_data:
        scheme_id = scheme.get("id")
        if not scheme_id:
            continue
        
        # Idempotent upsert
        collection.update_one(
            {"id": scheme_id},
            {"$set": scheme},
            upsert=True
        )
        seeded_count += 1

    logger.info(f"Successfully seeded {seeded_count} schemes into MongoDB.")
    return seeded_count

if __name__ == "__main__":
    MongoDB.connect()
    seed_schemes()
    MongoDB.close()
