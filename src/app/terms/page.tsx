// ================================================================
// FILE: src/app/terms/page.tsx
// HOW: src/app → New Folder "terms" → New File "page.tsx"
// ================================================================

export default function TermsPage() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: 'By accessing and using BB Valley (bluebunnyvalley.com), you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website.',
    },
    {
      title: 'Products & Pricing',
      content: `All products listed on BB Valley are authentic items sourced from official brand partners, priced in Pakistani Rupees (PKR), and subject to availability. We reserve the right to change prices at any time. The price shown at checkout is the final price.`,
    },
    {
      title: 'Orders & Payment',
      content: `When you place an order you will receive an SMS confirmation. Our team may call to verify before dispatch. Cash on Delivery (COD) means you pay when the order arrives. We reserve the right to cancel orders due to stock issues or suspicious activity.`,
    },
    {
      title: 'Shipping',
      content: `Delivery timelines are estimates and may vary due to location, holidays, or courier delays. BB Valley is not liable for delays caused by third-party courier services. Free shipping is applied automatically on orders above PKR 5,000.`,
    },
    {
      title: 'Returns & Refunds',
      content: 'Returns are accepted within 7 days of delivery for eligible items. Please refer to our Returns Policy page for full details. Refunds are processed within 5–7 business days after receiving the returned item.',
    },
    {
      title: 'Intellectual Property',
      content: 'All content on BB Valley including logos, product images, text, and design is the property of BB Valley or respective brand owners. You may not copy, reproduce, or use this content without written permission.',
    },
    {
      title: 'Limitation of Liability',
      content: 'BB Valley shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products. Our maximum liability is limited to the value of the order in question.',
    },
    {
      title: 'Governing Law',
      content: 'These Terms are governed by the laws of Pakistan. Any disputes shall be subject to the jurisdiction of courts in Lahore, Pakistan.',
    },
    {
      title: 'Contact',
      content: 'For any questions about these Terms, contact us at hello@bluebunnyvalley.com or WhatsApp +92 300 0000000.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div
        style={{ background: 'linear-gradient(135deg, #1C1C1E 0%, #3D2B1F 100%)' }}
        className="px-4 py-20 text-center"
      >
        <p className="text-[11px] tracking-[0.2em] uppercase text-[#C4622D] font-semibold mb-3">Legal</p>
        <h1 className="font-display text-5xl font-semibold text-[#FAF7F2] mb-3">Terms & Conditions</h1>
        <p className="text-[#FAF7F2]/40 text-sm">Last updated: January 2024</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-6">
        {sections.map(s => (
          <div key={s.title} className="bg-white rounded-xl p-6 border border-gray-100">
            <h2 className="font-display text-xl font-semibold text-[#1C1C1E] mb-3">{s.title}</h2>
            <p className="text-sm text-gray-500 leading-relaxed">{s.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}