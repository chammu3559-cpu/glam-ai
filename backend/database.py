from motor.motor_asyncio import AsyncMotorClient, AsyncMotorDatabase
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://admin:password@localhost:27017/glam-ai?authSource=admin")

client: AsyncMotorClient = None
db: AsyncMotorDatabase = None

async def connect_to_mongo():
    global client, db
    client = AsyncMotorClient(MONGODB_URI)
    db = client.get_database("glam-ai")
    print("✅ Connected to MongoDB")

async def close_mongo_connection():
    global client
    if client:
        client.close()
        print("❌ Closed MongoDB connection")

def get_database():
    return db
