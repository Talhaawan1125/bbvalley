import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  variantId: string
  productId: string
  productName: string
  brandName: string
  slug: string
  imageEmoji: string
  colorHex: string
  size: string
  color: string
  price: number
  quantity: number
}

interface CartStore {
  items: CartItem[]
  isDrawerOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, qty: number) => void
  clearCart: () => void
  openDrawer: () => void
  closeDrawer: () => void
  totalItems: () => number
  subtotal: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      addItem: (newItem) => set((state) => {
        const existing = state.items.find(i => i.variantId === newItem.variantId)
        if (existing) {
          return {
            items: state.items.map(i =>
              i.variantId === newItem.variantId
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
            isDrawerOpen: true,
          }
        }
        return { items: [...state.items, newItem], isDrawerOpen: true }
      }),

      removeItem: (variantId) => set((state) => ({
        items: state.items.filter(i => i.variantId !== variantId),
      })),

      updateQuantity: (variantId, qty) => set((state) => ({
        items: qty <= 0
          ? state.items.filter(i => i.variantId !== variantId)
          : state.items.map(i => i.variantId === variantId ? { ...i, quantity: qty } : i),
      })),

      clearCart: () => set({ items: [] }),
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      totalItems: () => get().items.reduce((s, i) => s + i.quantity, 0),
      subtotal: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),
    }),
    { name: 'bbvalley-cart', skipHydration: true }
  )
)