"use client";

import { useDramaDetail } from "@/hooks/useDramaDetail";
import { Play, ChevronLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

export default function FlickReelsDetailPage() {
  const params = useParams<{ bookId: string }>();
  const id = params.bookId;
  const router = useRouter();
  const { data, isLoading, error } = useDramaDetail(id || "");

  if (isLoading) return <div className="min-h-screen pt-24 text-center">Memuat FlickReels...</div>;

  let book: any = data && (data.bookId ? data : data.data?.book);

  if (error || !book) {
    const waLink = "https://wa.me/6281245511900?text=Halo%20Rhezza%20Maun,%20saya%20mau%20beli%20voucher%20FlickReels";
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <div className="max-w-md w-full glass p-8 rounded-3xl text-center space-y-6 shadow-2xl border border-primary/20">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto"><Play className="w-10 h-10 text-primary fill-current" /></div>
          <h1 className="text-2xl font-bold font-display">FlickReels Premium</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">Konten ini memerlukan voucher. Silakan hubungi Rhezza Maun untuk aktivasi.</p>
          <a href={waLink} target="_blank" className="w-full py-4 rounded-full bg-[#25D366] text-white font-bold flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-transform"><MessageCircle className="w-5 h-5" />Beli Voucher via WA</a>
          <button onClick={() => router.push('/')} className="w-full py-3 text-muted-foreground text-sm hover:text-foreground">Kembali ke Beranda</button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button onClick={() => router.back()} className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground"><ChevronLeft className="w-5 h-5" />Kembali</button>
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          <img src={book.coverWap || book.cover} className="w-full rounded-2xl shadow-2xl" alt={book.bookName} />
          <div className="space-y-6">
            <h1 className="text-4xl font-bold gradient-text">{book.bookName}</h1>
            <div className="glass rounded-xl p-4"><h3 className="font-semibold mb-2">Sinopsis</h3><p className="text-muted-foreground">{book.introduction}</p></div>
            <Link href={`/watch/flickreels/${id}`} className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-primary-foreground shadow-lg hover:scale-105 transition-all" style={{ background: "var(--gradient-primary)" }}>
              <Play className="w-5 h-5 fill-current" />Mulai Menonton
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
