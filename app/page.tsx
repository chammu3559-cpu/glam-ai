'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { Sparkles, Camera, Upload, Users } from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/20 to-accent/20 py-20">
          <div className="container-custom text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-primary">Glam AI</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              AI-powered virtual try-on and personalized product recommendations for beauty and fashion. Find your perfect look instantly!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/try-on" className="btn-primary text-lg px-8 py-3">
                Start Virtual Try-On
              </Link>
              <Link href="/makeup" className="btn-outline text-lg px-8 py-3">
                Browse Products
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="card-base text-center">
                <Camera className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-3">Live Camera Try-On</h3>
                <p className="text-muted-foreground">
                  Use your device camera for real-time virtual try-on of makeup, hairstyles, and accessories.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="card-base text-center">
                <Upload className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-3">Upload Selfie</h3>
                <p className="text-muted-foreground">
                  Upload your own photo and get AI-powered recommendations based on your skin tone and face shape.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="card-base text-center">
                <Sparkles className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-3">Smart Recommendations</h3>
                <p className="text-muted-foreground">
                  Get personalized product recommendations from top brands with instant price comparison.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Preview */}
        <section className="py-16 bg-secondary">
          <div className="container-custom">
            <h2 className="text-4xl font-bold text-center mb-12">Shop by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { emoji: '💄', label: 'Makeup', href: '/makeup' },
                { emoji: '👗', label: 'Dress', href: '/dress' },
                { emoji: '💎', label: 'Jewellery', href: '/jewellery' },
                { emoji: '🧴', label: 'Skincare', href: '/skincare' },
                { emoji: '👠', label: 'Footwear', href: '/footwear' },
                { emoji: '💇', label: 'Hairstyle', href: '/hairstyle' },
              ].map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="card-base text-center hover:shadow-lg transition"
                >
                  <div className="text-4xl mb-2">{cat.emoji}</div>
                  <p className="font-semibold text-sm">{cat.label}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-12 text-center text-white">
              <h2 className="text-4xl font-bold mb-4">Ready to Find Your Perfect Look?</h2>
              <p className="text-xl mb-8 opacity-90">
                {user ? `Welcome back, ${user.displayName}!` : 'Join thousands of happy customers today'}
              </p>
              <Link href="/try-on" className="bg-white text-primary hover:bg-white/90 px-8 py-3 rounded-lg font-bold text-lg transition inline-block">
                Get Started Now
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
