"use client";

import { useDramaDetail } from "@/hooks/useDramaDetail";
import { Play, Calendar, ChevronLeft, MessageCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import type { DramaDetailDirect, DramaDetailResponseLegacy } from "@/types/drama";

function isDirectFormat(data: unknown): data is DramaDetailDirect {
  return data !== null && typeof data === 'object' && 'bookId' in data && 'coverWap' in data;
}

function isLegacyFormat(data: unknown): data is DramaDetailResponseLegacy {
  return data !== null && typeof data === 'object' && 'data' in data && (data as DramaDetailResponseLegacy).data?.book !== undefined;
}

export default function ShortMaxDetailPage() {
  // DISESUAIKAN: Menggunakan shortPlayId sesuai struktur folder ShortMax
  const params = useParams<{ shortPlayId: string }>();
  const id = params.shortPlayId;
  const router = useRouter();
  const { data, isLoading, error } = useDramaDetail(id || "");

  if (isLoading) {
    return <DetailSkeleton />;
  }

  let book: {
    bookId: string;
    bookName: string;
    cover: string;
    chapterCount: number;
    introduction: string;
    tags?: string[];
    shelfTime?: string;
  } | null = null;

  if (isDirectFormat(data)) {
    book = {
      bookId: data.bookId,
      bookName: data.bookName,
      cover: data.coverWap,
      chapterCount: data.chapterCount,
      introduction: data.introduction,
      tags: data.tags || data.tagV3s?.map(t => t.tagName),
      shelfTime: data.shelfTime,
    };
  } else if (isLegacyFormat(data)) {
    book = {
      bookId: data.data.book.bookId,
      bookName: data.data.book.bookName,
      cover: data.data.book.cover,
      chapterCount: data.data.book.chapterCount,
      introduction: data.data.book.introduction,
      tags: data.data.book.tags,
      shelfTime: data.data.book.shelfTime,
    };
  }

  // HALAMAN JUAL VOUCHER RHEZZA MAUN (Jika tidak ada akses)
  if (error || !book) {
    const waLink = "https://wa.me/6281245511900?text=Halo%20Rhezza%20Maun,%20saya%20mau%20beli%20voucher%20ShortMax";
    
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <div className="max-w-md w-full glass p-8 rounded-3xl text-center space-y-6 shadow-2xl border border-primary/20">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Play className="w-10 h-10 text-primary fill-current" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Konten ShortMax Premium</h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Drama ini memerlukan voucher aktif untuk diputar. Silakan hubungi admin Rhezza Maun untuk pembelian kode.
            </p>
          </div>

          <div className="p-4 bg-secondary/50 rounded-2xl border border-border">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">WhatsApp Admin</p>
            <p className="font-bold text-lg text-foreground">0812-4551-1900</p>
          </div>

          <div className="flex flex-col gap-3">
            <a 
              href={waLink}
              target="_blank"
              className="w-full py-4 rounded-full bg-[#25D366] text-white font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Beli Voucher Sekarang
            </a>
            
            <button 
              onClick={() => router.push('/')}
              className="w-full py-3 text-muted-foreground text-sm hover:text-foreground transition-colors"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-20">
      <div className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={book.cover}
            alt=""
            className="w-full h-full object-cover opacity-20 blur-3xl scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Kembali</span>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
            <div className="relative group">
              <img
                src={book.cover}
                alt={book.bookName}
                className="w-full max-w-[300px] mx-auto rounded-2xl shadow-2xl"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-display gradient-text mb-4">
                  {book.bookName}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Play className="w-4 h-4" />
                    <span>{book.chapterCount} Episode</span>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-4">
                <h3 className="font-semibold text-foreground mb-2">Sinopsis</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {book.introduction}
                </p>
              </div>

              <Link
                href={`/watch/shortmax/${book.bookId}`}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-primary-foreground transition-all hover:scale-105 shadow-lg"
                style={{ background: "var(--gradient-primary)" }}
              >
                <Play className="w-5 h-5 fill-current" />
                Mulai Menonton
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function DetailSkeleton() {
  return (
    <main className="min-h-screen pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          <Skeleton className="aspect-[2/3] w-full max-w-[300px] rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-12 w-48 rounded-full" />
          </div>
        </div>
      </div>
    </main>
  );
}
