'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react'; // Import useState

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand Name */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-green-600">
              FoodRescue Hub
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {/* This is the same logic as before, just for desktop */}
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" className="text-gray-700 hover:bg-green-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Dashboard
                  </Link>
                  <Link href="/listings" className="text-gray-700 hover:bg-green-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Available Food
                  </Link>
                  {user?.role === 'restaurant' && (
                    <Link href="/new-listing" className="text-gray-700 hover:bg-green-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      + Create Listing
                    </Link>
                  )}
                  <button onClick={logout} className="bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/listings" className="text-gray-700 hover:bg-green-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Available Food
                  </Link>
                  <Link href="/login" className="text-gray-700 hover:bg-green-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Login
                  </Link>
                  <Link href="/register" className="bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Hamburger Menu Button (visible on mobile) */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-green-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-700 focus:outline-none"
            >
              {/* Hamburger Icon */}
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={!isMenuOpen ? "M4 6h16M4 12h16m-7 6h7" : "M6 18L18 6M6 6l12 12"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (dropdown) */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {/* Mobile links are the same as desktop, just styled for a vertical layout */}
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
              <Link href="/listings" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">Available Food</Link>
              {user?.role === 'restaurant' && (
                <Link href="/new-listing" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">+ Create Listing</Link>
              )}
              <button onClick={logout} className="w-full text-left bg-red-50 text-red-700 block px-3 py-2 rounded-md text-base font-medium">Logout</button>
            </>
          ) : (
            <>
              <Link href="/listings" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">Available Food</Link>
              <Link href="/login" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">Login</Link>
              <Link href="/register" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;