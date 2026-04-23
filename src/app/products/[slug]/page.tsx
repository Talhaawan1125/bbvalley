'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ShoppingBag, Heart, ChevronDown, Share2, Truck, RotateCcw, Shield } from 'lucide-react'
import { PRODUCTS } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'

// ── Related Product Card (separate component — no hooks inside map) ────────────
function RelatedCard({ p }: { p: typeof PRODUCTS[0] }) {
  const [hovered, setHovered] = useState(false)
  const addItem = useCartStore(s => s.addItem)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative overflow-hidden rounded-lg"
        style={{
          aspectRatio: '3/4',
          background: `linear-gradient(135deg, ${p.colorHex}33, ${p.colorHex}66)`,
        }}
      >
        <div
          style={{
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.3s ease',
          }}
          className="w-full h-full flex items-center justify-center text-6xl"
        >
          {p.emoji}
        </div>
        <button
          onClick={() =>
            addItem({
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
            })
          }
          style={{
            transform: hovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.2s ease',
          }}
          className="absolute bottom-0 left-0 right-0 bg-[#1C1C1E] hover:bg-[#C4622D] text-white text-xs font-semibold py-2.5 text-center transition-colors"
        >
          Quick Add
        </button>
      </div>
      <div className="mt-2">
        <Link
          href={`/products/${p.slug}`}
          className="text-[13px] text-[#1C1C1E] hover:text-[#C4622D] transition-colors block leading-snug"
        >
          {p.name}
        </Link>
        <div className="text-sm font-bold mt-1">{formatPrice(p.price)}</div>
      </div>
    </div>
  )
}

// ── Main Product Page ─────────────────────────────────────────────────────────
export default function ProductPage() {
  const params = useParams()
  const product = PRODUCTS.find(p => p.slug === params.slug)

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [qty, setQty] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)
  const [added, setAdded] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<string | null>('description')

  const addItem = useCartStore(s => s.addItem)

  // ── Not found ──
  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="font-display text-2xl mb-2">Product not found</h2>
          <Link href="/shop" className="text-[#C4622D] text-sm font-semibold">
            ← Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const discount = product.comparePrice
    ? Math.round((1 - product.price / product.comparePrice) * 100)
    : null

  const badgeColor: Record<string, string> = {
    Sale: '#C4622D',
    New: '#2D6A4F',
    Exclusive: '#8B5E83',
  }

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 1) {
      alert('Please select a size first')
      return
    }
    addItem({
      variantId: `${product.id}-${selectedSize || product.sizes[0]}`,
      productId: product.id,
      productName: product.name,
      brandName: product.brand,
      slug: product.slug,
      imageEmoji: product.emoji,
      colorHex: product.colorHex,
      size: selectedSize || product.sizes[0],
      color: product.color,
      price: product.price,
      quantity: qty,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const relatedProducts = PRODUCTS.filter(
    p => p.brandSlug === product.brandSlug && p.id !== product.id
  ).slice(0, 4)

  const accordions = [
    {
      key: 'description',
      label: 'Description',
      content: product.description,
    },
    {
      key: 'fabric',
      label: 'Fabric & Care',
      content: product.fabric,
    },
    {
      key: 'shipping',
      label: 'Shipping & Returns',
      content:
        'Free delivery on orders above PKR 5,000. Standard delivery in 3–5 business days. Cash on Delivery available across Pakistan. Easy 7-day returns on all items.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#FAF7F2]">

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-[#C4622D] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#C4622D] transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-[#1C1C1E] truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* ── Left: Image Gallery ── */}
          <div className="space-y-3">
            {/* Main image */}
            <div
              style={{
                background: `linear-gradient(135deg, ${product.colorHex}22, ${product.colorHex}55)`,
                aspectRatio: '3/4',
              }}
              className="rounded-xl flex items-center justify-center text-[120px] w-full relative overflow-hidden"
            >
              {product.emoji}
              {product.badge && (
                <span
                  style={{ background: badgeColor[product.badge] || '#9E9E9E' }}
                  className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-sm"
                >
                  {product.badge} {discount ? `−${discount}%` : ''}
                </span>
              )}
            </div>

            {/* Thumbnail row */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  style={{
                    background: `linear-gradient(135deg, ${product.colorHex}${i % 2 === 0 ? '33' : '55'}, ${product.colorHex}88)`,
                    aspectRatio: '1',
                  }}
                  className="rounded-lg flex items-center justify-center text-3xl cursor-pointer border-2 border-transparent hover:border-[#C4622D] transition-colors"
                >
                  {product.emoji}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Product Info ── */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-5">

            {/* Brand + Name */}
            <div>
              <Link
                href={`/brands/${product.brandSlug}`}
                className="text-[11px] tracking-[0.18em] uppercase text-[#C4622D] font-bold hover:opacity-70 transition-opacity"
              >
                {product.brand}
              </Link>
              <h1 className="font-display text-3xl font-semibold text-[#1C1C1E] mt-1 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-[#1C1C1E]">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <>
                  <span className="text-base text-gray-400 line-through">
                    {formatPrice(product.comparePrice)}
                  </span>
                  <span className="text-sm font-semibold text-[#C4622D] bg-[#F0D5C8] px-2 py-0.5 rounded">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            {/* Color */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                Colour
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border-2 border-[#C4622D] p-0.5">
                  <div
                    className="w-full h-full rounded-full"
                    style={{ background: product.colorHex }}
                  />
                </div>
                <span className="text-sm text-[#1C1C1E]">{product.color}</span>
              </div>
            </div>

            {/* Size */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Size</p>
                <button className="text-xs text-[#C4622D] underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-sm border rounded transition-all ${
                      selectedSize === size
                        ? 'border-[#C4622D] bg-[#C4622D] text-white font-semibold'
                        : 'border-gray-200 text-[#1C1C1E] hover:border-[#C4622D]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                Quantity
              </p>
              <div className="flex border border-gray-200 rounded w-fit">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-lg"
                >
                  −
                </button>
                <span className="w-12 h-10 flex items-center justify-center text-sm font-semibold border-x border-gray-200">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold rounded-sm transition-all ${
                  added
                    ? 'bg-[#2D6A4F] text-white'
                    : 'bg-[#C4622D] hover:bg-[#A3501F] text-white'
                }`}
              >
                <ShoppingBag size={18} />
                {added ? '✓ Added to Bag!' : 'Add to Bag'}
              </button>
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className="w-14 h-14 border border-gray-200 hover:border-[#C4622D] rounded-sm flex items-center justify-center transition-colors"
              >
                <Heart
                  size={20}
                  className={
                    wishlisted
                      ? 'fill-[#C4622D] stroke-[#C4622D]'
                      : 'stroke-[#1C1C1E]'
                  }
                />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 py-4 border-y border-gray-100">
              {[
                { icon: <Truck size={18} />,     label: 'Free Delivery', sub: 'Over PKR 5,000' },
                { icon: <RotateCcw size={18} />, label: 'Easy Returns',  sub: '7-day policy'   },
                { icon: <Shield size={18} />,    label: 'Secure Order',  sub: 'COD available'  },
              ].map(b => (
                <div key={b.label} className="text-center">
                  <div className="text-[#C4622D] flex justify-center mb-1">{b.icon}</div>
                  <div className="text-[11px] font-semibold text-[#1C1C1E]">{b.label}</div>
                  <div className="text-[10px] text-gray-400">{b.sub}</div>
                </div>
              ))}
            </div>

            {/* Share */}
            <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#C4622D] transition-colors">
              <Share2 size={15} /> Share this product
            </button>

            {/* Accordions */}
            <div className="space-y-1 border-t border-gray-100 pt-4">
              {accordions.map(a => (
                <div key={a.key} className="border-b border-gray-100">
                  <button
                    onClick={() =>
                      setOpenAccordion(openAccordion === a.key ? null : a.key)
                    }
                    className="w-full flex items-center justify-between py-3.5 text-sm font-semibold text-[#1C1C1E] hover:text-[#C4622D] transition-colors"
                  >
                    {a.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform text-gray-400 ${
                        openAccordion === a.key ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === a.key && (
                    <p className="pb-4 text-sm text-gray-500 leading-relaxed">
                      {a.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[11px] tracking-[0.2em] uppercase text-[#C4622D] font-semibold mb-1">
                  Same Brand
                </p>
                <h2 className="font-display text-3xl font-semibold text-[#1C1C1E]">
                  More from {product.brand}
                </h2>
              </div>
              <Link
                href={`/brands/${product.brandSlug}`}
                className="text-sm font-semibold text-[#C4622D]"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {relatedProducts.map(p => (
                <RelatedCard key={p.id} p={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
