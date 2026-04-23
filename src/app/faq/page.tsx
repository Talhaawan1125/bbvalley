'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    category: 'Orders',
    items: [
      { q: 'How do I place an order?', a: 'Browse our products, add items to your bag, then proceed to checkout. Fill in your delivery details and confirm your order. You will receive an SMS confirmation shortly after.' },
      { q: 'Can I modify or cancel my order?', a: 'You can cancel or modify your order within 2 hours of placing it. Please WhatsApp us immediately at +92 300 0000000 with your order number.' },
      { q: 'How will I know my order is confirmed?', a: 'You will receive an SMS on your registered phone number as soon as your order is confirmed. We may also call you to verify before dispatch.' },
    ],
  },
  {
    category: 'Shipping & Delivery',
    items: [
      { q: 'How long does delivery take?', a: 'Standard delivery takes 3–5 business days across Pakistan. Major cities like Karachi, Lahore, Islamabad may receive orders in 2–3 days.' },
      { q: 'Is Cash on Delivery available?', a: 'Yes! Cash on Delivery (COD) is available across Pakistan. Pay the delivery rider when your order arrives — no advance payment needed.' },
      { q: 'Is delivery free?', a: 'Delivery is FREE on all orders above PKR 5,000. For orders below PKR 5,000, a flat shipping fee of PKR 200 applies.' },
      { q: 'Do you deliver to all cities in Pakistan?', a: 'Yes, we deliver to all major and minor cities across Pakistan including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta and more.' },
    ],
  },
  {
    category: 'Returns & Exchanges',
    items: [
      { q: 'What is your return policy?', a: 'We offer a 7-day return policy from the date of delivery. Items must be unworn, unwashed, and in original packaging with tags attached.' },
      { q: 'How do I return an item?', a: 'WhatsApp us at +92 300 0000000 with your order number and reason for return. We will arrange a pickup from your address.' },
      { q: 'When will I receive my refund?', a: 'Refunds are processed within 5–7 business days after we receive and inspect the returned item. Refunds are issued via bank transfer.' },
      { q: 'Can I exchange for a different size?', a: 'Yes! Size exchanges are accepted within 7 days. Contact us with your order number and desired size. Exchanges are subject to availability.' },
    ],
  },
  {
    category: 'Products',
    items: [
      { q: 'Are all products authentic?', a: 'Absolutely. BB Valley only stocks 100% authentic products sourced directly from official brand partners. We have zero tolerance for counterfeits.' },
      { q: 'How do I find the right size?', a: 'Each product page has a Size Guide button with detailed measurements. When in doubt, we recommend sizing up for unstitched fabrics.' },
      { q: 'Are unstitched products stitched before delivery?', a: 'No — unstitched products are delivered as fabric. You can take them to your local tailor to get stitched to your exact measurements.' },
    ],
  },
]

export default function FAQPage() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div style={{ background: 'linear-gradient(135deg, #1C1C1E 0%, #3D2B1F 100%)' }}
        className="px-4 py-20 text-center">
        <p className="text-[11px] tracking-[0.2em] uppercase text-[#C4622D] font-semibold mb-3">Help Center</p>
        <h1 className="font-display text-5xl font-semibold text-[#FAF7F2] mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-[#FAF7F2]/55 text-sm max-w-md mx-auto">
          Find answers to the most common questions about BB Valley.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-12">
        {FAQS.map(section => (
          <div key={section.category}>
            <h2 className="font-display text-2xl font-semibold text-[#1C1C1E] mb-4 pb-3 border-b border-gray-100">
              {section.category}
            </h2>
            <div className="space-y-1">
              {section.items.map(faq => {
                const key = section.category + faq.q
                return (
                  <div key={key} className="border-b border-gray-100">
                    <button
                      onClick={() => setOpen(open === key ? null : key)}
                      className="w-full flex items-center justify-between py-4 text-left text-sm font-semibold text-[#1C1C1E] hover:text-[#C4622D] transition-colors"
                    >
                      {faq.q}
                      <ChevronDown
                        size={16}
                        className={`flex-shrink-0 ml-4 text-gray-400 transition-transform ${open === key ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {open === key && (
                      <p className="pb-4 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Still need help */}
        <div className="bg-[#1C1C1E] rounded-2xl p-8 text-center">
          <h3 className="font-display text-2xl font-semibold text-[#FAF7F2] mb-2">Still need help?</h3>
          <p className="text-[#FAF7F2]/50 text-sm mb-6">Our team is ready to assist you.</p>
          <a
            href="https://wa.me/923000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#25D366] hover:bg-[#1fb855] text-white px-8 py-3.5 text-sm font-bold rounded-sm transition-colors"
          >
            💬 WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  )
}