"use client";

import { useState, useEffect } from "react";
import { X, Check, UserPlus } from "lucide-react";
import { TenantItem } from "./types";

interface ModalTambahPenghuniProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoomNumber?: string | null;
  onSubmit: (tenant: TenantItem) => void;
}

export function ModalTambahPenghuni({
  isOpen,
  onClose,
  initialRoomNumber,
  onSubmit,
}: ModalTambahPenghuniProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [roomNumber, setRoomNumber] = useState(initialRoomNumber || "A-06");
  const [startDate, setStartDate] = useState("1 Nov 2026");
  const [endDate, setEndDate] = useState("31 Okt 2027");
  const [rentAmount, setRentAmount] = useState("1500000");

  useEffect(() => {
    if (initialRoomNumber) {
      setRoomNumber(initialRoomNumber);
    }
  }, [initialRoomNumber, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    onSubmit({
      id: `T-${Date.now()}`,
      name,
      initials: initials || "PS",
      phone,
      roomNumber,
      startDate,
      endDate,
      rentAmount: parseInt(rentAmount) || 1500000,
      status: "aktif",
      verified: true,
    });

    setName("");
    setPhone("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in-up">
      <div className="bg-white rounded-2xl border border-[#E6E3DC] shadow-2xl max-w-md w-full p-6 space-y-5 text-xs text-[#1C1B18]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E6E3DC]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#F4EFEA] text-[#6F4E37] flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-[#1C1B18]">
                Tambah Penghuni Baru
              </h3>
              <p className="text-[11px] text-[#8C887F]">
                Daftarkan penyewa kamar dan buat kontrak digital
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
          <div>
            <label className="block font-semibold mb-1">Nama Lengkap Penghuni</label>
            <input
              type="text"
              required
              placeholder="Contoh: Bagas Wicaksono"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] font-medium focus:bg-white focus:outline-none focus:border-[#6F4E37]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Nomor WhatsApp</label>
              <input
                type="text"
                required
                placeholder="0812-xxxx-xxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] font-mono focus:bg-white focus:outline-none focus:border-[#6F4E37]"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Pilih Kamar Kosong</label>
              <select
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                className="w-full px-3 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] font-medium focus:bg-white focus:outline-none focus:border-[#6F4E37]"
              >
                <option value="A-06">A-06 (Standard • Lantai 1)</option>
                <option value="A-07">A-07 (Standard • Lantai 1)</option>
                <option value="A-08">A-08 (Standard • Lantai 1)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Mulai Sewa</label>
              <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] font-medium focus:bg-white focus:outline-none focus:border-[#6F4E37]"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Akhir Sewa</label>
              <input
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] font-medium focus:bg-white focus:outline-none focus:border-[#6F4E37]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Sewa Bulanan (Rp)</label>
            <input
              type="number"
              value={rentAmount}
              onChange={(e) => setRentAmount(e.target.value)}
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
              <span>Simpan Penghuni</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
