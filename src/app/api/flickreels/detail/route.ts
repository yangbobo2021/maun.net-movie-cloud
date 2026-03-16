export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id") || "";
  const voucher = searchParams.get("voucher") || "";
  
  const pathParts = request.nextUrl.pathname.split('/');
  const folder = pathParts[3];
  const UPSTREAM_API = `https://api.sansekai.my.id/api/${folder}/detail`;

  try {
    const response = await fetch(`${UPSTREAM_API}?id=${id}&voucher=${voucher}`, {
      cache: 'no-store',
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
