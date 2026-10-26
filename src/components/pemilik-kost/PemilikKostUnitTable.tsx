"use client";

import { Search, Zap, Send } from "lucide-react";
import { UnitItem } from "./types";

interface PemilikKostUnitTableProps {
  units: UnitItem[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedFloor: "all" | "1" | "2";
  onFloorChange: (floor: "all" | "1" | "2") => void;
  activeTab: "semua" | "terisi" | "kosong" | "nunggak";
  onTabChange: (tab: "semua" | "terisi" | "kosong" | "nunggak") => void;
  onTogglePayment: (unitId: string) => void;
  onSendWhatsapp: (unit: UnitItem) => void;
}

export function PemilikKostUnitTable({
  units,
  searchQuery,
  onSearchChange,
  selectedFloor,
  onFloorChange,
  activeTab,
  onTabChange,
  onTogglePayment,
  onSendWhatsapp,
}: PemilikKostUnitTableProps) {
  const filteredUnits = units.filter((u) => {
    const matchesSearch =
      u.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.tenantName && u.tenantName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFloor = selectedFloor === "all" || u.floor.toString() === selectedFloor;

    if (!matchesSearch || !matchesFloor) return false;

    if (activeTab === "terisi") return u.paymentStatus !== "Kosong";
    if (activeTab === "kosong") return u.paymentStatus === "Kosong";
    if (activeTab === "nunggak") return u.paymentStatus === "Belum Lunas";
    return true;
  });

  const occupiedCount = units.filter((u) => u.paymentStatus !== "Kosong").length;
  const vacantCount = units.filter((u) => u.paymentStatus === "Kosong").length;
  const unpaidCount = units.filter((u) => u.paymentStatus === "Belum Lunas").length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#1C1B18]">Status Unit &amp; Tagihan Penghuni</h2>
          <p className="text-xs text-[#5C5952]">
            Klik status pembayaran pada baris kamar untuk memperbarui status lunas secara instan.
          </p>
        </div>

        {/* Search, Floor Selector & Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-[#8C887F] absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari kamar / nama..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl bg-[#F9F8F6] border border-[#E6E3DC] text-xs text-[#1C1B18] placeholder-[#8C887F] focus:outline-none focus:border-[#6F4E37] w-40 sm:w-48"
            />
          </div>

          <select
            value={selectedFloor}
            onChange={(e) => onFloorChange(e.target.value as "all" | "1" | "2")}
            className="px-2.5 py-1.5 rounded-xl bg-[#F9F8F6] border border-[#E6E3DC] text-xs text-[#1C1B18] focus:outline-none focus:border-[#6F4E37] cursor-pointer"
          >
            <option value="all">Semua Lantai</option>
            <option value="1">Lantai 1</option>
            <option value="2">Lantai 2</option>
          </select>

          {/* Filter Tabs */}
          <div className="inline-flex items-center p-1 rounded-xl bg-[#F9F8F6] border border-[#E6E3DC] text-xs">
            <button
              onClick={() => onTabChange("semua")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "semua" ? "bg-[#1C1B18] text-white font-semibold" : "text-[#5C5952]"
              }`}
            >
              Semua ({units.length})
            </button>
            <button
              onClick={() => onTabChange("terisi")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "terisi" ? "bg-[#1C1B18] text-white font-semibold" : "text-[#5C5952]"
              }`}
            >
              Terisi ({occupiedCount})
            </button>
            <button
              onClick={() => onTabChange("nunggak")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "nunggak" ? "bg-[#1C1B18] text-white font-semibold" : "text-[#5C5952]"
              }`}
            >
              Belum Lunas ({unpaidCount})
            </button>
            <button
              onClick={() => onTabChange("kosong")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "kosong" ? "bg-[#1C1B18] text-white font-semibold" : "text-[#5C5952]"
              }`}
            >
              Kosong ({vacantCount})
            </button>
          </div>
        </div>
      </div>

      {/* Unit Table */}
      <div className="border border-[#E6E3DC] rounded-2xl overflow-hidden shadow-xs bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F9F8F6] border-b border-[#E6E3DC] text-[#8C887F] font-mono uppercase text-[11px]">
              <tr>
                <th className="py-3 px-4 font-semibold">No. Kamar</th>
                <th className="py-3 px-4 font-semibold">Penghuni &amp; Kontak</th>
                <th className="py-3 px-4 font-semibold">Tarif Sewa</th>
                <th className="py-3 px-4 font-semibold">Listrik</th>
                <th className="py-3 px-4 font-semibold">Jatuh Tempo</th>
                <th className="py-3 px-4 font-semibold text-center">Status Pembayaran</th>
                <th className="py-3 px-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E3DC]">
              {filteredUnits.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-[#8C887F]">
                    Tidak ada unit yang sesuai dengan pencarian atau filter.
                  </td>
                </tr>
              ) : (
                filteredUnits.map((u) => (
                  <tr key={u.id} className="hover:bg-[#F9F8F6]/60 transition-colors">
                    {/* Room Number */}
                    <td className="py-3.5 px-4 font-mono font-bold text-[#1C1B18]">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-[#F4EFEA] text-[#6F4E37] flex items-center justify-center text-[10px]">
                          {u.floor}F
                        </span>
                        <span>{u.roomNumber}</span>
                      </div>
                      <span className="text-[10px] text-[#8C887F] font-sans font-normal block ml-8">
                        {u.type}
                      </span>
                    </td>

                    {/* Tenant */}
                    <td className="py-3.5 px-4">
                      {u.tenantName ? (
                        <div>
                          <span className="font-semibold text-[#1C1B18] block">{u.tenantName}</span>
                          <span className="text-[11px] text-[#8C887F] font-mono">{u.phone}</span>
                        </div>
                      ) : (
                        <span className="text-[#8C887F] italic">Siap Huni (Kamar Kosong)</span>
                      )}
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 font-mono font-bold text-[#1C1B18]">
                      Rp {u.priceMonthly.toLocaleString("id-ID")}
                      <span className="text-[10px] text-[#8C887F] font-sans font-normal block">
                        / bulan
                      </span>
                    </td>

                    {/* Electric Mode */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 font-medium text-[11px] text-[#5C5952]">
                        <Zap className="w-3 h-3 text-[#C88A58]" />
                        {u.electricMode}
                      </span>
                      {u.lastKwh && (
                        <span className="text-[10px] text-[#8C887F] font-mono block">
                          Meteran: {u.lastKwh} kWh
                        </span>
                      )}
                    </td>

                    {/* Due Date */}
                    <td className="py-3.5 px-4 text-[#5C5952]">
                      {u.dueDate ? (
                        <span className="font-medium">{u.dueDate}</span>
                      ) : (
                        <span className="text-[#8C887F]">-</span>
                      )}
                    </td>

                    {/* Payment Status (Clickable Toggle) */}
                    <td className="py-3.5 px-4 text-center">
                      {u.paymentStatus === "Kosong" ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#F9F8F6] text-[#8C887F] border border-[#E6E3DC]">
                          Unit Kosong
                        </span>
                      ) : (
                        <button
                          onClick={() => onTogglePayment(u.id)}
                          className={`px-3 py-1 rounded-full text-[10px] font-semibold transition-all cursor-pointer shadow-2xs ${
                            u.paymentStatus === "Lunas"
                              ? "bg-[#F4EFEA] text-[#6F4E37] border border-[#6F4E37]/30 hover:bg-[#6F4E37] hover:text-white"
                              : "bg-[#FBF5EF] text-[#C88A58] border border-[#C88A58] hover:bg-[#C88A58] hover:text-white"
                          }`}
                          title="Klik untuk ubah status lunas"
                        >
                          {u.paymentStatus === "Lunas" ? "Lunas ✓ (Klik)" : "Belum Lunas (Klik)"}
                        </button>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      {u.tenantName && (
                        <button
                          onClick={() => onSendWhatsapp(u)}
                          className="p-1.5 rounded-lg text-[#6F4E37] hover:bg-[#F4EFEA] transition-colors cursor-pointer inline-flex items-center gap-1 text-[11px] font-semibold"
                          title="Kirim rincian invoice ke WA"
                        >
                          <Send className="w-3.5 h-3.5 text-[#C88A58]" />
                          <span className="hidden sm:inline">WA Invoice</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
