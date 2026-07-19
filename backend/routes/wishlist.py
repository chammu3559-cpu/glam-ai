from fastapi import APIRouter, HTTPException, status
from database import get_database
from datetime import datetime

router = APIRouter()

@router.get("/{user_id}")
async def get_wishlist(user_id: str):
    db = get_database()
    if not db:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database connection failed"
        )
    
    try:
        wishlist = await db.wishlist.find_one({"userId": user_id})
        if not wishlist:
            return {"items": []}
        
        wishlist["_id"] = str(wishlist["_id"])
        return {"items": wishlist.get("items", [])}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.post("/{user_id}/{product_id}")
async def add_to_wishlist(user_id: str, product_id: str):
    db = get_database()
    if not db:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database connection failed"
        )
    
    try:
        wishlist = await db.wishlist.find_one({"userId": user_id})
        if not wishlist:
            wishlist = {"userId": user_id, "items": []}
            result = await db.wishlist.insert_one(wishlist)
            wishlist["_id"] = str(result.inserted_id)
        
        item_exists = any(item.get("productId") == product_id for item in wishlist.get("items", []))
        if not item_exists:
            await db.wishlist.update_one(
                {"userId": user_id},
                {"$push": {"items": {"productId": product_id, "addedAt": datetime.utcnow()}}}
            )
        
        return {"message": "Added to wishlist", "success": True}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.delete("/{user_id}/{product_id}")
async def remove_from_wishlist(user_id: str, product_id: str):
    db = get_database()
    if not db:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database connection failed"
        )
    
    try:
        await db.wishlist.update_one(
            {"userId": user_id},
            {"$pull": {"items": {"productId": product_id}}}
        )
        return {"message": "Removed from wishlist", "success": True}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
