import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css"; // Pastikan CSS global terimpor
import { Providers } from "@/app/providers";

// 1. Inisialisasi Font Premium via Google Fonts (Optimasi Performa)
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// 2. Konfigurasi SEO Global Meta Tag untuk Google Search
export const metadata: Metadata = {
  title: "Terlahir Manusia — Tempat Bertumbuh Menjadi Versi Terbaik",
  description: "Sebuah platform minimalis kontemporer untuk mengeksplorasi esensi kehidupan, produktivitas, filosofi, karier, dan pengelolaan finansial secara sadar.",
  metadataBase: new URL("https://terlahirmanusia.com"),
  openGraph: {
    title: "Terlahir Manusia",
    description: "Tempat bertumbuh menjadi versi terbaik dari diri sendiri.",
    url: "https://terlahirmanusia.com",
    siteName: "Terlahir Manusia",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} font-sans antialiased bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
