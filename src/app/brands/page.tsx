'use client'

import Link from 'next/link'
import { BRANDS, PRODUCTS } from '@/data/products'
import { formatPrice } from '@/lib/utils'

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div
        style={{ background: 'linear-gradient(135deg, #1C1C1E 0%, #3D2B1F 100%)' }}
        className="px-4 py-20 text-center relative overflow-hidden"
      >
        <div className="absolute right-[-60px] top-[-60px] w-80 h-80 rounded-full border border-white/5 pointer-events-none" />
        <p className="text-[11px] tracking-[0.2em] uppercase text-[#C4622D] font-semibold mb-3">Our Partners</p>
        <h1 className="font-display text-5xl font-semibold text-[#FAF7F2] mb-4">Shop by Brand</h1>
        <p className="text-[#FAF7F2]/55 text-sm max-w-md mx-auto leading-relaxed">
          7 of Pakistan&apos;s most loved fashion brands — curated and delivered to your door.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRANDS.map((brand) => {
            const brandProducts = PRODUCTS.filter(p => p.brandSlug === brand.slug)
            const minPrice = brandProducts.length > 0
              ? Math.min(...brandProducts.map(p => p.price))
              : 0
            return (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  style={{ background: brand.color }}
                  className="p-10 flex flex-col items-center relative overflow-hidden"
                >
                  <div className="absolute right-[-30px] bottom-[-30px] w-40 h-40 rounded-full border border-white/10 pointer-events-none" />
                  <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-3">
                    <span className="text-white text-3xl font-bold font-display">{brand.initials}</span>
                  </div>
                  <h2 className="text-white text-xl font-bold">{brand.name}</h2>
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">{brand.desc}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400">{brandProducts.length} products</span>
                      {minPrice > 0 && (
                        <span className="text-xs text-gray-400"> · from {formatPrice(minPrice)}</span>
                      )}
                    </div>
                    <span className="text-[#C4622D] text-sm font-semibold group-hover:opacity-70 transition-opacity">
                      Shop Now →
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}