'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Heart } from 'lucide-react'
import { BRANDS, PRODUCTS } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'

function BrandProductCard({ p }: { p: typeof PRODUCTS[0] }) {
  const [hovered, setHovered] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const addItem = useCartStore(s => s.addItem)
  const discount = p.comparePrice
    ? Math.round((1 - p.price / p.comparePrice) * 100)
    : null
  const badgeColor: Record<string, string> = {
    Sale: '#C4622D', New: '#2D6A4F', Exclusive: '#8B5E83',
  }
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div
        className="relative overflow-hidden rounded-lg"
        style={{ aspectRatio: '3/4', background: '#F0EBE3' }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${p.colorHex}33, ${p.colorHex}88)`,
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.3s ease',
          }}
          className="w-full h-full flex items-center justify-center text-7xl"
        >
          {p.emoji}
        </div>
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          <span
            style={{ background: badgeColor[p.badge] || '#9E9E9E' }}
            className="text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm"
          >
            {p.badge}
          </span>
          {discount && (
            <span className="bg-[#1C1C1E] text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm">
              -{discount}%
            </span>
          )}
        </div>
        <button
          onClick={() => setWishlisted(!wishlisted)}
          style={{ opacity: hovered ? 1 : 0 }}
          className="absolute top-2.5 right-2.5 w-8 h-8 bg-white rounded-full flex items-center justify-center transition-opacity shadow-sm"
        >
          <Heart size={14} className={wishlisted ? 'fill-[#C4622D] stroke-[#C4622D]' : 'stroke-[#1C1C1E]'} />
        </button>
        <button
          onClick={() => addItem({
            variantId: p.id + '-default',
            productId: p.id,
            productName: p.name,
            brandName: p.brand,
            slug: p.slug,
            imageEmoji: p.emoji,
            colorHex: p.colorHex,
            size: p.sizes[0],
            color: p.color,
            price: p.price,
            quantity: 1,
          })}
          style={{
            transform: hovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.2s ease',
          }}
          className="absolute bottom-0 left-0 right-0 bg-[#1C1C1E] hover:bg-[#C4622D] text-white text-[13px] font-semibold py-3 text-center transition-colors"
        >
          Quick Add
        </button>
      </div>
      <div className="mt-3">
        <Link
          href={`/products/${p.slug}`}
          className="text-[13px] text-[#1C1C1E] leading-snug hover:text-[#C4622D] transition-colors line-clamp-2 block"
        >
          {p.name}
        </Link>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-sm font-bold text-[#1C1C1E]">{formatPrice(p.price)}</span>
          {p.comparePrice && (
            <span className="text-xs text-gray-400 line-through">{formatPrice(p.comparePrice)}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function BrandPage() {
  const params = useParams()
  const brand = BRANDS.find(b => b.slug === params.slug)
  const products = PRODUCTS.filter(p => p.brandSlug === params.slug)

  if (!brand) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-3">😕</div>
          <h2 className="font-display text-2xl mb-2">Brand not found</h2>
          <Link href="/brands" className="text-[#C4622D] text-sm font-semibold">← All Brands</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div
        style={{ background: brand.color }}
        className="px-4 py-20 text-center relative overflow-hidden"
      >
        <div className="absolute right-[-60px] top-[-60px] w-80 h-80 rounded-full border border-white/10 pointer-events-none" />
        <div className="flex items-center justify-center gap-2 text-xs text-white/40 mb-8">
          <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/brands" className="hover:text-white/70 transition-colors">Brands</Link>
          <span>/</span>
          <span className="text-white/70">{brand.name}</span>
        </div>
        <div className="w-24 h-24 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-4xl font-bold font-display">{brand.initials}</span>
        </div>
        <h1 className="font-display text-5xl font-semibold text-white mb-2">{brand.name}</h1>
        <p className="text-white/55 text-sm mb-1">{brand.desc}</p>
        <p className="text-white/35 text-xs">{products.length} products available</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📦</div>
            <p className="text-gray-400 text-sm mb-4">No products yet for this brand.</p>
            <Link href="/shop" className="text-[#C4622D] font-semibold text-sm">Browse All Products →</Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl font-semibold text-[#1C1C1E]">
                {brand.name} Collection
              </h2>
              <span className="text-sm text-gray-400">{products.length} items</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map(p => <BrandProductCard key={p.id} p={p} />)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}