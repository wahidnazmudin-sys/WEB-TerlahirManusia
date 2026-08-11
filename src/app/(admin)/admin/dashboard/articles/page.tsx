"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Article } from "@/types";

export default function NewArticlePage() {
  const { register, handleSubmit, setValue, watch, reset } = useForm<Article>();
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  // Memantau input judul untuk fungsi Autoslug otomatis
  const watchTitle = watch("title");
  React.useEffect(() => {
    if (watchTitle) {
      const generatedSlug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setValue("slug", generatedSlug);
    }
  }, [watchTitle, setValue]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    // Simpan gambar di Storage dengan struktur rapi berbasis waktu unix
    const storageRef = ref(storage, `thumbnails/${Date.now()}-${file.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setValue("thumbnail", url);
      toast({ description: "Gambar thumbnail berhasil diunggah." });
    } catch (error) {
      toast({ variant: "destructive", description: "Gagal mengunggah gambar." });
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: Article) => {
    try {
      await addDoc(collection(db, "articles"), {
        ...data,
        likes: 0,
        bookmarks: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      toast({ title: "Sukses!", description: "Artikel berhasil dipublikasikan." });
      reset();
    } catch (error) {
      toast({ variant: "destructive", description: "Gagal menyimpan artikel ke Firestore." });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
      <div>
        <h1 className="text-2xl font-serif font-semibold tracking-tight">Buat Artikel Baru</h1>
        <p className="text-sm text-neutral-500 mt-1">Gunakan editor ini untuk mempublikasikan wawasan baru di Terlahir Manusia.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Judul Artikel</label>
          <Input {...register("title", { required: true })} placeholder="Masukkan judul yang kuat..." className="rounded-md" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Slug (Otomatis)</label>
            <Input {...register("slug", { required: true })} readOnly className="bg-neutral-50 dark:bg-neutral-950/50 cursor-not-allowed" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Kategori</label>
            <select {...register("category")} className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-950">
              {['Kehidupan', 'Produktivitas', 'Filosofi', 'AI', 'Keuangan', 'Karier'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Thumbnail Gambar</label>
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploading && <p className="text-xs text-neutral-400 animate-pulse">Mengompresi & mengunggah gambar...</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Konten Artikel</label>
          <Textarea {...register("content", { required: true })} placeholder="Tuliskan pemikiran mendalam Anda di sini..." rows={12} className="font-mono text-sm leading-relaxed" />
        </div>

        <div className="border-t border-neutral-100 dark:border-neutral-800 pt-6 space-y-4">
          <h3 className="text-sm font-semibold tracking-wide text-neutral-400 uppercase">Optimasi SEO Meta</h3>
          <div className="space-y-4">
            <Input {...register("metaTitle")} placeholder="Meta Title untuk Google Search" />
            <Textarea {...register("metaDescription")} placeholder="Meta Description ringkas..." rows={3} />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={() => setValue("status", "Draft")} className="rounded-full">Simpan Draft</Button>
          <Button type="submit" onClick={() => setValue("status", "Published")} disabled={uploading} className="rounded-full bg-neutral-900 text-white dark:bg-white dark:text-black">Publish Sekarang</Button>
        </div>
      </form>
    </div>
  );
}
