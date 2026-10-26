"use client";

import { useState } from "react";
import {
  Receipt,
  Send,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  MessageSquare,
} from "lucide-react";

interface ViewTagihanPembayaranProps {
  onOpenRecordPayment: () => void;
  onSendWhatsappInvoice: (name: string, room: string, phone: string, amount: string) => void;
}

export function ViewTagihanPembayaran({
  onOpenRecordPayment,
  onSendWhatsappInvoice,
}: ViewTagihanPembayaranProps) {
  const [activeTab, setActiveTab] = useState<
    "semua" | "menunggu" | "terlambat" | "lunas"
  >("semua");
  const [searchQuery, setSearchQuery] = useState("");

  const invoices = [
    {
      id: "INV-2026-001",
      room: "A-05",
      tenant: "Andi Saputra",
      phone: "0821-4567-8901",
      amount: "Rp1.500.000",
      dueDate: "20 Okt 2026",
      status: "terlambat",
      statusLabel: "Terlambat",
    },
    {
      id: "INV-2026-002",
      room: "A-03",
      tenant: "Dewi Lestari",
      phone: "0857-1122-3344",
      amount: "Rp1.500.000",
      dueDate: "28 Okt 2026",
      status: "menunggu",
      statusLabel: "Belum dibayar",
    },
    {
      id: "INV-2026-003",
      room: "A-04",
      tenant: "Fajar Ramadhan",
      phone: "0812-8899-0011",
      amount: "Rp1.500.000",
      dueDate: "28 Okt 2026",
      status: "menunggu",
      statusLabel: "Belum dibayar",
    },
    {
      id: "INV-2026-004",
      room: "A-01",
      tenant: "Putri Aprilia",
      phone: "0812-3456-7890",
      amount: "Rp1.500.000",
      dueDate: "25 Okt 2026",
      status: "lunas",
      statusLabel: "Lunas",
      paidAt: "26 Okt 2026, 09.12 WIB via BCA",
    },
    {
      id: "INV-2026-005",
      room: "A-02",
      tenant: "Rizky Maulana",
      phone: "0813-2234-5678",
      amount: "Rp1.500.000",
      dueDate: "25 Okt 2026",
      status: "lunas",
      statusLabel: "Lunas",
      paidAt: "25 Okt 2026, 14.20 WIB via QRIS",
    },
    {
      id: "INV-2026-006",
      room: "B-01",
      tenant: "Nadia Salsabila",
      phone: "0813-9090-1212",
      amount: "Rp1.750.000",
      dueDate: "25 Okt 2026",
      status: "lunas",
      statusLabel: "Lunas",
      paidAt: "24 Okt 2026, 18.00 WIB via BCA",
    },
  ];

  const filteredInvoices = invoices.filter((inv) => {
    if (activeTab === "menunggu" && inv.status !== "menunggu") return false;
    if (activeTab === "terlambat" && inv.status !== "terlambat") return false;
    if (activeTab === "lunas" && inv.status !== "lunas") return false;

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        inv.tenant.toLowerCase().includes(q) ||
        inv.room.toLowerCase().includes(q) ||
        inv.phone.includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1B18] tracking-tight">
            Tagihan &amp; pembayaran
          </h1>
          <p className="text-xs sm:text-sm text-[#5C5952] mt-1">
            Kelola invoice sewa, pantau pembayaran tertunda, dan kirim pengingat tagihan via WhatsApp.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              onSendWhatsappInvoice(
                "Semua Penyewa Tertunda",
                "Massal",
                "WA Massal",
                "Rp4.500.000"
              )
            }
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E6E3DC] text-xs font-semibold text-[#1C1B18] hover:bg-[#F9F8F6] transition-colors cursor-pointer shadow-2xs"
          >
            <Send className="w-3.5 h-3.5 text-[#6F4E37]" />
            <span>Kirim WhatsApp Massal</span>
          </button>

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
        <div className="bg-white p-4.5 rounded-2xl border border-[#E6E3DC] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[#5C5952]">
            <span className="text-xs font-medium">Total tagihan bulan ini</span>
            <Receipt className="w-4 h-4 text-[#6F4E37]" />
          </div>
          <div className="text-2xl font-extrabold text-[#1C1B18] tracking-tight">
            Rp43.000.000
          </div>
          <div className="text-[11px] text-[#5C5952]">28 tagihan diterbitkan</div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-[#E6E3DC] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[#5C5952]">
            <span className="text-xs font-medium">Sudah lunas</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-[#1C1B18] tracking-tight">
            Rp38.500.000
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold">
            25 tagihan lunas (89%)
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-[#E6E3DC] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[#5C5952]">
            <span className="text-xs font-medium">Belum lunas</span>
            <Clock className="w-4 h-4 text-[#C88A58]" />
          </div>
          <div className="text-2xl font-extrabold text-[#1C1B18] tracking-tight">
            Rp4.500.000
          </div>
          <div className="text-[11px] text-amber-700 font-medium">
            3 tagihan menunggu bayar
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-2xl border border-[#E6E3DC] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[#5C5952]">
            <span className="text-xs font-medium">Melewati jatuh tempo</span>
            <AlertCircle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-extrabold text-[#1C1B18] tracking-tight">
            1 tagihan
          </div>
          <div className="text-[11px] text-red-700 font-semibold">
            Rp1.500.000 • Kamar A-05
          </div>
        </div>
      </div>

      {/* 3. Filter Tabs & Search */}
      <div className="bg-white rounded-2xl border border-[#E6E3DC] shadow-2xs overflow-hidden">
        {/* Tabs Bar */}
        <div className="px-5 pt-4 border-b border-[#E6E3DC] flex items-center gap-6 text-xs font-semibold text-[#8C887F]">
          <button
            onClick={() => setActiveTab("semua")}
            className={`pb-3 relative transition-colors cursor-pointer ${
              activeTab === "semua"
                ? "text-[#6F4E37] font-bold"
                : "hover:text-[#1C1B18]"
            }`}
          >
            <span>Semua tagihan (28)</span>
            {activeTab === "semua" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6F4E37] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("menunggu")}
            className={`pb-3 relative transition-colors cursor-pointer ${
              activeTab === "menunggu"
                ? "text-[#6F4E37] font-bold"
                : "hover:text-[#1C1B18]"
            }`}
          >
            <span>Menunggu pembayaran (2)</span>
            {activeTab === "menunggu" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6F4E37] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("terlambat")}
            className={`pb-3 relative transition-colors cursor-pointer ${
              activeTab === "terlambat"
                ? "text-[#6F4E37] font-bold"
                : "hover:text-[#1C1B18]"
            }`}
          >
            <span>Terlambat (1)</span>
            {activeTab === "terlambat" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6F4E37] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("lunas")}
            className={`pb-3 relative transition-colors cursor-pointer ${
              activeTab === "lunas"
                ? "text-[#6F4E37] font-bold"
                : "hover:text-[#1C1B18]"
            }`}
          >
            <span>Lunas (25)</span>
            {activeTab === "lunas" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6F4E37] rounded-full" />
            )}
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-4 border-b border-[#E6E3DC] flex items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C887F]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kamar, nama, atau HP..."
              className="w-full pl-9 pr-3 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-xs text-[#1C1B18] placeholder-[#8C887F] focus:outline-none focus:bg-white focus:border-[#6F4E37] transition-all"
            />
          </div>
        </div>

        {/* Invoices Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[11px] text-[#8C887F] border-b border-[#E6E3DC] bg-[#F9F8F6]/50">
                <th className="py-3 px-5 font-semibold">Penghuni / Kamar</th>
                <th className="py-3 px-5 font-semibold">Nominal</th>
                <th className="py-3 px-5 font-semibold">Jatuh Tempo</th>
                <th className="py-3 px-5 font-semibold">Status</th>
                <th className="py-3 px-5 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E3DC]/60">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-[#F9F8F6] transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="font-bold text-[#1C1B18]">{inv.tenant}</div>
                    <div className="text-[11px] text-[#8C887F]">
                      Kamar {inv.room} • {inv.phone}
                    </div>
                  </td>

                  <td className="py-3.5 px-5 font-bold font-mono text-[#1C1B18]">
                    {inv.amount}
                  </td>

                  <td className="py-3.5 px-5">
                    <span
                      className={`font-medium ${
                        inv.status === "terlambat"
                          ? "text-red-600 font-bold"
                          : "text-[#5C5952]"
                      }`}
                    >
                      {inv.dueDate}
                    </span>
                    {inv.paidAt && (
                      <div className="text-[10px] text-emerald-700 mt-0.5">
                        {inv.paidAt}
                      </div>
                    )}
                  </td>

                  <td className="py-3.5 px-5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        inv.status === "lunas"
                          ? "bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]"
                          : inv.status === "terlambat"
                          ? "bg-red-50 text-red-700 border border-red-200"
                          : "bg-amber-50 text-amber-800 border border-amber-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          inv.status === "lunas"
                            ? "bg-emerald-500"
                            : inv.status === "terlambat"
                            ? "bg-red-500"
                            : "bg-amber-500"
                        }`}
                      />
                      {inv.statusLabel}
                    </span>
                  </td>

                  <td className="py-3.5 px-5 text-right">
                    {inv.status !== "lunas" ? (
                      <button
                        onClick={() =>
                          onSendWhatsappInvoice(
                            inv.tenant,
                            inv.room,
                            inv.phone,
                            inv.amount
                          )
                        }
                        className="px-3 py-1.5 rounded-xl bg-[#6F4E37] hover:bg-[#563B28] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Kirim WA</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-[#8C887F]">
                        Terverifikasi
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
