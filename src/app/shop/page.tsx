'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { SlidersHorizontal, X, ChevronDown, Search } from 'lucide-react'
import { PRODUCTS, BRANDS, CATEGORIES } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { Heart } from 'lucide-react'

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
          style={{ background: `linear-gradient(135deg, ${p.colorHex}33, ${p.colorHex}88)`, transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.3s ease' }}
          className="w-full h-full flex items-center justify-center text-7xl"
        >{p.emoji}</div>

        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          <span style={{ background: badgeColor[p.badge] || '#9E9E9E' }} className="text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm">{p.badge}</span>
          {discount && <span className="bg-[#1C1C1E] text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm">-{discount}%</span>}
        </div>

        <button onClick={() => setWishlisted(!wishlisted)}
          style={{ opacity: hovered ? 1 : 0 }}
          className="absolute top-2.5 right-2.5 w-8 h-8 bg-white rounded-full flex items-center justify-center transition-opacity shadow-sm">
          <Heart size={14} className={wishlisted ? 'fill-[#C4622D] stroke-[#C4622D]' : 'stroke-[#1C1C1E]'} />
        </button>

        <button
          onClick={() => addItem({ variantId: p.id + '-default', productId: p.id, productName: p.name, brandName: p.brand, slug: p.slug, imageEmoji: p.emoji, colorHex: p.colorHex, size: p.sizes[0], color: p.color, price: p.price, quantity: 1 })}
          style={{ transform: hovered ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.2s ease' }}
          className="absolute bottom-0 left-0 right-0 bg-[#1C1C1E] hover:bg-[#C4622D] text-white text-[13px] font-semibold py-3 text-center transition-colors">
          Quick Add
        </button>
      </div>
      <div className="mt-3">
        <p className="text-[10px] tracking-[0.15em] uppercase text-[#C4622D] font-semibold mb-1">{p.brand}</p>
        <Link href={`/products/${p.slug}`} className="text-[13px] text-[#1C1C1E] leading-snug hover:text-[#C4622D] transition-colors line-clamp-2 block">{p.name}</Link>
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

// ── Filter Sidebar ────────────────────────────────────────────────────────────
function FilterSidebar({ filters, setFilters, onClose }: {
  filters: any; setFilters: any; onClose?: () => void
}) {
  return (
    <div className="space-y-6">
      {onClose && (
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <h3 className="font-display text-xl font-semibold">Filters</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><X size={14} /></button>
        </div>
      )}

      {/* Brand */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Brand</h4>
        <div className="space-y-2">
          {BRANDS.map(b => (
            <label key={b.slug} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="checkbox"
                checked={filters.brands.includes(b.slug)}
                onChange={() => setFilters((f: any) => ({
                  ...f,
                  brands: f.brands.includes(b.slug)
                    ? f.brands.filter((x: string) => x !== b.slug)
                    : [...f.brands, b.slug]
                }))}
                className="w-4 h-4 rounded border-gray-300 accent-[#C4622D]"
              />
              <span className="text-sm text-[#1C1C1E] group-hover:text-[#C4622D] transition-colors">{b.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Category</h4>
        <div className="space-y-2">
          {CATEGORIES.map(c => (
            <label key={c.slug} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="checkbox"
                checked={filters.categories.includes(c.slug)}
                onChange={() => setFilters((f: any) => ({
                  ...f,
                  categories: f.categories.includes(c.slug)
                    ? f.categories.filter((x: string) => x !== c.slug)
                    : [...f.categories, c.slug]
                }))}
                className="w-4 h-4 rounded border-gray-300 accent-[#C4622D]"
              />
              <span className="text-sm text-[#1C1C1E] group-hover:text-[#C4622D] transition-colors">{c.emoji} {c.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Max Price</h4>
        <input type="range" min={0} max={50000} step={500}
          value={filters.maxPrice}
          onChange={e => setFilters((f: any) => ({ ...f, maxPrice: +e.target.value }))}
          className="w-full accent-[#C4622D]"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>PKR 0</span>
          <span className="text-[#C4622D] font-semibold">{formatPrice(filters.maxPrice)}</span>
        </div>
      </div>

      {/* Sale only */}
      <div>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input type="checkbox"
            checked={filters.saleOnly}
            onChange={() => setFilters((f: any) => ({ ...f, saleOnly: !f.saleOnly }))}
            className="w-4 h-4 rounded border-gray-300 accent-[#C4622D]"
          />
          <span className="text-sm font-medium text-[#1C1C1E]">🏷️ Sale items only</span>
        </label>
      </div>

      {/* Reset */}
      <button onClick={() => setFilters({ brands: [], categories: [], maxPrice: 50000, saleOnly: false, search: '' })}
        className="w-full border border-gray-200 text-sm text-gray-500 hover:border-[#C4622D] hover:text-[#C4622D] py-2.5 rounded transition-colors">
        Reset All Filters
      </button>
    </div>
  )
}

// ── Main Shop Page ────────────────────────────────────────────────────────────
export default function ShopPage() {
  const [filters, setFilters] = useState({
    brands: [] as string[],
    categories: [] as string[],
    maxPrice: 50000,
    saleOnly: false,
    search: '',
  })
  const [sort, setSort] = useState('newest')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    let result = [...PRODUCTS]
    if (filters.brands.length > 0) result = result.filter(p => filters.brands.includes(p.brandSlug))
    if (filters.categories.length > 0) result = result.filter(p => filters.categories.includes(p.category))
    result = result.filter(p => p.price <= filters.maxPrice)
    if (filters.saleOnly) result = result.filter(p => p.comparePrice)
    if (filters.search) result = result.filter(p =>
      p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.brand.toLowerCase().includes(filters.search.toLowerCase())
    )
    if (sort === 'price-low') result.sort((a, b) => a.price - b.price)
    if (sort === 'price-high') result.sort((a, b) => b.price - a.price)
    if (sort === 'sale') result.sort((a, b) => (b.comparePrice ? 1 : 0) - (a.comparePrice ? 1 : 0))
    return result
  }, [filters, sort])

  const activeFilterCount = filters.brands.length + filters.categories.length + (filters.saleOnly ? 1 : 0) + (filters.maxPrice < 50000 ? 1 : 0)

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <div className="bg-[#FAF7F2] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <Link href="/" className="hover:text-[#C4622D] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#1C1C1E]">Shop</span>
          </div>
          <h1 className="font-display text-4xl font-semibold text-[#1C1C1E]">All Products</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search + Sort bar */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text" placeholder="Search products or brands..."
              value={filters.search}
              onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#C4622D] bg-white transition-colors"
            />
          </div>
          <button onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 border border-gray-200 bg-white px-4 py-2.5 rounded-lg text-sm font-medium hover:border-[#C4622D] transition-colors">
            <SlidersHorizontal size={16} />
            Filters {activeFilterCount > 0 && <span className="bg-[#C4622D] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{activeFilterCount}</span>}
          </button>
          <div className="relative">
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="appearance-none border border-gray-200 bg-white pl-4 pr-9 py-2.5 rounded-lg text-sm font-medium outline-none focus:border-[#C4622D] cursor-pointer transition-colors">
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="sale">On Sale</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Active filters chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {filters.brands.map(b => (
              <span key={b} className="flex items-center gap-1.5 bg-[#F0D5C8] text-[#C4622D] text-xs font-medium px-3 py-1 rounded-full">
                {BRANDS.find(br => br.slug === b)?.name}
                <button onClick={() => setFilters(f => ({ ...f, brands: f.brands.filter(x => x !== b) }))}><X size={11} /></button>
              </span>
            ))}
            {filters.saleOnly && (
              <span className="flex items-center gap-1.5 bg-[#F0D5C8] text-[#C4622D] text-xs font-medium px-3 py-1 rounded-full">
                Sale Only <button onClick={() => setFilters(f => ({ ...f, saleOnly: false }))}><X size={11} /></button>
              </span>
            )}
          </div>
        )}

        <div className="flex gap-8">
          {/* Sidebar — desktop */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </aside>

          {/* Grid */}
          <main className="flex-1 min-w-0">
            <p className="text-sm text-gray-400 mb-5">{filtered.length} products</p>
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-gray-400 text-sm">No products match your filters.</p>
                <button onClick={() => setFilters({ brands: [], categories: [], maxPrice: 50000, saleOnly: false, search: '' })}
                  className="mt-4 text-[#C4622D] text-sm font-semibold">Clear filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map(p => <ProductCard key={p.id} p={p} />)}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <>
        <div onClick={() => setMobileFiltersOpen(false)}
          className={`fixed inset-0 bg-black/40 z-[200] transition-opacity lg:hidden ${mobileFiltersOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} />
        <div className={`fixed top-0 left-0 bottom-0 w-80 bg-[#FAF7F2] z-[201] p-6 overflow-y-auto transition-transform lg:hidden ${mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <FilterSidebar filters={filters} setFilters={setFilters} onClose={() => setMobileFiltersOpen(false)} />
        </div>
      </>
    </div>
  )
}