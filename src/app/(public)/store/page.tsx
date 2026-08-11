"use client";

import { motion } from "framer-motion";
import { ShoppingBag, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  { id: "prod-1", name: "Template Excel Cashflow ala Gen Z", category: "Template", price: "Rp 35.000", desc: "Sistem pencatatan keuangan harian minimalis dengan visualisasi analitik otomatis.", cover: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500" },
  { id: "prod-2", name: "Manifesto Stoikisme di Era AI", category: "eBook", price: "Rp 79.000", desc: "Buku panduan mendalam menjaga kewarasan pikiran di tengah otomatisasi teknologi.", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500" },
  { id: "prod-3", name: "Premium Cinematic Prompt Kit", category: "Prompt AI", price: "Rp 25.000", desc: "Kumpulan formula prompt gambar & video estetik berlatar kebudayaan lokal.", cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500" }
];

export default function StorePage() {
  return (
    <div className="max-w-6xl mx-auto py-20 px-4 space-y-12">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-serif font-light tracking-tight">Produk Digital</h1>
        <p className="text-neutral-400 text-sm max-w-sm mx-auto">Alat bantu praktis berupa instrumen finansial dan pengetahuan esensial.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((prod, index) => (
          <motion.div 
            key={prod.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group rounded-2xl border border-neutral-200/60 dark:border-neutral-900 bg-white dark:bg-neutral-900/40 overflow-hidden flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="h-56 bg-neutral-100 overflow-hidden relative">
                <img src={prod.cover} alt={prod.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-3 left-3 text-[10px] font-mono uppercase bg-white/80 dark:bg-neutral-900/80 px-2 py-0.5 rounded-full backdrop-blur-sm">
                  {prod.category}
                </span>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-serif text-lg text-neutral-950 dark:text-neutral-50 leading-tight">{prod.name}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">{prod.desc}</p>
              </div>
            </div>
            <div className="p-6 pt-0 flex items-center justify-between border-t border-neutral-50 dark:border-neutral-900 mt-4">
              <span className="font-mono text-sm font-semibold">{prod.price}</span>
              <Button size="sm" variant="ghost" className="rounded-full gap-1 text-xs group-hover:bg-neutral-100 dark:group-hover:bg-neutral-800">
                Beli <ArrowUpRight className="h-3 w-3" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
