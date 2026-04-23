'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, Search, Heart, User, X, Plus, Minus, Trash2, ChevronRight } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import { BRANDS, PRODUCTS, CATEGORIES } from '@/data/products'

// ── Announcement Bar ─────────────────────────────────────────────────────────
function AnnouncementBar() {
  const msgs = [
    '🚚  Free delivery on orders above PKR 5,000',
    '🎁  Eid Special: Extra 15% off — Use code EID15',
    '💳  Cash on Delivery available across Pakistan',
    '📦  Same-day dispatch on orders before 2 PM',
  ]
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % msgs.length), 3500)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="bg-[#1C1C1E] text-[#FAF7F2] text-center py-2 text-xs tracking-widest font-medium">
      {msgs[idx]}
    </div>
  )
}

// ── Header ────────────────────────────────────────────────────────────────────
function Header({ onCartOpen, onSearchOpen }: { onCartOpen: () => void; onSearchOpen: () => void }) {
  const totalItems = useCartStore(s => s.totalItems())
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 border-b border-gray-100 ${scrolled ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm' : 'bg-[#FAF7F2]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-[#C4622D] rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">BB</span>
          </div>
          <div>
            <div className="font-display text-xl font-semibold text-[#1C1C1E] leading-none">BB Valley</div>
            <div className="text-[9px] tracking-[0.18em] text-[#C4622D] uppercase leading-none mt-0.5">Pakistani Fashion</div>
          </div>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {CATEGORIES.slice(0, 5).map(c => (
            <Link key={c.slug} href={`/shop?category=${c.slug}`}
              className={`text-sm font-medium transition-colors hover:text-[#C4622D] ${c.slug === 'sale' ? 'text-[#C4622D]' : 'text-[#1C1C1E]'}`}>
              {c.name}
            </Link>
          ))}
          <Link href="/brands" className="text-sm font-medium text-[#1C1C1E] hover:text-[#C4622D] transition-colors">Brands</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button onClick={onSearchOpen} className="w-10 h-10 rounded-full hover:bg-[#F0D5C8] transition-colors flex items-center justify-center">
            <Search size={18} />
          </button>
          <button className="w-10 h-10 rounded-full hover:bg-[#F0D5C8] transition-colors flex items-center justify-center">
            <Heart size={18} />
          </button>
          <button className="w-10 h-10 rounded-full hover:bg-[#F0D5C8] transition-colors flex items-center justify-center">
            <User size={18} />
          </button>
          <button onClick={onCartOpen} className="relative w-10 h-10 rounded-full bg-[#1C1C1E] hover:bg-[#C4622D] transition-colors flex items-center justify-center">
            <ShoppingBag size={17} className="text-white" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-[#C4622D] border-2 border-[#FAF7F2] rounded-full text-[10px] text-white font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const [slide, setSlide] = useState(0)
  const slides = [
    { tag: 'New Arrivals', title: 'Eid\nCollection\n2024', sub: 'Discover exquisite Pakistani fashion from 7 premium brands, curated for every occasion.', cta: 'Shop Now', bg: 'linear-gradient(135deg,#1C1C1E 0%,#3D2B1F 50%,#5B3A28 100%)', accent: '#C4622D' },
    { tag: 'Sale', title: 'Up to\n40% Off\nSelected', sub: 'Limited-time deals on Gul Ahmed, Khaadi, Limelight and more. Grab them before they\'re gone.', cta: 'Shop Sale', bg: 'linear-gradient(135deg,#1A2A1A 0%,#2D4A2D 60%,#3A5C3A 100%)', accent: '#4CAF50' },
    { tag: 'Bridal', title: 'Luxury\nBridal\nCouture', sub: 'From Maria B to Sana Safinaz — find your perfect ensemble for the big day.', cta: 'Explore', bg: 'linear-gradient(135deg,#1E1228 0%,#3A1F4A 60%,#4A2860 100%)', accent: '#9B59B6' },
  ]
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])
  const s = slides[slide]

  return (
    <section style={{ background: s.bg, transition: 'background 0.8s ease' }} className="relative min-h-[540px] flex items-center overflow-hidden">
      {/* Circles */}
      <div className="absolute right-[-100px] top-[-100px] w-[600px] h-[600px] rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute right-[60px] top-[-60px] w-[400px] h-[400px] rounded-full border border-white/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 grid md:grid-cols-2 gap-12 items-center w-full">
        <div key={slide} className="animate-hero-in">
          <span style={{ background: s.accent }} className="inline-block text-white text-[11px] font-semibold tracking-[0.15em] uppercase px-3 py-1 rounded-sm mb-5">
            {s.tag}
          </span>
          <h1 className="font-display text-[clamp(52px,6vw,80px)] font-semibold text-[#FAF7F2] leading-[1.05] mb-5 whitespace-pre-line">
            {s.title}
          </h1>
          <p className="text-[#FAF7F2]/70 text-sm leading-relaxed max-w-md mb-8">{s.sub}</p>
          <div className="flex gap-3 flex-wrap">
            <Link href="/shop" style={{ background: s.accent }} className="text-white px-8 py-3.5 text-sm font-semibold rounded-sm hover:opacity-90 transition-opacity">
              {s.cta}
            </Link>
            <Link href="/brands" className="text-[#FAF7F2] border border-[#FAF7F2]/30 hover:border-[#FAF7F2]/80 px-8 py-3.5 text-sm font-medium rounded-sm transition-colors">
              View Brands
            </Link>
          </div>
        </div>

        {/* Brand tiles */}
        <div className="hidden md:grid grid-cols-2 gap-3">
          {BRANDS.slice(0, 4).map((b, i) => (
            <Link key={b.slug} href={`/brands/${b.slug}`}
              style={{ animationDelay: `${i * 0.1}s` }}
              className="animate-hero-in bg-white/7 hover:bg-white/13 border border-white/10 rounded-lg p-5 transition-all hover:-translate-y-1 group">
              <div style={{ background: b.color }} className="w-11 h-11 rounded-md flex items-center justify-center mb-3">
                <span className="text-white text-sm font-bold">{b.initials}</span>
              </div>
              <div className="text-[#FAF7F2] text-sm font-semibold">{b.name}</div>
              <div className="text-[#FAF7F2]/40 text-[11px] mt-0.5 group-hover:text-[#FAF7F2]/70 transition-colors">Shop Now →</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setSlide(i)}
            style={{ width: i === slide ? 28 : 8, background: i === slide ? s.accent : 'rgba(255,255,255,0.3)' }}
            className="h-2 rounded-full border-none transition-all duration-300 cursor-pointer" />
        ))}
      </div>
    </section>
  )
}

// ── Brand Scroll ──────────────────────────────────────────────────────────────
function BrandScroll() {
  return (
    <section className="py-16 px-4 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#C4622D] font-semibold mb-2">Curated For You</p>
          <h2 className="font-display text-4xl font-semibold text-[#1C1C1E]">Shop by Brand</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {BRANDS.map((b, i) => (
            <Link key={b.slug} href={`/brands/${b.slug}`}
              style={{ animationDelay: `${i * 0.06}s` }}
              className="flex-shrink-0 w-36 animate-fade-up">
              <div style={{ background: b.color }}
                className="w-36 h-36 rounded-xl flex flex-col items-center justify-center mb-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-md">
                <span className="text-white text-3xl font-bold font-display">{b.initials}</span>
              </div>
              <div className="text-center">
                <div className="text-[13px] font-semibold text-[#1C1C1E]">{b.name}</div>
                <div className="text-[11px] text-gray-400 mt-0.5">View Collection</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ p }: { p: typeof PRODUCTS[0] }) {
  const [hovered, setHovered] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const addItem = useCartStore(s => s.addItem)
  const discount = p.comparePrice ? Math.round((1 - p.price / p.comparePrice) * 100) : null
  const badgeColor: Record<string, string> = { Sale: '#C4622D', New: '#2D6A4F', Exclusive: '#8B5E83' }

  return (
    <div className="animate-fade-up" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="relative overflow-hidden rounded-lg bg-[#F0EBE3]" style={{ aspectRatio: '3/4' }}>
        <div style={{ background: `linear-gradient(135deg, ${p.colorHex}33, ${p.colorHex}88)`, transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.3s ease' }}
          className="w-full h-full flex items-center justify-center text-6xl">
          {p.emoji}
        </div>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          <span style={{ background: badgeColor[p.badge] || '#9E9E9E' }} className="text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm tracking-wide">
            {p.badge}
          </span>
          {discount && <span className="bg-[#1C1C1E] text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm">-{discount}%</span>}
        </div>

        {/* Wishlist */}
        <button onClick={() => setWishlisted(!wishlisted)}
          style={{ opacity: hovered ? 1 : 0 }}
          className="absolute top-2.5 right-2.5 w-8 h-8 bg-white rounded-full flex items-center justify-center transition-opacity shadow-sm hover:scale-110">
          <Heart size={14} className={wishlisted ? 'fill-[#C4622D] stroke-[#C4622D]' : 'stroke-[#1C1C1E]'} />
        </button>

        {/* Quick Add */}
        <button onClick={() => addItem({ variantId: p.id + '-default', productId: p.id, productName: p.name, brandName: p.brand, slug: p.slug, imageEmoji: p.emoji, colorHex: p.colorHex, size: p.sizes[1] || p.sizes[0], color: p.color, price: p.price, quantity: 1 })}
          style={{ transform: hovered ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.2s ease' }}
          className="absolute bottom-0 left-0 right-0 bg-[#1C1C1E] text-[#FAF7F2] text-[13px] font-semibold py-3 text-center hover:bg-[#C4622D] transition-colors">
          Quick Add
        </button>
      </div>

      <div className="mt-3">
        <p className="text-[10px] tracking-[0.15em] uppercase text-[#C4622D] font-semibold mb-1">{p.brand}</p>
        <Link href={`/products/${p.slug}`} className="text-[13px] text-[#1C1C1E] leading-snug hover:text-[#C4622D] transition-colors line-clamp-2">
          {p.name}
        </Link>
        <div className="flex items-center gap-1.5 mt-1.5 mb-1">
          <div className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ background: p.colorHex }} />
          <span className="text-[11px] text-gray-400">{p.color}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[#1C1C1E]">{formatPrice(p.price)}</span>
          {p.comparePrice && <span className="text-xs text-gray-400 line-through">{formatPrice(p.comparePrice)}</span>}
        </div>
      </div>
    </div>
  )
}

// ── Countdown ─────────────────────────────────────────────────────────────────
function Countdown({ seconds }: { seconds: number }) {
  const [s, setS] = useState(seconds)
  useEffect(() => {
    const t = setInterval(() => setS(x => Math.max(0, x - 1)), 1000)
    return () => clearInterval(t)
  }, [])
  const h = String(Math.floor(s / 3600)).padStart(2, '0')
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0')
  const sec = String(s % 60).padStart(2, '0')
  const units = [[h,'HRS'],[m,'MIN'],[sec,'SEC']]
  return (
    <div className="flex items-center gap-1.5 bg-[#F5F5F5] rounded-md px-3 py-2">
      {units.map(([val, label], i) => (
        <div key={label} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-[#C4622D] font-bold text-lg">:</span>}
          <div className="text-center">
            <div className="text-xl font-bold text-[#C4622D] tabular-nums leading-none">{val}</div>
            <div className="text-[9px] tracking-widest text-gray-400 mt-0.5">{label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Cart Drawer ───────────────────────────────────────────────────────────────
function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore()
  const total = subtotal()
  const shipping = total >= 5000 ? 0 : 200

  return (
    <>
      <div onClick={onClose} className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} />
      <div className={`fixed top-0 right-0 bottom-0 w-[420px] max-w-full bg-[#FAF7F2] z-[201] flex flex-col shadow-2xl transition-transform duration-[350ms] ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-display text-2xl font-semibold text-[#1C1C1E]">Your Bag ({items.length})</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <X size={14} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-gray-200 mb-4" />
              <p className="text-gray-400 text-sm">Your bag is empty</p>
              <button onClick={onClose} className="mt-4 text-[#C4622D] text-sm font-semibold">Continue Shopping →</button>
            </div>
          ) : items.map(item => (
            <div key={item.variantId} className="flex gap-3 pb-4 mb-4 border-b border-gray-100">
              <div style={{ background: `linear-gradient(135deg, ${item.colorHex}33, ${item.colorHex}66)` }}
                className="w-[72px] h-24 rounded-md flex items-center justify-center text-3xl flex-shrink-0">
                {item.imageEmoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-[#C4622D] uppercase tracking-widest font-semibold mb-0.5">{item.brandName}</p>
                <p className="text-[13px] text-[#1C1C1E] leading-snug mb-2">{item.productName}</p>
                <p className="text-[11px] text-gray-400 mb-2">{item.size} · {item.color}</p>
                <div className="flex items-center justify-between">
                  <div className="flex border border-gray-200 rounded overflow-hidden">
                    <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <Minus size={11} />
                    </button>
                    <span className="w-7 h-7 flex items-center justify-center text-[13px] border-x border-gray-200">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <Plus size={11} />
                    </button>
                  </div>
                  <span className="text-[13px] font-bold">{formatPrice(item.price * item.quantity)}</span>
                </div>
              </div>
              <button onClick={() => removeItem(item.variantId)} className="text-gray-300 hover:text-red-400 transition-colors self-start mt-1">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span className="font-semibold">{formatPrice(total)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Shipping</span><span className={shipping === 0 ? 'text-green-600 font-semibold' : 'font-medium'}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span></div>
              {shipping > 0 && <p className="text-[11px] text-gray-400">Add {formatPrice(5000 - total)} more for free shipping</p>}
              <div className="flex justify-between pt-3 border-t border-gray-100">
                <span className="font-bold">Total</span>
                <span className="font-bold text-lg">{formatPrice(total + shipping)}</span>
              </div>
            </div>
            <Link href="/checkout" onClick={onClose}
              className="block w-full bg-[#C4622D] hover:bg-[#A3501F] text-white text-center py-4 text-sm font-bold rounded-sm transition-colors tracking-wide">
              Proceed to Checkout →
            </Link>
            <p className="text-center text-[11px] text-gray-400 mt-3">🔒 Secure checkout · Cash on Delivery · Free returns</p>
          </div>
        )}
      </div>
    </>
  )
}

// ── Search Modal ──────────────────────────────────────────────────────────────
function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('')
  const results = q.length > 1 ? PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.brand.toLowerCase().includes(q.toLowerCase()) ||
    p.category.toLowerCase().includes(q.toLowerCase())
  ) : []

  useEffect(() => { if (!open) setQ('') }, [open])
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <>
      <div onClick={onClose} className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[300] transition-opacity ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} />
      <div style={{ top: open ? '10%' : '5%' }}
        className={`fixed left-1/2 -translate-x-1/2 w-[min(640px,92vw)] bg-[#FAF7F2] rounded-xl z-[301] overflow-hidden shadow-2xl transition-all duration-250 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <Search size={18} className="text-gray-400 flex-shrink-0" />
          <input autoFocus={open} value={q} onChange={e => setQ(e.target.value)}
            placeholder="Search brands, products, categories..."
            className="flex-1 bg-transparent text-[15px] outline-none text-[#1C1C1E] placeholder-gray-400" />
          <kbd className="text-[11px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded text-xs">ESC</kbd>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {q.length > 1 && results.length === 0 && (
            <p className="text-center text-gray-400 text-sm py-8">No results for &quot;{q}&quot;</p>
          )}
          {results.map(p => (
            <Link key={p.id} href={`/products/${p.slug}`} onClick={onClose}
              className="flex items-center gap-4 px-5 py-3 hover:bg-[#F0EBE3] transition-colors">
              <div style={{ background: `linear-gradient(135deg, ${p.colorHex}44, ${p.colorHex}88)` }}
                className="w-11 h-14 rounded flex items-center justify-center text-2xl flex-shrink-0">
                {p.emoji}
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-[#C4622D] uppercase tracking-wider font-semibold">{p.brand}</p>
                <p className="text-sm text-[#1C1C1E]">{p.name}</p>
              </div>
              <span className="text-sm font-bold">{formatPrice(p.price)}</span>
            </Link>
          ))}
          {q.length === 0 && (
            <div className="p-5">
              <p className="text-[11px] tracking-widest uppercase text-gray-400 font-semibold mb-3">Trending</p>
              <div className="flex flex-wrap gap-2">
                {['Khaadi Lawn','Maria B Bridal','Sana Safinaz','Eid Collection','Gul Ahmed Summer'].map(t => (
                  <button key={t} onClick={() => setQ(t)}
                    className="bg-gray-100 hover:bg-[#F0D5C8] text-[#5C5C5C] text-xs px-3.5 py-1.5 rounded-full transition-colors">
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { isDrawerOpen, closeDrawer } = useCartStore()

  useEffect(() => {
    if (isDrawerOpen) setCartOpen(true)
  }, [isDrawerOpen])

  const handleCartClose = () => { setCartOpen(false); closeDrawer() }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <AnnouncementBar />
      <Header onCartOpen={() => setCartOpen(true)} onSearchOpen={() => setSearchOpen(true)} />

      <main>
        {/* Hero */}
        <Hero />

        {/* Brands */}
        <BrandScroll />

        {/* Trending */}
        <section className="py-16 px-4 bg-[#FAF7F2]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-9">
              <div>
                <p className="text-[11px] tracking-[0.2em] uppercase text-[#C4622D] font-semibold mb-1.5">Most Loved</p>
                <h2 className="font-display text-4xl font-semibold text-[#1C1C1E]">Trending Now</h2>
              </div>
              <Link href="/shop" className="text-sm font-semibold text-[#C4622D] flex items-center gap-1 hover:gap-2 transition-all">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {PRODUCTS.map(p => <ProductCard key={p.id} p={p} />)}
            </div>
          </div>
        </section>

        {/* Editorial Banners */}
        <section className="px-4 pb-16">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-4">
            {[
              { tag:'New Arrivals', title:'Summer\nLawn 2024', sub:'Fresh prints. Breathable fabrics. Pakistani summer perfected.', color:'#3D5A4C', cta:'Explore' },
              { tag:'Bridal Edit',  title:'Your\nSpecial Day', sub:'Bridal couture and festive wear from Pakistan\'s finest designers.', color:'#4A3728', cta:'Shop Bridal' },
            ].map((b, i) => (
              <div key={i} style={{ background: b.color }} className="rounded-xl p-12 relative overflow-hidden cursor-pointer hover:-translate-y-0.5 transition-transform">
                <div className="absolute right-[-40px] bottom-[-40px] w-72 h-72 rounded-full border border-white/8 pointer-events-none" />
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-semibold mb-3">{b.tag}</p>
                <h3 className="font-display text-[44px] font-semibold text-[#FAF7F2] leading-[1.1] whitespace-pre-line mb-4">{b.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed max-w-xs mb-7">{b.sub}</p>
                <button className="bg-[#FAF7F2] text-sm font-bold px-6 py-3 rounded-sm" style={{ color: b.color }}>{b.cta}</button>
              </div>
            ))}
          </div>
        </section>

        {/* Deals */}
        <section className="py-16 px-4 bg-[#FAF7F2]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-[11px] tracking-[0.2em] uppercase text-[#C4622D] font-semibold mb-2">Limited Time</p>
              <h2 className="font-display text-4xl font-semibold text-[#1C1C1E]">Today&apos;s Deals</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { brand:'Gul Ahmed', name:'Summer Lawn Mega Sale',   off:'30%', secs:86400, emoji:'🌺', price:2950 },
                { brand:'Khaadi',    name:'Festive Season Specials', off:'25%', secs:172800, emoji:'✨', price:4500 },
                { brand:'Limelight', name:'End of Season Clearance', off:'40%', secs:259200, emoji:'🎀', price:1999 },
              ].map(d => (
                <div key={d.name} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                  <div className="bg-gradient-to-br from-[#1C1C1E] to-[#3D2B1F] p-8 text-center relative">
                    <span className="text-5xl">{d.emoji}</span>
                    <span className="absolute top-3 right-3 bg-[#C4622D] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-sm">-{d.off} OFF</span>
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] text-[#C4622D] uppercase tracking-widest font-semibold mb-1">{d.brand}</p>
                    <p className="text-sm font-semibold text-[#1C1C1E] mb-3">{d.name}</p>
                    <Countdown seconds={d.secs} />
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-base font-bold">{formatPrice(d.price)}</span>
                      <button className="bg-[#C4622D] hover:bg-[#A3501F] text-white text-xs font-bold px-4 py-2 rounded-sm transition-colors">Grab Deal</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 bg-[#F5F0E8]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-[11px] tracking-[0.2em] uppercase text-[#C4622D] font-semibold mb-2">Customer Love</p>
              <h2 className="font-display text-4xl font-semibold text-[#1C1C1E]">What People Say</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { name:'Ayesha K.', city:'Lahore',    rating:5, text:'Amazing quality from Khaadi! The embroidery was exactly as shown. Fast delivery too — received in 2 days.', av:'AK' },
                { name:'Sara M.',   city:'Karachi',   rating:5, text:'Finally a site with Maria B at good prices. The checkout was smooth and my order was perfectly packaged.', av:'SM' },
                { name:'Fatima R.', city:'Islamabad', rating:5, text:'Ordered a Sana Safinaz dupatta for my cousin\'s wedding. Absolutely stunning. Will definitely order again!', av:'FR' },
              ].map(r => (
                <div key={r.name} className="bg-white rounded-xl p-7 shadow-sm">
                  <div className="text-[#C4622D] text-base mb-3">{'★'.repeat(r.rating)}</div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5 italic">&ldquo;{r.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#C4622D] flex items-center justify-center text-white text-[11px] font-bold">{r.av}</div>
                    <div>
                      <div className="text-[13px] font-semibold text-[#1C1C1E]">{r.name}</div>
                      <div className="text-[11px] text-gray-400">{r.city}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 px-4 bg-[#1C1C1E]">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-12 h-12 rounded-full bg-[#C4622D] flex items-center justify-center mx-auto mb-5">
              <svg width="20" height="20" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <h2 className="font-display text-4xl font-semibold text-[#FAF7F2] mb-3">Stay in the Loop</h2>
            <p className="text-sm text-[#FAF7F2]/50 leading-relaxed mb-8">New arrivals, exclusive deals, and style guides — delivered weekly. No spam, ever.</p>
            <div className="flex rounded overflow-hidden border border-white/10">
              <input type="email" placeholder="your@email.com" className="flex-1 bg-white/5 text-[#FAF7F2] text-sm px-4 outline-none placeholder-white/30" />
              <button className="bg-[#C4622D] hover:bg-[#A3501F] text-white text-sm font-semibold px-6 py-3.5 transition-colors flex-shrink-0">Subscribe</button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#121212] text-[#FAF7F2] px-4 pt-14 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-[#C4622D] rounded flex items-center justify-center"><span className="text-white text-[10px] font-bold">BB</span></div>
                <span className="font-display text-lg font-semibold">BB Valley</span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed mb-5">Pakistan&apos;s curated fashion destination. 7 premium brands, one store.</p>
              <p className="text-xs text-white/30">📍 bluebunnyvalley.com</p>
            </div>
            {[
              { title:'Shop',    links:['All Products','New Arrivals','Sale','Brands','Gift Cards'] },
              { title:'Help',    links:['Track Order','Returns','Shipping','Size Guide','FAQ'] },
              { title:'Company', links:['About Us','Contact','Privacy Policy','Terms','Careers'] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-[11px] tracking-[0.12em] uppercase font-bold text-white/35 mb-4">{col.title}</h4>
                {col.links.map(l => (
                  <a key={l} href="#" className="block text-[13px] text-white/55 hover:text-[#C4622D] transition-colors mb-2.5">{l}</a>
                ))}
              </div>
            ))}
          </div>
          <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-[12px] text-white/25">© 2024 BB Valley · bluebunnyvalley.com · All rights reserved.</p>
            <div className="flex gap-4">
              {['Cash on Delivery','JazzCash','EasyPaisa'].map(p => (
                <span key={p} className="text-[10px] font-semibold text-white/20 tracking-wide">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <CartDrawer open={cartOpen} onClose={handleCartClose} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}