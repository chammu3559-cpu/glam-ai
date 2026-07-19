import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const productsAPI = {
  getAll: (params?: any) => apiClient.get('/products', { params }),
  getByCategory: (category: string, params?: any) =>
    apiClient.get(`/products/category/${category}`, { params }),
  getById: (id: string) => apiClient.get(`/products/${id}`),
  search: (query: string, params?: any) =>
    apiClient.get('/products/search', { params: { q: query, ...params } }),
};

// Recommendations API
export const recommendationsAPI = {
  getRecommendations: (productId: string, limit: number = 5) =>
    apiClient.get('/recommendations', { params: { productId, limit } }),
  getSimilarProducts: (category: string, subcategory: string, limit: number = 5) =>
    apiClient.get('/recommendations/similar', {
      params: { category, subcategory, limit },
    }),
};

// AI Try-On API
export const tryOnAPI = {
  analyzeImage: (imageData: string, type: string) =>
    apiClient.post('/ai/analyze', { image: imageData, type }),
  getMakeupSuggestions: (skinTone: string, faceShape: string) =>
    apiClient.get('/ai/suggestions/makeup', { params: { skinTone, faceShape } }),
  getHairstyleSuggestions: (faceShape: string) =>
    apiClient.get('/ai/suggestions/hairstyle', { params: { faceShape } }),
  getJewelleryRecommendations: (skinTone: string, faceShape: string) =>
    apiClient.get('/ai/suggestions/jewellery', { params: { skinTone, faceShape } }),
};
