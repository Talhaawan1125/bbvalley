export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Use service role to bypass RLS for writing orders
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function generateOrderNumber(): string {
  const year = new Date().getFullYear()
  const random = Math.floor(10000 + Math.random() * 90000)
  return `BBV-${year}-${random}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      customerName,
      customerEmail,
      customerPhone,
      address,
      city,
      province,
      zip,
      notes,
      items,
      subtotal,
      shippingAmount,
      total,
    } = body

    // Validate required fields
    if (!customerName || !customerPhone || !address || !city || !items?.length) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const orderNumber = generateOrderNumber()

    const { data, error } = await supabase
      .from('orders')
      .insert({
        order_number:   orderNumber,
        customer_name:  customerName,
        customer_email: customerEmail || null,
        customer_phone: customerPhone,
        address,
        city,
        province:       province || null,
        zip:            zip || null,
        notes:          notes || null,
        items,
        subtotal,
        shipping_amount: shippingAmount,
        discount_amount: 0,
        total,
        status:          'confirmed',
        payment_method:  'cod',
        payment_status:  'pending',
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save order' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      orderNumber,
      orderId: data.id,
    })

  } catch (err) {
    console.error('Order API error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}