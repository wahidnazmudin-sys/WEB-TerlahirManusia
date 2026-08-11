"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Heart, Share2 } from "lucide-react";
import Link from "next/link";

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  return (
    <article className="max-w-2xl mx-auto py-24 px-4 space-y-8 bg-neutral-50/20 dark:bg-transparent">
      <Link href="/artikel" className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors mb-4">
        <ArrowLeft className="h-3 w-3" /> Kembali ke Lembaran
      </Link>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
          <span className="uppercase tracking-wider">Filosofi</span>
          <span>•</span>
          <span>5 Menit Membaca</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight leading-tight text-neutral-950 dark:text-neutral-50">
          Menemukan Kedamaian di Tengah Kebisingan Modern
        </h1>
        <div className="flex items-center gap-3 pt-2">
          <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-serif">TM</div>
          <div>
            <p className="text-xs font-medium">Tim Redaksi</p>
            <p className="text-[10px] text-neutral-400 font-mono">Diterbitkan 11 Agustus 2026</p>
          </div>
        </div>
      </div>

      <div className="h-80 w-full rounded-2xl overflow-hidden my-6 bg-neutral-100">
        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200" alt="Cover" className="w-full h-full object-cover" />
      </div>

      {/* Konten Utama Esai dengan Keterbacaan Tinggi */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-serif text-lg leading-relaxed text-neutral-800 dark:text-neutral-300 space-y-6"
      >
        <p>
          Setiap hari, kita dibombardir oleh ribuan informasi yang memperebutkan satu hal paling berharga dari diri kita: **atensi**. Di era digital ini, membiarkan pikiran terbuka tanpa filter perlindungan sama saja dengan membiarkan rumah kita dimasuki oleh siapa saja secara bebas.
        </p>
        <p>
          Filosofi kuno seperti Epictetus mengajarkan kita tentang dikotomi kendali. Ada hal-hal yang berada di bawah kendali penuh kita (opini, keinginan, dan respons internal), dan ada hal-hal di luar kendali kita (tindakan orang lain, notifikasi pasar, algoritma media sosial). Kebahagiaan sejati dimulai saat kita berhenti mencemaskan apa yang ada di luar jangkauan jemari kita.
        </p>
      </motion.div>

      <div className="border-t border-neutral-200 dark:border-neutral-900 pt-6 flex justify-between items-center text-neutral-400">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 hover:text-red-500 text-sm transition-colors">
            <Heart className="h-4 w-4" /> <span>242 Menyukai</span>
          </button>
        </div>
        <button className="hover:text-neutral-900 dark:hover:text-white transition-colors">
          <Share2 className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
