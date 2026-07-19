from fastapi import APIRouter, HTTPException, status
from schemas import RecommendationRequest
from database import get_database

router = APIRouter()

@router.post("/")
async def get_recommendations(request: RecommendationRequest):
    db = get_database()
    if not db:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database connection failed"
        )
    
    try:
        categories = request.categories or ["makeup", "dress", "jewellery", "skincare", "footwear"]
        recommendations = []
        
        for category in categories:
            query = {"category": category}
            products = await db.products.find(query).limit(5).to_list(5)
            
            for product in products:
                product["_id"] = str(product["_id"])
            
            if products:
                recommendations.append({
                    "category": category,
                    "products": products,
                    "score": 0.95
                })
        
        return {"recommendations": recommendations}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.post("/analyze")
async def analyze_image(data: dict):
    try:
        return {
            "skinTone": "medium",
            "faceShape": "oval",
            "landmarks": [],
            "confidence": 0.95
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
