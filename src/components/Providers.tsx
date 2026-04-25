'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ShoppingBag, Search, Heart, User,
  X, Plus, Minus, Trash2, Menu
} from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import { CATEGORIES, PRODUCTS } from '@/data/products'

// ─── Announcement Bar ────────────────────────────────────────────────────────
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

// ─── Header ──────────────────────────────────────────────────────────────────
function Header({
  onCartOpen,
  onSearchOpen,
}: {
  onCartOpen: () => void
  onSearchOpen: () => void
}) {
  const totalItems = useCartStore(s => s.totalItems())
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  const navLinks = [
    { href: '/shop', label: 'Women' },
    { href: '/shop?category=mens', label: 'Men' },
    { href: '/shop?category=unstitched', label: 'Unstitched' },
    { href: '/shop?category=sale', label: 'Sale', highlight: true },
    { href: '/brands', label: 'Brands' },
  ]

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 border-b border-gray-100 ${
          scrolled ? 'bg-[#FAF7F2]/97 backdrop-blur-md shadow-sm' : 'bg-[#FAF7F2]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-[#C4622D] rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">BB</span>
            </div>
            <div>
              <div className="font-display text-xl font-semibold text-[#1C1C1E] leading-none">
                BB Valley
              </div>
              <div className="text-[9px] tracking-[0.18em] text-[#C4622D] uppercase leading-none mt-0.5">
                Pakistani Fashion
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors hover:text-[#C4622D] ${
                  l.highlight ? 'text-[#C4622D]' : 'text-[#1C1C1E]'
                } ${pathname === l.href ? 'text-[#C4622D]' : ''}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={onSearchOpen}
              className="w-10 h-10 rounded-full hover:bg-[#F0D5C8] transition-colors flex items-center justify-center"
            >
              <Search size={18} />
            </button>
            <Link
              href="/account"
              className="hidden sm:flex w-10 h-10 rounded-full hover:bg-[#F0D5C8] transition-colors items-center justify-center"
            >
              <User size={18} />
            </Link>
            <button
              onClick={onCartOpen}
              className="relative w-10 h-10 rounded-full bg-[#1C1C1E] hover:bg-[#C4622D] transition-colors flex items-center justify-center"
            >
              <ShoppingBag size={17} className="text-white" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-[#C4622D] border-2 border-[#FAF7F2] rounded-full text-[10px] text-white font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden w-10 h-10 rounded-full hover:bg-[#F0D5C8] transition-colors flex items-center justify-center"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 bg-black/40 z-[200] transition-opacity md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />
      <div
        className={`fixed top-0 left-0 bottom-0 w-72 bg-[#FAF7F2] z-[201] transition-transform duration-300 md:hidden flex flex-col ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#C4622D] rounded flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">BB</span>
            </div>
            <span className="font-display text-lg font-semibold text-[#1C1C1E]">BB Valley</span>
          </div>
          <button onClick={() => setMobileOpen(false)}>
            <X size={20} className="text-gray-400" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {[
            { href: '/', label: '🏠 Home' },
            { href: '/shop', label: '👗 All Products' },
            ...CATEGORIES.map(c => ({ href: `/shop?category=${c.slug}`, label: `${c.emoji} ${c.name}` })),
            { href: '/brands', label: '🏷️ Brands' },
            { href: '/about', label: 'ℹ️ About' },
            { href: '/contact', label: '📞 Contact' },
            { href: '/faq', label: '❓ FAQ' },
            { href: '/account', label: '👤 My Account' },
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2.5 text-sm font-medium text-[#1C1C1E] hover:text-[#C4622D] hover:bg-[#F0D5C8] rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <Link
            href="/shop?category=sale"
            className="block w-full text-center bg-[#C4622D] text-white py-3 text-sm font-bold rounded-sm"
          >
            🏷️ Shop Sale
          </Link>
        </div>
      </div>
    </>
  )
}

// ─── Cart Drawer ──────────────────────────────────────────────────────────────
function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore()
  const total = subtotal()
  const shipping = total >= 5000 ? 0 : 200

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[300] transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />
      <div
        className={`fixed top-0 right-0 bottom-0 w-[420px] max-w-full bg-[#FAF7F2] z-[301] flex flex-col shadow-2xl transition-transform duration-[350ms] ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-display text-2xl font-semibold text-[#1C1C1E]">
            Your Bag ({items.length})
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-gray-200 mb-4" />
              <p className="text-gray-400 text-sm">Your bag is empty</p>
              <button
                onClick={onClose}
                className="mt-4 text-[#C4622D] text-sm font-semibold"
              >
                Continue Shopping →
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.variantId} className="flex gap-3 pb-4 mb-4 border-b border-gray-100">
                <div
                  style={{
                    background: `linear-gradient(135deg, ${item.colorHex}33, ${item.colorHex}66)`,
                  }}
                  className="w-[72px] h-24 rounded-md flex items-center justify-center text-3xl flex-shrink-0"
                >
                  {item.imageEmoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-[#C4622D] uppercase tracking-widest font-semibold mb-0.5">
                    {item.brandName}
                  </p>
                  <p className="text-[13px] text-[#1C1C1E] leading-snug mb-1 line-clamp-2">
                    {item.productName}
                  </p>
                  <p className="text-[11px] text-gray-400 mb-2">
                    {item.size} · {item.color}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex border border-gray-200 rounded overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="w-7 h-7 flex items-center justify-center text-[13px] border-x border-gray-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                    <span className="text-[13px] font-bold">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.variantId)}
                  className="text-gray-300 hover:text-red-400 transition-colors self-start mt-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Shipping</span>
                <span className={shipping === 0 ? 'text-green-600 font-semibold' : 'font-medium'}>
                  {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-[11px] text-gray-400">
                  Add {formatPrice(5000 - total)} more for free shipping
                </p>
              )}
              <div className="flex justify-between pt-3 border-t border-gray-100">
                <span className="font-bold">Total</span>
                <span className="font-bold text-lg">{formatPrice(total + shipping)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full bg-[#C4622D] hover:bg-[#A3501F] text-white text-center py-4 text-sm font-bold rounded-sm transition-colors"
            >
              Proceed to Checkout →
            </Link>
            <p className="text-center text-[11px] text-gray-400 mt-3">
              🔒 Secure checkout · Cash on Delivery · Free returns
            </p>
          </div>
        )}
      </div>
    </>
  )
}

// ─── Search Modal ─────────────────────────────────────────────────────────────
function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('')
  const results = q.length > 1
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.brand.toLowerCase().includes(q.toLowerCase())
      )
    : []

  useEffect(() => { if (!open) setQ('') }, [open])
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        if (!open) onClose()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[400] transition-opacity ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />
      <div
        style={{ top: open ? '10%' : '6%' }}
        className={`fixed left-1/2 -translate-x-1/2 w-[min(640px,92vw)] bg-[#FAF7F2] rounded-xl z-[401] overflow-hidden shadow-2xl transition-all duration-200 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <Search size={18} className="text-gray-400 flex-shrink-0" />
          <input
            autoFocus={open}
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search brands, products, categories..."
            className="flex-1 bg-transparent text-[15px] outline-none text-[#1C1C1E] placeholder-gray-400"
          />
          <kbd className="text-[11px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded hidden sm:block">
            ESC
          </kbd>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {q.length > 1 && results.length === 0 && (
            <p className="text-center text-gray-400 text-sm py-8">
              No results for &quot;{q}&quot;
            </p>
          )}
          {results.map(p => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              onClick={onClose}
              className="flex items-center gap-4 px-5 py-3 hover:bg-[#F0EBE3] transition-colors"
            >
              <div
                style={{
                  background: `linear-gradient(135deg, ${p.colorHex}44, ${p.colorHex}88)`,
                }}
                className="w-11 h-14 rounded flex items-center justify-center text-2xl flex-shrink-0"
              >
                {p.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-[#C4622D] uppercase tracking-wider font-semibold">
                  {p.brand}
                </p>
                <p className="text-sm text-[#1C1C1E] truncate">{p.name}</p>
              </div>
              <span className="text-sm font-bold flex-shrink-0">{formatPrice(p.price)}</span>
            </Link>
          ))}
          {q.length === 0 && (
            <div className="p-5">
              <p className="text-[11px] tracking-widest uppercase text-gray-400 font-semibold mb-3">
                Trending
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Khaadi Lawn', 'Maria B Bridal',
                  'Sana Safinaz', 'Eid Collection', 'Gul Ahmed Summer',
                ].map(t => (
                  <button
                    key={t}
                    onClick={() => setQ(t)}
                    className="bg-gray-100 hover:bg-[#F0D5C8] text-[#5C5C5C] text-xs px-3.5 py-1.5 rounded-full transition-colors"
                  >
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

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#121212] text-[#FAF7F2] px-4 pt-14 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-[#C4622D] rounded flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">BB</span>
              </div>
              <span className="font-display text-lg font-semibold">BB Valley</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed mb-4">
              Pakistan&apos;s curated fashion destination. 7 premium brands, one store.
            </p>
            <a
              href="https://wa.me/923000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1fb855] text-white text-xs font-bold px-4 py-2 rounded-sm transition-colors"
            >
              💬 WhatsApp Us
            </a>
          </div>
          {[
            {
              title: 'Shop',
              links: [
                { l: 'All Products', h: '/shop' },
                { l: 'New Arrivals', h: '/shop' },
                { l: 'Sale', h: '/shop?category=sale' },
                { l: 'All Brands', h: '/brands' },
              ],
            },
            {
              title: 'Help',
              links: [
                { l: 'FAQ', h: '/faq' },
                { l: 'Returns & Exchanges', h: '/returns' },
                { l: 'Contact Us', h: '/contact' },
                { l: 'Size Guide', h: '/faq' },
              ],
            },
            {
              title: 'Company',
              links: [
                { l: 'About BB Valley', h: '/about' },
                { l: 'Privacy Policy', h: '/privacy' },
                { l: 'Terms & Conditions', h: '/terms' },
                { l: 'My Account', h: '/account' },
              ],
            },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-[11px] tracking-[0.12em] uppercase font-bold text-white/35 mb-4">
                {col.title}
              </h4>
              {col.links.map(l => (
                <Link
                  key={l.l}
                  href={l.h}
                  className="block text-[13px] text-white/55 hover:text-[#C4622D] transition-colors mb-2.5"
                >
                  {l.l}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[12px] text-white/25">
            © 2024 BB Valley · bluebunnyvalley.com · All rights reserved.
          </p>
          <div className="flex gap-4">
            {['Cash on Delivery', 'JazzCash', 'EasyPaisa'].map(p => (
              <span key={p} className="text-[10px] font-semibold text-white/20 tracking-wide">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Main Providers Component ─────────────────────────────────────────────────
export default function Providers({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { isDrawerOpen, closeDrawer } = useCartStore()
  const pathname = usePathname()

  // Sync cart store drawer state
  useEffect(() => {
    if (isDrawerOpen) setCartOpen(true)
  }, [isDrawerOpen])

  // Pages that should NOT show the nav (have their own header)
  const hideNav = pathname === '/checkout'

  return (
    <>
      {!hideNav && (
        <>
          <AnnouncementBar />
          <Header
            onCartOpen={() => setCartOpen(true)}
            onSearchOpen={() => setSearchOpen(true)}
          />
        </>
      )}

      {children}

      {!hideNav && <Footer />}

      <CartDrawer
        open={cartOpen}
        onClose={() => { setCartOpen(false); closeDrawer() }}
      />
      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  )
}