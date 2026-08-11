"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = ["Semua", "Minimalis", "Typography", "Dark", "Light", "Desktop", "Mobile"];

// Data Dummy Aset yang merepresentasikan struktur tautan berkas dari Firebase Storage
const dummyWallpapers = [
  { id: "wp-1", title: "Keheningan Subuh", category: "Minimalis", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800", res: "3840x2160", type: "Gratis" },
  { id: "wp-2", title: "Stoikisme Harian", category: "Typography", url: "https://images.unsplash.com/photo-1518655061766-48f53a57b6f6?w=800", res: "1440x3200", type: "Premium" },
  { id: "wp-3", title: "Monokrom Jiwa", category: "Dark", url: "https://images.unsplash.com/photo-1557683316-973673baf926?w=800", res: "3840x2160", type: "Gratis" },
  { id: "wp-4", title: "Lentera Pikiran", category: "Light", url: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800", res: "1080x2400", type: "Gratis" },
];

export default function WallpaperPage() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [selectedWp, setSelectedWp] = useState<typeof dummyWallpapers[0] | null>(null);

  const filteredWp = activeTab === "Semua" 
    ? dummyWallpapers 
    : dummyWallpapers.filter(wp => wp.category === activeTab);

  const triggerDownload = (url: string, title: string) => {
    // Fungsi pengunduhan berkas blob dari Firebase Storage URL
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.toLowerCase().replace(/\s+/g, "-")}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto py-20 px-4 space-y-12">
      {/* Judul Halaman */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-serif font-light tracking-tight text-neutral-950 dark:text-neutral-50">Ruang Visual</h1>
        <p className="text-neutral-400 text-sm max-w-sm mx-auto">Wallpaper minimalis bersolusi tinggi untuk melatih fokus indra Anda.</p>
      </div>

      {/* Tabs Filter Minimalis ala Apple */}
      <div className="flex justify-center gap-2 overflow-x-auto pb-4 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
              activeTab === cat 
                ? "bg-neutral-900 text-white dark:bg-neutral-50 dark:text-black" 
                : "bg-neutral-100 text-neutral-500 dark:bg-neutral-900 hover:bg-neutral-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Wallpaper */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredWp.map((wp) => (
          <motion.div
            key={wp.id}
            layoutId={wp.id}
            className="group relative h-80 rounded-2xl overflow-hidden border border-neutral-100 dark:border-neutral-900 bg-neutral-100 cursor-pointer shadow-sm"
          >
            <img src={wp.url} alt={wp.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            
            {/* Overlay Hover Minimalis */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
              <span className="text-[10px] uppercase tracking-wider font-mono self-start bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm">
                {wp.type}
              </span>
              <div className="flex items-center justify-between w-full">
                <div>
                  <h3 className="text-sm font-medium">{wp.title}</h3>
                  <p className="text-[10px] text-neutral-300 font-mono mt-0.5">{wp.res}</p>
                </div>
                <Button size="icon" variant="ghost" className="rounded-full text-white hover:bg-white/20 h-8 w-8" onClick={() => setSelectedWp(wp)}>
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Fullscreen Preview Lightbox Component */}
      <AnimatePresence>
        {selectedWp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div layoutId={selectedWp.id} className="relative max-w-4xl w-full h-[80vh] rounded-3xl overflow-hidden">
              <img src={selectedWp.url} alt={selectedWp.title} className="w-full h-full object-contain" />
              
              {/* Tombol Aksi di Sudut Kanan Atas */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button size="icon" variant="secondary" className="rounded-full backdrop-blur-md bg-white/10 text-white hover:bg-white/20 border-0" onClick={() => triggerDownload(selectedWp.url, selectedWp.title)}>
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="rounded-full backdrop-blur-md bg-white/10 text-white hover:bg-white/20 border-0" onClick={() => setSelectedWp(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
