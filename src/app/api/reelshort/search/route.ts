export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("query") || "";
  const voucher = searchParams.get("voucher") || "";
  
  const pathParts = request.nextUrl.pathname.split('/');
  const folder = pathParts[3]; 
  const UPSTREAM_API = `https://api.sansekai.my.id/api/${folder}/search`;

  try {
    const response = await fetch(`${UPSTREAM_API}?query=${encodeURIComponent(query)}&voucher=${voucher}`, {
      cache: 'no-store',
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
