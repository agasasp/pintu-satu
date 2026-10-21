"use client";

import { Send, Wallet, ShieldCheck } from "lucide-react";

export function ComproPillars() {
  return (
    <section id="keunggulan" className="py-16 md:py-24 bg-white border-t border-[#E6E3DC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          <div className="lg:col-span-7 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#6F4E37] font-semibold">
              SOLUSI UNTUK PEMILIK KOST
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1B18] tracking-tight leading-tight">
              Usaha kost jalan terus.<br />
              Anda tak harus repot terus.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[#5C5952] text-sm sm:text-base leading-relaxed">
              Serahkan tugas-tugas administratif yang membosankan dan menyita waktu kepada Pintu Satu. Nikmati bisnis kost yang benar-benar menghasilkan passive income dan kejelasan kontrol setiap saat.
            </p>
          </div>
        </div>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 sm:p-7 rounded-2xl bg-[#F9F8F6] border border-[#E6E3DC] space-y-3 card-hover-lift group cursor-default">
            <div className="w-10 h-10 rounded-xl bg-[#F4EFEA] text-[#6F4E37] flex items-center justify-center font-bold text-sm mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#6F4E37] group-hover:text-white group-hover:rotate-3 shadow-xs">
              <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <h3 className="text-lg font-bold text-[#1C1B18] group-hover:text-[#6F4E37] transition-colors">Admin lebih ringan</h3>
            <p className="text-xs sm:text-sm text-[#5C5952] leading-relaxed">
              Otomatisasi pengingat tagihan sewa ke WhatsApp penyewa. Tak perlu lagi canggung menagih satu per satu setiap akhir bulan.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl bg-[#F9F8F6] border border-[#E6E3DC] space-y-3 card-hover-lift group cursor-default">
            <div className="w-10 h-10 rounded-xl bg-[#F4EFEA] text-[#6F4E37] flex items-center justify-center font-bold text-sm mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#6F4E37] group-hover:text-white group-hover:rotate-3 shadow-xs">
              <Wallet className="w-5 h-5 transition-transform duration-300 group-hover:scale-105" />
            </div>
            <h3 className="text-lg font-bold text-[#1C1B18] group-hover:text-[#6F4E37] transition-colors">Arus kas lebih terbaca</h3>
            <p className="text-xs sm:text-sm text-[#5C5952] leading-relaxed">
              Pencatatan pemasukan sewa dan pengeluaran kas kecil tercatat rapi secara real-time. Laba bersih langsung terlihat tanpa rekap manual.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl bg-[#F9F8F6] border border-[#E6E3DC] space-y-3 card-hover-lift group cursor-default">
            <div className="w-10 h-10 rounded-xl bg-[#F4EFEA] text-[#6F4E37] flex items-center justify-center font-bold text-sm mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#6F4E37] group-hover:text-white group-hover:rotate-3 shadow-xs">
              <ShieldCheck className="w-5 h-5 transition-transform duration-300 group-hover:scale-105" />
            </div>
            <h3 className="text-lg font-bold text-[#1C1B18] group-hover:text-[#6F4E37] transition-colors">Krisis pelanggan lebih tenang</h3>
            <p className="text-xs sm:text-sm text-[#5C5952] leading-relaxed">
              Keluhan fasilitas, perbaikan AC, atau masalah kamar tercatat dalam tiket rapi sehingga penanganan staf terpantau tuntas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
