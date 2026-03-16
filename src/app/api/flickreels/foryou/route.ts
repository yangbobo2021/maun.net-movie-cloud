export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const voucher = searchParams.get("voucher") || "";
  
  // PROTEKSI VOUCHER
  if (!voucher || voucher.length < 2) {
    return NextResponse.json({ 
      error: "Voucher Required", 
      message: "Akses Ditolak! Untuk Beli Voucher silakan hubungi: Rhezza Maun. No WhatsApp: 081245511900" 
    }, { status: 403 });
  }

  const pathParts = request.nextUrl.pathname.split('/');
  const folder = pathParts[3];
  const UPSTREAM_API = `https://api.sansekai.my.id/api/${folder}/foryou`;

  try {
    const response = await fetch(`${UPSTREAM_API}?voucher=${voucher}`, {
      cache: 'no-store',
    });
    const data = await response.json();
    
    if (data.status === "failed" || data.error) {
      return NextResponse.json({ error: "Invalid Voucher", message: "Voucher salah/expired. Hubungi Rhezza Maun (081245511900)." }, { status: 403 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
