import { Suspense } from "react";
import HomeContent from "./home-content";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner Promo Rhezza Maun */}
      <div className="fixed top-16 left-0 w-full bg-primary/20 backdrop-blur-md border-b border-primary/30 py-2 z-40 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="text-sm font-bold text-primary px-8">
            🔥 PROMO VIP: Akses ribuan film premium tanpa batas! Hubungi Rhezza Maun (0812-4551-1900) untuk aktivasi voucher instan 🔥
          </span>
          <span className="text-sm font-bold text-primary px-8">
            🚀 Nonton lancar tanpa iklan hanya di MAUN.NET.MOVIE - Hubungi Rhezza Maun sekarang! 🚀
          </span>
          {/* Teks duplikat agar jalan terus tanpa putus */}
          <span className="text-sm font-bold text-primary px-8">
            🔥 PROMO VIP: Akses ribuan film premium tanpa batas! Hubungi Rhezza Maun (0812-4551-1900) untuk aktivasi voucher instan 🔥
          </span>
          <span className="text-sm font-bold text-primary px-8">
            🚀 Nonton lancar tanpa iklan hanya di MAUN.NET.MOVIE - Hubungi Rhezza Maun sekarang! 🚀
          </span>
        </div>
      </div>

      <Suspense fallback={<div className="min-h-screen pt-24 flex items-center justify-center"><div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
        <div className="pt-10"> {/* Memberi jarak agar tidak tertutup banner */}
          <HomeContent />
        </div>
      </Suspense>
    </div>
  );
}
