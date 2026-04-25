export default function PrivacyPage() {
  const sections = [
    {
      title: 'Information We Collect',
      content: `When you place an order or create an account on BB Valley, we collect:
- Name, email address, and phone number
- Delivery address and city
- Order history and preferences
- Device and browser information for site improvement
 
We do NOT collect or store credit card information. All payments are handled by secure third-party processors.`,
    },
    {
      title: 'How We Use Your Information',
      content: `Your information is used to:
- Process and deliver your orders
- Send order confirmation and shipping updates via SMS/email
- Improve our website and product selection
- Send promotional offers (only if you opt in)
- Respond to customer service requests
 
We never sell your personal information to third parties.`,
    },
    {
      title: 'Order Communications',
      content: `After placing an order, you will receive:
- An SMS confirmation with your order number
- A delivery update when your order is shipped
- A call from our team if there is any issue with your order
 
You can opt out of promotional messages at any time by contacting us.`,
    },
    {
      title: 'Data Security',
      content: `BB Valley takes data security seriously:
- All data is transmitted over secure HTTPS connections
- We use industry-standard encryption to protect your information
- Access to customer data is restricted to authorized staff only
- We regularly review our security practices`,
    },
    {
      title: 'Cookies',
      content: `We use cookies to:
- Remember your cart items between visits
- Understand how visitors use our website
- Improve your shopping experience
 
You can disable cookies in your browser settings, but this may affect site functionality.`,
    },
    {
      title: 'Your Rights',
      content: `You have the right to:
- Access the personal information we hold about you
- Request correction of inaccurate information
- Request deletion of your account and data
- Opt out of marketing communications
 
To exercise these rights, contact us at hello@bluebunnyvalley.com`,
    },
    {
      title: 'Contact Us',
      content: `For any privacy concerns or questions:
 
Email: hello@bluebunnyvalley.com
WhatsApp: +92 300 0000000
Website: bluebunnyvalley.com/contact`,
    },
  ]
 
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div
        style={{ background: 'linear-gradient(135deg, #1C1C1E 0%, #3D2B1F 100%)' }}
        className="px-4 py-20 text-center"
      >
        <p className="text-[11px] tracking-[0.2em] uppercase text-[#C4622D] font-semibold mb-3">Legal</p>
        <h1 className="font-display text-5xl font-semibold text-[#FAF7F2] mb-3">Privacy Policy</h1>
        <p className="text-[#FAF7F2]/40 text-sm">Last updated: January 2024</p>
      </div>
 
      <div className="max-w-3xl mx-auto px-4 py-16 space-y-6">
        <div className="bg-[#F0D5C8] rounded-xl p-5 border border-[#C4622D]/20">
          <p className="text-sm text-[#C4622D] leading-relaxed">
            <strong>Summary:</strong> BB Valley collects only the information needed to process your orders
            and deliver a great shopping experience. We never sell your data. You can contact us
            anytime to access or delete your information.
          </p>
        </div>
 
        {sections.map(s => (
          <div key={s.title} className="bg-white rounded-xl p-6 border border-gray-100">
            <h2 className="font-display text-xl font-semibold text-[#1C1C1E] mb-3">{s.title}</h2>
            <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">{s.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}