import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "PintuSatu — Software Manajemen Kost Simpel & Modern",
  description:
    "Pantau kamar kosong, catat meteran listrik dengan bukti foto, kirim tagihan otomatis ke WhatsApp penghuni, dan pisahkan akses penjaga kost dengan laporan keuangan pemilik.",
  keywords: [
    "PintuSatu",
    "manajemen kost",
    "software kost",
    "saas kost",
    "aplikasi kost",
    "catat meteran listrik kost",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${plusJakarta.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="bg-white text-[#1C1B18] antialiased selection:bg-[#C88A58]/20 selection:text-[#1C1B18] min-h-screen">
        {children}
      </body>
    </html>
  );
}
