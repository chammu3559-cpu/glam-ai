'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { useAuthStore } from '@/store/authStore';
import { Moon, Sun, Search, Heart, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const { user, userProfile } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-2xl">✨</span>
            <span className="hidden sm:inline">Glam AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/makeup" className="hover:text-primary transition">
              Makeup
            </Link>
            <Link href="/dress" className="hover:text-primary transition">
              Dress
            </Link>
            <Link href="/jewellery" className="hover:text-primary transition">
              Jewellery
            </Link>
            <Link href="/skincare" className="hover:text-primary transition">
              Skincare
            </Link>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg"
          >
            <Search size={18} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none w-64"
            />
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-secondary rounded-lg transition"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link
              href="/wishlist"
              className="p-2 hover:bg-secondary rounded-lg transition"
            >
              <Heart size={20} />
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/profile"
                  className="p-2 hover:bg-secondary rounded-lg transition"
                >
                  <User size={20} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-secondary rounded-lg transition"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link href="/login" className="btn-primary">
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
              <Search size={18} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-base flex-1"
              />
            </form>
            <div className="flex flex-col gap-2">
              <Link href="/makeup" className="px-4 py-2 hover:bg-secondary rounded">
                Makeup
              </Link>
              <Link href="/dress" className="px-4 py-2 hover:bg-secondary rounded">
                Dress
              </Link>
              <Link href="/jewellery" className="px-4 py-2 hover:bg-secondary rounded">
                Jewellery
              </Link>
              <Link href="/skincare" className="px-4 py-2 hover:bg-secondary rounded">
                Skincare
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
