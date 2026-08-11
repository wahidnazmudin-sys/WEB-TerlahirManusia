"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Akses Diterima", description: "Selamat datang kembali, Bos." });
      router.push("/admin/dashboard");
    } catch (error) {
      toast({ variant: "destructive", title: "Akses Ditolak", description: "Kredensial salah atau role tidak valid." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full p-8 rounded-3xl border border-neutral-200/60 dark:border-neutral-900 bg-white dark:bg-neutral-900/50 backdrop-blur shadow-sm space-y-6"
      >
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-serif font-light tracking-tight">Portal Manajemen</h1>
          <p className="text-xs text-neutral-400">Khusus administrator ekosistem Terlahir Manusia.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-500">Email internal</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="bos@terlahirmanusia.com" required className="rounded-xl" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-500">Kata Sandi</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="rounded-xl" />
          </div>
          <Button type="submit" disabled={loading} className="w-full rounded-xl mt-2 bg-neutral-900 text-white dark:bg-white dark:text-black">
            {loading ? "Memverifikasi..." : "Masuk Sistem"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
