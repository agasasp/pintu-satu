"use client";

import { useState } from "react";
import {
  Users,
  Clock,
  LogIn,
  LogOut,
  Upload,
  UserPlus,
  Search,
  ChevronDown,
  Download,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { initialTenants } from "./mockData";
import { TenantItem } from "./types";
import { useDashboard } from "./DashboardContext";
import { X, MessageSquare, FileText, CheckCircle2 } from "lucide-react";

interface ViewDataPenghuniProps {
  onOpenAddTenant?: () => void;
  onOpenTenantDetail?: (tenant: TenantItem) => void;
  onExtendContract?: (tenant: TenantItem) => void;
}

export function ViewDataPenghuni({
  onOpenAddTenant,
  onOpenTenantDetail,
  onExtendContract,
}: ViewDataPenghuniProps) {
  const {
    tenants,
    addTenant,
    extendTenantContract,
    openAddTenant: contextOpenAddTenant,
    showToast,
  } = useDashboard();

  const [activeTab, setActiveTab] = useState<"aktif" | "segera_berakhir" | "riwayat">(
    "aktif"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roomTypeFilter, setRoomTypeFilter] = useState("all");
  const [selectedTenantIds, setSelectedTenantIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  // Detail Modal State
  const [activeDetailTenant, setActiveDetailTenant] = useState<TenantItem | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Dynamic counts
  const aktifCount = tenants.filter((t) => t.status !== "selesai").length;
  const segeraBerakhirCount = tenants.filter((t) => t.status === "segera_berakhir").length;
  const selesaiCount = tenants.filter((t) => t.status === "selesai").length;

  // Filter logic
  const filteredTenants = tenants.filter((t) => {
    if (activeTab === "segera_berakhir" && t.status !== "segera_berakhir") return false;
    if (activeTab === "aktif" && t.status === "selesai") return false;
    if (activeTab === "riwayat" && t.status !== "selesai") return false;

    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchName = t.name.toLowerCase().includes(q);
      const matchPhone = t.phone.toLowerCase().includes(q);
      const matchRoom = t.roomNumber.toLowerCase().includes(q);
      return matchName || matchPhone || matchRoom;
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredTenants.length / pageSize));
  const paginatedTenants = filteredTenants.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const toggleSelectAll = () => {
    if (selectedTenantIds.length === paginatedTenants.length) {
      setSelectedTenantIds([]);
    } else {
      setSelectedTenantIds(paginatedTenants.map((t) => t.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedTenantIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExportCSV = () => {
    const headers = "Nama,Kamar,No HP,Masa Sewa Mulai,Masa Sewa Selesai,Tarif Bulanan,Status\n";
    const rows = filteredTenants
      .map(
        (t) =>
          `"${t.name}","${t.roomNumber}","${t.phone}","${t.startDate}","${t.endDate}","${t.rentAmount}","${t.status}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `penghuni_kost_${activeTab}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(
      "Ekspor Berhasil",
      `Data ${filteredTenants.length} penghuni berhasil diunduh sebagai file CSV.`
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1B18] tracking-tight">
            Data penghuni
          </h1>
          <p className="text-xs sm:text-sm text-[#5C5952] mt-1">
            Data penghuni dan masa sewa yang rapi, dari check-in hingga check-out.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E6E3DC] text-xs font-semibold text-[#1C1B18] hover:bg-[#F9F8F6] transition-colors cursor-pointer shadow-2xs"
          >
            <Upload className="w-3.5 h-3.5 text-[#6F4E37]" />
            <span>Impor data</span>
          </button>

          <button
            onClick={() => (onOpenAddTenant ? onOpenAddTenant() : contextOpenAddTenant())}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6F4E37] hover:bg-[#563B28] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <UserPlus className="w-4 h-4" />
            <span>Tambah penghuni</span>
          </button>
        </div>
      </div>

      {/* 2. Top 4 Stat Cards (Clickable Filter) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div
          onClick={() => setActiveTab("aktif")}
          className={`p-4.5 rounded-2xl border transition-all cursor-pointer shadow-2xs space-y-2 hover:scale-[1.01] ${
            activeTab === "aktif"
              ? "bg-[#F4EFEA]/50 border-[#6F4E37] ring-1 ring-[#6F4E37]"
              : "bg-white border-[#E6E3DC] hover:border-[#6F4E37]/50"
          }`}
          title="Klik untuk melihat penghuni aktif"
        >
          <div className="flex items-center justify-between text-[#5C5952]">
            <span className="text-xs font-medium">Penghuni aktif</span>
            <Users className="w-4 h-4 text-[#6F4E37]" />
          </div>
          <div className="text-2xl font-extrabold text-[#1C1B18] tracking-tight">
            {aktifCount} orang
          </div>
          <div className="text-[11px] text-[#6F4E37] font-semibold">
            Di {aktifCount} kamar terisi
          </div>
        </div>

        {/* Card 2 */}
        <div
          onClick={() => setActiveTab("segera_berakhir")}
          className={`p-4.5 rounded-2xl border transition-all cursor-pointer shadow-2xs space-y-2 hover:scale-[1.01] ${
            activeTab === "segera_berakhir"
              ? "bg-[#FEF3C7]/60 border-amber-600 ring-1 ring-amber-600"
              : "bg-white border-[#E6E3DC] hover:border-[#C88A58]/50"
          }`}
          title="Klik untuk melihat kontrak segera berakhir"
        >
          <div className="flex items-center justify-between text-[#5C5952]">
            <span className="text-xs font-medium">Kontrak segera berakhir</span>
            <Clock className="w-4 h-4 text-[#C88A58]" />
          </div>
          <div className="text-2xl font-extrabold text-[#1C1B18] tracking-tight">
            {segeraBerakhirCount} kontrak
          </div>
          <div className="text-[11px] text-amber-700 font-medium">
            Berakhir dalam 7 hari
          </div>
        </div>

        {/* Card 3 */}
        <div
          onClick={() => {
            showToast("Check-in Bulan Ini", "3 penghuni baru check-in pada bulan Oktober 2026.");
          }}
          className="bg-white p-4.5 rounded-2xl border border-[#E6E3DC] hover:border-[#6F4E37]/50 transition-all cursor-pointer shadow-2xs space-y-2 hover:scale-[1.01]"
          title="Klik untuk info check-in"
        >
          <div className="flex items-center justify-between text-[#5C5952]">
            <span className="text-xs font-medium">Check-in bulan ini</span>
            <LogIn className="w-4 h-4 text-[#6F4E37]" />
          </div>
          <div className="text-2xl font-extrabold text-[#1C1B18] tracking-tight">
            3 penghuni
          </div>
          <div className="text-[11px] text-[#5C5952]">
            Terbaru: <span className="font-semibold text-[#1C1B18]">Rizky • 25 Oktober</span>
          </div>
        </div>

        {/* Card 4 */}
        <div
          onClick={() => setActiveTab("riwayat")}
          className={`p-4.5 rounded-2xl border transition-all cursor-pointer shadow-2xs space-y-2 hover:scale-[1.01] ${
            activeTab === "riwayat"
              ? "bg-[#F4EFEA]/50 border-[#6F4E37] ring-1 ring-[#6F4E37]"
              : "bg-white border-[#E6E3DC] hover:border-[#8C887F]/50"
          }`}
          title="Klik untuk melihat riwayat check-out"
        >
          <div className="flex items-center justify-between text-[#5C5952]">
            <span className="text-xs font-medium">Check-out bulan ini</span>
            <LogOut className="w-4 h-4 text-[#8C887F]" />
          </div>
          <div className="text-2xl font-extrabold text-[#1C1B18] tracking-tight">
            {selesaiCount} penghuni
          </div>
          <div className="text-[11px] text-[#5C5952]">Riwayat masa sewa selesai</div>
        </div>
      </div>

      {/* 3. Warning Alert Banner */}
      <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-900 shadow-2xs">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 shrink-0 mt-0.5 sm:mt-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#1C1B18]">
              {segeraBerakhirCount > 0 ? `${segeraBerakhirCount} kontrak penghuni segera berakhir` : "Semua masa kontrak penghuni aktif"}
            </div>
            <div className="text-[11px] text-[#5C5952] mt-0.5">
              Hubungi penghuni untuk konfirmasi perpanjangan atau jadwalkan check-out.
            </div>
          </div>
        </div>

        <button
          onClick={() => setActiveTab("segera_berakhir")}
          className="text-xs font-bold text-[#6F4E37] hover:text-[#563B28] flex items-center gap-1 shrink-0 cursor-pointer self-start sm:self-auto"
        >
          <span>Tinjau {segeraBerakhirCount} kontrak</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4. Table Container with Tabs & Filters */}
      <div className="bg-white rounded-2xl border border-[#E6E3DC] shadow-2xs overflow-hidden">
        {/* Tabs Bar */}
        <div className="px-5 pt-4 border-b border-[#E6E3DC] flex items-center gap-6 text-xs font-semibold text-[#8C887F]">
          <button
            onClick={() => {
              setActiveTab("aktif");
              setCurrentPage(1);
            }}
            className={`pb-3 relative transition-colors cursor-pointer ${
              activeTab === "aktif"
                ? "text-[#6F4E37] font-bold"
                : "hover:text-[#1C1B18]"
            }`}
          >
            <span>Penghuni aktif ({aktifCount})</span>
            {activeTab === "aktif" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6F4E37] rounded-full" />
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab("segera_berakhir");
              setCurrentPage(1);
            }}
            className={`pb-3 relative transition-colors cursor-pointer ${
              activeTab === "segera_berakhir"
                ? "text-[#6F4E37] font-bold"
                : "hover:text-[#1C1B18]"
            }`}
          >
            <span>Segera berakhir ({segeraBerakhirCount})</span>
            {activeTab === "segera_berakhir" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6F4E37] rounded-full" />
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab("riwayat");
              setCurrentPage(1);
            }}
            className={`pb-3 relative transition-colors cursor-pointer ${
              activeTab === "riwayat"
                ? "text-[#6F4E37] font-bold"
                : "hover:text-[#1C1B18]"
            }`}
          >
            <span>Riwayat penghuni ({selesaiCount})</span>
            {activeTab === "riwayat" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6F4E37] rounded-full" />
            )}
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 border-b border-[#E6E3DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            {/* Search */}
            <div className="relative flex-1 min-w-[240px] max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C887F]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama, nomor HP, atau kamar..."
                className="w-full pl-9 pr-3 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-xs text-[#1C1B18] placeholder-[#8C887F] focus:outline-none focus:bg-white focus:border-[#6F4E37] transition-all"
              />
            </div>

            {/* Status dropdown */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-xs font-medium text-[#1C1B18] focus:outline-none focus:bg-white cursor-pointer"
              >
                <option value="all">Semua status kontrak</option>
                <option value="aktif">Aktif</option>
                <option value="segera_berakhir">Segera berakhir</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#8C887F] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Room type dropdown */}
            <div className="relative">
              <select
                value={roomTypeFilter}
                onChange={(e) => setRoomTypeFilter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-xs font-medium text-[#1C1B18] focus:outline-none focus:bg-white cursor-pointer"
              >
                <option value="all">Semua tipe kamar</option>
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#8C887F] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Export action */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#E6E3DC] bg-white text-xs font-semibold text-[#1C1B18] hover:bg-[#F9F8F6] transition-colors cursor-pointer self-start sm:self-auto shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-[#6F4E37]" />
            <span>Ekspor CSV</span>
          </button>
        </div>

        {/* Tenants Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[11px] text-[#8C887F] border-b border-[#E6E3DC] bg-[#F9F8F6]/50">
                <th className="py-3 px-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={
                      selectedTenantIds.length === filteredTenants.length &&
                      filteredTenants.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="rounded border-[#E6E3DC] text-[#6F4E37] focus:ring-[#6F4E37] cursor-pointer"
                  />
                </th>
                <th className="py-3 px-4 font-semibold">Penghuni</th>
                <th className="py-3 px-4 font-semibold">Kamar</th>
                <th className="py-3 px-4 font-semibold">Masa sewa</th>
                <th className="py-3 px-4 font-semibold">Sewa / bulan</th>
                <th className="py-3 px-4 font-semibold">Status kontrak</th>
                <th className="py-3 px-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E3DC]/60">
              {paginatedTenants.map((t) => {
                const isSelected = selectedTenantIds.includes(t.id);
                const isEnding = t.status === "segera_berakhir";

                return (
                  <tr
                    key={t.id}
                    className={`hover:bg-[#F9F8F6] transition-colors ${
                      isSelected ? "bg-[#F4EFEA]/30" : ""
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectOne(t.id)}
                        className="rounded border-[#E6E3DC] text-[#6F4E37] focus:ring-[#6F4E37] cursor-pointer"
                      />
                    </td>

                    {/* Penghuni with Initials Avatar & Phone */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#F4EFEA] border border-[#E6E3DC] text-[#6F4E37] flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                          {t.initials}
                        </div>
                        <div>
                          <div className="font-bold text-[#1C1B18]">{t.name}</div>
                          <div className="text-[11px] text-[#8C887F] font-mono">
                            {t.phone}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Kamar */}
                    <td className="py-3 px-4 font-bold text-[#1C1B18]">
                      {t.roomNumber}
                    </td>

                    {/* Masa sewa */}
                    <td className="py-3 px-4">
                      <div className="font-medium text-[#1C1B18]">
                        {t.startDate} – {t.endDate}
                      </div>
                      <div className="text-[10px] text-[#8C887F]">
                        {isEnding ? (
                          <span className="text-amber-700 font-semibold">
                            Sisa {t.daysRemaining || 5} hari
                          </span>
                        ) : (
                          "Kontrak terverifikasi"
                        )}
                      </div>
                    </td>

                    {/* Sewa / bulan */}
                    <td className="py-3 px-4 font-semibold text-[#1C1B18]">
                      Rp{t.rentAmount.toLocaleString("id-ID")}
                    </td>

                    {/* Status badge */}
                    <td className="py-3 px-4">
                      {isEnding ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          Segera berakhir
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Aktif
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {isEnding ? (
                          <button
                            onClick={() => {
                              if (onExtendContract) onExtendContract(t);
                              else extendTenantContract(t.id);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-[#6F4E37] text-white text-xs font-semibold hover:bg-[#563B28] cursor-pointer"
                          >
                            Perpanjang
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              if (onOpenTenantDetail) onOpenTenantDetail(t);
                              setActiveDetailTenant(t);
                            }}
                            className="px-2.5 py-1 rounded-lg border border-[#E6E3DC] text-xs font-semibold text-[#1C1B18] hover:bg-[#F9F8F6] cursor-pointer"
                          >
                            Detail
                          </button>
                        )}
                        <button
                          onClick={() => setActiveDetailTenant(t)}
                          className="p-1 rounded-lg text-[#8C887F] hover:text-[#1C1B18] hover:bg-[#F9F8F6] cursor-pointer"
                          title="Menu aksi"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer & Pagination */}
        <div className="p-4 border-t border-[#E6E3DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#5C5952]">
          <span>
            Menampilkan {filteredTenants.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, filteredTenants.length)} dari {filteredTenants.length} penghuni
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-[#E6E3DC] bg-white text-[#5C5952] hover:bg-[#F9F8F6] disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  currentPage === page
                    ? "bg-[#6F4E37] text-white"
                    : "border border-[#E6E3DC] bg-white text-[#5C5952] hover:bg-[#F9F8F6]"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage >= totalPages}
              className="p-1.5 rounded-lg border border-[#E6E3DC] bg-white text-[#5C5952] hover:bg-[#F9F8F6] disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Bottom Security Privacy Note */}
      <div className="flex items-center gap-2 text-xs text-[#5C5952] pt-1">
        <ShieldCheck className="w-4 h-4 text-[#6F4E37]" />
        <span>
          Data pribadi penghuni hanya dapat diakses oleh pemilik dan tim yang diberi izin.
        </span>
      </div>

      {/* Tenant Detail Modal */}
      {activeDetailTenant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-[#E6E3DC] shadow-2xl max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E3DC]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F4EFEA] border border-[#E6E3DC] text-[#6F4E37] flex items-center justify-center font-bold text-sm shadow-xs">
                  {activeDetailTenant.initials}
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#1C1B18]">
                    {activeDetailTenant.name}
                  </h3>
                  <p className="text-xs text-[#8C887F]">
                    Kamar {activeDetailTenant.roomNumber} • {activeDetailTenant.phone}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveDetailTenant(null)}
                className="p-1 rounded-lg text-[#8C887F] hover:text-[#1C1B18]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#F9F8F6] border border-[#E6E3DC]">
                <span className="text-[10px] text-[#8C887F] font-semibold uppercase">Masa Sewa</span>
                <p className="font-bold text-[#1C1B18] mt-0.5">
                  {activeDetailTenant.startDate} – {activeDetailTenant.endDate}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#F9F8F6] border border-[#E6E3DC]">
                <span className="text-[10px] text-[#8C887F] font-semibold uppercase">Tarif Sewa Bulanan</span>
                <p className="font-bold text-[#1C1B18] mt-0.5">
                  Rp{activeDetailTenant.rentAmount.toLocaleString("id-ID")}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#F9F8F6] border border-[#E6E3DC]">
                <span className="text-[10px] text-[#8C887F] font-semibold uppercase">Status KTP &amp; Berkas</span>
                <p className="font-bold text-emerald-700 mt-0.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Terverifikasi Lengkap</span>
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#F9F8F6] border border-[#E6E3DC]">
                <span className="text-[10px] text-[#8C887F] font-semibold uppercase">Deposit Jaminan</span>
                <p className="font-bold text-[#1C1B18] mt-0.5">
                  Rp1.500.000 (Tersimpan)
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-end gap-2">
              <button
                onClick={() => {
                  const cleanPhone = activeDetailTenant.phone.replace(/[^0-9]/g, "");
                  const targetPhone = cleanPhone.startsWith("0") ? "62" + cleanPhone.slice(1) : cleanPhone;
                  window.open(
                    `https://wa.me/${targetPhone}?text=${encodeURIComponent(
                      `Halo ${activeDetailTenant.name}, kami dari pengelola Kost Cemara.`
                    )}`,
                    "_blank"
                  );
                  showToast(
                    "WhatsApp Terhubung",
                    `Membuka obrolan WhatsApp dengan ${activeDetailTenant.name} (${activeDetailTenant.phone}).`
                  );
                }}
                className="px-3.5 py-2 rounded-xl border border-[#E6E3DC] text-xs font-semibold text-[#1C1B18] hover:bg-[#F9F8F6] inline-flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#6F4E37]" />
                <span>Kirim WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  const contractText = `SURAT PERJANJIAN SEWA KOST\n\nNama Penghuni: ${activeDetailTenant.name}\nUnit Kamar: ${activeDetailTenant.roomNumber}\nNo. Telepon: ${activeDetailTenant.phone}\nPeriode Sewa: ${activeDetailTenant.startDate} - ${activeDetailTenant.endDate}\nTarif Bulanan: Rp${activeDetailTenant.rentAmount.toLocaleString("id-ID")}\n\nPerjanjian ini berlaku resmi sesuai ketentuan Kost Cemara.`;
                  const blob = new Blob([contractText], { type: "text/plain;charset=utf-8" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `Kontrak_Sewa_${activeDetailTenant.roomNumber}_${activeDetailTenant.name.replace(/\s+/g, "_")}.txt`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  showToast(
                    "Surat Kontrak Sewa",
                    `Dokumen Perjanjian Sewa Kamar ${activeDetailTenant.roomNumber} (${activeDetailTenant.name}) telah diunduh.`
                  );
                }}
                className="px-3.5 py-2 rounded-xl border border-[#E6E3DC] text-xs font-semibold text-[#1C1B18] hover:bg-[#F9F8F6] inline-flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#6F4E37]" />
                <span>Unduh Kontrak</span>
              </button>

              <button
                onClick={() => {
                  if (onExtendContract) onExtendContract(activeDetailTenant);
                  else extendTenantContract(activeDetailTenant.id);
                  setActiveDetailTenant(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#6F4E37] text-white text-xs font-semibold hover:bg-[#563B28] cursor-pointer"
              >
                Perpanjang Kontrak
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Impor Data Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-[#E6E3DC] shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E3DC]">
              <h3 className="font-bold text-base text-[#1C1B18]">
                Impor Data Penghuni
              </h3>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="p-1 rounded-lg text-[#8C887F] hover:text-[#1C1B18]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 border-2 border-dashed border-[#E6E3DC] rounded-2xl text-center space-y-2 bg-[#F9F8F6] hover:bg-[#F4EFEA]/40 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-[#6F4E37] mx-auto" />
              <div className="text-xs font-bold text-[#1C1B18]">
                Tarik file CSV / Excel ke sini
              </div>
              <p className="text-[11px] text-[#8C887F]">
                Format kolom: Nama, Kamar, Nomor HP, Masa Sewa, Tarif Sewa
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-[#E6E3DC] text-xs font-semibold text-[#1C1B18] hover:bg-[#F9F8F6] cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  const importedTenant: TenantItem = {
                    id: `T-${Date.now().toString().slice(-4)}`,
                    name: "Dimas Anggara (Impor)",
                    initials: "DA",
                    phone: "0812-9988-7711",
                    roomNumber: "B-03",
                    startDate: "1 Nov 2026",
                    endDate: "31 Okt 2027",
                    rentAmount: 1750000,
                    status: "aktif",
                    verified: true,
                  };
                  addTenant(importedTenant);
                  setIsImportModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#6F4E37] text-white text-xs font-semibold hover:bg-[#563B28] cursor-pointer"
              >
                Proses Impor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
