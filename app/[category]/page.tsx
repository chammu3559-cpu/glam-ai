'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { productsAPI } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/store/wishlistStore';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast';

const categories = [
  { id: 'dress', label: '👗 Dress', emoji: '👗' },
  { id: 'jewellery', label: '💎 Jewellery', emoji: '💎' },
  { id: 'skincare', label: '🧴 Skincare', emoji: '🧴' },
  { id: 'footwear', label: '👞 Footwear', emoji: '👞' },
  { id: 'hairstyle', label: '💇 Hairstyle', emoji: '💇' },
  { id: 'bags', label: '👜 Bags', emoji: '👜' },
  { id: 'watches', label: '⌚ Watches', emoji: '⌚' },
  { id: 'sunglasses', label: '🕶️ Sunglasses', emoji: '🕶️' },
  { id: 'perfume', label: '💐 Perfume', emoji: '💐' },
  { id: 'accessories', label: '✨ Accessories', emoji: '✨' },
];

export default function CategoryPage({ params }: { params: { category: string } }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const category = params.category;
  const categoryData = categories.find((c) => c.id === category);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getByCategory(category);
        setProducts(response.data.data);
      } catch (error: any) {
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 py-12">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {categoryData?.emoji} {categoryData?.label}
            </h1>
            <p className="text-muted-foreground text-lg">Shop the finest collection of {category}</p>
          </div>
        </section>

        {/* Products */}
        <section className="py-12">
          <div className="container-custom">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader className="animate-spin" size={40} />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
