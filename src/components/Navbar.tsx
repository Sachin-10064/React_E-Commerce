import React from 'react';
import { Link } from 'react-router-dom';
import { Store } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Store className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">ModernShop</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}