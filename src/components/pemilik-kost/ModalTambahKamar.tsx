"use client";

import { useState } from "react";
import { X, Check, DoorClosed } from "lucide-react";
import { RoomItem } from "./types";

interface ModalTambahKamarProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (room: RoomItem) => void;
}

export function ModalTambahKamar({
  isOpen,
  onClose,
  onSubmit,
}: ModalTambahKamarProps) {
  const [roomNumber, setRoomNumber] = useState("");
  const [floor, setFloor] = useState("1");
  const [type, setType] = useState<"Standard" | "Deluxe">("Standard");
  const [sizeM2, setSizeM2] = useState("12");
  const [priceMonthly, setPriceMonthly] = useState("1500000");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomNumber) return;

    onSubmit({
      id: roomNumber,
      roomNumber,
      floor: parseInt(floor) || 1,
      type,
      sizeM2: parseInt(sizeM2) || 12,
      status: "kosong",
      tenantName: null,
      tenantPhone: null,
      tenantAvatar: null,
      priceMonthly: parseInt(priceMonthly) || 1500000,
      facilities: ["AC", "KM dalam", "Wi-Fi"],
      imageUrl: "/images/smart-kost-room.jpg",
    });

    setRoomNumber("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in-up">
      <div className="bg-white rounded-2xl border border-[#E6E3DC] shadow-2xl max-w-md w-full p-6 space-y-5 text-xs text-[#1C1B18]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E6E3DC]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#F4EFEA] text-[#6F4E37] flex items-center justify-center">
              <DoorClosed className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-[#1C1B18]">
                Tambah Unit Kamar Baru
              </h3>
              <p className="text-[11px] text-[#8C887F]">
                Daftarkan pintu kamar baru ke properti Kost Cemara
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#8C887F] hover:text-[#1C1B18] hover:bg-[#F9F8F6] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Nomor Kamar</label>
              <input
                type="text"
                required
                placeholder="Contoh: A-09"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                className="w-full px-3 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] font-mono font-bold focus:bg-white focus:outline-none focus:border-[#6F4E37]"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Lantai</label>
              <select
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                className="w-full px-3 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] font-medium focus:bg-white focus:outline-none focus:border-[#6F4E37]"
              >
                <option value="1">Lantai 1</option>
                <option value="2">Lantai 2</option>
                <option value="3">Lantai 3</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Tipe Kamar</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as "Standard" | "Deluxe")}
                className="w-full px-3 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] font-medium focus:bg-white focus:outline-none focus:border-[#6F4E37]"
              >
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Luas Kamar (m²)</label>
              <input
                type="number"
                value={sizeM2}
                onChange={(e) => setSizeM2(e.target.value)}
                className="w-full px-3 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] font-medium focus:bg-white focus:outline-none focus:border-[#6F4E37]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Harga Sewa / Bulan (Rp)</label>
            <input
              type="number"
              value={priceMonthly}
              onChange={(e) => setPriceMonthly(e.target.value)}
              className="w-full px-3 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] font-mono font-bold focus:bg-white focus:outline-none focus:border-[#6F4E37]"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#E6E3DC] font-semibold text-[#5C5952] hover:bg-[#F9F8F6] cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#6F4E37] hover:bg-[#563B28] text-white font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Tambah Kamar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
