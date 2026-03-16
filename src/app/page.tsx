import { Suspense } from "react";
import HomeContent from "./home-content";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Kode Animasi Langsung - Cara Paling Manjur */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-rhezza {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-rhezza {
          display: inline-flex;
          animation: marquee-rhezza 25s linear infinite !important;
        }
      `}} />

      {/* Banner Promo - Fixed position di bawah Navbar */}
      <div className="fixed top-16 left-0 w-full bg-[#1a1625]/80 backdrop-blur-md border-y border-primary/30 py-2 z-50 overflow-hidden">
        <div className="animate-rhezza whitespace-nowrap">
          <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-primary px-10">
            🔥 PROMO VIP: Akses ribuan film premium tanpa batas! HANYA 2000 PER-HARI!!!! Hubungi Rhezza Maun  (0812-4551-1900) untuk aktivasi voucher instan 🔥
          </span>
          <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-primary px-10">
            🚀 Nonton lancar tanpa iklan hanya di MAUN.NET.MOVIE - Hubungi Rhezza Maun sekarang! 🚀
          </span>
          {/* Duplikat Teks */}
          <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-primary px-10">
            🔥 PROMO VIP: Akses ribuan film premium tanpa batas! HANYA 2000 PER-HARI!!!! Hubungi Rhezza Maun (0812-4551-1900) untuk aktivasi voucher instan 🔥
          </span>
          <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-primary px-10">
            🚀 Nonton lancar tanpa iklan hanya di MAUN.NET.MOVIE - Hubungi Rhezza Maun sekarang! 🚀
          </span>
        </div>
      </div>

      <Suspense fallback={
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        {/* Padding top agar konten tidak tertutup banner */}
        <div className="pt-24 md:pt-20"> 
          <HomeContent />
        </div>
      </Suspense>
    </div>
  );
}
