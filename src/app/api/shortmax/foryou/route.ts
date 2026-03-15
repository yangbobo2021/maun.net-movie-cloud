export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";

const UPSTREAM_API = "https://api.sansekai.my.id/api/shortmax/hls"; 

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const url = searchParams.get("url"); // Biasanya HLS butuh parameter URL video

  if (!url) return NextResponse.json({ error: "URL required" }, { status: 400 });

  try {
    const response = await fetch(${UPSTREAM_API}?url=${encodeURIComponent(url)}, {
      cache: 'no-store',
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching HLS" }, { status: 500 });
  }
}
