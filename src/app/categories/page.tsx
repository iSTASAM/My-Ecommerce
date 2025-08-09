// src/app/categories/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../contexts/LanguageContext';

// Categories data with icons, colors, and product counts
const getCategoriesData = (t: (key: string) => string) => [
  {
    id: 1,
    nameKey: "categoryName.clothing",
    name: t("categoryName.clothing"),
    description: t("categoryDesc.clothing"),
    icon: "👔",
    color: "bg-pink-50 hover:bg-pink-100 border-pink-200",
    accentColor: "text-pink-600",
    productCount: 1247,
    isPopular: true,
    subcategories: ["เสื้อยืด", "เสื้อเชิ้ต", "กางเกง", "กระโปรง", "ชุดเดรส"]
  },
  {
    id: 2,
    nameKey: "categoryName.electronics",
    name: t("categoryName.electronics"),
    description: t("categoryDesc.electronics"),
    icon: "📱",
    color: "bg-blue-50 hover:bg-blue-100 border-blue-200",
    accentColor: "text-blue-600",
    productCount: 892,
    isPopular: true,
    subcategories: ["มือถือ", "แท็บเล็ต", "หูฟัง", "ลำโพง", "อุปกรณ์เสริม"]
  },
  {
    id: 3,
    nameKey: "categoryName.homeGarden",
    name: t("categoryName.homeGarden"),
    description: t("categoryDesc.homeGarden"),
    icon: "🏠",
    color: "bg-green-50 hover:bg-green-100 border-green-200",
    accentColor: "text-green-600",
    productCount: 634,
    isPopular: false,
    subcategories: ["เฟอร์นิเจอร์", "ของแต่งบ้าน", "อุปกรณ์ทำสวน", "ไฟตกแต่ง", "พรม"]
  },
  {
    id: 4,
    nameKey: "categoryName.beauty",
    name: t("categoryName.beauty"),
    description: t("categoryDesc.beauty"),
    icon: "💄",
    color: "bg-purple-50 hover:bg-purple-100 border-purple-200",
    accentColor: "text-purple-600",
    productCount: 456,
    isPopular: true,
    subcategories: ["เครื่องสำอาง", "ดูแลผิว", "น้ำหอม", "ดูแลเล็บ", "อุปกรณ์ทำความงาม"]
  },
  {
    id: 5,
    nameKey: "categoryName.sports",
    name: t("categoryName.sports"),
    description: t("categoryDesc.sports"),
    icon: "⚽",
    color: "bg-orange-50 hover:bg-orange-100 border-orange-200",
    accentColor: "text-orange-600",
    productCount: 789,
    isPopular: false,
    subcategories: ["เสื้อผ้ากีฬา", "รองเท้ากีฬา", "อุปกรณ์ฟิตเนส", "อุปกรณ์กีฬา", "อาหารเสริม"]
  },
  {
    id: 6,
    nameKey: "categoryName.books",
    name: t("categoryName.books"),
    description: t("categoryDesc.books"),
    icon: "📚",
    color: "bg-yellow-50 hover:bg-yellow-100 border-yellow-200",
    accentColor: "text-yellow-600",
    productCount: 345,
    isPopular: false,
    subcategories: ["หนังสือ", "นิตยสาร", "การ์ตูน", "หนังสือเด็ก", "สื่อการเรียนรู้"]
  },
  {
    id: 7,
    nameKey: "categoryName.toys",
    name: t("categoryName.toys"),
    description: t("categoryDesc.toys"),
    icon: "🧸",
    color: "bg-red-50 hover:bg-red-100 border-red-200",
    accentColor: "text-red-600",
    productCount: 567,
    isPopular: true,
    subcategories: ["ของเล่นเด็ก", "เกมกระดาน", "ตุ๊กตา", "ของเล่นเสริมพัฒนาการ", "เกมวิดีโอ"]
  },
  {
    id: 8,
    nameKey: "categoryName.food",
    name: t("categoryName.food"),
    description: t("categoryDesc.food"),
    icon: "🍯",
    color: "bg-amber-50 hover:bg-amber-100 border-amber-200",
    accentColor: "text-amber-600",
    productCount: 234,
    isPopular: false,
    subcategories: ["ขนมและของหวาน", "เครื่องดื่ม", "อาหารแห้ง", "เครื่องปรุง", "อาหารสุขภาพ"]
  },
  {
    id: 9,
    nameKey: "categoryName.automotive",
    name: t("categoryName.automotive"),
    description: t("categoryDesc.automotive"),
    icon: "🚗",
    color: "bg-slate-50 hover:bg-slate-100 border-slate-200",
    accentColor: "text-slate-600",
    productCount: 178,
    isPopular: false,
    subcategories: ["อุปกรณ์ตกแต่ง", "อะไหล่", "น้ำมันและเคมี", "เครื่องมือ", "ยางและล้อ"]
  },
  {
    id: 10,
    nameKey: "categoryName.stationery",
    name: t("categoryName.stationery"),
    description: t("categoryDesc.stationery"),
    icon: "✏️",
    color: "bg-indigo-50 hover:bg-indigo-100 border-indigo-200",
    accentColor: "text-indigo-600",
    productCount: 423,
    isPopular: false,
    subcategories: ["เครื่องเขียน", "สมุดและกระดาษ", "อุปกรณ์สำนักงาน", "เครื่องพิมพ์", "กระเป๋าใส่เอกสาร"]
  },
  {
    id: 11,
    nameKey: "categoryName.health",
    name: t("categoryName.health"),
    description: t("categoryDesc.health"),
    icon: "💊",
    color: "bg-teal-50 hover:bg-teal-100 border-teal-200",
    accentColor: "text-teal-600",
    productCount: 312,
    isPopular: false,
    subcategories: ["วิตามินและอาหารเสริม", "ยาสามัญ", "อุปกรณ์วัดสุขภาพ", "ผลิตภัณฑ์ดูแลสุขภาพ", "เครื่องมือแพทย์"]
  },
  {
    id: 12,
    nameKey: "categoryName.others",
    name: t("categoryName.others"),
    description: t("categoryDesc.others"),
    icon: "🛍️",
    color: "bg-gray-50 hover:bg-gray-100 border-gray-200",
    accentColor: "text-gray-600",
    productCount: 156,
    isPopular: false,
    subcategories: ["ของสะสม", "ของขวัญ", "งานฝีมือ", "สินค้าพิเศษ", "สินค้าจำกัด"]
  }
];

export default function CategoriesPage() {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [screenSize, setScreenSize] = useState('desktop');
  
  // Get categories data with current language
  const categoriesData = getCategoriesData(t);
  
  // Initialize filter with translation when component mounts
  useEffect(() => {
    if (!selectedFilter) {
      setSelectedFilter(t('categories.filterAll'));
    }
  }, [t, selectedFilter]);

  // Update filter when language changes
  useEffect(() => {
    if (selectedFilter) {
      // Map old filter values to new language
      if (selectedFilter === 'ทั้งหมด' || selectedFilter === 'All') {
        setSelectedFilter(t('categories.filterAll'));
      } else if (selectedFilter === 'ยอดนิยม' || selectedFilter === 'Popular') {
        setSelectedFilter(t('categories.filterPopular'));
      } else if (selectedFilter === 'มากกว่า 500 สินค้า' || selectedFilter === 'More than 500 products') {
        setSelectedFilter(t('categories.filterHighCount'));
      }
    }
  }, [language, t]);

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

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter categories based on search and filter
  const filteredCategories = categoriesData.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === t('categories.filterAll') || 
                         (selectedFilter === t('categories.filterPopular') && category.isPopular) ||
                         (selectedFilter === t('categories.filterHighCount') && category.productCount > 500);
    return matchesSearch && matchesFilter;
  });

  // Popular categories for featured section
  const popularCategories = categoriesData.filter(cat => cat.isPopular).slice(0, 4);

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
            <span className="text-gray-900 font-medium truncate">{t('categories.title')}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              {t('categories.title')}
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
              {t('categories.subtitle')}
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-6 sm:mb-8 px-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('categories.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 pr-4 text-gray-900 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4">
              {[t('categories.filterAll'), t('categories.filterPopular'), t('categories.filterHighCount')].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                    selectedFilter === filter
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      {selectedFilter === t('categories.filterAll') && (
        <section className="py-8 sm:py-12 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                {t('categories.popularTitle')}
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {t('categories.popularSubtitle')}
              </p>
            </div>
            
            <div className={`grid gap-4 sm:gap-6 ${
              screenSize === 'mobile' 
                ? 'grid-cols-2' 
                : screenSize === 'tablet'
                ? 'grid-cols-2'
                : 'grid-cols-4'
            }`}>
              {popularCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${encodeURIComponent(category.name)}`}
                  className={`${category.color} rounded-2xl p-4 sm:p-6 text-center transition-all duration-200 group hover:shadow-lg border-2 hover:scale-105 relative overflow-hidden`}
                >
                  {/* Popular Badge */}
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {t('categories.popularBadge')}
                  </div>
                  
                  <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-200">
                    {category.icon}
                  </div>
                  <h3 className={`font-bold text-sm sm:text-base lg:text-lg ${category.accentColor} mb-1 sm:mb-2 group-hover:text-gray-900 transition-colors`}>
                    {category.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="text-xs sm:text-sm text-gray-500 font-medium">
                    {category.productCount.toLocaleString()} {t('categories.products')}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Categories Section */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                {selectedFilter === t('categories.filterAll') ? t('categories.allTitle') : t('categories.filteredTitle').replace('{filter}', selectedFilter)}
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {t('categories.foundCount').replace('{count}', filteredCategories.length.toString())}
              </p>
            </div>
          </div>

          {/* Categories Grid */}
          <div className={`grid gap-4 sm:gap-6 ${
            screenSize === 'mobile' 
              ? 'grid-cols-1' 
              : screenSize === 'tablet'
              ? 'grid-cols-2'
              : 'grid-cols-3'
          }`}>
            {filteredCategories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${encodeURIComponent(category.name)}`}
                className={`${category.color} rounded-2xl p-4 sm:p-6 transition-all duration-200 group hover:shadow-lg border-2 hover:scale-[1.02] relative`}
              >
                {/* Popular Badge */}
                {category.isPopular && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {t('categories.popularBadge')}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Icon */}
                  <div className="text-4xl sm:text-5xl lg:text-6xl group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                    {category.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-base sm:text-lg lg:text-xl ${category.accentColor} mb-1 sm:mb-2 group-hover:text-gray-900 transition-colors`}>
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">
                      {category.description}
                    </p>
                    
                    {/* Product Count */}
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span className="text-xs sm:text-sm text-gray-500 font-medium">
                        {category.productCount.toLocaleString()} {t('categories.products')}
                      </span>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    
                    {/* Subcategories */}
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {category.subcategories.slice(0, 3).map((sub, index) => (
                        <span
                          key={index}
                          className="text-xs bg-white bg-opacity-60 text-gray-600 px-2 py-1 rounded-full"
                        >
                          {sub}
                        </span>
                      ))}
                      {category.subcategories.length > 3 && (
                        <span className="text-xs bg-white bg-opacity-60 text-gray-500 px-2 py-1 rounded-full">
                          +{category.subcategories.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* No Results */}
          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('categories.noResults')}</h3>
              <p className="text-gray-500 mb-4">{t('categories.noResultsMessage')}</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedFilter(t('categories.filterAll'));
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                {t('categories.resetSearch')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-8 sm:py-12 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
              {t('categories.ctaTitle')}
            </h2>
            <p className="text-sm sm:text-base text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
              {t('categories.ctaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link
                href="/products"
                className="bg-white hover:bg-gray-50 text-blue-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 w-full sm:w-auto text-center"
              >
                {t('categories.viewAllProducts')}
              </Link>
              <Link
                href="/contact"
                className="border border-white hover:bg-white hover:text-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 w-full sm:w-auto text-center"
              >
                {t('categories.contactUs')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
