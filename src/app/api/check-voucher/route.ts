import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { kode } = await request.json()
    
    // Ini bagian yang ngecek ke database 'redis-red-globe' kamu
    const status = await kv.get(kode)

    if (status === 'aktif') {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Voucher tidak valid' }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}
