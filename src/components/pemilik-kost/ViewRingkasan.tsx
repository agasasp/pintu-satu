"use client";

import { useState } from "react";
import {
  DoorClosed,
  Wallet,
  Receipt,
  ArrowUpRight,
  Calendar,
  Plus,
  ArrowRight,
  AlertCircle,
  Clock,
  Wrench,
  CheckCircle2,
  UserCheck,
  ChevronDown,
} from "lucide-react";
import { monthlyTrends } from "./mockData";
import { DashboardTab } from "./types";

interface ViewRingkasanProps {
  onNavigateTab: (tab: DashboardTab) => void;
  onOpenRecordPayment: () => void;
  onSendReminder: (tenantName: string, room: string, amount: string) => void;
}

export function ViewRingkasan({
  onNavigateTab,
  onOpenRecordPayment,
  onSendReminder,
}: ViewRingkasanProps) {
  const selectedPeriod = "Oktober 2026";
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const pendingBills = [
    {
      name: "Andi Saputra",
      room: "Kamar A-05",
      amount: "Rp1.500.000",
      dueDate: "20 Okt 2026",
      isOverdue: true,
      status: "Terlambat",
    },
    {
      name: "Dewi Lestari",
      room: "Kamar A-03",
      amount: "Rp1.500.000",
      dueDate: "28 Okt 2026",
      isOverdue: false,
      status: "Belum dibayar",
    },
    {
      name: "Fajar Ramadhan",
      room: "Kamar A-04",
      amount: "Rp1.500.000",
      dueDate: "28 Okt 2026",
      isOverdue: false,
      status: "Belum dibayar",
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header Greeting & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1B18] tracking-tight">
            Selamat pagi, Pak Andi
          </h1>
          <p className="text-xs sm:text-sm text-[#5C5952] mt-1">
            Ini kabar Kost Cemara hari ini. Mari mulai dari yang perlu perhatian.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Period selector */}
          <div className="relative">
            <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E6E3DC] text-xs font-semibold text-[#1C1B18] hover:bg-[#F9F8F6] transition-colors cursor-pointer shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-[#6F4E37]" />
              <span>{selectedPeriod}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#8C887F]" />
            </button>
          </div>

          {/* Record payment action */}
          <button
            onClick={onOpenRecordPayment}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6F4E37] hover:bg-[#563B28] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Catat pembayaran</span>
          </button>
        </div>
      </div>

      {/* 2. Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Okupansi Kamar */}
        <div className="bg-white p-4.5 rounded-2xl border border-[#E6E3DC] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[#5C5952]">
            <span className="text-xs font-medium">Okupansi kamar</span>
            <DoorClosed className="w-4 h-4 text-[#6F4E37]" />
          </div>
          <div className="text-2xl font-extrabold text-[#1C1B18] tracking-tight">
            28 / 32
          </div>
          <div className="text-[11px] text-[#5C5952]">
            <span className="text-[#6F4E37] font-semibold">87,5% terisi</span> • 3 kamar siap huni
          </div>
        </div>

        {/* Card 2: Pemasukan Bulan Ini */}
        <div className="bg-white p-4.5 rounded-2xl border border-[#E6E3DC] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[#5C5952]">
            <span className="text-xs font-medium">Pemasukan bulan ini</span>
            <Wallet className="w-4 h-4 text-[#6F4E37]" />
          </div>
          <div className="text-2xl font-extrabold text-[#1C1B18] tracking-tight">
            Rp38.500.000
          </div>
          <div className="text-[11px] text-emerald-700 flex items-center gap-1 font-semibold">
            <span>&uarr; 5,5%</span>
            <span className="text-[#8C887F] font-normal">dari September</span>
          </div>
        </div>

        {/* Card 3: Tagihan Belum Lunas */}
        <div className="bg-white p-4.5 rounded-2xl border border-[#E6E3DC] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[#5C5952]">
            <span className="text-xs font-medium">Tagihan belum lunas</span>
            <Receipt className="w-4 h-4 text-[#C88A58]" />
          </div>
          <div className="text-2xl font-extrabold text-[#1C1B18] tracking-tight">
            Rp4.500.000
          </div>
          <div className="text-[11px] text-[#8C887F]">
            <span className="text-red-700 font-semibold">3 tagihan</span> • 1 terlambat
          </div>
        </div>

        {/* Card 4: Pengeluaran Bulan Ini */}
        <div className="bg-white p-4.5 rounded-2xl border border-[#E6E3DC] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[#5C5952]">
            <span className="text-xs font-medium">Pengeluaran bulan ini</span>
            <ArrowUpRight className="w-4 h-4 text-[#8C887F]" />
          </div>
          <div className="text-2xl font-extrabold text-[#1C1B18] tracking-tight">
            Rp9.250.000
          </div>
          <div className="text-[11px] text-[#5C5952]">
            Anggaran terpakai <span className="font-semibold text-[#1C1B18]">77,1%</span>
          </div>
        </div>
      </div>

      {/* 3. Middle Grid: Pemasukan Bulanan (Bar Chart) & Prioritas Hari Ini */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Pemasukan Bulanan Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-[#E6E3DC] shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4">
            <div>
              <h2 className="text-sm font-bold text-[#1C1B18]">Pemasukan bulanan</h2>
              <p className="text-xs text-[#8C887F] mt-0.5">
                Pemasukan yang sudah diterima, Mei–Oktober 2026
              </p>
            </div>
            <button
              onClick={() => onNavigateTab("keuangan")}
              className="text-xs font-semibold text-[#6F4E37] hover:text-[#563B28] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Lihat laporan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Chart Canvas Area */}
          <div className="pt-4 pb-2">
            <div className="flex items-center justify-between text-[11px] text-[#8C887F] mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#6F4E37]" />
                <span className="text-xs text-[#5C5952] font-medium">Pemasukan</span>
              </div>
              <span className="text-[11px] text-[#8C887F]">Dalam juta rupiah</span>
            </div>

            {/* Custom Bar Chart Visualization */}
            <div className="h-44 flex items-end justify-between gap-3 sm:gap-6 pt-6 px-2 relative border-b border-[#E6E3DC]">
              {/* Horizontal grid lines */}
              <div className="absolute inset-x-0 top-0 border-b border-dashed border-[#F4EFEA]" />
              <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-[#F4EFEA]" />

              {monthlyTrends.map((item, idx) => {
                const maxVal = 40; // 40 jt max
                const heightPercent = (item.pemasukan / maxVal) * 100;
                const isCurrent = item.isCurrent;

                return (
                  <div
                    key={item.month}
                    className="flex-1 flex flex-col items-center h-full justify-end relative group cursor-pointer"
                    onMouseEnter={() => setHoveredBar(idx)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {/* Tooltip on hover */}
                    {hoveredBar === idx && (
                      <div className="absolute -top-10 bg-[#1C1B18] text-white text-[10px] font-mono py-1 px-2 rounded-lg shadow-md whitespace-nowrap z-20">
                        Rp {item.pemasukan.toFixed(1)} jt
                      </div>
                    )}

                    {/* Bar */}
                    <div
                      className={`w-full max-w-[48px] rounded-t-lg transition-all duration-300 ${
                        isCurrent
                          ? "bg-[#6F4E37] shadow-sm hover:bg-[#563B28]"
                          : "bg-[#DFB08A]/50 hover:bg-[#DFB08A]"
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />

                    {/* X-axis label */}
                    <span
                      className={`text-xs mt-2 ${
                        isCurrent
                          ? "font-bold text-[#6F4E37]"
                          : "font-medium text-[#8C887F]"
                      }`}
                    >
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Prioritas Hari Ini (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-[#E6E3DC] shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E3DC]">
              <div>
                <h2 className="text-sm font-bold text-[#1C1B18]">Prioritas hari ini</h2>
                <p className="text-xs text-[#8C887F] mt-0.5">
                  3 hal yang perlu Anda tindak lanjuti
                </p>
              </div>
            </div>

            {/* List Items */}
            <div className="mt-3 space-y-3">
              {/* Item 1 */}
              <div className="p-3 rounded-xl bg-[#F9F8F6] hover:bg-[#F4EFEA] border border-[#E6E3DC] transition-colors flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FBF5EF] border border-[#C88A58]/30 flex items-center justify-center text-[#C88A58] shrink-0 mt-0.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-[#1C1B18]">
                    1 tagihan melewati jatuh tempo
                  </div>
                  <div className="text-[11px] text-[#5C5952] mt-0.5">
                    Andi Saputra • A-05 • Rp1.500.000
                  </div>
                  <button
                    onClick={() =>
                      onSendReminder("Andi Saputra", "A-05", "Rp1.500.000")
                    }
                    className="text-[11px] font-semibold text-[#6F4E37] hover:text-[#563B28] flex items-center gap-1 mt-1 cursor-pointer"
                  >
                    <span>Kirim pengingat</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-3 rounded-xl bg-[#F9F8F6] hover:bg-[#F4EFEA] border border-[#E6E3DC] transition-colors flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FBF5EF] border border-[#C88A58]/30 flex items-center justify-center text-[#C88A58] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-[#1C1B18]">
                    2 kontrak berakhir minggu ini
                  </div>
                  <div className="text-[11px] text-[#5C5952] mt-0.5">
                    Nadia &amp; Yoga • 31 Oktober 2026
                  </div>
                  <button
                    onClick={() => onNavigateTab("penghuni")}
                    className="text-[11px] font-semibold text-[#6F4E37] hover:text-[#563B28] flex items-center gap-1 mt-1 cursor-pointer"
                  >
                    <span>Tinjau masa sewa</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Item 3 */}
              <div className="p-3 rounded-xl bg-[#F9F8F6] hover:bg-[#F4EFEA] border border-[#E6E3DC] transition-colors flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F4EFEA] border border-[#E6E3DC] flex items-center justify-center text-[#6F4E37] shrink-0 mt-0.5">
                  <Wrench className="w-4 h-4 text-[#6F4E37]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-[#1C1B18]">
                    Perbaikan AC kamar B-04
                  </div>
                  <div className="text-[11px] text-[#5C5952] mt-0.5">
                    Pak Dedi • Dijadwalkan pukul 14.00
                  </div>
                  <button
                    onClick={() => onNavigateTab("kamar")}
                    className="text-[11px] font-semibold text-[#6F4E37] hover:text-[#563B28] flex items-center gap-1 mt-1 cursor-pointer"
                  >
                    <span>Lihat tugas</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Lower Grid: Tagihan Perlu Ditindaklanjuti & Aktivitas Terbaru */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Tagihan Perlu Ditindaklanjuti (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-[#E6E3DC] shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E3DC]">
              <div>
                <h2 className="text-sm font-bold text-[#1C1B18]">
                  Tagihan perlu ditindaklanjuti
                </h2>
                <p className="text-xs text-[#8C887F] mt-0.5">
                  Jatuh tempo terdekat dan pembayaran tertunda
                </p>
              </div>
              <button
                onClick={() => onNavigateTab("tagihan")}
                className="text-xs font-semibold text-[#6F4E37] hover:text-[#563B28] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Lihat semua</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[11px] text-[#8C887F] border-b border-[#E6E3DC]">
                    <th className="py-2.5 font-semibold">Penghuni / kamar</th>
                    <th className="py-2.5 font-semibold">Nominal</th>
                    <th className="py-2.5 font-semibold">Jatuh tempo</th>
                    <th className="py-2.5 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E3DC]/60">
                  {pendingBills.map((bill) => (
                    <tr
                      key={bill.name}
                      className="hover:bg-[#F9F8F6] transition-colors"
                    >
                      <td className="py-3">
                        <div className="font-bold text-[#1C1B18]">{bill.name}</div>
                        <div className="text-[10px] text-[#8C887F]">{bill.room}</div>
                      </td>
                      <td className="py-3 font-semibold text-[#1C1B18]">
                        {bill.amount}
                      </td>
                      <td className="py-3">
                        <span
                          className={`font-medium ${
                            bill.isOverdue ? "text-red-600 font-semibold" : "text-[#5C5952]"
                          }`}
                        >
                          {bill.dueDate}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                            bill.status === "Terlambat"
                              ? "bg-red-50 text-red-700 border border-red-200"
                              : "bg-amber-50 text-amber-800 border border-amber-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              bill.status === "Terlambat"
                                ? "bg-red-500"
                                : "bg-amber-500"
                            }`}
                          />
                          {bill.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Card Note */}
          <div className="pt-3 border-t border-[#E6E3DC] mt-4 flex items-center gap-2 text-[11px] text-[#5C5952]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Pengingat otomatis aktif • H-3 dan saat jatuh tempo</span>
          </div>
        </div>

        {/* Right: Aktivitas Terbaru (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-[#E6E3DC] shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E3DC]">
              <h2 className="text-sm font-bold text-[#1C1B18]">Aktivitas terbaru</h2>
              <button
                onClick={() => onNavigateTab("ringkasan")}
                className="text-xs font-semibold text-[#6F4E37] hover:text-[#563B28] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Semua</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-3 space-y-4">
              {/* Activity 1 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-[#1C1B18]">
                    Pembayaran Putri diterima
                  </div>
                  <div className="text-[11px] text-[#5C5952]">
                    A-01 • Rp1.500.000 via transfer BCA
                  </div>
                  <div className="text-[10px] text-[#8C887F] mt-0.5">
                    09.12 • Oleh Sari
                  </div>
                </div>
              </div>

              {/* Activity 2 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F4EFEA] border border-[#E6E3DC] flex items-center justify-center text-[#6F4E37] shrink-0 mt-0.5">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-[#1C1B18]">
                    Rizky menyelesaikan check-in
                  </div>
                  <div className="text-[11px] text-[#5C5952]">
                    A-02 • Masa sewa mulai 25 Okt 2026
                  </div>
                  <div className="text-[10px] text-[#8C887F] mt-0.5">
                    Kemarin, 15.30 • Oleh Sari
                  </div>
                </div>
              </div>

              {/* Activity 3 */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FBF5EF] border border-[#C88A58]/30 flex items-center justify-center text-[#C88A58] shrink-0 mt-0.5">
                  <Wrench className="w-4 h-4 text-[#6F4E37]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-[#1C1B18]">
                    Perawatan kamar dijadwalkan
                  </div>
                  <div className="text-[11px] text-[#5C5952]">
                    B-04 • Servis AC oleh Pak Dedi
                  </div>
                  <div className="text-[10px] text-[#8C887F] mt-0.5">
                    Kemarin, 11.45 • Oleh Anda
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#E6E3DC] mt-4 text-[10px] text-[#8C887F]">
            Pembaruan real-time dari aplikasi penjaga &amp; transfer bank
          </div>
        </div>
      </div>

      {/* 5. Bottom Status Strip */}
      <div className="flex items-center gap-2 text-xs text-[#5C5952] pt-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Semua data tersimpan • Terakhir diperbarui hari ini, 09.15 WIB</span>
      </div>
    </div>
  );
}
