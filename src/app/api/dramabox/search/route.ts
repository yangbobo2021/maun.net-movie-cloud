export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";

// Alamat API asli kamu
const UPSTREAM_API = "https://api.sansekai.my.id/api/dramabox/search"; 

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("query");
  const voucher = searchParams.get("voucher") || ""; // Ini untuk menangkap voucher

  if (!query) {
    return NextResponse.json({ error: "Query required" }, { status: 400 });
  }

  try {
    // Memanggil API dengan query dan voucher
    const response = await fetch(${UPSTREAM_API}?query=${encodeURIComponent(query)}&voucher=${voucher}, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch data" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
