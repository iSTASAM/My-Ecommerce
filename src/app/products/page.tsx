// src/app/products/page.tsx
'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '../../contexts/LanguageContext';

// Sample product data
const sampleProducts = [
  {
    id: 1,
    name: {
      th: "เสื้อยืดคอตตอน 100%",
      en: "100% Cotton T-Shirt"
    },
    price: 299,
    originalPrice: 399,
    category: "clothing",
    image: "/api/placeholder/300/300",
    rating: 4.5,
    reviews: 128,
    isNew: true,
    discount: 25
  },
  {
    id: 2,
    name: {
      th: "หูฟังไร้สาย Bluetooth",
      en: "Wireless Bluetooth Headphones"
    },
    price: 1299,
    originalPrice: null,
    category: "electronics",
    image: "/api/placeholder/300/300",
    rating: 4.8,
    reviews: 89,
    isNew: false,
    discount: null
  },
  {
    id: 3,
    name: {
      th: "กระเป๋าเป้สะพายหลัง",
      en: "Backpack"
    },
    price: 899,
    originalPrice: 1199,
    category: "bags",
    image: "/api/placeholder/300/300",
    rating: 4.3,
    reviews: 56,
    isNew: false,
    discount: 25
  },
  {
    id: 4,
    name: {
      th: "รองเท้าผ้าใบสีขาว",
      en: "White Canvas Sneakers"
    },
    price: 1599,
    originalPrice: null,
    category: "shoes",
    image: "/api/placeholder/300/300",
    rating: 4.7,
    reviews: 203,
    isNew: true,
    discount: null
  },
  {
    id: 5,
    name: {
      th: "นาฬิกาข้อมือ Smart Watch",
      en: "Smart Watch"
    },
    price: 2499,
    originalPrice: 2999,
    category: "electronics",
    image: "/api/placeholder/300/300",
    rating: 4.6,
    reviews: 145,
    isNew: false,
    discount: 17
  },
  {
    id: 6,
    name: {
      th: "กล้องถ่ายรูป Instant",
      en: "Instant Camera"
    },
    price: 3299,
    originalPrice: null,
    category: "electronics",
    image: "/api/placeholder/300/300",
    rating: 4.4,
    reviews: 72,
    isNew: true,
    discount: null
  },
  {
    id: 7,
    name: {
      th: "หนังสือ JavaScript Guide",
      en: "JavaScript Guide Book"
    },
    price: 599,
    originalPrice: 799,
    category: "books",
    image: "/api/placeholder/300/300",
    rating: 4.9,
    reviews: 234,
    isNew: false,
    discount: 25
  },
  {
    id: 8,
    name: {
      th: "โน๊ตบุ๊คเล่มใหญ่",
      en: "Large Notebook"
    },
    price: 149,
    originalPrice: null,
    category: "stationery",
    image: "/api/placeholder/300/300",
    rating: 4.2,
    reviews: 67,
    isNew: false,
    discount: null
  },
  {
    id: 9,
    name: {
      th: "แก้วกาแฟเซรามิค",
      en: "Ceramic Coffee Mug"
    },
    price: 250,
    originalPrice: null,
    category: "home",
    image: "/api/placeholder/300/300",
    rating: 4.1,
    reviews: 43,
    isNew: false,
    discount: null
  },
  {
    id: 10,
    name: {
      th: "สมุดโน๊ตปกแข็ง",
      en: "Hardcover Notebook"
    },
    price: 180,
    originalPrice: 220,
    category: "stationery",
    image: "/api/placeholder/300/300",
    rating: 4.3,
    reviews: 87,
    isNew: true,
    discount: 18
  },
  {
    id: 11,
    name: {
      th: "เคสมือถือใส",
      en: "Clear Phone Case"
    },
    price: 99,
    originalPrice: 149,
    category: "electronics",
    image: "/api/placeholder/300/300",
    rating: 4.0,
    reviews: 156,
    isNew: false,
    discount: 34
  },
  {
    id: 12,
    name: {
      th: "ลิปบาล์มธรรมชาติ",
      en: "Natural Lip Balm"
    },
    price: 120,
    originalPrice: null,
    category: "beauty",
    image: "/api/placeholder/300/300",
    rating: 4.6,
    reviews: 92,
    isNew: true,
    discount: null
  }
];

const categoryKeys = ["all", "clothing", "electronics", "bags", "shoes", "books", "stationery", "home", "beauty"];
const sortOptions = [
  { value: "newest", key: "sort.newest" },
  { value: "price-low", key: "sort.priceLow" },
  { value: "price-high", key: "sort.priceHigh" },
  { value: "rating", key: "sort.rating" },
  { value: "popular", key: "sort.popular" }
];

// Component that uses useSearchParams - needs to be wrapped in Suspense
function ProductsContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const { t, language } = useLanguage();
  
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter products based on selected category, price range, and search query
  const filteredProducts = sampleProducts.filter(product => {
    const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const searchMatch = !searchQuery || 
      product.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(`category.${product.category}`).toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && priceMatch && searchMatch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "popular":
        return b.reviews - a.reviews;
      default:
        return b.id - a.id; // newest first
    }
  });

  // Responsive Product Card Component
  const ProductCard = ({ product }: { product: typeof sampleProducts[0] }) => {
    const isListView = viewMode === 'list' && screenSize !== 'mobile';
    
    if (isListView) {
      // List View for tablet and desktop
      return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
          <div className="flex flex-col sm:flex-row">
            {/* Product Image */}
            <div className="relative sm:w-48 sm:flex-shrink-0">
              <div className="h-48 sm:h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                <div className="text-gray-400">
                  <svg className="w-16 h-16 sm:w-20 sm:h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isNew && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      {t('product.new')}
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      -{product.discount}%
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100">
                  <svg className="w-4 h-4 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between h-full">
                <div className="flex-1">
                  <div className="mb-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">{t(`category.${product.category}`)}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name[language]}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${star <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                  </div>
                </div>
                
                {/* Price and Button */}
                <div className="flex flex-col sm:items-end justify-between sm:ml-6">
                  <div className="mb-4">
                    <div className="flex flex-col sm:items-end">
                      <span className="text-xl font-bold text-blue-600">
                        ฿{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ฿{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium transition-colors duration-200">
                    {t('product.addToCart')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Grid View (default)
    return (
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group h-full flex flex-col">
        <div className="relative">
          {/* Product Image */}
          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
            <div className="text-gray-400">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.isNew && (
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  {t('product.new')}
                </span>
              )}
              {product.discount && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  -{product.discount}%
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button className="absolute top-2 right-2 p-1.5 sm:p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100">
              <svg className="w-4 h-4 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Product Info */}
          <div className="p-3 sm:p-4 flex flex-col flex-1">
            <div className="flex-1">
              <div className="mb-1 sm:mb-2">
                <span className="text-xs text-gray-500 uppercase tracking-wide">{t(`category.${product.category}`)}</span>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors text-sm sm:text-base h-10 sm:h-12 overflow-hidden">
                <span className="line-clamp-2">{product.name[language]}</span>
              </h3>
              
              {/* Rating */}
              <div className="flex items-center mb-2 sm:mb-3">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-3 h-3 sm:w-4 sm:h-4 ${star <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-gray-500 ml-1 sm:ml-2">({product.reviews})</span>
              </div>
              
              {/* Price */}
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                  <span className="text-base sm:text-lg font-bold text-blue-600">
                    ฿{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs sm:text-sm text-gray-400 line-through">
                      ฿{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Add to Cart Button - Always at bottom */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 mt-auto">
              {t('product.addToCart')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Filter Modal Component for Mobile
  const FilterModal = () => (
    <div className={`fixed inset-0 z-50 ${isFilterModalOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsFilterModalOpen(false)} />
      <div className="fixed inset-y-0 left-0 w-80 max-w-full bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">{t('products.filters')}</h2>
            <button
              onClick={() => setIsFilterModalOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Filter Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('products.categories')}</h3>
              <div className="space-y-2">
                {categoryKeys.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {t(`category.${category}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('products.priceRange')}</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>฿{priceRange[0].toLocaleString()}</span>
                  <span>฿{priceRange[1].toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Quick Filters */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('products.quickFilters')}</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-gray-600">{t('filter.newProducts')}</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-gray-600">{t('filter.discounted')}</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-gray-600">{t('filter.highRating')}</span>
                </label>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => setIsFilterModalOpen(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
            >
              {t('products.applyFilters')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
          <nav className="flex items-center space-x-1 sm:space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700 truncate">{t('nav.home')}</Link>
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium truncate">
              {searchQuery ? `${t('products.searchResults')}: ${searchQuery}` : t('products.title')}
            </span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
              {searchQuery ? `${t('products.searchResults')}: "${searchQuery}"` : t('products.title')}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
              {searchQuery 
                ? t('products.searchResultsFor').replace('{count}', filteredProducts.length.toString()).replace('{query}', searchQuery)
                : t('products.subtitle')
              }
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('products.categories')}</h3>
                  <div className="space-y-2">
                    {categoryKeys.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                          selectedCategory === category
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {t(`category.${category}`)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('products.priceRange')}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>฿{priceRange[0].toLocaleString()}</span>
                      <span>฿{priceRange[1].toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Quick Filters */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('products.quickFilters')}</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-gray-600 text-sm">{t('filter.newProducts')}</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-gray-600 text-sm">{t('filter.discounted')}</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-gray-600 text-sm">{t('filter.highRating')}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile/Tablet Top Controls */}
            <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {/* Mobile Filter and View Toggle */}
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Filter Button (Mobile/Tablet) */}
                  <button
                    onClick={() => setIsFilterModalOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                    </svg>
                    <span className="text-sm font-medium">{t('products.filters')}</span>
                  </button>

                  {/* View Toggle (Hidden on Mobile) */}
                  <div className="hidden sm:flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 transition-colors ${
                        viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 transition-colors ${
                        viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Results Count and Sort */}
                <div className="flex items-center justify-between sm:justify-end flex-1 gap-3">
                  <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                    {t('products.found').replace('{count}', sortedProducts.length.toString())}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <label className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">{t('products.sortBy')}:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-gray-300 rounded-lg px-2 py-1.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-0"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {t(option.key)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={`${
              viewMode === 'list' && screenSize !== 'mobile'
                ? 'space-y-4'
                : `grid gap-3 sm:gap-4 lg:gap-6 ${
                    screenSize === 'mobile' 
                      ? 'grid-cols-2' 
                      : screenSize === 'tablet'
                      ? 'grid-cols-3'
                      : viewMode === 'grid'
                      ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'
                      : 'grid-cols-1'
                  }`
            }`}>
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* No Results Message */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t('products.noResults')}</h3>
                <p className="text-gray-500">{t('products.noResultsMessage')}</p>
              </div>
            )}

            {/* Pagination */}
            {sortedProducts.length > 0 && (
              <div className="mt-8 sm:mt-12 flex justify-center">
                <nav className="flex items-center gap-1 sm:gap-2">
                  <button className="px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
                    {t('common.previous')}
                  </button>
                  
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button
                      key={page}
                      className={`px-2 sm:px-3 py-2 text-xs sm:text-sm border rounded-lg ${
                        page === 1
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button className="px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                    {t('common.next')}
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Modal for Mobile */}
      <FilterModal />
    </div>
  );
}

// Loading component for Suspense fallback
function ProductsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-8"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-4">
                <div className="aspect-square bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component that wraps ProductsContent with Suspense
export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsContent />
    </Suspense>
  );
}
