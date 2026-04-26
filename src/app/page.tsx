'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import { BRANDS, PRODUCTS, CATEGORIES } from '@/data/products'

// ── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ p }: { p: typeof PRODUCTS[0] }) {
  const [hovered, setHovered] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const addItem = useCartStore(s => s.addItem)
  const discount = p.comparePrice ? Math.round((1 - p.price / p.comparePrice) * 100) : null
  const badgeColor: Record<string, string> = { Sale: '#C4622D', New: '#2D6A4F', Exclusive: '#8B5E83' }

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="relative overflow-hidden rounded-lg bg-[#F0EBE3]" style={{ aspectRatio: '3/4' }}>
        <div
          style={{
            background: `linear-gradient(135deg, ${p.colorHex}33, ${p.colorHex}88)`,
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.3s ease',
          }}
          className="w-full h-full flex items-center justify-center text-6xl"
        >
          {p.emoji}
        </div>

        {/* Badges */}
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

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          style={{ opacity: hovered ? 1 : 0 }}
          className="absolute top-2.5 right-2.5 w-8 h-8 bg-white rounded-full flex items-center justify-center transition-opacity shadow-sm"
        >
          <svg
            width="14" height="14"
            fill={wishlisted ? '#C4622D' : 'none'}
            stroke={wishlisted ? '#C4622D' : '#1C1C1E'}
            strokeWidth="1.8" viewBox="0 0 24 24"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Quick Add */}
        <button
          onClick={() => addItem({
            variantId: p.id + '-default',
            productId: p.id,
            productName: p.name,
            brandName: p.brand,
            slug: p.slug,
            imageEmoji: p.emoji,
            colorHex: p.colorHex,
            size: p.sizes[1] || p.sizes[0],
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
        <p className="text-[10px] tracking-[0.15em] uppercase text-[#C4622D] font-semibold mb-1">
          {p.brand}
        </p>
        <Link
          href={`/products/${p.slug}`}
          className="text-[13px] text-[#1C1C1E] leading-snug hover:text-[#C4622D] transition-colors line-clamp-2 block"
        >
          {p.name}
        </Link>
        <div className="flex items-center gap-1.5 mt-1.5 mb-1">
          <div className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ background: p.colorHex }} />
          <span className="text-[11px] text-gray-400">{p.color}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[#1C1C1E]">{formatPrice(p.price)}</span>
          {p.comparePrice && (
            <span className="text-xs text-gray-400 line-through">{formatPrice(p.comparePrice)}</span>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Countdown Timer ───────────────────────────────────────────────────────────
function Countdown({ seconds }: { seconds: number }) {
  const [s, setS] = useState(seconds)
  useEffect(() => {
    const t = setInterval(() => setS(x => Math.max(0, x - 1)), 1000)
    return () => clearInterval(t)
  }, [])
  const h = String(Math.floor(s / 3600)).padStart(2, '0')
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0')
  const sec = String(s % 60).padStart(2, '0')
  const units = [[h, 'HRS'], [m, 'MIN'], [sec, 'SEC']]
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

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const [slide, setSlide] = useState(0)
  const slides = [
    {
      tag: 'New Arrivals',
      title: 'Eid\nCollection\n2024',
      sub: 'Discover exquisite Pakistani fashion from 7 premium brands, curated for every occasion.',
      cta: 'Shop Now',
      bg: 'linear-gradient(135deg,#1C1C1E 0%,#3D2B1F 50%,#5B3A28 100%)',
      accent: '#C4622D',
    },
    {
      tag: 'Sale',
      title: 'Up to\n40% Off\nSelected',
      sub: "Limited-time deals on Gul Ahmed, Khaadi, Limelight and more. Grab them before they're gone.",
      cta: 'Shop Sale',
      bg: 'linear-gradient(135deg,#1A2A1A 0%,#2D4A2D 60%,#3A5C3A 100%)',
      accent: '#4CAF50',
    },
    {
      tag: 'Bridal',
      title: 'Luxury\nBridal\nCouture',
      sub: 'From Maria B to Sana Safinaz — find your perfect ensemble for the big day.',
      cta: 'Explore',
      bg: 'linear-gradient(135deg,#1E1228 0%,#3A1F4A 60%,#4A2860 100%)',
      accent: '#9B59B6',
    },
  ]

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])

  const s = slides[slide]

  return (
    <section
      style={{ background: s.bg, transition: 'background 0.8s ease' }}
      className="relative min-h-[540px] flex items-center overflow-hidden"
    >
      <div className="absolute right-[-100px] top-[-100px] w-[600px] h-[600px] rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute right-[60px] top-[-60px] w-[400px] h-[400px] rounded-full border border-white/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 grid md:grid-cols-2 gap-12 items-center w-full">
        <div key={slide} className="animate-hero-in">
          <span
            style={{ background: s.accent }}
            className="inline-block text-white text-[11px] font-semibold tracking-[0.15em] uppercase px-3 py-1 rounded-sm mb-5"
          >
            {s.tag}
          </span>
          <h1 className="font-display text-[clamp(52px,6vw,80px)] font-semibold text-[#FAF7F2] leading-[1.05] mb-5 whitespace-pre-line">
            {s.title}
          </h1>
          <p className="text-[#FAF7F2]/70 text-sm leading-relaxed max-w-md mb-8">{s.sub}</p>
          <div className="flex gap-3 flex-wrap">
            <Link
              href="/shop"
              style={{ background: s.accent }}
              className="text-white px-8 py-3.5 text-sm font-semibold rounded-sm hover:opacity-90 transition-opacity"
            >
              {s.cta}
            </Link>
            <Link
              href="/brands"
              className="text-[#FAF7F2] border border-[#FAF7F2]/30 hover:border-[#FAF7F2]/80 px-8 py-3.5 text-sm font-medium rounded-sm transition-colors"
            >
              View Brands
            </Link>
          </div>
        </div>

        {/* Brand tiles */}
        <div className="hidden md:grid grid-cols-2 gap-3">
          {BRANDS.slice(0, 4).map((b, i) => (
            <Link
              key={b.slug}
              href={`/brands/${b.slug}`}
              style={{ animationDelay: `${i * 0.1}s` }}
              className="animate-hero-in bg-white/[0.07] hover:bg-white/[0.13] border border-white/10 rounded-lg p-5 transition-all hover:-translate-y-1 group"
            >
              <div
                style={{ background: b.color }}
                className="w-11 h-11 rounded-md flex items-center justify-center mb-3"
              >
                <span className="text-white text-sm font-bold">{b.initials}</span>
              </div>
              <div className="text-[#FAF7F2] text-sm font-semibold">{b.name}</div>
              <div className="text-[#FAF7F2]/40 text-[11px] mt-0.5 group-hover:text-[#FAF7F2]/70 transition-colors">
                Shop Now →
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            style={{
              width: i === slide ? 28 : 8,
              background: i === slide ? s.accent : 'rgba(255,255,255,0.3)',
            }}
            className="h-2 rounded-full border-none transition-all duration-300 cursor-pointer"
          />
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
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#C4622D] font-semibold mb-2">
            Curated For You
          </p>
          <h2 className="font-display text-4xl font-semibold text-[#1C1C1E]">Shop by Brand</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {BRANDS.map((b, i) => (
            <Link
              key={b.slug}
              href={`/brands/${b.slug}`}
              style={{ animationDelay: `${i * 0.06}s` }}
              className="flex-shrink-0 w-36 animate-fade-up"
            >
              <div
                style={{ background: b.color }}
                className="w-36 h-36 rounded-xl flex flex-col items-center justify-center mb-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-md"
              >
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

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="bg-[#FAF7F2]">
      {/* Hero */}
      <Hero />

      {/* Shop by Brand */}
      <BrandScroll />

      {/* Trending Now */}
      <section className="py-16 px-4 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-9">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-[#C4622D] font-semibold mb-1.5">
                Most Loved
              </p>
              <h2 className="font-display text-4xl font-semibold text-[#1C1C1E]">Trending Now</h2>
            </div>
            <Link
              href="/shop"
              className="text-sm font-semibold text-[#C4622D] flex items-center gap-1 hover:gap-2 transition-all"
            >
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
            {
              tag: 'New Arrivals',
              title: 'Summer\nLawn 2024',
              sub: 'Fresh prints. Breathable fabrics. Pakistani summer perfected.',
              color: '#3D5A4C',
              cta: 'Explore',
              href: '/shop?category=lawn',
            },
            {
              tag: 'Bridal Edit',
              title: 'Your\nSpecial Day',
              sub: "Bridal couture and festive wear from Pakistan's finest designers.",
              color: '#4A3728',
              cta: 'Shop Bridal',
              href: '/shop?category=bridal',
            },
          ].map((b, i) => (
            <div
              key={i}
              style={{ background: b.color }}
              className="rounded-xl p-12 relative overflow-hidden cursor-pointer hover:-translate-y-0.5 transition-transform"
            >
              <div className="absolute right-[-40px] bottom-[-40px] w-72 h-72 rounded-full border border-white/8 pointer-events-none" />
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-semibold mb-3">{b.tag}</p>
              <h3 className="font-display text-[44px] font-semibold text-[#FAF7F2] leading-[1.1] whitespace-pre-line mb-4">
                {b.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed max-w-xs mb-7">{b.sub}</p>
              <Link
                href={b.href}
                className="inline-block text-sm font-bold px-6 py-3 rounded-sm transition-opacity hover:opacity-80"
                style={{ background: '#FAF7F2', color: b.color }}
              >
                {b.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Deals */}
      <section className="py-16 px-4 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#C4622D] font-semibold mb-2">
              Limited Time
            </p>
            <h2 className="font-display text-4xl font-semibold text-[#1C1C1E]">Today&apos;s Deals</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { brand: 'Gul Ahmed', name: 'Summer Lawn Mega Sale',   off: '30%', secs: 86400,  emoji: '🌺', price: 2950 },
              { brand: 'Khaadi',    name: 'Festive Season Specials', off: '25%', secs: 172800, emoji: '✨', price: 4500 },
              { brand: 'Limelight', name: 'End of Season Clearance', off: '40%', secs: 259200, emoji: '🎀', price: 1999 },
            ].map(d => (
              <div key={d.name} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <div className="bg-gradient-to-br from-[#1C1C1E] to-[#3D2B1F] p-8 text-center relative">
                  <span className="text-5xl">{d.emoji}</span>
                  <span className="absolute top-3 right-3 bg-[#C4622D] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-sm">
                    -{d.off} OFF
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-[10px] text-[#C4622D] uppercase tracking-widest font-semibold mb-1">{d.brand}</p>
                  <p className="text-sm font-semibold text-[#1C1C1E] mb-3">{d.name}</p>
                  <Countdown seconds={d.secs} />
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-base font-bold">{formatPrice(d.price)}</span>
                    <Link
                      href="/shop"
                      className="bg-[#C4622D] hover:bg-[#A3501F] text-white text-xs font-bold px-4 py-2 rounded-sm transition-colors"
                    >
                      Grab Deal
                    </Link>
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
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#C4622D] font-semibold mb-2">
              Customer Love
            </p>
            <h2 className="font-display text-4xl font-semibold text-[#1C1C1E]">What People Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { name: 'Ayesha K.', city: 'Lahore',    rating: 5, text: 'Amazing quality from Khaadi! The embroidery was exactly as shown. Fast delivery too — received in 2 days.', av: 'AK' },
              { name: 'Sara M.',   city: 'Karachi',   rating: 5, text: 'Finally a site with Maria B at good prices. The checkout was smooth and my order was perfectly packaged.', av: 'SM' },
              { name: 'Fatima R.', city: 'Islamabad', rating: 5, text: "Ordered a Sana Safinaz dupatta for my cousin's wedding. Absolutely stunning. Will definitely order again!", av: 'FR' },
            ].map(r => (
              <div key={r.name} className="bg-white rounded-xl p-7 shadow-sm">
                <div className="text-[#C4622D] text-base mb-3">{'★'.repeat(r.rating)}</div>
                <p className="text-sm text-gray-500 leading-relaxed mb-5 italic">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#C4622D] flex items-center justify-center text-white text-[11px] font-bold">
                    {r.av}
                  </div>
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
            <svg width="20" height="20" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <h2 className="font-display text-4xl font-semibold text-[#FAF7F2] mb-3">Stay in the Loop</h2>
          <p className="text-sm text-[#FAF7F2]/50 leading-relaxed mb-8">
            New arrivals, exclusive deals, and style guides — delivered weekly. No spam, ever.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  )
}

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  return done ? (
    <p className="text-[#C4622D] font-semibold">✓ You&apos;re in! Welcome to BB Valley.</p>
  ) : (
    <div className="flex rounded overflow-hidden border border-white/10">
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="flex-1 bg-white/5 text-[#FAF7F2] text-sm px-4 outline-none placeholder-white/30"
      />
      <button
        onClick={() => email && setDone(true)}
        className="bg-[#C4622D] hover:bg-[#A3501F] text-white text-sm font-semibold px-6 py-3.5 transition-colors flex-shrink-0"
      >
        Subscribe
      </button>
    </div>
  )
}