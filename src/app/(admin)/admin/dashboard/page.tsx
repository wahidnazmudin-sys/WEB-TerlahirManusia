"use client";

import { motion } from "framer-motion";
import { FileText, Users, Image as ImageIcon, Download, TrendingUp } from "lucide-react";

// Data Dummy Statistik untuk tampilan awal Linear Style
const stats = [
  { label: "Total Artikel", value: "142", icon: FileText, change: "+12 minggu ini" },
  { label: "Total Manusia (User)", value: "3,840", icon: Users, change: "+480 bulan ini" },
  { label: "Aset Wallpaper", value: "89", icon: ImageIcon, change: "+6 terunggah" },
  { label: "Total Unduhan", value: "12,490", icon: Download, change: "+1.2k hari ini" },
];

export default function AdminDashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-light tracking-tight text-neutral-900 dark:text-neutral-50">
          Selamat Datang, Bos
        </h1>
        <p className="text-sm text-neutral-400 mt-1">Berikut adalah metrik performa ekosistem Terlahir Manusia hari ini.</p>
      </div>

      {/* Grid Card Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-400">{stat.label}</span>
              <stat.icon className="h-4 w-4 text-neutral-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-semibold tracking-tight">{stat.value}</span>
              <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-neutral-400" /> {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Visualisasi Grafik Pengunjung Campuran */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-neutral-400 mb-6 uppercase tracking-wider">Tren Visitor & Download</h3>
        <div className="h-64 w-full bg-neutral-50 dark:bg-neutral-950/50 rounded-xl flex items-end justify-between p-4 gap-2 border border-neutral-100 dark:border-neutral-900">
          {/* Batang Simulasi Grafik ala Vercel Dashboard */}
          {[40, 55, 48, 70, 62, 85, 90, 75, 60, 95, 100, 110].map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <div 
                style={{ height: `${(val / 120) * 100}%` }} 
                className="w-full bg-neutral-900 dark:bg-neutral-100 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"
              />
              <span className="text-[10px] font-mono text-neutral-400">B{i+1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
