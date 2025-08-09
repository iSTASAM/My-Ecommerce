// src/app/components/NavBar.tsx
'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

function NavBarContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  // Sync search query from URL parameters
  useEffect(() => {
    const urlSearchQuery = searchParams.get('search') || '';
    setSearchQuery(urlSearchQuery);
    setMobileSearchQuery(urlSearchQuery);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(mobileSearchQuery.trim())}`);
      setIsMenuOpen(false); // Close mobile menu after search
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Auto reset when search is cleared
    if (value.trim() === '') {
      router.push('/products');
    }
  };

  const handleMobileSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMobileSearchQuery(value);
    
    // Auto reset when search is cleared
    if (value.trim() === '') {
      router.push('/products');
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    router.push('/products');
  };

  const clearMobileSearch = () => {
    setMobileSearchQuery('');
    router.push('/products');
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              WatcharaBunp
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link 
                href="/" 
                className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {t('nav.home')}
              </Link>
              <Link 
                href="/products" 
                className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {t('nav.products')}
              </Link>
              <Link 
                href="/categories" 
                className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {t('nav.categories')}
              </Link>
              <Link 
                href="/deals" 
                className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {t('nav.deals')}
              </Link>
              <Link 
                href="/about" 
                className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {t('nav.about')}
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
                placeholder={t('nav.search.placeholder')}
                className="w-full px-4 py-2 pl-10 pr-20 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center">
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="pr-2 flex items-center text-gray-400 hover:text-red-500 transition-colors duration-200"
                    title={t('nav.search.clear')}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                <button
                  type="submit"
                  className="pr-3 flex items-center text-gray-400 hover:text-blue-600 transition-colors duration-200"
                  title={t('nav.search.submit')}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Right side icons and login */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Wishlist */}
            <Link href="/wishlist" className="text-gray-600 hover:text-red-500 transition-colors duration-200">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>

            {/* Shopping Cart */}
            <Link href="/cart" className="relative text-gray-600 hover:text-blue-600 transition-colors duration-200">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293A1 1 0 004 16h16M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
              </svg>
              {/* Cart badge */}
              <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Link>

            {/* User Profile/Login */}
            <div className="relative">
              <Link 
                href="/login" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{t('nav.login')}</span>
              </Link>
            </div>

            {/* Language Toggle */}
            <LanguageToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 p-2"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              {/* Mobile Search */}
              <div className="mb-4">
                <form onSubmit={handleMobileSearch} className="relative">
                  <input
                    type="text"
                    value={mobileSearchQuery}
                    onChange={handleMobileSearchInputChange}
                    placeholder={t('nav.search.placeholder')}
                    className="w-full px-4 py-2 pr-20 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    {mobileSearchQuery && (
                      <button
                        type="button"
                        onClick={clearMobileSearch}
                        className="pr-2 flex items-center text-gray-400 hover:text-red-500 transition-colors duration-200"
                        title={t('nav.search.clear')}
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                    <button
                      type="submit"
                      className="pr-3 flex items-center text-gray-400 hover:text-blue-600 transition-colors duration-200"
                      title={t('nav.search.submit')}
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>

              <Link href="/" className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                {t('nav.home')}
              </Link>
              <Link href="/products" className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                {t('nav.products')}
              </Link>
              <Link href="/categories" className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                {t('nav.categories')}
              </Link>
              <Link href="/deals" className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                {t('nav.deals')}
              </Link>
              <Link href="/about" className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                {t('nav.about')}
              </Link>

              {/* Mobile icons */}
              <div className="flex items-center space-x-4 px-3 py-2">
                <Link href="/wishlist" className="text-gray-600 hover:text-red-500">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </Link>
                <Link href="/cart" className="relative text-gray-600 hover:text-blue-600">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293A1 1 0 004 16h16M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
                  </svg>
                  <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </Link>
              </div>

              <Link 
                href="/login" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2 mx-3 mt-4"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{t('nav.login')}</span>
              </Link>

              {/* Mobile Language Toggle */}
              <div className="px-3 py-2 mt-4">
                <LanguageToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default function NavBar() {
  return (
    <Suspense fallback={<NavBarFallback />}>
      <NavBarContent />
    </Suspense>
  );
}

function NavBarFallback() {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              WatcharaBunp
            </Link>
          </div>
          
          {/* Loading state for search bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative">
              <div className="w-full px-4 py-2 pl-10 pr-20 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg animate-pulse h-10"></div>
            </div>
          </div>
          
          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
              เข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}