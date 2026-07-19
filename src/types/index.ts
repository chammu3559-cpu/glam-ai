export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: string;
}

export interface Product {
  _id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  discountPrice?: number;
  description: string;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  sku: string;
  details: Record<string, string>;
  links: {
    amazon?: string;
    flipkart?: string;
    myntra?: string;
    nykaa?: string;
    ajio?: string;
  };
  createdAt: string;
}

export interface FaceAnalysis {
  skinTone: string;
  faceShape: string;
  landmarks: any[];
  width: number;
  height: number;
}

export interface TryOnResult {
  originalImage: string;
  processedImage: string;
  analysis: FaceAnalysis;
  recommendations: Product[];
}
