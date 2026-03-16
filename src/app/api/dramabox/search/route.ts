export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("query") || "";
  const voucher = searchParams.get("voucher") || "";
  
  // 1. CEK VOUCHER: Jika kosong, langsung tampilkan pesan jualan kamu
  if (!voucher || voucher.length < 2) {
    return NextResponse.json({ 
      error: "Voucher Required", 
      message: "Akses Ditolak! Untuk Beli Voucher silakan hubungi: Rhezza Maun. No WhatsApp: 081245511900" 
    }, { status: 403 });
  }

  const pathParts = request.nextUrl.pathname.split('/');
  const folder = pathParts[3]; 
  const UPSTREAM_API = `https://api.sansekai.my.id/api/${folder}/search`;

  try {
    const response = await fetch(`${UPSTREAM_API}?query=${encodeURIComponent(query)}&voucher=${voucher}`, {
      cache: 'no-store',
    });
    
    const data = await response.json();

    // 2. CEK RESPON API: Jika voucher salah/expired dari pusat
    if (data.status === "failed" || data.error) {
      return NextResponse.json({ 
        error: "Invalid Voucher", 
        message: "Voucher salah/expired. Hubungi Rhezza Maun (081245511900) untuk perpanjang." 
      }, { status: 403 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
