"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import QuoteOfTheDay from "@/components/shared/QuoteOfTheDay";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 selection:bg-neutral-200">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl space-y-6 z-10"
        >
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-500">
            Sebuah Manifesto Diri
          </span>
          <h1 className="text-6xl md:text-8xl font-serif font-light tracking-tight mt-2 text-neutral-900 dark:text-neutral-100">
            Terlahir Manusia
          </h1>
          <p className="text-xl md:text-2xl font-light text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Tempat untuk bertumbuh menjadi versi terbaik dari diri sendiri.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button asChild size="lg" className="rounded-full bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 px-8 transition-all duration-300">
              <Link href="/artikel">Mulai Membaca</Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 px-8 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-300">
              <Link href="/wallpaper">Jelajahi Wallpaper</Link>
            </Button>
          </div>
        </motion.div>

        {/* Indikator Scroll Halus */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        >
          <span className="text-xs font-medium tracking-widest text-neutral-400 uppercase">Scroll Down</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1 h-2 bg-neutral-400 rounded-full"
          />
        </motion.div>
      </section>

      {/* Komponen Quote Berbasis Firestore */}
      <section className="py-24 max-w-5xl mx-auto w-full px-4">
        <QuoteOfTheDay />
      </section>
    </div>
  );
}
