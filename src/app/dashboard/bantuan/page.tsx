"use client";

import { useEffect } from "react";
import { MessageSquare, Phone, BookOpen } from "lucide-react";

export default function BantuanPage() {
  useEffect(() => {
    document.title = "Pusat Bantuan • Kost Cemara | Pintu Satu";
  }, []);

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1B18] tracking-tight">
          Pusat Bantuan &amp; Panduan
        </h1>
        <p className="text-xs sm:text-sm text-[#5C5952] mt-1">
          Panduan operasional kost, integrasi WhatsApp otomatis, dan kontak layanan bantuan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-[#E6E3DC] shadow-2xs space-y-3">
          <div className="w-9 h-9 rounded-xl bg-[#F4EFEA] text-[#6F4E37] flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-sm text-[#1C1B18]">WhatsApp Hotline</h2>
          <p className="text-xs text-[#5C5952]">
            Chat langsung dengan tim dukungan teknis Pintu Satu untuk kendala darurat operasional.
          </p>
          <a
            href="https://wa.me/6281299887766"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6F4E37] hover:underline pt-1"
          >
            <span>Hubungi via WhatsApp</span>
            <span>&rarr;</span>
          </a>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E6E3DC] shadow-2xs space-y-3">
          <div className="w-9 h-9 rounded-xl bg-[#F4EFEA] text-[#6F4E37] flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-sm text-[#1C1B18]">Panduan Pemilik Kost</h2>
          <p className="text-xs text-[#5C5952]">
            Pelajari tutorial pencatatan meteran listrik, penagihan sewa otomatis, dan pembukuan kas.
          </p>
          <span className="inline-block text-xs font-semibold text-[#8C887F]">
            Dokumentasi Lengkap Tersedia
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E6E3DC] shadow-2xs space-y-3">
          <div className="w-9 h-9 rounded-xl bg-[#F4EFEA] text-[#6F4E37] flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <h2 className="font-bold text-sm text-[#1C1B18]">Konsultasi Langganan</h2>
          <p className="text-xs text-[#5C5952]">
            Diskusikan kebutuhan penambahan kuota kamar untuk properti kost baru Anda.
          </p>
          <span className="inline-block text-xs font-semibold text-[#6F4E37]">
            0812-9988-7766
          </span>
        </div>
      </div>
    </div>
  );
}
