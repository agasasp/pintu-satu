"use client";

import { useState } from "react";
import Image from "next/image";
import {
  DoorClosed,
  Users,
  Key,
  Wrench,
  SlidersHorizontal,
  Plus,
  Search,
  ChevronDown,
  LayoutGrid,
  List,
  X,
  Wifi,
  Wind,
  Bath,
} from "lucide-react";
import { initialRooms } from "./mockData";
import { RoomItem, DashboardTab } from "./types";
import { useDashboard } from "./DashboardContext";

interface ViewManajemenKamarProps {
  onNavigateTab: (tab: DashboardTab) => void;
  onOpenAddRoom: () => void;
}

export function ViewManajemenKamar({
  onNavigateTab,
  onOpenAddRoom,
}: ViewManajemenKamarProps) {
  const { rooms, updateRoom, openAddTenant, showToast } = useDashboard();
  const [activeFilterTab, setActiveFilterTab] = useState<
    "semua" | "terisi" | "kosong" | "perawatan"
  >("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [floorFilter, setFloorFilter] = useState<"all" | "1" | "2">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "Standard" | "Deluxe">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  // Selected room for side drawer detail (default to A-01 to match screenshot)
  const [selectedRoom, setSelectedRoom] = useState<RoomItem | null>(rooms[0] || null);

  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPrice, setEditPrice] = useState(1500000);
  const [editStatus, setEditStatus] = useState<"terisi" | "kosong" | "perawatan">("terisi");
  const [editNote, setEditNote] = useState("");

  const [isTipeKamarModalOpen, setIsTipeKamarModalOpen] = useState(false);
  const [standardPrice, setStandardPrice] = useState(1500000);
  const [deluxePrice, setDeluxePrice] = useState(1750000);

  // Dynamic counts from shared rooms state
  const totalCount = rooms.length;
  const occupiedCount = rooms.filter((r) => r.status === "terisi").length;
  const emptyCount = rooms.filter((r) => r.status === "kosong").length;
  const maintenanceCount = rooms.filter((r) => r.status === "perawatan").length;

  // Filtered rooms
  const filteredRooms = rooms.filter((room) => {
    if (activeFilterTab !== "semua" && room.status !== activeFilterTab) return false;
    if (floorFilter !== "all" && room.floor !== parseInt(floorFilter)) return false;
    if (typeFilter !== "all" && room.type !== typeFilter) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchNumber = room.roomNumber.toLowerCase().includes(q);
      const matchTenant = room.tenantName?.toLowerCase().includes(q) ?? false;
      return matchNumber || matchTenant;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredRooms.length / pageSize) || 1;
  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1B18] tracking-tight">
            Manajemen kamar
          </h1>
          <p className="text-xs sm:text-sm text-[#5C5952] mt-1">
            Pantau ketersediaan, penghuni, dan kondisi setiap kamar.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsTipeKamarModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E6E3DC] text-xs font-semibold text-[#1C1B18] hover:bg-[#F9F8F6] transition-colors cursor-pointer shadow-2xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#6F4E37]" />
            <span>Atur tipe kamar</span>
          </button>

          <button
            onClick={onOpenAddRoom}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6F4E37] hover:bg-[#563B28] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah kamar</span>
          </button>
        </div>
      </div>

      {/* 2. Top 4 Stat Cards (Clickable Filter) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div
          onClick={() => setActiveFilterTab("semua")}
          className={`p-4.5 rounded-2xl border transition-all cursor-pointer shadow-2xs space-y-2 hover:scale-[1.01] ${
            activeFilterTab === "semua"
              ? "bg-[#F4EFEA]/50 border-[#6F4E37] ring-1 ring-[#6F4E37]"
              : "bg-white border-[#E6E3DC] hover:border-[#6F4E37]/50"
          }`}
          title="Klik untuk filter semua kamar"
        >
          <div className="flex items-center justify-between text-[#5C5952]">
            <span className="text-xs font-medium">Total kamar</span>
            <DoorClosed className="w-4 h-4 text-[#6F4E37]" />
          </div>
          <div className="text-2xl font-extrabold text-[#1C1B18] tracking-tight">
            {totalCount} kamar
          </div>
          <div className="text-[11px] text-[#5C5952]">2 lantai • 2 tipe kamar</div>
        </div>

        {/* Card 2 */}
        <div
          onClick={() => setActiveFilterTab("terisi")}
          className={`p-4.5 rounded-2xl border transition-all cursor-pointer shadow-2xs space-y-2 hover:scale-[1.01] ${
            activeFilterTab === "terisi"
              ? "bg-[#F4EFEA]/50 border-[#6F4E37] ring-1 ring-[#6F4E37]"
              : "bg-white border-[#E6E3DC] hover:border-[#6F4E37]/50"
          }`}
          title="Klik untuk filter kamar terisi"
        >
          <div className="flex items-center justify-between text-[#5C5952]">
            <span className="text-xs font-medium">Terisi</span>
            <Users className="w-4 h-4 text-[#6F4E37]" />
          </div>
          <div className="text-2xl font-extrabold text-[#1C1B18] tracking-tight">
            {occupiedCount} kamar
          </div>
          <div className="text-[11px] text-[#6F4E37] font-semibold">
            Okupansi 87,5%
          </div>
        </div>

        {/* Card 3 */}
        <div
          onClick={() => setActiveFilterTab("kosong")}
          className={`p-4.5 rounded-2xl border transition-all cursor-pointer shadow-2xs space-y-2 hover:scale-[1.01] ${
            activeFilterTab === "kosong"
              ? "bg-[#F4EFEA]/50 border-[#6F4E37] ring-1 ring-[#6F4E37]"
              : "bg-white border-[#E6E3DC] hover:border-[#6F4E37]/50"
          }`}
          title="Klik untuk filter kamar kosong"
        >
          <div className="flex items-center justify-between text-[#5C5952]">
            <span className="text-xs font-medium">Kosong</span>
            <Key className="w-4 h-4 text-[#C88A58]" />
          </div>
          <div className="text-2xl font-extrabold text-[#1C1B18] tracking-tight">
            {emptyCount} kamar
          </div>
          <div className="text-[11px] text-[#5C5952]">Siap menerima penghuni</div>
        </div>

        {/* Card 4 */}
        <div
          onClick={() => setActiveFilterTab("perawatan")}
          className={`p-4.5 rounded-2xl border transition-all cursor-pointer shadow-2xs space-y-2 hover:scale-[1.01] ${
            activeFilterTab === "perawatan"
              ? "bg-[#F4EFEA]/50 border-[#6F4E37] ring-1 ring-[#6F4E37]"
              : "bg-white border-[#E6E3DC] hover:border-[#6F4E37]/50"
          }`}
          title="Klik untuk filter kamar dalam perawatan"
        >
          <div className="flex items-center justify-between text-[#5C5952]">
            <span className="text-xs font-medium">Dalam perawatan</span>
            <Wrench className="w-4 h-4 text-[#C88A58]" />
          </div>
          <div className="text-2xl font-extrabold text-[#1C1B18] tracking-tight">
            {maintenanceCount} kamar
          </div>
          <div className="text-[11px] text-amber-700 font-medium">
            B-04 • Servis AC hari ini
          </div>
        </div>
      </div>

      {/* 3. Filter Tabs & Controls */}
      <div className="space-y-4">
        {/* Tabs Bar */}
        <div className="flex items-center gap-6 border-b border-[#E6E3DC] text-xs font-semibold text-[#8C887F]">
          <button
            onClick={() => setActiveFilterTab("semua")}
            className={`pb-3 relative transition-colors cursor-pointer ${
              activeFilterTab === "semua"
                ? "text-[#6F4E37] font-bold"
                : "hover:text-[#1C1B18]"
            }`}
          >
            <span>Semua kamar ({totalCount})</span>
            {activeFilterTab === "semua" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6F4E37] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveFilterTab("terisi")}
            className={`pb-3 relative transition-colors cursor-pointer ${
              activeFilterTab === "terisi"
                ? "text-[#6F4E37] font-bold"
                : "hover:text-[#1C1B18]"
            }`}
          >
            <span>Terisi ({occupiedCount})</span>
            {activeFilterTab === "terisi" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6F4E37] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveFilterTab("kosong")}
            className={`pb-3 relative transition-colors cursor-pointer ${
              activeFilterTab === "kosong"
                ? "text-[#6F4E37] font-bold"
                : "hover:text-[#1C1B18]"
            }`}
          >
            <span>Kosong ({emptyCount})</span>
            {activeFilterTab === "kosong" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6F4E37] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveFilterTab("perawatan")}
            className={`pb-3 relative transition-colors cursor-pointer ${
              activeFilterTab === "perawatan"
                ? "text-[#6F4E37] font-bold"
                : "hover:text-[#1C1B18]"
            }`}
          >
            <span>Perawatan ({maintenanceCount})</span>
            {activeFilterTab === "perawatan" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6F4E37] rounded-full" />
            )}
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            {/* Search */}
            <div className="relative flex-1 min-w-[220px] max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C887F]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kamar atau penghuni..."
                className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-[#E6E3DC] text-xs text-[#1C1B18] placeholder-[#8C887F] focus:outline-none focus:border-[#6F4E37] transition-colors"
              />
            </div>

            {/* Floor filter */}
            <div className="relative">
              <select
                value={floorFilter}
                onChange={(e) => setFloorFilter(e.target.value as "all" | "1" | "2")}
                className="appearance-none pl-3 pr-8 py-2 bg-white rounded-xl border border-[#E6E3DC] text-xs font-medium text-[#1C1B18] focus:outline-none focus:border-[#6F4E37] cursor-pointer"
              >
                <option value="all">Semua lantai</option>
                <option value="1">Lantai 1</option>
                <option value="2">Lantai 2</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#8C887F] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Type filter */}
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) =>
                  setTypeFilter(e.target.value as "all" | "Standard" | "Deluxe")
                }
                className="appearance-none pl-3 pr-8 py-2 bg-white rounded-xl border border-[#E6E3DC] text-xs font-medium text-[#1C1B18] focus:outline-none focus:border-[#6F4E37] cursor-pointer"
              >
                <option value="all">Semua tipe</option>
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#8C887F] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-[#F9F8F6] p-1 rounded-xl border border-[#E6E3DC]">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white text-[#6F4E37] shadow-2xs"
                  : "text-[#8C887F] hover:text-[#1C1B18]"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === "list"
                  ? "bg-white text-[#6F4E37] shadow-2xs"
                  : "text-[#8C887F] hover:text-[#1C1B18]"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Room Grid & Side Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Rooms Grid (takes full or 8 cols when drawer is open) */}
        <div
          className={`${
            selectedRoom ? "lg:col-span-8" : "lg:col-span-12"
          } space-y-4`}
        >
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {paginatedRooms.map((room) => {
                const isSelected = selectedRoom?.id === room.id;

                return (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoom(room)}
                    className={`bg-white p-4 rounded-2xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? "border-[#6F4E37] ring-2 ring-[#6F4E37]/15 shadow-md"
                        : "border-[#E6E3DC] hover:border-[#C88A58] shadow-2xs hover:shadow-xs"
                    }`}
                  >
                    {/* Header: Room Number & Status Badge */}
                    <div className="flex items-center justify-between pb-2 border-b border-[#E6E3DC]/60">
                      <div className="flex items-center gap-2 font-bold text-base text-[#1C1B18]">
                        <DoorClosed className="w-4 h-4 text-[#6F4E37]" />
                        <span>{room.roomNumber}</span>
                      </div>

                      {/* Status badge */}
                      {room.status === "terisi" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Terisi
                        </span>
                      )}
                      {room.status === "kosong" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#F4EFEA] text-[#5C5952] border border-[#E6E3DC]">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                          Kosong
                        </span>
                      )}
                      {room.status === "perawatan" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          Perawatan
                        </span>
                      )}
                    </div>

                    {/* Room spec */}
                    <div className="text-[11px] text-[#8C887F] mt-2.5">
                      {room.type} • {room.sizeM2} m²
                    </div>

                    {/* Resident Info or Vacant status */}
                    <div className="mt-2 text-xs font-semibold text-[#1C1B18] flex items-center gap-2 min-h-[20px]">
                      {room.status === "terisi" && (
                        <>
                          <Users className="w-3.5 h-3.5 text-[#8C887F]" />
                          <span className="truncate">{room.tenantName}</span>
                        </>
                      )}
                      {room.status === "kosong" && (
                        <>
                          <Key className="w-3.5 h-3.5 text-[#C88A58]" />
                          <span className="text-[#8C887F] font-normal">
                            Siap menerima penghuni
                          </span>
                        </>
                      )}
                      {room.status === "perawatan" && (
                        <>
                          <Wrench className="w-3.5 h-3.5 text-amber-600" />
                          <span className="text-amber-700 font-medium truncate">
                            {room.maintenanceNote}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Price */}
                    <div className="mt-3 pt-2.5 border-t border-[#E6E3DC]/60 flex items-center justify-between text-xs">
                      <span className="font-extrabold text-[#1C1B18]">
                        Rp{room.priceMonthly.toLocaleString("id-ID")}
                      </span>
                      <span className="text-[10px] text-[#8C887F]">/bulan</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="bg-white rounded-2xl border border-[#E6E3DC] overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[11px] text-[#8C887F] border-b border-[#E6E3DC] bg-[#F9F8F6]">
                    <th className="py-3 px-4 font-semibold">Kamar</th>
                    <th className="py-3 px-4 font-semibold">Tipe & Luas</th>
                    <th className="py-3 px-4 font-semibold">Penghuni / Catatan</th>
                    <th className="py-3 px-4 font-semibold">Harga / Bulan</th>
                    <th className="py-3 px-4 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E3DC]">
                  {paginatedRooms.map((room) => (
                    <tr
                      key={room.id}
                      onClick={() => setSelectedRoom(room)}
                      className={`hover:bg-[#F9F8F6] transition-colors cursor-pointer ${
                        selectedRoom?.id === room.id ? "bg-[#F4EFEA]/40 font-semibold" : ""
                      }`}
                    >
                      <td className="py-3 px-4 font-bold text-[#1C1B18]">
                        {room.roomNumber}
                      </td>
                      <td className="py-3 px-4 text-[#5C5952]">
                        {room.type} • {room.sizeM2} m²
                      </td>
                      <td className="py-3 px-4 text-[#1C1B18]">
                        {room.tenantName || room.maintenanceNote || "—"}
                      </td>
                      <td className="py-3 px-4 font-mono font-semibold text-[#1C1B18]">
                        Rp{room.priceMonthly.toLocaleString("id-ID")}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                            room.status === "terisi"
                              ? "bg-[#ECFDF5] text-[#065F46]"
                              : room.status === "perawatan"
                              ? "bg-[#FEF3C7] text-[#92400E]"
                              : "bg-[#F4EFEA] text-[#5C5952]"
                          }`}
                        >
                          {room.status === "terisi"
                            ? "Terisi"
                            : room.status === "perawatan"
                            ? "Perawatan"
                            : "Kosong"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 text-xs text-[#5C5952]">
            <span>
              Menampilkan {filteredRooms.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} -{" "}
              {Math.min(currentPage * pageSize, filteredRooms.length)} dari {filteredRooms.length} kamar
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="px-3 py-1.5 rounded-xl border border-[#E6E3DC] bg-white text-xs text-[#5C5952] hover:bg-[#F9F8F6] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors shadow-2xs"
              >
                Sebelumnya
              </button>
              <span className="font-semibold text-xs text-[#1C1B18] px-1">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="px-3 py-1.5 rounded-xl border border-[#E6E3DC] bg-white text-xs text-[#5C5952] hover:bg-[#F9F8F6] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors shadow-2xs"
              >
                Berikutnya
              </button>
            </div>
          </div>
        </div>


        {/* Right: Detail Kamar Side Drawer (4 cols) */}
        {selectedRoom && (
          <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E6E3DC] shadow-md p-5 space-y-4 sticky top-20">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[#E6E3DC]">
              <span className="text-sm font-bold text-[#1C1B18]">Detail kamar</span>
              <button
                onClick={() => setSelectedRoom(null)}
                className="p-1 rounded-lg text-[#8C887F] hover:text-[#1C1B18] hover:bg-[#F9F8F6] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Room Image */}
            <div className="relative w-full h-44 rounded-xl overflow-hidden border border-[#E6E3DC] bg-[#F9F8F6]">
              <Image
                src={selectedRoom.imageUrl || "/images/smart-kost-room.jpg"}
                alt={selectedRoom.roomNumber}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Room Title & Specs */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-extrabold text-[#1C1B18]">
                  Kamar {selectedRoom.roomNumber}
                </h3>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                    selectedRoom.status === "terisi"
                      ? "bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]"
                      : selectedRoom.status === "perawatan"
                      ? "bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]"
                      : "bg-[#F4EFEA] text-[#5C5952] border border-[#E6E3DC]"
                  }`}
                >
                  • {selectedRoom.status === "terisi" ? "Terisi" : selectedRoom.status === "perawatan" ? "Perawatan" : "Kosong"}
                </span>
              </div>
              <p className="text-xs text-[#5C5952]">
                {selectedRoom.type} • Lantai {selectedRoom.floor} • {selectedRoom.sizeM2} m²
              </p>
            </div>

            {/* Facility Badges */}
            <div className="flex items-center gap-3 text-xs text-[#5C5952] pt-1">
              <div className="flex items-center gap-1">
                <Wind className="w-3.5 h-3.5 text-[#6F4E37]" />
                <span className="text-[11px]">AC</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5 text-[#6F4E37]" />
                <span className="text-[11px]">KM dalam</span>
              </div>
              <div className="flex items-center gap-1">
                <Wifi className="w-3.5 h-3.5 text-[#6F4E37]" />
                <span className="text-[11px]">Wi-Fi</span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#E6E3DC]" />

            {/* Section: Penghuni Saat Ini */}
            {selectedRoom.status === "terisi" && selectedRoom.tenantName ? (
              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C887F]">
                  Penghuni Saat Ini
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#F4EFEA] border border-[#E6E3DC] text-[#6F4E37] flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                    {selectedRoom.tenantAvatar || "PA"}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-[#1C1B18]">
                      {selectedRoom.tenantName}
                    </div>
                    <div className="text-[11px] text-[#8C887F]">
                      {selectedRoom.tenantPhone || "0812-3456-7890"}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs pt-1">
                  <div className="flex items-center justify-between text-[#5C5952]">
                    <span>Masa sewa</span>
                    <span className="font-medium text-[#1C1B18]">
                      {selectedRoom.rentalPeriod || "1 Agu 2026 – 31 Jul 2027"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[#5C5952]">
                    <span>Sewa bulanan</span>
                    <span className="font-bold text-[#1C1B18]">
                      Rp{selectedRoom.priceMonthly.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[#5C5952]">
                    <span>Tagihan Oktober</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#ECFDF5] text-[#065F46]">
                      • Lunas
                    </span>
                  </div>
                </div>
              </div>
            ) : selectedRoom.status === "perawatan" ? (
              <div className="space-y-2 text-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C887F]">
                  Status Perawatan
                </div>
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                  <p className="font-semibold">{selectedRoom.maintenanceNote}</p>
                  <p className="text-[11px] mt-1 text-amber-800">
                    Dijadwalkan selesai hari ini pukul 16.00 WIB.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C887F]">
                  Status Unit
                </div>
                <div className="p-3 rounded-xl bg-[#F9F8F6] border border-[#E6E3DC] text-[#5C5952]">
                  <p className="font-semibold text-[#1C1B18]">Kamar Siap Huni</p>
                  <p className="text-[11px] mt-1">
                    Kamar sudah dibersihkan dan siap ditempati penyewa baru.
                  </p>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => {
                  if (selectedRoom) {
                    setEditPrice(selectedRoom.priceMonthly);
                    setEditStatus(selectedRoom.status);
                    setEditNote(selectedRoom.maintenanceNote || "");
                    setIsEditModalOpen(true);
                  }
                }}
                className="flex-1 py-2 px-3 rounded-xl border border-[#E6E3DC] text-xs font-semibold text-[#1C1B18] hover:bg-[#F9F8F6] transition-colors cursor-pointer text-center"
              >
                Edit kamar
              </button>

              {selectedRoom.status === "terisi" ? (
                <button
                  onClick={() => onNavigateTab("penghuni")}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#6F4E37] hover:bg-[#563B28] text-white text-xs font-semibold transition-colors cursor-pointer text-center"
                >
                  Lihat penghuni
                </button>
              ) : (
                <button
                  onClick={() => openAddTenant(selectedRoom.roomNumber)}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#6F4E37] hover:bg-[#563B28] text-white text-xs font-semibold transition-colors cursor-pointer text-center"
                >
                  Daftarkan penghuni
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Edit Kamar Modal */}
      {isEditModalOpen && selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-[#E6E3DC] shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E3DC]">
              <h3 className="font-bold text-base text-[#1C1B18]">
                Edit Kamar {selectedRoom.roomNumber}
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-lg text-[#8C887F] hover:text-[#1C1B18]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#1C1B18] mb-1">
                  Harga Sewa Bulanan (Rp)
                </label>
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6E3DC] focus:outline-none focus:border-[#6F4E37]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1C1B18] mb-1">
                  Status Kamar
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as "terisi" | "kosong" | "perawatan")}
                  className="w-full px-3 py-2 rounded-xl border border-[#E6E3DC] focus:outline-none focus:border-[#6F4E37] cursor-pointer"
                >
                  <option value="terisi">Terisi</option>
                  <option value="kosong">Kosong (Siap Huni)</option>
                  <option value="perawatan">Dalam Perawatan</option>
                </select>
              </div>

              {editStatus === "perawatan" && (
                <div>
                  <label className="block font-semibold text-[#1C1B18] mb-1">
                    Catatan Perawatan
                  </label>
                  <input
                    type="text"
                    value={editNote}
                    onChange={(e) => setEditNote(e.target.value)}
                    placeholder="Contoh: Servis AC & Pengecatan ulang"
                    className="w-full px-3 py-2 rounded-xl border border-[#E6E3DC] focus:outline-none focus:border-[#6F4E37]"
                  />
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-[#E6E3DC] text-xs font-semibold text-[#1C1B18] hover:bg-[#F9F8F6] cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  updateRoom(selectedRoom.id, {
                    priceMonthly: editPrice,
                    status: editStatus,
                    maintenanceNote: editNote || selectedRoom.maintenanceNote,
                  });
                  setSelectedRoom((prev) =>
                    prev
                      ? {
                          ...prev,
                          priceMonthly: editPrice,
                          status: editStatus,
                          maintenanceNote: editNote || prev.maintenanceNote,
                        }
                      : null
                  );
                  setIsEditModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#6F4E37] text-white text-xs font-semibold hover:bg-[#563B28] cursor-pointer"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Atur Tipe Kamar Modal */}
      {isTipeKamarModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-[#E6E3DC] shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E3DC]">
              <h3 className="font-bold text-base text-[#1C1B18]">
                Pengaturan Tipe &amp; Tarif Kamar
              </h3>
              <button
                onClick={() => setIsTipeKamarModalOpen(false)}
                className="p-1 rounded-lg text-[#8C887F] hover:text-[#1C1B18]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="p-3 rounded-xl bg-[#F9F8F6] border border-[#E6E3DC] space-y-2">
                <span className="font-bold text-sm text-[#1C1B18]">Tipe Standard (12 m²)</span>
                <p className="text-[11px] text-[#5C5952]">Kasur single, lemari, meja belajar, KM dalam, Wi-Fi</p>
                <div>
                  <label className="block font-semibold text-[#1C1B18] mb-1">
                    Tarif Bulanan (Rp)
                  </label>
                  <input
                    type="number"
                    value={standardPrice}
                    onChange={(e) => setStandardPrice(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-[#E6E3DC] focus:outline-none focus:border-[#6F4E37]"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F9F8F6] border border-[#E6E3DC] space-y-2">
                <span className="font-bold text-sm text-[#1C1B18]">Tipe Deluxe (16 m²)</span>
                <p className="text-[11px] text-[#5C5952]">Kasur queen, AC 1/2 PK, lemari 2 pintu, KM dalam water heater, Wi-Fi</p>
                <div>
                  <label className="block font-semibold text-[#1C1B18] mb-1">
                    Tarif Bulanan (Rp)
                  </label>
                  <input
                    type="number"
                    value={deluxePrice}
                    onChange={(e) => setDeluxePrice(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-[#E6E3DC] focus:outline-none focus:border-[#6F4E37]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setIsTipeKamarModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-[#E6E3DC] text-xs font-semibold text-[#1C1B18] hover:bg-[#F9F8F6] cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  rooms.forEach((r) => {
                    if (r.type === "Standard" && r.priceMonthly !== standardPrice) {
                      updateRoom(r.id, { priceMonthly: standardPrice });
                    } else if (r.type === "Deluxe" && r.priceMonthly !== deluxePrice) {
                      updateRoom(r.id, { priceMonthly: deluxePrice });
                    }
                  });
                  setIsTipeKamarModalOpen(false);
                  showToast(
                    "Tarif Kamar Disimpan",
                    `Tarif Standard: Rp${standardPrice.toLocaleString("id-ID")}, Deluxe: Rp${deluxePrice.toLocaleString("id-ID")} berhasil diperbarui.`
                  );
                }}
                className="px-4 py-2 rounded-xl bg-[#6F4E37] text-white text-xs font-semibold hover:bg-[#563B28] cursor-pointer"
              >
                Simpan Tarif
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
