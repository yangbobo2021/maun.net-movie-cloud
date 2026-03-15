export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";

const UPSTREAM_API = "https://api.sansekai.my.id/api/flickreels/foryou"; 

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const voucher = searchParams.get("voucher") || ""; 

  try {
    const response = await fetch(${UPSTREAM_API}?voucher=${voucher}, {
      cache: 'no-store',
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
