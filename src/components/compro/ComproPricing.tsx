"use client";

import { useState } from "react";

interface ComproPricingProps {
  onOpenTrialModal: (planName?: string) => void;
}

export function ComproPricing({ onOpenTrialModal }: ComproPricingProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const isYearly = billingCycle === "yearly";

  return (
    <section id="harga" className="py-16 md:py-24 bg-white border-t border-[#E6E3DC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#6F4E37] font-semibold">
            PAKET BERLANGGANAN
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1B18] mt-2 tracking-tight">
            Harga Simpel Sesuai Jumlah Pintu Kost Anda
          </h2>
          <p className="text-[#5C5952] text-sm mt-2">
            Pilih paket bulanan atau tahunan. Tanpa biaya setup tambahan dan bisa berhenti kapan saja.
          </p>

          {/* Toggle Bulanan / Tahunan */}
          <div className="mt-6 inline-flex items-center p-1 rounded-xl bg-[#F9F8F6] border border-[#E6E3DC]">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                !isYearly ? "bg-[#1C1B18] text-white" : "text-[#5C5952] hover:text-[#1C1B18]"
              }`}
            >
              Bayar Bulanan
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-2 rounded-lg text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                isYearly
                  ? "font-semibold bg-[#1C1B18] text-white"
                  : "font-medium text-[#5C5952] hover:text-[#1C1B18]"
              }`}
            >
              <span>Bayar Tahunan</span>
              <span className="px-1.5 py-0.5 rounded bg-[#C88A58]/20 text-[#6F4E37] font-mono text-[10px] font-bold">
                Hemat 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Paket 1: Rintisan */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E6E3DC] shadow-[0_2px_15px_-3px_rgba(28,27,24,0.04)] flex flex-col justify-between card-hover-lift group">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#8C887F] font-semibold">KOST MANDIRI</span>
                <span className="text-xs font-mono text-[#5C5952] bg-[#F9F8F6] px-2.5 py-0.5 rounded">Maks. 15 Pintu</span>
              </div>
              <h3 className="text-xl font-bold text-[#1C1B18] mt-2 group-hover:text-[#6F4E37] transition-colors">Paket Rintisan</h3>
              <p className="text-xs text-[#5C5952] mt-1">
                Pas untuk pemilik kost 1 lokasi yang baru beralih dari pembukuan manual.
              </p>

              <div className="my-6 pb-6 border-b border-[#E6E3DC]">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-[#1C1B18] font-mono">
                    {isYearly ? "Rp 79.000" : "Rp 99.000"}
                  </span>
                  <span className="text-xs text-[#8C887F]">/ bulan</span>
                </div>
                <span className="text-[11px] text-[#8C887F] block mt-1">
                  {isYearly ? "Ditagih tahunan (Hemat Rp 240.000/thn)" : "Ditagih bulanan"}
                </span>
              </div>

              <ul className="space-y-3 text-xs text-[#5C5952]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#6F4E37] font-bold">✓</span>
                  <span>Hingga <strong>15 Pintu Kamar</strong> (1 Lokasi)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#6F4E37] font-bold">✓</span>
                  <span>Peta Status Kamar &amp; Data KTP Penghuni</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#6F4E37] font-bold">✓</span>
                  <span>Kalkulator Listrik 3-Mode + Foto Meteran</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#6F4E37] font-bold">✓</span>
                  <span>Pengingat Tagihan WhatsApp Otomatis</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#6F4E37] font-bold">✓</span>
                  <span>1 Akun Pemilik + 1 Akun Penjaga Kost</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onOpenTrialModal("Paket Rintisan")}
              className="w-full mt-8 py-3 rounded-xl border border-[#1C1B18] text-[#1C1B18] hover:bg-[#1C1B18] hover:text-white font-semibold text-xs transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Pilih Paket Rintisan
            </button>
          </div>

          {/* Paket 2: Juragan Pro (Highlighted) */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#6F4E37] shadow-[0_10px_30px_-10px_rgba(111,78,55,0.08)] flex flex-col justify-between relative card-hover-lift group hover:-translate-y-2 hover:shadow-[0_20px_40px_-12px_rgba(111,78,55,0.22)] transition-all duration-300">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#6F4E37] text-white font-mono text-[10px] font-semibold uppercase tracking-wider shadow-sm">
              Paling Banyak Dipilih
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#6F4E37] font-semibold">MULTI-CABANG</span>
                <span className="text-xs font-mono text-[#6F4E37] bg-[#F4EFEA] px-2.5 py-0.5 rounded">Hingga 50 Pintu</span>
              </div>
              <h3 className="text-xl font-bold text-[#1C1B18] mt-2 group-hover:text-[#6F4E37] transition-colors">Paket Juragan Pro</h3>
              <p className="text-xs text-[#5C5952] mt-1">
                Untuk juragan kost yang memiliki penjaga lapangan dan butuh kontrol keuangan penuh.
              </p>

              <div className="my-6 pb-6 border-b border-[#E6E3DC]">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-[#6F4E37] font-mono">
                    {isYearly ? "Rp 183.000" : "Rp 229.000"}
                  </span>
                  <span className="text-xs text-[#8C887F]">/ bulan</span>
                </div>
                <span className="text-[11px] text-[#8C887F] block mt-1">
                  {isYearly ? "Ditagih tahunan (Hemat Rp 552.000/thn)" : "Ditagih bulanan"}
                </span>
              </div>

              <ul className="space-y-3 text-xs text-[#1C1B18]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C88A58] font-bold">✓</span>
                  <span>Hingga <strong>50 Pintu Kamar</strong> (Maks. 3 Cabang)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C88A58] font-bold">✓</span>
                  <span>Semua fitur Paket Rintisan</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C88A58] font-bold">✓</span>
                  <span><strong>Rekonsiliasi QRIS &amp; Virtual Account</strong> Otomatis</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C88A58] font-bold">✓</span>
                  <span><strong>Kas Kecil (Petty Cash)</strong> Wajib Foto Nota</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C88A58] font-bold">✓</span>
                  <span>Tiket Komplain &amp; Riwayat Servis AC Kamar</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C88A58] font-bold">✓</span>
                  <span>Laporan Laba Bersih (NOI) Otomatis</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onOpenTrialModal("Paket Juragan Pro")}
              className="w-full mt-8 py-3 rounded-xl bg-[#6F4E37] hover:bg-[#563B28] text-white font-semibold text-xs transition-all shadow-xs hover:scale-[1.02] active:scale-[0.98] hover:shadow-md cursor-pointer"
            >
              Mulai Langganan Juragan Pro
            </button>
          </div>

          {/* Paket 3: Korporat */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E6E3DC] shadow-[0_2px_15px_-3px_rgba(28,27,24,0.04)] flex flex-col justify-between card-hover-lift group">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#8C887F] font-semibold">SKALA BESAR</span>
                <span className="text-xs font-mono text-[#5C5952] bg-[#F9F8F6] px-2.5 py-0.5 rounded">Unlimited Pintu</span>
              </div>
              <h3 className="text-xl font-bold text-[#1C1B18] mt-2 group-hover:text-[#6F4E37] transition-colors">Paket Korporat</h3>
              <p className="text-xs text-[#5C5952] mt-1">
                Untuk operator jaringan kost ratusan pintu atau properti dengan investor patungan.
              </p>

              <div className="my-6 pb-6 border-b border-[#E6E3DC]">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-[#1C1B18] font-mono">
                    {isYearly ? "Rp 399.000" : "Rp 499.000"}
                  </span>
                  <span className="text-xs text-[#8C887F]">/ bulan</span>
                </div>
                <span className="text-[11px] text-[#8C887F] block mt-1">
                  {isYearly ? "Ditagih tahunan (Hemat Rp 1.200.000/thn)" : "Ditagih bulanan"}
                </span>
              </div>

              <ul className="space-y-3 text-xs text-[#5C5952]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#6F4E37] font-bold">✓</span>
                  <span><strong>Pintu &amp; Cabang Tanpa Batas</strong></span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#6F4E37] font-bold">✓</span>
                  <span>Semua fitur Paket Juragan Pro</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#6F4E37] font-bold">✓</span>
                  <span>Laporan Bagi Hasil / Dividen Investor</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#6F4E37] font-bold">✓</span>
                  <span>Audit Kecepatan Kerja Penjaga (SLA)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#6F4E37] font-bold">✓</span>
                  <span>Bantuan Migrasi Data &amp; Prioritas Support WA</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onOpenTrialModal("Paket Korporat")}
              className="w-full mt-8 py-3 rounded-xl border border-[#1C1B18] text-[#1C1B18] hover:bg-[#1C1B18] hover:text-white font-semibold text-xs transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Pilih Paket Korporat
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
