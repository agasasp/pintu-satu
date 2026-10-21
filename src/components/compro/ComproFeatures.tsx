"use client";

import Image from "next/image";
import { CheckCircle2, Camera, Zap } from "lucide-react";

export function ComproFeatures() {
  return (
    <section id="fitur" className="py-16 md:py-24 bg-[#F9F8F6] border-y border-[#E6E3DC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#6F4E37] font-semibold">
            FITUR-FITUR ANDALAN
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1B18] mt-2 tracking-tight">
            Dari check-in sampai tagihan lunas.
          </h2>
          <p className="text-[#5C5952] text-sm mt-2">
            Rangkaian fitur yang dirancang saling terhubung untuk menyederhanakan seluruh siklus operasional kost Anda.
          </p>
        </div>

        {/* 2 Large Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Card Left: WhatsApp Invoicing */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E6E3DC] shadow-sm flex flex-col justify-between space-y-6 card-hover-lift group">
            <div>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-[#F4EFEA] text-[#6F4E37] font-semibold group-hover:bg-[#6F4E37] group-hover:text-white transition-colors duration-300">
                WhatsApp Gateway
              </span>
              <h3 className="text-xl font-bold text-[#1C1B18] mt-3 group-hover:text-[#6F4E37] transition-colors">
                Tagih tepat waktu. Catat tanpa kelewatan.
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5952] mt-2 leading-relaxed">
                Invoice sewa beserta kalkulasi listrik otomatis dikirimkan ke WhatsApp penghuni H-7, H-3, dan hari H dengan link bayar instan.
              </p>
            </div>

            {/* Invoice Preview Card */}
            <div className="p-4 rounded-xl bg-[#F9F8F6] border border-[#E6E3DC] space-y-2 group-hover:border-[#C88A58]/50 transition-colors">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#1C1B18]">PintuSatu Invoice • Kamar A-02</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F4EFEA] text-[#6F4E37]">
                  Lunas
                </span>
              </div>
              <div className="text-xs text-[#5C5952]">Penghuni: Dimas Prasetyo • Jatuh Tempo 25 Okt</div>
              <div className="pt-2 border-t border-[#E6E3DC] flex justify-between items-center">
                <span className="text-xs text-[#8C887F]">Total (Sewa + Listrik):</span>
                <span className="font-mono font-bold text-sm text-[#1C1B18]">Rp 2.162.000</span>
              </div>
            </div>
          </div>

          {/* Card Right: Unit Story & Smart Room */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E6E3DC] shadow-sm flex flex-col justify-between space-y-6 card-hover-lift group">
            <div>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-[#F4EFEA] text-[#6F4E37] font-semibold group-hover:bg-[#6F4E37] group-hover:text-white transition-colors duration-300">
                Manajemen Unit
              </span>
              <h3 className="text-xl font-bold text-[#1C1B18] mt-3 group-hover:text-[#6F4E37] transition-colors">
                Setiap kamar, jelas ceritanya.
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5952] mt-2 leading-relaxed">
                Data penyewa, masa sewa, nomor kontak darurat, foto KTP, hingga riwayat servis kamar tersimpan rapi dalam satu layar.
              </p>
            </div>

            {/* Room Card Preview with Photo */}
            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-[#F9F8F6] border border-[#E6E3DC] group-hover:border-[#C88A58]/50 transition-colors">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-white">
                <Image
                  src="/images/smart-kost-room.jpg"
                  alt="Kamar Kost Pintu Satu"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1C1B18]">Kamar B-01 • Deluxe Balcony</h4>
                <p className="text-[11px] text-[#5C5952]">Fasilitas lengkap, AC dingin, Smart Lock</p>
                <p className="text-xs font-mono font-bold text-[#6F4E37] mt-0.5">Rp 2.600.000 / bln</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Smaller Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E6E3DC] shadow-sm space-y-2 card-hover-lift group cursor-default">
            <div className="w-8 h-8 rounded-lg bg-[#F4EFEA] text-[#6F4E37] flex items-center justify-center font-bold text-xs mb-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#6F4E37] group-hover:text-white group-hover:rotate-6">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-[#1C1B18] group-hover:text-[#6F4E37] transition-colors">Operasional terstruktur</h4>
            <p className="text-xs text-[#5C5952] leading-relaxed">
              Bagi tugas penjaga kost dengan jelas. Pantau kebersihan kamar kosong dan perawatan fasilitas harian.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E6E3DC] shadow-sm space-y-2 card-hover-lift group cursor-default">
            <div className="w-8 h-8 rounded-lg bg-[#F4EFEA] text-[#6F4E37] flex items-center justify-center font-bold text-xs mb-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#6F4E37] group-hover:text-white group-hover:rotate-6">
              <Camera className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-[#1C1B18] group-hover:text-[#6F4E37] transition-colors">Kontrol kas kecil</h4>
            <p className="text-xs text-[#5C5952] leading-relaxed">
              Wajib lampirkan foto nota belanja untuk setiap pengeluaran operasional penjaga di lapangan.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E6E3DC] shadow-sm space-y-2 card-hover-lift group cursor-default">
            <div className="w-8 h-8 rounded-lg bg-[#F4EFEA] text-[#6F4E37] flex items-center justify-center font-bold text-xs mb-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#6F4E37] group-hover:text-white group-hover:rotate-6">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-[#1C1B18] group-hover:text-[#6F4E37] transition-colors">Listrik adil 3-mode</h4>
            <p className="text-xs text-[#5C5952] leading-relaxed">
              Dukung sub-meter pascabayar dengan foto angka kWh, token PLN prabayar, atau tarif all-in elektronik.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
