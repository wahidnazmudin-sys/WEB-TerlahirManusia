"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

const initialChallenges = [
  { id: "ch-1", title: "Bangun Pagi Pukul 05:00", desc: "Membentuk disiplin waktu dan menjemput produktivitas awal.", category: "Disiplin" },
  { id: "ch-2", title: "Membaca Buku 15 Halaman", desc: "Nutrisi konseptual harian untuk memperluas cara pandang berpikir.", category: "Filosofi" },
  { id: "ch-3", title: "Menabung / Catat Cashflow", desc: "Membatasi pengeluaran impulsif demi kestabilan masa depan.", category: "Keuangan" },
  { id: "ch-4", title: "Olahraga Minimal 20 Menit", desc: "Menjaga kebugaran fisik demi ketahanan energi harian.", category: "Kesehatan" },
];

export default function ChallengePage() {
  const [completed, setCompleted] = useState<string[]>([]);

  const toggleChallenge = (id: string) => {
    setCompleted(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const progressPercentage = Math.round((completed.length / initialChallenges.length) * 100);

  return (
    <div className="max-w-4xl mx-auto py-20 px-4 space-y-12">
      {/* Header Judul */}
      <div className="text-center space-y-4">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">Pengembangan Diri</span>
        <h1 className="text-4xl font-serif font-light text-neutral-950 dark:text-neutral-50">30 Days Alkemis Diri</h1>
        <p className="text-neutral-500 max-w-md mx-auto text-sm">Konsistensi kecil yang dilakukan setiap hari akan merubah arah hidup secara masif.</p>
      </div>

      {/* Bar Progress Menggunakan Estetika Halus */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
            <Trophy className="h-4 w-4 text-neutral-500" /> Progress Hari Ini
          </span>
          <span className="font-mono font-semibold">{progressPercentage}%</span>
        </div>
        <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ type: "spring", stiffness: 80 }}
            className="h-full bg-neutral-950 dark:bg-neutral-50"
          />
        </div>
      </div>

      {/* List Tantangan */}
      <div className="space-y-4">
        {initialChallenges.map((ch) => {
          const isDone = completed.includes(ch.id);
          return (
            <div
              key={ch.id}
              onClick={() => toggleChallenge(ch.id)}
              className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex items-start gap-4 bg-white dark:bg-neutral-900 ${
                isDone 
                  ? "border-neutral-900 dark:border-neutral-100 bg-neutral-50/50" 
                  : "border-neutral-200/60 dark:border-neutral-800 hover:border-neutral-300"
              }`}
            >
              <button className="mt-1 transition-transform active:scale-95">
                {isDone ? (
                  <CheckCircle2 className="h-5 w-5 text-neutral-900 dark:text-neutral-100 fill-neutral-900 dark:fill-neutral-100 text-white" />
                ) : (
                  <Circle className="h-5 w-5 text-neutral-300 dark:text-neutral-700" />
                )}
              </button>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className={`font-medium text-sm ${isDone ? "line-through text-neutral-400" : "text-neutral-900 dark:text-neutral-100"}`}>
                    {ch.title}
                  </h3>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                    {ch.category}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">{ch.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
