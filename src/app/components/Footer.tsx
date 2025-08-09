// src/app/components/Footer.tsx
'use client';

import Link from 'next/link';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  MdEmail, 
  MdPhone, 
  MdLocationOn,
  MdFacebook,
  MdOutlineShoppingCart,
  MdFavorite,
  MdPayment,
  MdSecurity,
  MdLocalShipping,
  MdSupport,
  MdStars,
  MdTrendingUp
} from 'react-icons/md';

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <Link href="/" className="text-2xl font-bold text-white mb-4 block">
              WatcharaBunp
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              {t('footer.company.description')}
            </p>
                         <div className="flex space-x-4">
               {/* Social Media Icons */}
               <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                 <MdFacebook className="h-6 w-6" />
               </a>
               <a href="mailto:info@watcharabunp.com" className="text-gray-300 hover:text-blue-600 transition-colors duration-200">
                 <MdEmail className="h-6 w-6" />
               </a>
               <a href="tel:+66123456789" className="text-gray-300 hover:text-green-500 transition-colors duration-200">
                 <MdPhone className="h-6 w-6" />
               </a>
               <a href="#" className="text-gray-300 hover:text-red-500 transition-colors duration-200">
                 <MdLocationOn className="h-6 w-6" />
               </a>
             </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks.title')}</h3>
            <ul className="space-y-2">
                             <li>
                 <Link href="/products" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                   <MdOutlineShoppingCart className="h-4 w-4" />
                   <span>{t('footer.quickLinks.allProducts')}</span>
                 </Link>
               </li>
               <li>
                 <Link href="/categories" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                   <MdStars className="h-4 w-4" />
                   <span>{t('footer.quickLinks.categories')}</span>
                 </Link>
               </li>
               <li>
                 <Link href="/deals" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                   <MdFavorite className="h-4 w-4" />
                   <span>{t('footer.quickLinks.deals')}</span>
                 </Link>
               </li>
               <li>
                 <Link href="/new-arrivals" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                   <MdStars className="h-4 w-4" />
                   <span>{t('footer.quickLinks.newArrivals')}</span>
                 </Link>
               </li>
               <li>
                 <Link href="/bestsellers" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                   <MdTrendingUp className="h-4 w-4" />
                   <span>{t('footer.quickLinks.bestsellers')}</span>
                 </Link>
               </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.customerService.title')}</h3>
            <ul className="space-y-2">
                             <li>
                 <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                   <MdSupport className="h-4 w-4" />
                   <span>{t('footer.customerService.contact')}</span>
                 </Link>
               </li>
               <li>
                 <Link href="/shipping" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                   <MdLocalShipping className="h-4 w-4" />
                   <span>{t('footer.customerService.shipping')}</span>
                 </Link>
               </li>
               <li>
                 <Link href="/returns" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                   <MdSecurity className="h-4 w-4" />
                   <span>{t('footer.customerService.returns')}</span>
                 </Link>
               </li>
               <li>
                 <Link href="/faq" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                   <MdSupport className="h-4 w-4" />
                   <span>{t('footer.customerService.faq')}</span>
                 </Link>
               </li>
               <li>
                 <Link href="/size-guide" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                   <MdStars className="h-4 w-4" />
                   <span>{t('footer.customerService.sizeGuide')}</span>
                 </Link>
               </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold mb-2">{t('footer.newsletter.title')}</h3>
            <p className="text-gray-300 mb-4">{t('footer.newsletter.description')}</p>
            <div className="flex">
              <input
                type="email"
                placeholder={t('footer.newsletter.placeholder')}
                className="flex-1 px-4 py-2 rounded-l-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg transition-colors duration-200 font-medium">
                {t('footer.newsletter.subscribe')}
              </button>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">{t('footer.payment.title')}</h3>
                         <div className="flex justify-center items-center space-x-6 flex-wrap">
               <div className="bg-white rounded p-3 m-1 flex items-center space-x-2">
                 <MdPayment className="h-6 w-6 text-blue-600" />
                 <span className="text-blue-600 font-bold text-sm">VISA</span>
               </div>
               <div className="bg-white rounded p-3 m-1 flex items-center space-x-2">
                 <MdPayment className="h-6 w-6 text-blue-600" />
                 <span className="text-blue-600 font-bold text-sm">PayPal</span>
               </div>
               <div className="bg-white rounded p-3 m-1 flex items-center space-x-2">
                 <MdPayment className="h-6 w-6 text-green-600" />
                 <span className="text-green-600 font-bold text-sm">LINE Pay</span>
               </div>
               <div className="bg-white rounded p-3 m-1 flex items-center space-x-2">
                 <MdPayment className="h-6 w-6 text-blue-500" />
                 <span className="text-blue-500 font-bold text-sm">PromptPay</span>
               </div>
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm mb-4 md:mb-0">
              {t('footer.copyright')}
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors duration-200">
                {t('footer.legal.privacy')}
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-white transition-colors duration-200">
                {t('footer.legal.terms')}
              </Link>
              <Link href="/cookies" className="text-gray-300 hover:text-white transition-colors duration-200">
                {t('footer.legal.cookies')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
