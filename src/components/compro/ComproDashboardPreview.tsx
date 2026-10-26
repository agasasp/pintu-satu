"use client";

import { useState } from "react";

interface ComproDashboardPreviewProps {
  onShowToast: (title: string, desc: string) => void;
}

export function ComproDashboardPreview({ onShowToast }: ComproDashboardPreviewProps) {
  const [samplePaid, setSamplePaid] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-white border-t border-[#E6E3DC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-mono uppercase tracking-widest text-[#6F4E37] font-semibold">
          SEMUA TERLIHAT DALAM SATU LAYAR
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1B18] mt-2 tracking-tight">
          Tak perlu menebak. Semua terlihat jelas.
        </h2>
        <p className="text-[#5C5952] text-sm sm:text-base max-w-2xl mx-auto mt-2 leading-relaxed">
          Pantau seluruh kondisi kost Anda kapan saja dan dari mana saja secara real-time dari satu dashboard yang bersih dan intuitif.
        </p>

        {/* Clean Dashboard Mockup Box */}
        <div className="mt-12 max-w-4xl mx-auto rounded-2xl bg-[#F9F8F6] p-4 sm:p-6 border border-[#E6E3DC] shadow-[0_15px_35px_-10px_rgba(28,27,24,0.06)] text-left">
          {/* Mockup Header */}
          <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#E6E3DC] gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded bg-[#1C1B18] text-white flex items-center justify-center font-bold font-mono text-[10px]">
                P1
              </div>
              <span className="font-bold text-xs text-[#1C1B18]">Griya BSD Signature (32 Pintu)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#F4EFEA] text-[#6F4E37] font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Dashboard
              </span>
            </div>
          </div>

          {/* Greeting & KPI Row */}
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#1C1B18]">Selamat pagi, Adit! 👋</h3>
              <p className="text-xs text-[#5C5952]">Semua 28 kamar aktif dalam kondisi terpantau aman.</p>
            </div>

            {/* 3 KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white p-3.5 rounded-xl border border-[#E6E3DC] card-hover-lift cursor-default">
                <span className="text-[11px] text-[#8C887F]">Okupansi Kamar</span>
                <div className="text-lg font-bold text-[#1C1B18] mt-0.5">28 / 32 Pintu</div>
                <span className="text-[10px] text-[#6F4E37] font-medium">87.5% Terisi • 4 Siap Huni</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#E6E3DC] card-hover-lift cursor-default">
                <span className="text-[11px] text-[#8C887F]">Total Pemasukan Bulan Ini</span>
                <div className="text-lg font-bold text-[#6F4E37] mt-0.5 font-mono">Rp 38.650.000</div>
                <span className="text-[10px] text-[#8C887F]">+8.4% dibanding bulan lalu</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-[#E6E3DC] card-hover-lift cursor-default">
                <span className="text-[11px] text-[#8C887F]">Kas Operasional Lapangan</span>
                <div className="text-lg font-bold text-[#1C1B18] mt-0.5 font-mono">Rp 1.500.000</div>
                <span className="text-[10px] text-[#C88A58] font-medium">Sisa plafon Rp 780.000</span>
              </div>
            </div>

            {/* Sample Units Grid in Dashboard */}
            <div className="bg-white p-4 rounded-xl border border-[#E6E3DC] space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#1C1B18]">Status Unit Terpilih</span>
                <span className="text-[11px] text-[#8C887F]">Klik baris kamar untuk simulasi bayar</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="p-2.5 rounded-lg bg-[#F9F8F6] border border-[#E6E3DC] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold font-mono text-[#1C1B18]">A-01</span>
                    <span className="text-[#5C5952] ml-2 font-medium">Alya Putri</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F4EFEA] text-[#6F4E37]">
                    Lunas ✓
                  </span>
                </div>

                <button
                  onClick={() => {
                    setSamplePaid(!samplePaid);
                    onShowToast(
                      samplePaid ? "Tagihan Belum Lunas" : "Tagihan Lunas",
                      samplePaid
                        ? "Status kamar A-02 dikembalikan ke belum lunas."
                        : "Simulasi pembayaran QRIS dari Dimas P. berhasil diverifikasi!"
                    );
                  }}
                  className={`p-2.5 rounded-lg border flex items-center justify-between text-xs transition-all duration-200 cursor-pointer text-left hover:scale-[1.01] active:scale-[0.99] ${
                    samplePaid
                      ? "bg-[#F9F8F6] border-[#E6E3DC]"
                      : "bg-[#FBF5EF] border-[#C88A58] shadow-xs"
                  }`}
                >
                  <div>
                    <span className="font-bold font-mono text-[#1C1B18]">A-02</span>
                    <span className="text-[#5C5952] ml-2 font-medium">Dimas P.</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                      samplePaid
                        ? "bg-[#F4EFEA] text-[#6F4E37]"
                        : "bg-[#C88A58] text-white"
                    }`}
                  >
                    {samplePaid ? "Lunas ✓" : "Belum Lunas (Klik)"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#8C887F] mt-4">
          Tampilan dashboard dirancang ramah bagi pemula maupun pengelola berpengalaman.
        </p>
      </div>
    </section>
  );
}
