from fastapi import APIRouter, HTTPException, status, Query
from typing import Optional
from datetime import datetime
from bson import ObjectId
from database import get_database

router = APIRouter()

@router.get("/", response_model=dict)
async def get_all_products(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    category: Optional[str] = None,
    minPrice: Optional[float] = None,
    maxPrice: Optional[float] = None,
    sort: Optional[str] = "popular"
):
    db = get_database()
    if not db:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database connection failed"
        )
    
    try:
        query = {}
        
        if category:
            query["category"] = category
        
        if minPrice or maxPrice:
            price_query = {}
            if minPrice:
                price_query["$gte"] = minPrice
            if maxPrice:
                price_query["$lte"] = maxPrice
            query["price"] = price_query
        
        sort_dict = {}
        if sort == "price-asc":
            sort_dict = {"price": 1}
        elif sort == "price-desc":
            sort_dict = {"price": -1}
        elif sort == "rating":
            sort_dict = {"rating": -1}
        elif sort == "newest":
            sort_dict = {"createdAt": -1}
        else:
            sort_dict = {"reviews": -1}
        
        total = await db.products.count_documents(query)
        skip = (page - 1) * limit
        products = await db.products.find(query).sort(sort_dict).skip(skip).limit(limit).to_list(limit)
        
        for product in products:
            product["_id"] = str(product["_id"])
        
        return {
            "data": products,
            "pagination": {
                "total": total,
                "page": page,
                "limit": limit,
                "totalPages": (total + limit - 1) // limit
            }
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.get("/{product_id}", response_model=dict)
async def get_product(product_id: str):
    db = get_database()
    if not db:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database connection failed"
        )
    
    try:
        product = await db.products.find_one({"_id": ObjectId(product_id)})
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found"
            )
        product["_id"] = str(product["_id"])
        return product
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.get("/category/{category}")
async def get_by_category(
    category: str,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100)
):
    db = get_database()
    if not db:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database connection failed"
        )
    
    try:
        total = await db.products.count_documents({"category": category})
        skip = (page - 1) * limit
        
        products = await db.products.find({"category": category}).skip(skip).limit(limit).to_list(limit)
        
        for product in products:
            product["_id"] = str(product["_id"])
        
        return {
            "data": products,
            "pagination": {
                "total": total,
                "page": page,
                "limit": limit,
                "totalPages": (total + limit - 1) // limit
            }
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.get("/search")
async def search(
    q: str = Query(..., min_length=1),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100)
):
    db = get_database()
    if not db:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database connection failed"
        )
    
    try:
        query = {
            "$or": [
                {"name": {"$regex": q, "$options": "i"}},
                {"description": {"$regex": q, "$options": "i"}},
                {"brand": {"$regex": q, "$options": "i"}}
            ]
        }
        
        total = await db.products.count_documents(query)
        skip = (page - 1) * limit
        
        products = await db.products.find(query).skip(skip).limit(limit).to_list(limit)
        
        for product in products:
            product["_id"] = str(product["_id"])
        
        return {
            "data": products,
            "pagination": {
                "total": total,
                "page": page,
                "limit": limit,
                "totalPages": (total + limit - 1) // limit
            }
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
