'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Simple 404 Illustration */}
        <div className="mb-8">
          <div className="text-6xl md:text-7xl font-bold text-gray-300 mb-4">
            404
          </div>
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            ไม่พบหน้าที่คุณต้องการ
          </h1>
          <p className="text-gray-600">
            หน้าที่คุณกำลังมองหาไม่มีอยู่หรือถูกย้ายแล้ว
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            กลับหน้าแรก
          </Link>
          
          <div className="flex justify-center gap-4 text-sm">
            <button 
              onClick={() => window.history.back()}
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              ← กลับหน้าก่อนหน้า
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
