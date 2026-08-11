"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Heart, Bookmark } from "lucide-react";
import { Input } from "@/components/ui/input";

const articleCategories = ["Semua", "Kehidupan", "Produktivitas", "Filosofi", "AI", "Keuangan", "Karier"];

const dummyArticles = [
  { id: "art-1", title: "Menemukan Kedamaian di Tengah Kebisingan Modern", slug: "menemukan-kedamaian-kebisingan-modern", category: "Filosofi", excerpt: "Bagaimana ajaran kuno Stoikisme dapat membantu kita menavigasi notifikasi dan tuntutan era digital tanpa kehilangan kewarasan jiwa.", date: "10 Agustus 2026", readingTime: "5 min read" },
  { id: "art-2", title: "Sistem Produktivitas Tanpa Tekanan Kelelahan", slug: "sistem-produktivitas-tanpa-burnout", category: "Produktivitas", excerpt: "Berhenti memuja kesibukan. Mari merancang alur kerja yang menghargai ritme energi biologis tubuh kita sendiri.", date: "08 Agustus 2026", readingTime: "4 min read" },
];

export default function ArtikelPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredArticles = dummyArticles.filter(art => {
    const matchSearch = art.title.toLowerCase().includes(search.toLowerCase()) || art.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === "Semua" || art.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-4xl mx-auto py-20 px-4 space-y-12">
      {/* Pengantar Judul Tipografi Kuat */}
      <div className="space-y-4">
        <h1 className="text-5xl font-serif font-light tracking-tight text-neutral-900 dark:text-neutral-50">Lembaran Pemikiran</h1>
        <p className="text-neutral-500 max-w-xl text-base font-light leading-relaxed">Tulisan mendalam mengenai esensi menjadi manusia, seni mengelola waktu, dan bersahabat dengan masa depan.</p>
      </div>

      {/* Kontrol Pencarian dan Kategori Kontemporer */}
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input 
            type="text" 
            placeholder="Cari ide, gagasan, atau topik filosofi..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11 bg-white dark:bg-neutral-900 rounded-full border-neutral-200 dark:border-neutral-800"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-neutral-100 dark:border-neutral-900 text-sm">
          {articleCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`pb-3 font-medium transition-all relative ${
                selectedCategory === cat ? "text-neutral-900 dark:text-white" : "text-neutral-400 hover:text-neutral-600"
              }`}
            >
              {cat}
              {selectedCategory === cat && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-900 dark:bg-white" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* List Artikel Gaya Feed Medium */}
      <div className="space-y-12 pt-4">
        {filteredArticles.length > 0 ? (
          filteredArticles.map(art => (
            <article key={art.id} className="group pb-12 border-b border-neutral-100 dark:border-neutral-900 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono">
                <span>{art.category}</span>
                <span>•</span>
                <span>{art.date}</span>
              </div>
              
              <Link href={`/artikel/${art.slug}`} className="space-y-2">
                <h2 className="text-2xl font-serif font-normal text-neutral-950 dark:text-neutral-50 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                  {art.title}
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light leading-relaxed line-clamp-2">
                  {art.excerpt}
                </p>
              </Link>

              <div className="flex items-center justify-between pt-2 text-xs text-neutral-400">
                <span>{art.readingTime}</span>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                    <Heart className="h-3.5 w-3.5" />
                  </button>
                  <button className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                    <Bookmark className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-12 text-sm text-neutral-400 font-light">Tidak ada tulisan yang cocok dengan pencarian Anda.</div>
        )}
      </div>
    </div>
  );
}
