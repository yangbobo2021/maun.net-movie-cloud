"use client";

import { Suspense, useState, useEffect } from "react";
import HomeContent from "./home-content";
import { X, MessageCircle, Ticket } from "lucide-react";

export default function HomePage() {
  const [showPopup, setShowPopup] = useState(false);

  // Munculkan popup setelah 2 detik halaman dibuka
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
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

      {/* 1. Banner Running Text */}
      <div className="fixed top-16 left-0 w-full bg-[#1a1625]/90 backdrop-blur-md border-y border-primary/30 py-2 z-40 overflow-hidden">
        <div className="animate-rhezza whitespace-nowrap">
          <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-primary px-10">
            🔥 PROMO VIP: Akses ribuan film premium tanpa batas! HANYA 2000 PER-HARI!!! Hubungi Rhezza Maun (0812-4551-1900) 🔥
          </span>
          <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-primary px-10">
            🚀 Nonton lancar tanpa iklan hanya di MAUN.NET.MOVIE 🚀
          </span>
          <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-primary px-10">
            🔥 PROMO VIP: Akses ribuan film premium tanpa batas! HANYA 2000 PER-HARI!!! Hubungi Rhezza Maun (0812-4551-1900) 🔥
          </span>
        </div>
      </div>

      {/* 2. Pop-up Selamat Datang */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-sm glass-strong p-8 rounded-[2rem] shadow-2xl border border-primary/30 text-center space-y-6">
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto rotate-12">
              <Ticket className="w-10 h-10 text-primary -rotate-12" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-display gradient-text">Selamat Datang!</h2>
              <p className="text-sm text-muted-foreground">
                Dapatkan akses **VIP Member** untuk menonton semua film Short Drama terlengkap tanpa gangguan iklan HANYA 2000 PER-HARI!!!.
              </p>
            </div>

            <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
              <p className="text-xs text-primary font-bold uppercase tracking-tighter">Admin Aktif</p>
              <p className="text-lg font-mono">0812-4551-1900</p>
            </div>

            <a 
              href="https://wa.me/6281245511900?text=Halo%20Rhezza%20Maun,%20saya%20mau%20aktivasi%20Voucher%20VIP"
              target="_blank"
              className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] text-white rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Beli Voucher Sekarang
            </a>
          </div>
        </div>
      )}

      {/* 3. Konten Utama */}
      <Suspense fallback={
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <div className="pt-28 md:pt-24"> 
          <HomeContent />
        </div>
      </Suspense>
    </div>
  );
}
