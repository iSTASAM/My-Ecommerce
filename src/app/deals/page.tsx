// src/app/deals/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../contexts/LanguageContext';

// Sample deals data with multilingual support
const getDealsData = (t: (key: string) => string) => [
  {
    id: 1,
    title: {
      th: "Flash Sale 24 ชั่วโมง",
      en: "24-Hour Flash Sale"
    },
    description: {
      th: "ลดสูงสุด 70% สำหรับสินค้าเลือกสรร",
      en: "Up to 70% off for selected items"
    },
    discount: 70,
    originalPrice: 2999,
    salePrice: 899,
    timeLeft: "23:45:12",
    image: "/api/placeholder/400/300",
    categoryKey: "electronics",
    isFlashSale: true,
    soldCount: 234,
    totalStock: 500,
    tags: {
      th: ["ขายดี", "ลดพิเศษ"],
      en: ["Best Seller", "Special Discount"]
    }
  },
  {
    id: 2,
    title: {
      th: "สินค้าแฟชั่น ลด 50%",
      en: "Fashion Items 50% Off"
    },
    description: {
      th: "เสื้อผ้าแบรนด์ดัง ลดราคาพิเศษ",
      en: "Brand clothing at special prices"
    },
    discount: 50,
    originalPrice: 1599,
    salePrice: 799,
    timeLeft: {
      th: "2 วัน",
      en: "2 days"
    },
    image: "/api/placeholder/400/300",
    categoryKey: "clothing",
    isFlashSale: false,
    soldCount: 89,
    totalStock: 200,
    tags: {
      th: ["แฟชั่น", "แบรนด์ดัง"],
      en: ["Fashion", "Brand"]
    }
  },
  {
    id: 3,
    title: {
      th: "ของใช้ในบ้าน ลด 40%",
      en: "Home Items 40% Off"
    },
    description: {
      th: "อุปกรณ์ตกแต่งบ้านสไตล์โมเดิร์น",
      en: "Modern home decoration items"
    },
    discount: 40,
    originalPrice: 899,
    salePrice: 539,
    timeLeft: {
      th: "5 วัน",
      en: "5 days"
    },
    image: "/api/placeholder/400/300",
    categoryKey: "homeGarden",
    isFlashSale: false,
    soldCount: 156,
    totalStock: 300,
    tags: {
      th: ["บ้านและสวน", "โมเดิร์น"],
      en: ["Home & Garden", "Modern"]
    }
  },
  {
    id: 4,
    title: {
      th: "เครื่องสำอาง ลด 60%",
      en: "Cosmetics 60% Off"
    },
    description: {
      th: "ผลิตภัณฑ์ความงามแบรนด์เกาหลี",
      en: "Korean beauty products"
    },
    discount: 60,
    originalPrice: 1299,
    salePrice: 519,
    timeLeft: "12:30:45",
    image: "/api/placeholder/400/300",
    categoryKey: "beauty",
    isFlashSale: true,
    soldCount: 445,
    totalStock: 600,
    tags: {
      th: ["K-Beauty", "ลิมิเต็ด"],
      en: ["K-Beauty", "Limited"]
    }
  },
  {
    id: 5,
    title: {
      th: "อุปกรณ์กีฬา ลด 35%",
      en: "Sports Equipment 35% Off"
    },
    description: {
      th: "เสื้อผ้ากีฬาและอุปกรณ์ออกกำลังกาย",
      en: "Sports clothing and fitness equipment"
    },
    discount: 35,
    originalPrice: 2199,
    salePrice: 1429,
    timeLeft: {
      th: "1 สัปดาห์",
      en: "1 week"
    },
    image: "/api/placeholder/400/300",
    categoryKey: "sports",
    isFlashSale: false,
    soldCount: 67,
    totalStock: 150,
    tags: {
      th: ["กีฬา", "ฟิตเนส"],
      en: ["Sports", "Fitness"]
    }
  },
  {
    id: 6,
    title: {
      th: "หนังสือ ลด 45%",
      en: "Books 45% Off"
    },
    description: {
      th: "หนังสือ bestseller และหนังสือเรียน",
      en: "Bestseller books and textbooks"
    },
    discount: 45,
    originalPrice: 599,
    salePrice: 329,
    timeLeft: {
      th: "3 วัน",
      en: "3 days"
    },
    image: "/api/placeholder/400/300",
    categoryKey: "books",
    isFlashSale: false,
    soldCount: 123,
    totalStock: 250,
    tags: {
      th: ["bestseller", "การศึกษา"],
      en: ["bestseller", "education"]
    }
  }
];

export default function DealsPage() {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [screenSize, setScreenSize] = useState('desktop');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Get deals data with current language context
  const dealsData = getDealsData(t);
  
  // Featured deals (flash sales)
  const featuredDeals = dealsData.filter(deal => deal.isFlashSale);
  const regularDeals = dealsData.filter(deal => !deal.isFlashSale);

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

  // Update time every second for countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Filter deals
  const categories = [
    { key: "all", label: t('deals.categories.all') },
    { key: "electronics", label: t('deals.categories.electronics') },
    { key: "clothing", label: t('deals.categories.clothing') },
    { key: "homeGarden", label: t('deals.categories.homeGarden') },
    { key: "beauty", label: t('deals.categories.beauty') },
    { key: "sports", label: t('deals.categories.sports') },
    { key: "books", label: t('deals.categories.books') }
  ];
  
  const filteredDeals = selectedCategory === "all" 
    ? dealsData 
    : dealsData.filter(deal => deal.categoryKey === selectedCategory);

  // Deal Card Component
  const DealCard = ({ deal, featured = false }: { deal: typeof dealsData[0], featured?: boolean }) => {
    const progressPercent = (deal.soldCount / deal.totalStock) * 100;
    
    // Helper function to get localized content
    const getLocalizedContent = (content: any) => {
      if (typeof content === 'string') return content;
      return content[language] || content.th;
    };
    
    return (
      <div className={`bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border-2 hover:border-blue-200 ${
        featured ? 'border-red-200 bg-gradient-to-br from-red-50 to-pink-50' : 'border-gray-100'
      }`}>
        {/* Deal Image */}
        <div className="relative">
          <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
            <div className="text-gray-400">
              <svg className="w-16 h-16 sm:w-20 sm:h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            
            {/* Discount Badge */}
            <div className="absolute top-3 left-3">
              <span className={`${
                deal.isFlashSale ? 'bg-red-500' : 'bg-blue-600'
              } text-white text-sm sm:text-base font-bold px-3 py-1 rounded-full shadow-lg`}>
                -{deal.discount}%
              </span>
            </div>
            
            {/* Flash Sale Badge */}
            {deal.isFlashSale && (
              <div className="absolute top-3 right-3">
                <span className="bg-yellow-400 text-red-600 text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                  ⚡ FLASH
                </span>
              </div>
            )}

            {/* Category Badge */}
            <div className="absolute bottom-3 left-3">
              <span className="bg-white bg-opacity-90 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
                {t(`deals.categories.${deal.categoryKey}`)}
              </span>
            </div>
          </div>
        </div>

        {/* Deal Info */}
        <div className="p-4 sm:p-6">
          {/* Title and Description */}
          <div className="mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {getLocalizedContent(deal.title)}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 line-clamp-2">
              {getLocalizedContent(deal.description)}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {getLocalizedContent(deal.tags).map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
              <span className="text-xl sm:text-2xl font-bold text-red-600">
                ฿{deal.salePrice.toLocaleString()}
              </span>
              <span className="text-sm sm:text-base text-gray-400 line-through">
                ฿{deal.originalPrice.toLocaleString()}
              </span>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">{t('deals.card.save')}</div>
              <div className="text-sm font-bold text-green-600">
                ฿{(deal.originalPrice - deal.salePrice).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{t('deals.card.sold')} {deal.soldCount}</span>
              <span>{t('deals.card.remaining')} {deal.totalStock - deal.soldCount}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  deal.isFlashSale ? 'bg-red-500' : 'bg-blue-600'
                }`}
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Time Left */}
          <div className="mb-4 text-center">
            <div className="text-xs text-gray-500 mb-1">{t('deals.card.timeLeft')}</div>
            <div className={`text-lg font-bold ${
              deal.isFlashSale ? 'text-red-600' : 'text-blue-600'
            }`}>
              {getLocalizedContent(deal.timeLeft)}
            </div>
          </div>

          {/* Action Button */}
          <button className={`w-full py-3 px-4 rounded-xl font-bold text-white transition-all duration-200 transform hover:scale-105 ${
            deal.isFlashSale 
              ? 'bg-red-500 hover:bg-red-600 shadow-lg hover:shadow-red-200' 
              : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-200'
          }`}>
            {deal.isFlashSale ? t('deals.card.buyNow') : t('deals.card.addToCart')}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
          <nav className="flex items-center space-x-1 sm:space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700 truncate">{t('deals.breadcrumb.home')}</Link>
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium truncate">{t('deals.breadcrumb.deals')}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-500 via-pink-500 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-4 py-2 mb-6">
              <span className="text-2xl animate-bounce">🔥</span>
              <span className="text-sm sm:text-base font-medium text-gray-800">{t('deals.hero.badge')}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
              <span className="block">{t('deals.hero.title1')}</span>
              <span className="block text-yellow-300">{t('deals.hero.title2')}</span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-pink-100 max-w-3xl mx-auto mb-8 sm:mb-10">
              {t('deals.hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="#flash-deals"
                className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-xl"
              >
                {t('deals.hero.flashSale')}
              </Link>
              <Link
                href="#all-deals"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-red-600 transition-colors duration-200"
              >
                {t('deals.hero.viewAll')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Deals Section */}
      <section id="flash-deals" className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 rounded-full px-4 py-2 mb-4">
              <span className="text-xl animate-pulse">⚡</span>
              <span className="font-bold">{t('deals.flash.badge')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('deals.flash.title')}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              {t('deals.flash.subtitle')}
            </p>
          </div>

          <div className={`grid gap-6 lg:gap-8 ${
            screenSize === 'mobile' 
              ? 'grid-cols-1' 
              : screenSize === 'tablet'
              ? 'grid-cols-2'
              : 'grid-cols-3'
          }`}>
            {featuredDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} featured={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 sm:py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{t('deals.categories.title')}</h3>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.key
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Deals Section */}
      <section id="all-deals" className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {t('deals.all.title')}
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                {t('deals.all.found').replace('{count}', filteredDeals.length.toString())}
                {selectedCategory !== "all" && ` ${t('deals.all.foundInCategory').replace('{category}', categories.find(c => c.key === selectedCategory)?.label || '')}`}
              </p>
            </div>
          </div>

          <div className={`grid gap-6 lg:gap-8 ${
            screenSize === 'mobile' 
              ? 'grid-cols-1' 
              : screenSize === 'tablet'
              ? 'grid-cols-2'
              : 'grid-cols-3'
          }`}>
            {filteredDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>

          {/* No Results */}
          {filteredDeals.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('deals.noResults.title')}</h3>
              <p className="text-gray-500 mb-4">{t('deals.noResults.message')}</p>
              <button
                onClick={() => setSelectedCategory("all")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                {t('deals.noResults.viewAll')}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
