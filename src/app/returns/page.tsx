// ================================================
// RETURNS PAGE — src/app/returns/page.tsx
// ================================================

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div style={{ background: 'linear-gradient(135deg, #1C1C1E 0%, #3D2B1F 100%)' }}
        className="px-4 py-20 text-center">
        <p className="text-[11px] tracking-[0.2em] uppercase text-[#C4622D] font-semibold mb-3">Policies</p>
        <h1 className="font-display text-5xl font-semibold text-[#FAF7F2] mb-4">Returns & Exchanges</h1>
        <p className="text-[#FAF7F2]/55 text-sm">Last updated: January 2024</p>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-16 space-y-8">
        {[
          {
            title: '7-Day Return Policy',
            content: 'BB Valley offers a 7-day return window from the date of delivery. If you are not completely satisfied with your purchase, you may return it for a refund or exchange.',
          },
          {
            title: 'Return Conditions',
            content: 'Items must be: unworn and unwashed, in original packaging with all tags attached, free from perfume, stains or damage, accompanied by original receipt or order number. Items that do not meet these conditions will not be accepted.',
          },
          {
            title: 'How to Return',
            content: '1. WhatsApp us at +92 300 0000000 with your order number and reason for return. 2. Our team will verify eligibility within 24 hours. 3. A pickup will be arranged from your address. 4. Once received and inspected, your refund will be processed.',
          },
          {
            title: 'Refund Timeline',
            content: 'Refunds are processed within 5–7 business days after we receive and inspect the returned item. Refunds are issued via bank transfer to your provided account.',
          },
          {
            title: 'Exchanges',
            content: 'Size or color exchanges are accepted within 7 days, subject to stock availability. To request an exchange, WhatsApp us with your order number and desired replacement.',
          },
          {
            title: 'Non-Returnable Items',
            content: 'The following items cannot be returned: sale/clearance items marked as final sale, items that have been stitched or altered, intimate wear for hygiene reasons, and gift cards.',
          },
        ].map(s => (
          <div key={s.title} className="bg-white rounded-xl p-6 border border-gray-100">
            <h2 className="font-display text-xl font-semibold text-[#1C1C1E] mb-3">{s.title}</h2>
            <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">{s.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}