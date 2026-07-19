'use client';

import { categories } from '@/utils/colors';
import Link from 'next/link';

export default function CategoryGrid() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/${category.id}`}
            className="card-base text-center hover:shadow-lg transition"
          >
            <div className="text-4xl mb-3">{category.icon}</div>
            <h3 className="font-semibold text-sm">{category.label}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
