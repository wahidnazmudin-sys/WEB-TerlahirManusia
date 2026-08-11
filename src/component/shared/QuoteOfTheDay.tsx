"use client";

import { useEffect, useState } from "react";
import { collection, query, where, limit, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Quote } from "@/types";
import { motion } from "framer-motion";
import { Copy, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function QuoteOfTheDay() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const q = query(
      collection(db, "quotes"),
      where("scheduledDate", "==", today),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setQuote({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Quote);
      } else {
        // Fallback jika quote terjadwal hari ini kosong
        setQuote({
          text: "Manusia bertumbuh bukan saat segalanya mudah, melainkan saat ia mampu merangkul ketidakpastian dengan penuh kesadaran.",
          author: "Terlahir Manusia",
          scheduledDate: today,
          isQuoteOfTheDay: true,
          createdAt: new Date()
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleCopy = () => {
    if (!quote) return;
    navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`);
    toast({ description: "Quote berhasil disalin ke papan klip." });
  };

  if (loading) return <div className="h-64 bg-neutral-100 animate-pulse rounded-2xl" />;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-12 rounded-3xl border border-neutral-100 dark:border-neutral-900 bg-white dark:bg-neutral-900/50 backdrop-blur-md text-center space-y-8 shadow-sm"
    >
      <p className="text-2xl md:text-3xl font-serif font-light italic leading-relaxed text-neutral-800 dark:text-neutral-200">
        "{quote?.text}"
      </p>
      <div>
        <p className="font-medium text-neutral-900 dark:text-neutral-100">{quote?.author}</p>
        <p className="text-xs text-neutral-400 mt-1">Quote Hari Ini</p>
      </div>

      <div className="flex justify-center items-center gap-2 pt-4">
        <Button variant="ghost" size="icon" onClick={handleCopy} className="rounded-full">
          <Copy className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
