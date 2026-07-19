'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary mt-16 border-t border-border">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="text-2xl">✨</span>
              Glam AI
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              AI-powered virtual try-on and personalized product recommendations for beauty and fashion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/makeup" className="text-muted-foreground hover:text-primary">
                  Makeup
                </Link>
              </li>
              <li>
                <Link href="/dress" className="text-muted-foreground hover:text-primary">
                  Dress
                </Link>
              </li>
              <li>
                <Link href="/jewellery" className="text-muted-foreground hover:text-primary">
                  Jewellery
                </Link>
              </li>
              <li>
                <Link href="/skincare" className="text-muted-foreground hover:text-primary">
                  Skincare
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail size={16} />
                <a href="mailto:info@glam-ai.com" className="hover:text-primary">
                  info@glam-ai.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={16} />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Glam AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
