from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserSignup(BaseModel):
    email: EmailStr
    password: str
    displayName: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    uid: str
    email: str
    displayName: str
    photoURL: Optional[str] = None
    createdAt: datetime

class ProductLinks(BaseModel):
    amazon: Optional[str] = None
    flipkart: Optional[str] = None
    myntra: Optional[str] = None
    nykaa: Optional[str] = None
    ajio: Optional[str] = None

class ProductCreate(BaseModel):
    name: str
    category: str
    subcategory: str
    price: float
    discountPrice: Optional[float] = None
    description: str
    image: str
    images: List[str]
    rating: float
    reviews: int
    inStock: bool
    sku: str
    brand: str
    details: dict
    links: ProductLinks

class ProductResponse(BaseModel):
    id: str
    name: str
    category: str
    subcategory: str
    price: float
    discountPrice: Optional[float] = None
    description: str
    image: str
    images: List[str]
    rating: float
    reviews: int
    inStock: bool
    sku: str
    brand: str
    details: dict
    links: ProductLinks
    createdAt: datetime

class RecommendationRequest(BaseModel):
    skinTone: str
    faceShape: str
    categories: Optional[List[str]] = None

class RecommendationResponse(BaseModel):
    id: str
    category: str
    products: List[ProductResponse]
    score: float

class WishlistItem(BaseModel):
    productId: str
    addedAt: datetime

class WishlistResponse(BaseModel):
    id: str
    userId: str
    items: List[WishlistItem]

class ImageAnalysis(BaseModel):
    skinTone: str
    faceShape: str
    landmarks: List[dict]
    confidence: float
