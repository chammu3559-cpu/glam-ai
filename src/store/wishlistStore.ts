import { create } from 'zustand';

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

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],

  addItem: (product: Product) => {
    const { items } = get();
    if (!items.find((p) => p._id === product._id)) {
      set({ items: [...items, product] });
    }
  },

  removeItem: (productId: string) => {
    set((state) => ({
      items: state.items.filter((p) => p._id !== productId),
    }));
  },

  isInWishlist: (productId: string) => {
    return get().items.some((p) => p._id === productId);
  },

  clearWishlist: () => set({ items: [] }),
}));
