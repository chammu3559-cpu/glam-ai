'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { productsAPI } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/store/wishlistStore';
import { Loader, Filter, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MakeupPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [showFilters, setShowFilters] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getByCategory('makeup', {
        page,
        limit: 20,
        sort: sortBy,
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
      });
      setProducts(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error: any) {
      toast.error('Failed to load products');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, sortBy, priceRange]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-pink-500/20 to-rose-500/20 py-12">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">💄 Makeup</h1>
            <p className="text-muted-foreground text-lg">Discover the perfect makeup for your unique style</p>
          </div>
        </section>

        {/* Filters and Products */}
        <section className="py-12">
          <div className="container-custom">
            <div className="flex gap-6">
              {/* Filters Sidebar */}
              <div className="hidden md:block w-64">
                <div className="card-base sticky top-20">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Filter size={20} />
                    Filters
                  </h3>

                  {/* Price Range */}
                  <div className="mb-6">
                    <label className="font-semibold text-sm mb-2 block">Price Range</label>
                    <div className="space-y-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) =>
                          setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })
                        }
                        className="input-base text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) =>
                          setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 10000 })
                        }
                        className="input-base text-sm"
                      />
                    </div>
                  </div>

                  {/* Sort */}
                  <div>
                    <label className="font-semibold text-sm mb-2 block">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="input-base text-sm"
                    >
                      <option value="popular">Most Popular</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="newest">Newest</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="flex-1">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden mb-4 btn-outline flex items-center gap-2"
                >
                  <Filter size={18} />
                  Filters
                </button>

                {/* Mobile Filters */}
                {showFilters && (
                  <div className="card-base md:hidden mb-6">
                    <div className="space-y-4">
                      <div>
                        <label className="font-semibold text-sm mb-2 block">Price Range</label>
                        <div className="space-y-2">
                          <input
                            type="number"
                            placeholder="Min"
                            value={priceRange.min}
                            onChange={(e) =>
                              setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })
                            }
                            className="input-base text-sm"
                          />
                          <input
                            type="number"
                            placeholder="Max"
                            value={priceRange.max}
                            onChange={(e) =>
                              setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 10000 })
                            }
                            className="input-base text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="font-semibold text-sm mb-2 block">Sort By</label>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="input-base text-sm"
                        >
                          <option value="popular">Most Popular</option>
                          <option value="price-asc">Price: Low to High</option>
                          <option value="price-desc">Price: High to Low</option>
                          <option value="rating">Highest Rated</option>
                          <option value="newest">Newest</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Products */}
                {loading ? (
                  <div className="flex justify-center items-center py-20">
                    <Loader className="animate-spin" size={40} />
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground text-lg">No products found</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                      {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                      ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-2">
                      <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="btn-outline disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <span className="px-4 py-2">
                        Page {page} of {totalPages}
                      </span>
                      <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="btn-outline disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
