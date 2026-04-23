'use client'

// ================================================
// src/app/not-found.tsx  (404 page)
// ================================================

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="font-display text-[120px] font-semibold text-[#C4622D]/20 leading-none mb-4">
          404
        </div>
        <h1 className="font-display text-3xl font-semibold text-[#1C1C1E] mb-3">
          Page Not Found
        </h1>
        <p className="text-sm text-gray-400 leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="bg-[#C4622D] hover:bg-[#A3501F] text-white px-6 py-3 text-sm font-bold rounded-sm transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/shop"
            className="border border-gray-200 hover:border-[#C4622D] text-[#1C1C1E] hover:text-[#C4622D] px-6 py-3 text-sm font-semibold rounded-sm transition-colors"
          >
            Shop All
          </Link>
        </div>
      </div>
    </div>
  )
}