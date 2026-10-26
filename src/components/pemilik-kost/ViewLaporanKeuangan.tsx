"use client";

import { useState } from "react";
import {
  Download,
  Plus,
  ChevronDown,
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
  PieChart,
  ArrowRight,
  Info,
} from "lucide-react";
import {
  initialTransactions,
  monthlyTrends,
  expenseBreakdown,
} from "./mockData";
import { FinancialTransaction } from "./types";

interface ViewLaporanKeuanganProps {
  onOpenRecordExpense: () => void;
  onDownloadReport: () => void;
}

export function ViewLaporanKeuangan({
  onOpenRecordExpense,
  onDownloadReport,
}: ViewLaporanKeuanganProps) {
  const selectedPeriod = "Oktober 2026";
  const [transactions] =
    useState<FinancialTransaction[]>(initialTransactions);
  const [transactionTypeFilter, setTransactionTypeFilter] = useState("all");
  const [hoveredTrend, setHoveredTrend] = useState<number | null>(null);

  const filteredTransactions = transactions.filter((t) => {
    if (transactionTypeFilter !== "all" && t.type !== transactionTypeFilter)
      return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1B18] tracking-tight">
            Laporan keuangan
          </h1>
          <p className="text-xs sm:text-sm text-[#5C5952] mt-1">
            Pahami arus kas kost dari transaksi yang benar-benar sudah tercatat.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onDownloadReport}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E6E3DC] text-xs font-semibold text-[#1C1B18] hover:bg-[#F9F8F6] transition-colors cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-[#6F4E37]" />
            <span>Unduh laporan</span>
          </button>

          <button
            onClick={onOpenRecordExpense}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6F4E37] hover:bg-[#563B28] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Catat pengeluaran</span>
          </button>
        </div>
      </div>

      {/* 2. Period Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-3">
          <div className="relative">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#E6E3DC] text-xs font-bold text-[#1C1B18] hover:bg-[#F9F8F6] cursor-pointer shadow-2xs">
              <span>{selectedPeriod}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#8C887F]" />
            </button>
          </div>
          <span className="text-[#5C5952] font-medium">1–26 Oktober 2026</span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-[#8C887F]">
          <Info className="w-3.5 h-3.5" />
          <span>Basis kas • Diperbarui hari ini, 09.15 WIB</span>
        </div>
      </div>

      {/* 3. Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Pemasukan */}
        <div className="bg-white p-4.5 rounded-2xl border border-[#E6E3DC] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[#5C5952]">
            <span className="text-xs font-medium">Total pemasukan</span>
            <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-[#1C1B18] tracking-tight">
            Rp38.500.000
          </div>
          <div className="text-[11px] text-emerald-700 flex items-center gap-1 font-semibold">
            <span>&uarr; 5,5%</span>
            <span className="text-[#8C887F] font-normal">dari September</span>
          </div>
        </div>

        {/* Card 2: Total Pengeluaran */}
        <div className="bg-white p-4.5 rounded-2xl border border-[#E6E3DC] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[#5C5952]">
            <span className="text-xs font-medium">Total pengeluaran</span>
            <ArrowUpRight className="w-4 h-4 text-[#8C887F]" />
          </div>
          <div className="text-2xl font-extrabold text-[#1C1B18] tracking-tight">
            Rp9.250.000
          </div>
          <div className="text-[11px] text-[#5C5952] flex items-center gap-1">
            <span className="font-semibold text-[#1C1B18]">&uarr; 5,7%</span>
            <span className="text-[#8C887F]">dari September</span>
          </div>
        </div>

        {/* Card 3: Arus Kas Bersih */}
        <div className="bg-white p-4.5 rounded-2xl border border-[#E6E3DC] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[#5C5952]">
            <span className="text-xs font-medium">Arus kas bersih</span>
            <Wallet className="w-4 h-4 text-[#6F4E37]" />
          </div>
          <div className="text-2xl font-extrabold text-[#1C1B18] tracking-tight">
            Rp29.250.000
          </div>
          <div className="text-[11px] text-emerald-700 flex items-center gap-1 font-semibold">
            <span>&uarr; Rp1.500.000</span>
            <span className="text-[#8C887F] font-normal">dari September</span>
          </div>
        </div>

        {/* Card 4: Margin Kas Bersih */}
        <div className="bg-white p-4.5 rounded-2xl border border-[#E6E3DC] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[#5C5952]">
            <span className="text-xs font-medium">Margin kas bersih</span>
            <PieChart className="w-4 h-4 text-[#C88A58]" />
          </div>
          <div className="text-2xl font-extrabold text-[#1C1B18] tracking-tight">
            76,0%
          </div>
          <div className="text-[11px] text-[#5C5952]">Pemasukan dikurangi pengeluaran</div>
        </div>
      </div>

      {/* 4. Middle Section: Tren Pemasukan & Pengeluaran vs Rincian Pengeluaran */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Tren Pemasukan & Pengeluaran (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-[#E6E3DC] shadow-2xs flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-[#E6E3DC]/60">
              <h2 className="text-sm font-bold text-[#1C1B18]">
                Tren pemasukan &amp; pengeluaran
              </h2>
              <p className="text-xs text-[#8C887F] mt-0.5">
                Perbandingan bulanan • Mei–Oktober 2026
              </p>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between text-xs pt-3 pb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#6F4E37]" />
                  <span className="text-xs font-medium text-[#1C1B18]">Pemasukan</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#C88A58]" />
                  <span className="text-xs font-medium text-[#1C1B18]">Pengeluaran</span>
                </div>
              </div>

              <span className="text-[11px] text-[#8C887F]">Dalam juta rupiah</span>
            </div>

            {/* Double Bar Chart */}
            <div className="h-48 flex items-end justify-between gap-3 sm:gap-6 pt-6 px-2 relative border-b border-[#E6E3DC]">
              {/* Y Axis Reference Gridlines */}
              <div className="absolute inset-x-0 top-0 border-b border-dashed border-[#F4EFEA]" />
              <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-[#F4EFEA]" />

              {monthlyTrends.map((item, idx) => {
                const maxVal = 40;
                const incomePercent = (item.pemasukan / maxVal) * 100;
                const expensePercent = (item.pengeluaran / maxVal) * 100;
                const isCurrent = item.isCurrent;

                return (
                  <div
                    key={item.month}
                    className="flex-1 flex flex-col items-center h-full justify-end relative group cursor-pointer"
                    onMouseEnter={() => setHoveredTrend(idx)}
                    onMouseLeave={() => setHoveredTrend(null)}
                  >
                    {/* Hover Tooltip */}
                    {hoveredTrend === idx && (
                      <div className="absolute -top-12 bg-[#1C1B18] text-white text-[10px] font-mono py-1 px-2.5 rounded-lg shadow-md whitespace-nowrap z-20">
                        <div>+ Rp{item.pemasukan.toFixed(1)} jt</div>
                        <div className="text-[#DFB08A]">
                          - Rp{item.pengeluaran.toFixed(1)} jt
                        </div>
                      </div>
                    )}

                    {/* Bars pair */}
                    <div className="flex items-end gap-1 w-full justify-center">
                      {/* Income Bar */}
                      <div
                        className={`w-3.5 sm:w-5 rounded-t-md transition-all duration-300 ${
                          isCurrent
                            ? "bg-[#6F4E37] hover:bg-[#563B28]"
                            : "bg-[#DFB08A]/60 hover:bg-[#DFB08A]"
                        }`}
                        style={{ height: `${incomePercent}%` }}
                      />

                      {/* Expense Bar */}
                      <div
                        className="w-3.5 sm:w-5 rounded-t-md bg-[#C88A58]/70 hover:bg-[#C88A58] transition-all duration-300"
                        style={{ height: `${expensePercent}%` }}
                      />
                    </div>

                    {/* Month label */}
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

        {/* Right: Rincian Pengeluaran (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-[#E6E3DC] shadow-2xs flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-[#E6E3DC]/60">
              <h2 className="text-sm font-bold text-[#1C1B18]">Rincian pengeluaran</h2>
              <p className="text-xs text-[#8C887F] mt-0.5">
                Total Rp9.250.000 • Oktober 2026
              </p>
            </div>

            {/* Stacked Percentage Bar */}
            <div className="my-4 h-3 rounded-full bg-[#E6E3DC] overflow-hidden flex">
              {expenseBreakdown.map((item) => (
                <div
                  key={item.category}
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                  }}
                  className="h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full"
                  title={`${item.category}: ${item.percentage}%`}
                />
              ))}
            </div>

            {/* Categories List */}
            <div className="space-y-3.5 mt-4">
              {expenseBreakdown.map((item) => (
                <div
                  key={item.category}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2.5 h-2.5 rounded-sm shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <div>
                      <div className="font-semibold text-[#1C1B18]">
                        {item.category}
                      </div>
                      <div className="text-[10px] text-[#8C887F]">
                        {item.percentage}% dari pengeluaran
                      </div>
                    </div>
                  </div>

                  <span className="font-bold font-mono text-[#1C1B18]">
                    Rp{item.amount.toLocaleString("id-ID")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#E6E3DC] mt-4 text-[11px] text-[#8C887F]">
            Pengeluaran terorganisir otomatis dari nota &amp; kuitansi
          </div>
        </div>
      </div>

      {/* 5. Bottom Card: Transaksi Terakhir */}
      <div className="bg-white rounded-2xl border border-[#E6E3DC] shadow-2xs overflow-hidden">
        {/* Card Header & Filters */}
        <div className="p-5 border-b border-[#E6E3DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-[#1C1B18]">Transaksi terakhir</h2>
            <p className="text-xs text-[#8C887F] mt-0.5">
              Pemasukan dan pengeluaran yang membentuk laporan Anda
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={transactionTypeFilter}
                onChange={(e) => setTransactionTypeFilter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-1.5 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-xs font-semibold text-[#1C1B18] focus:outline-none cursor-pointer"
              >
                <option value="all">Semua transaksi</option>
                <option value="pemasukan">Pemasukan saja</option>
                <option value="pengeluaran">Pengeluaran saja</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#8C887F] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <button
              onClick={() => {}}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E6E3DC] bg-white text-xs font-semibold text-[#1C1B18] hover:bg-[#F9F8F6] transition-colors cursor-pointer"
            >
              <span>Lihat semua</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#6F4E37]" />
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[11px] text-[#8C887F] border-b border-[#E6E3DC] bg-[#F9F8F6]/50">
                <th className="py-3 px-5 font-semibold">Tanggal</th>
                <th className="py-3 px-5 font-semibold">Keterangan</th>
                <th className="py-3 px-5 font-semibold">Kategori</th>
                <th className="py-3 px-5 font-semibold">Jenis</th>
                <th className="py-3 px-5 font-semibold text-right">Nominal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E3DC]/60">
              {filteredTransactions.map((tx) => {
                const isIncome = tx.type === "pemasukan";

                return (
                  <tr
                    key={tx.id}
                    className="hover:bg-[#F9F8F6] transition-colors"
                  >
                    <td className="py-3.5 px-5 font-medium text-[#5C5952]">
                      {tx.date}
                    </td>
                    <td className="py-3.5 px-5 font-bold text-[#1C1B18]">
                      {tx.title}
                    </td>
                    <td className="py-3.5 px-5 text-[#5C5952]">{tx.category}</td>
                    <td className="py-3.5 px-5">
                      {isIncome ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Pemasukan
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#F4EFEA] text-[#6F4E37] border border-[#E6E3DC]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#6F4E37]" />
                          Pengeluaran
                        </span>
                      )}
                    </td>
                    <td
                      className={`py-3.5 px-5 text-right font-extrabold font-mono text-xs ${
                        isIncome ? "text-emerald-700" : "text-[#1C1B18]"
                      }`}
                    >
                      {isIncome ? "+" : "-"} Rp{tx.amount.toLocaleString("id-ID")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Bottom Notice */}
      <div className="flex items-start sm:items-center gap-2 text-xs text-[#5C5952] pt-1">
        <Info className="w-4 h-4 text-[#8C887F] shrink-0 mt-0.5 sm:mt-0" />
        <span>
          Tagihan belum lunas sebesar Rp4.500.000 tidak termasuk dalam pemasukan.
          Deposit penghuni dicatat terpisah.
        </span>
      </div>
    </div>
  );
}
