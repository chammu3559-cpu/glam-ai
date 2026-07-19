'use client';

import { Product } from '@/store/wishlistStore';
import { useWishlistStore } from '@/store/wishlistStore';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, removeItem, isInWishlist } = useWishlistStore();
  const [isWishlisted, setIsWishlisted] = useState(isInWishlist(product._id));

  const discount = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeItem(product._id);
    } else {
      addItem(product);
    }
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Link href={`/product/${product._id}`}>
      <div className="card-base hover:shadow-lg transition cursor-pointer group">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-lg mb-4 bg-secondary h-48 sm:h-56">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition duration-300"
          />
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs font-bold">
              -{discount}%
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div>
          <h3 className="font-semibold text-sm line-clamp-2 mb-1">{product.name}</h3>
          <p className="text-xs text-muted-foreground mb-2">{product.category}</p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="font-bold text-lg">
              ₹{product.discountPrice || product.price}
            </span>
            {product.discountPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.price}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleWishlist}
              className={`flex-1 py-2 rounded-lg font-semibold text-sm transition flex items-center justify-center gap-2 ${
                isWishlisted
                  ? 'bg-destructive text-destructive-foreground'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
              {isWishlisted ? 'Saved' : 'Save'}
            </button>
            <button className="flex-1 py-2 rounded-lg font-semibold text-sm btn-primary flex items-center justify-center gap-2">
              <ShoppingCart size={16} />
              Buy
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
