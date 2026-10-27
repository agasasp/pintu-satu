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

import { useDashboard } from "./DashboardContext";
import { InvoiceItem } from "./types";
import { FileText, X, Check } from "lucide-react";

interface ViewTagihanPembayaranProps {
  onOpenRecordPayment?: () => void;
  onSendWhatsappInvoice?: (name: string, room: string, phone: string, amount: string) => void;
}

export function ViewTagihanPembayaran({
  onOpenRecordPayment,
  onSendWhatsappInvoice,
}: ViewTagihanPembayaranProps) {
  const {
    invoices,
    markInvoiceAsPaid,
    openRecordPayment,
    sendWhatsappReminder,
    sendBulkWhatsappReminder,
    showToast,
  } = useDashboard();

  const [activeTab, setActiveTab] = useState<
    "semua" | "menunggu" | "terlambat" | "lunas"
  >("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeReceipt, setActiveReceipt] = useState<InvoiceItem | null>(null);

  // Dynamic calculations
  const totalInvoicesCount = invoices.length;
  const lunasInvoices = invoices.filter((i) => i.status === "lunas");
  const menungguInvoices = invoices.filter((i) => i.status === "menunggu");
  const terlambatInvoices = invoices.filter((i) => i.status === "terlambat");

  const totalAmount = invoices.reduce((acc, i) => acc + (i.amountNumber || 0), 0);
  const lunasAmount = lunasInvoices.reduce((acc, i) => acc + (i.amountNumber || 0), 0);
  const pendingAmount = invoices
    .filter((i) => i.status !== "lunas")
    .reduce((acc, i) => acc + (i.amountNumber || 0), 0);
  const terlambatAmount = terlambatInvoices.reduce((acc, i) => acc + (i.amountNumber || 0), 0);

  const lunasPercent = totalInvoicesCount > 0 ? Math.round((lunasInvoices.length / totalInvoicesCount) * 100) : 0;

  const filteredInvoices = invoices.filter((inv) => {
    if (activeTab === "menunggu" && inv.status !== "menunggu") return false;
    if (activeTab === "terlambat" && inv.status !== "terlambat") return false;
    if (activeTab === "lunas" && inv.status !== "lunas") return false;

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        inv.tenant.toLowerCase().includes(q) ||
        inv.room.toLowerCase().includes(q) ||
        inv.phone.includes(q) ||
        inv.id.toLowerCase().includes(q)
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
            onClick={() => {
              if (onSendWhatsappInvoice) {
                onSendWhatsappInvoice("Semua Penyewa Tertunda", "Massal", "WA Massal", `Rp${pendingAmount.toLocaleString("id-ID")}`);
              } else {
                sendBulkWhatsappReminder();
              }
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E6E3DC] text-xs font-semibold text-[#1C1B18] hover:bg-[#F9F8F6] transition-colors cursor-pointer shadow-2xs"
          >
            <Send className="w-3.5 h-3.5 text-[#6F4E37]" />
            <span>Kirim WhatsApp Massal</span>
          </button>

          <button
            onClick={() => {
              if (onOpenRecordPayment) onOpenRecordPayment();
              else openRecordPayment();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6F4E37] hover:bg-[#563B28] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Catat pembayaran</span>
          </button>
        </div>
      </div>

      {/* 2. Top 4 Stat Cards (Clickable Filter) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveTab("semua")}
          className={`p-4.5 rounded-2xl border transition-all cursor-pointer shadow-2xs space-y-2 hover:scale-[1.01] ${
            activeTab === "semua"
              ? "bg-[#F4EFEA]/50 border-[#6F4E37] ring-1 ring-[#6F4E37]"
              : "bg-white border-[#E6E3DC] hover:border-[#6F4E37]/50"
          }`}
          title="Klik untuk filter semua tagihan"
        >
          <div className="flex items-center justify-between text-[#5C5952]">
            <span className="text-xs font-medium">Total tagihan bulan ini</span>
            <Receipt className="w-4 h-4 text-[#6F4E37]" />
          </div>
          <div className="text-2xl font-extrabold text-[#1C1B18] tracking-tight">
            Rp{totalAmount.toLocaleString("id-ID")}
          </div>
          <div className="text-[11px] text-[#5C5952]">{totalInvoicesCount} tagihan diterbitkan</div>
        </div>

        <div
          onClick={() => setActiveTab("lunas")}
          className={`p-4.5 rounded-2xl border transition-all cursor-pointer shadow-2xs space-y-2 hover:scale-[1.01] ${
            activeTab === "lunas"
              ? "bg-emerald-50/60 border-emerald-600 ring-1 ring-emerald-600"
              : "bg-white border-[#E6E3DC] hover:border-emerald-500/50"
          }`}
          title="Klik untuk filter tagihan lunas"
        >
          <div className="flex items-center justify-between text-[#5C5952]">
            <span className="text-xs font-medium">Sudah lunas</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-[#1C1B18] tracking-tight">
            Rp{lunasAmount.toLocaleString("id-ID")}
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold">
            {lunasInvoices.length} tagihan lunas ({lunasPercent}%)
          </div>
        </div>

        <div
          onClick={() => setActiveTab("menunggu")}
          className={`p-4.5 rounded-2xl border transition-all cursor-pointer shadow-2xs space-y-2 hover:scale-[1.01] ${
            activeTab === "menunggu"
              ? "bg-amber-50/60 border-amber-600 ring-1 ring-amber-600"
              : "bg-white border-[#E6E3DC] hover:border-amber-500/50"
          }`}
          title="Klik untuk filter belum lunas"
        >
          <div className="flex items-center justify-between text-[#5C5952]">
            <span className="text-xs font-medium">Belum lunas</span>
            <Clock className="w-4 h-4 text-[#C88A58]" />
          </div>
          <div className="text-2xl font-extrabold text-[#1C1B18] tracking-tight">
            Rp{pendingAmount.toLocaleString("id-ID")}
          </div>
          <div className="text-[11px] text-amber-700 font-medium">
            {menungguInvoices.length} tagihan menunggu bayar
          </div>
        </div>

        <div
          onClick={() => setActiveTab("terlambat")}
          className={`p-4.5 rounded-2xl border transition-all cursor-pointer shadow-2xs space-y-2 hover:scale-[1.01] ${
            activeTab === "terlambat"
              ? "bg-red-50/60 border-red-600 ring-1 ring-red-600"
              : "bg-white border-[#E6E3DC] hover:border-red-500/50"
          }`}
          title="Klik untuk filter terlambat"
        >
          <div className="flex items-center justify-between text-[#5C5952]">
            <span className="text-xs font-medium">Melewati jatuh tempo</span>
            <AlertCircle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-extrabold text-[#1C1B18] tracking-tight">
            {terlambatInvoices.length} tagihan
          </div>
          <div className="text-[11px] text-red-700 font-semibold">
            Rp{terlambatAmount.toLocaleString("id-ID")} tertunda
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
            <span>Semua tagihan ({totalInvoicesCount})</span>
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
            <span>Menunggu pembayaran ({menungguInvoices.length})</span>
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
            <span>Terlambat ({terlambatInvoices.length})</span>
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
            <span>Lunas ({lunasInvoices.length})</span>
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
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            openRecordPayment({
                              roomNumber: inv.room,
                              tenantName: inv.tenant,
                              amount: inv.amountNumber,
                            });
                          }}
                          className="px-2.5 py-1.5 rounded-xl border border-[#E6E3DC] text-xs font-semibold text-[#1C1B18] hover:bg-[#F9F8F6] cursor-pointer"
                        >
                          Catat Lunas
                        </button>
                        <button
                          onClick={() => {
                            if (onSendWhatsappInvoice) {
                              onSendWhatsappInvoice(inv.tenant, inv.room, inv.phone, inv.amount);
                            } else {
                              sendWhatsappReminder(inv.tenant, inv.room, inv.phone, inv.amount);
                            }
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#6F4E37] hover:bg-[#563B28] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Kirim WA</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setActiveReceipt(inv)}
                        className="px-3 py-1.5 rounded-xl border border-[#E6E3DC] text-xs font-semibold text-[#1C1B18] hover:bg-[#F9F8F6] inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#6F4E37]" />
                        <span>Kuitansi</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Kuitansi Modal */}
      {activeReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-[#E6E3DC] shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E3DC]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <Check className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-[#1C1B18]">
                  Kuitansi Pembayaran
                </h3>
              </div>
              <button
                onClick={() => setActiveReceipt(null)}
                className="p-1 rounded-lg text-[#8C887F] hover:text-[#1C1B18]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#F9F8F6] border border-[#E6E3DC] space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-[#8C887F]">No. Invoice</span>
                <span className="font-mono font-bold text-[#1C1B18]">{activeReceipt.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C887F]">Penghuni</span>
                <span className="font-bold text-[#1C1B18]">{activeReceipt.tenant}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C887F]">Kamar</span>
                <span className="font-bold text-[#1C1B18]">{activeReceipt.room}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C887F]">Waktu Pembayaran</span>
                <span className="font-medium text-[#1C1B18]">{activeReceipt.paidAt || "26 Okt 2026, 09.12 WIB"}</span>
              </div>
              <div className="h-px bg-[#E6E3DC]" />
              <div className="flex justify-between text-sm">
                <span className="font-bold text-[#1C1B18]">Total Dibayar</span>
                <span className="font-extrabold text-[#6F4E37] font-mono">{activeReceipt.amount}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setActiveReceipt(null)}
                className="px-4 py-2 rounded-xl border border-[#E6E3DC] text-xs font-semibold text-[#1C1B18] hover:bg-[#F9F8F6] cursor-pointer"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  showToast(
                    "Unduh Kuitansi",
                    `Kuitansi resmi ${activeReceipt.id} (${activeReceipt.tenant}) berhasil diunduh dalam format PDF.`
                  );
                  setActiveReceipt(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#6F4E37] text-white text-xs font-semibold hover:bg-[#563B28] inline-flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Unduh PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
