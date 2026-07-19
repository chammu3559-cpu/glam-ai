# Glam AI - AI-Powered Virtual Styling & Product Recommendations

![Glam AI](https://img.shields.io/badge/Glam-AI-ff69b4?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=flat-square)
![Firebase](https://img.shields.io/badge/Firebase-10.0-FFA726?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-13AA52?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## Overview

Glam AI is a cutting-edge web application that combines artificial intelligence with fashion and beauty e-commerce. It provides virtual try-on capabilities, AI-powered recommendations, and seamless shopping integration with major platforms.

## Features

### 🎥 Virtual Try-On
- **Live Camera Try-On**: Real-time face detection and makeup overlay using MediaPipe
- **Upload Selfie**: Analyze photos for personalized recommendations
- **Virtual Model**: Create a digital representation for styling
- **Face Analysis**: Detect skin tone, face shape, and other features

### 🎨 AI Styling Engine
- **Makeup Overlays**: Lipstick, foundation, blush, eyeliner, mascara, eyeshadow
- **Hairstyle Preview**: Try different hairstyles in real-time
- **Jewellery Try-On**: Earrings, necklaces, rings, bracelets, bangles
- **Dress Simulation**: Virtual clothing try-on

### 🛍️ Shopping Features
- **AI Recommendations**: Personalized product suggestions based on analysis
- **Price Comparison**: Compare prices across Amazon, Flipkart, Myntra, Nykaa, Ajio
- **Product Details**: Comprehensive product information and reviews
- **Wishlist**: Save favorite products
- **Buy Now Integration**: Direct links to purchase on multiple platforms

### 👤 User Features
- **Authentication**: Secure Firebase authentication
- **User Profile**: Manage personal information and preferences
- **Saved Looks**: Store AI-generated styling combinations
- **Try-On History**: Track previous virtual try-ons
- **Settings**: Customize app preferences

### 🛒 Categories
- Makeup
- Dress
- Jewellery
- Skincare
- Footwear
- Hairstyle
- Bags
- Watches
- Sunglasses
- Perfume
- Accessories

### 🔐 Admin Panel
- Product management
- Category management
- User management
- Analytics dashboard
- Recommendation management

## Tech Stack

### Frontend
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Authentication**: Firebase Auth
- **AI/ML**: MediaPipe
- **Webcam**: React Webcam
- **HTTP Client**: Axios
- **UI Icons**: Lucide React

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.11+
- **Database**: MongoDB
- **Authentication**: Firebase Admin SDK
- **AI/ML**: MediaPipe, OpenCV
- **Image Processing**: Pillow

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Cloud Storage**: Firebase Storage
- **Deployment**: Docker/Kubernetes ready

## Installation

### Prerequisites
- Node.js 18+
- Python 3.11+
- MongoDB Atlas account
- Firebase project
- Docker (optional)

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/chammu3559-cpu/glam-ai.git
cd glam-ai

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your Firebase credentials to .env.local

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Add your MongoDB and Firebase credentials

# Run development server
uvicorn main:app --reload
```

The backend API will be available at `http://localhost:8000`

### Docker Setup

```bash
# Build and run with Docker Compose
docker-compose up -d

# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# MongoDB: localhost:27017
```

## Project Structure

```
glam-ai/
├── app/                           # Next.js pages
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── page.tsx                  # Home page
│   ├── login/
│   ├── signup/
│   ├── makeup/
│   ├── dress/
│   ├── jewellery/
│   ├── skincare/
│   ├── footwear/
│   ├── hairstyle/
│   ├── product/
│   ├── try-on/
│   ├── recommendations/
│   ├── wishlist/
│   ├── profile/
│   └── admin/
├── src/
│   ├── components/               # Reusable components
│   ├── hooks/                    # Custom hooks
│   ├── lib/                      # Utility libraries
│   ├── store/                    # Zustand stores
│   ├── types/                    # TypeScript types
│   └── utils/                    # Helper functions
├── backend/                       # FastAPI backend
│   ├── main.py                   # Entry point
│   ├── requirements.txt          # Python dependencies
│   ├── .env.example              # Environment template
│   ├── models/                   # MongoDB models
│   ├── routes/                   # API routes
│   ├── services/                 # Business logic
│   ├── schemas/                  # Pydantic schemas
│   └── utils/                    # Helper functions
├── public/                        # Static assets
├── Dockerfile                     # Docker configuration
├── docker-compose.yml            # Docker Compose configuration
├── package.json                  # Frontend dependencies
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── next.config.js                # Next.js configuration
├── .eslintrc.json                # ESLint configuration
└── README.md                      # This file
```

## Environment Variables

### Frontend (.env.local)

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/glam-ai
```

### Backend (.env)

```bash
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/glam-ai
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email

ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8000
CORK_ORIGIN_REGEX=.*localhost.*

JWT_SECRET=your_jwt_secret_key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

ADMIN_EMAIL=admin@glam-ai.com
ADMIN_PASSWORD=admin_password
```

## API Documentation

### Base URL
```
http://localhost:8000/api/v1
```

### Authentication Endpoints

#### Sign Up
```
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "displayName": "John Doe"
}

Response: 201
{
  "uid": "user_id",
  "email": "user@example.com",
  "displayName": "John Doe",
  "token": "jwt_token"
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: 200
{
  "uid": "user_id",
  "email": "user@example.com",
  "displayName": "John Doe",
  "token": "jwt_token"
}
```

### Products Endpoints

#### Get All Products
```
GET /products?page=1&limit=20&category=makeup&sort=price&order=asc

Response: 200
{
  "data": [
    {
      "_id": "product_id",
      "name": "Lipstick",
      "category": "makeup",
      "price": 499,
      "discountPrice": 399,
      "rating": 4.5,
      "image": "url",
      "links": {
        "amazon": "https://amazon.com/...",
        "flipkart": "https://flipkart.com/..."
      }
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20
  }
}
```

#### Get Product by ID
```
GET /products/{product_id}

Response: 200
{
  "_id": "product_id",
  "name": "Lipstick",
  "category": "makeup",
  "subcategory": "Lipsticks",
  "price": 499,
  "discountPrice": 399,
  "description": "...",
  "rating": 4.5,
  "reviews": 150,
  "images": [...],
  "links": {...}
}
```

### AI Endpoints

#### Analyze Image
```
POST /ai/analyze
Content-Type: application/json

{
  "image": "base64_image_string",
  "type": "selfie" | "camera"
}

Response: 200
{
  "skinTone": "medium",
  "faceShape": "oval",
  "landmarks": [...],
  "age_group": "25-35",
  "gender": "female"
}
```

#### Get Recommendations
```
POST /recommendations
Content-Type: application/json

{
  "skinTone": "medium",
  "faceShape": "oval",
  "hairColor": "brown",
  "categories": ["makeup", "dress", "jewellery"]
}

Response: 200
{
  "recommendations": [
    {
      "category": "makeup",
      "products": [...],
      "score": 0.95
    }
  ]
}
```

### Wishlist Endpoints

#### Add to Wishlist
```
POST /wishlist/{product_id}
Authorization: Bearer token

Response: 200
{
  "message": "Added to wishlist",
  "wishlistId": "id"
}
```

#### Get Wishlist
```
GET /wishlist
Authorization: Bearer token

Response: 200
{
  "items": [...]
}
```

#### Remove from Wishlist
```
DELETE /wishlist/{product_id}
Authorization: Bearer token

Response: 200
{
  "message": "Removed from wishlist"
}
```

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  uid: String (Firebase UID),
  email: String,
  displayName: String,
  photoURL: String,
  skinTone: String,
  faceShape: String,
  preferences: {
    categories: [String],
    priceRange: { min: Number, max: Number },
    brands: [String]
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String,
  category: String,
  subcategory: String,
  price: Number,
  discountPrice: Number,
  description: String,
  image: String,
  images: [String],
  rating: Number,
  reviews: Number,
  inStock: Boolean,
  sku: String,
  brand: String,
  details: Object,
  links: {
    amazon: String,
    flipkart: String,
    myntra: String,
    nykaa: String,
    ajio: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Recommendations Collection
```javascript
{
  _id: ObjectId,
  userId: String (Firebase UID),
  skinTone: String,
  faceShape: String,
  products: [ObjectId],
  matchScore: Number,
  categories: [String],
  createdAt: Date
}
```

### Wishlist Collection
```javascript
{
  _id: ObjectId,
  userId: String (Firebase UID),
  productId: ObjectId,
  addedAt: Date
}
```

## Features in Detail

### Virtual Try-On
1. Select try-on mode: Live Camera, Upload Selfie, or Virtual Model
2. Grant camera/microphone permissions
3. Face detection using MediaPipe
4. Real-time overlay of selected products
5. Adjust position and size using touch/mouse controls
6. Save the look to profile
7. Get AI recommendations based on the look

### AI Recommendation Engine
1. Analyzes user's face, skin tone, and preferences
2. Cross-references with product database
3. Calculates compatibility score
4. Recommends products from multiple categories
5. Shows price comparison across platforms
6. Displays user reviews and ratings

### Shopping Integration
1. Each product has links to multiple platforms
2. Buy Now buttons open product pages directly
3. Track prices and availability
4. Show delivery estimates
5. Display platform-specific offers

## Build & Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
# Frontend
npm run build
npm start

# Backend
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker
```

### Docker Deployment
```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Environment-specific Configs

**Development**: `.env.local`
**Production**: `.env.production.local`
**Testing**: `.env.test.local`

## Performance Optimization

- Image compression and lazy loading
- Code splitting with Next.js dynamic imports
- MongoDB indexing on frequently queried fields
- Redis caching for recommendations
- CDN for static assets
- Service Worker for offline support

## Security

- Firebase Authentication for secure user management
- JWT tokens for API authentication
- CORS protection
- Input validation and sanitization
- Rate limiting on API endpoints
- Environment variable protection
- HTTPS only in production
- MongoDB connection encryption

## Testing

```bash
# Frontend tests
npm run test

# Backend tests
pytest

# Type checking
npm run type-check
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting

### Camera not working
- Check browser permissions
- Ensure HTTPS in production
- Test on compatible browser (Chrome, Firefox, Safari)

### Database connection issues
- Verify MongoDB Atlas connection string
- Check IP whitelist in MongoDB Atlas
- Ensure firewall allows database port

### API errors
- Check backend logs: `docker-compose logs backend`
- Verify environment variables
- Test endpoints with Postman or cURL

### Build errors
- Clear cache: `npm run build -- --reset-cache`
- Check Node version: `node --version` (should be 18+)
- Reinstall dependencies: `rm -rf node_modules && npm install`

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- GitHub Issues: [Report a bug](https://github.com/chammu3559-cpu/glam-ai/issues)
- Email: support@glam-ai.com
- Documentation: [Visit docs](https://glam-ai.com/docs)

## Acknowledgments

- MediaPipe for face detection
- Firebase for authentication and storage
- MongoDB for database
- Next.js for frontend framework
- FastAPI for backend framework

---

**Made with ❤️ by Glam AI Team**
