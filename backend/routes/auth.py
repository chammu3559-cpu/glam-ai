from fastapi import APIRouter, HTTPException, status
from schemas import UserSignup, UserLogin, UserResponse
import firebase_admin
from firebase_admin import auth as firebase_auth
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

try:
    if not firebase_admin.get_app():
        import json
        creds_str = os.getenv("FIREBASE_CREDENTIALS", "{}")
        if creds_str != "{}":
            creds = json.loads(creds_str)
            firebase_admin.initialize_app(
                firebase_admin.credentials.Certificate(creds)
            )
except Exception as e:
    print(f"Firebase initialization warning: {e}")

@router.post("/signup", response_model=UserResponse)
async def signup(user_data: UserSignup):
    try:
        user = firebase_auth.create_user(
            email=user_data.email,
            password=user_data.password,
            display_name=user_data.displayName
        )
        
        return UserResponse(
            uid=user.uid,
            email=user.email,
            displayName=user.display_name or "",
            createdAt=datetime.utcnow()
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.post("/login", response_model=UserResponse)
async def login(user_data: UserLogin):
    try:
        user = firebase_auth.get_user_by_email(user_data.email)
        return UserResponse(
            uid=user.uid,
            email=user.email,
            displayName=user.display_name or "",
            createdAt=datetime.utcnow()
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

@router.post("/verify-token")
async def verify_token(token: str):
    try:
        decoded_token = firebase_auth.verify_id_token(token)
        return {"valid": True, "uid": decoded_token["uid"]}
    except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
