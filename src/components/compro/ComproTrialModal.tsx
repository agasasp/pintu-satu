"use client";

import { useState } from "react";

interface ComproTrialModalProps {
  isOpen: boolean;
  selectedPlan: string;
  onClose: () => void;
  onSubmitSuccess: (ownerName: string, kostName: string) => void;
}

export function ComproTrialModal({
  isOpen,
  selectedPlan,
  onClose,
  onSubmitSuccess,
}: ComproTrialModalProps) {
  const [ownerName, setOwnerName] = useState("");
  const [kostName, setKostName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [roomTotal, setRoomTotal] = useState("25");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitSuccess(ownerName, kostName);
    setOwnerName("");
    setKostName("");
    setWhatsapp("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1B18]/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white border border-[#E6E3DC] rounded-2xl p-6 sm:p-7 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#E6E3DC] pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#F4EFEA] text-[#6F4E37] font-semibold">
              {selectedPlan}
            </span>
            <h3 className="text-lg font-bold text-[#1C1B18] mt-1">Mulai Gunakan Pintu Satu</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8C887F] hover:text-[#1C1B18] text-xs font-mono p-1 cursor-pointer"
          >
            Tutup [✕]
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-[#1C1B18] font-medium mb-1">Nama Lengkap Pemilik</label>
            <input
              type="text"
              required
              placeholder="Contoh: Bpk. Hendra Wijaya"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="w-full bg-[#F9F8F6] border border-[#E6E3DC] rounded-lg px-3 py-2 text-[#1C1B18] focus:outline-none focus:border-[#6F4E37]"
            />
          </div>
          <div>
            <label className="block text-[#1C1B18] font-medium mb-1">Nama Kost &amp; Kota</label>
            <input
              type="text"
              required
              placeholder="Contoh: Griya Kost BSD"
              value={kostName}
              onChange={(e) => setKostName(e.target.value)}
              className="w-full bg-[#F9F8F6] border border-[#E6E3DC] rounded-lg px-3 py-2 text-[#1C1B18] focus:outline-none focus:border-[#6F4E37]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#1C1B18] font-medium mb-1">Nomor WhatsApp</label>
              <input
                type="tel"
                required
                placeholder="0812xxxx"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full bg-[#F9F8F6] border border-[#E6E3DC] rounded-lg px-3 py-2 text-[#1C1B18] font-mono focus:outline-none focus:border-[#6F4E37]"
              />
            </div>
            <div>
              <label className="block text-[#1C1B18] font-medium mb-1">Jumlah Pintu</label>
              <input
                type="number"
                min="1"
                required
                value={roomTotal}
                onChange={(e) => setRoomTotal(e.target.value)}
                className="w-full bg-[#F9F8F6] border border-[#E6E3DC] rounded-lg px-3 py-2 text-[#1C1B18] font-mono focus:outline-none focus:border-[#6F4E37]"
              />
            </div>
          </div>
          <div className="p-3 rounded-lg bg-[#F9F8F6] text-[11px] text-[#5C5952] leading-relaxed">
            Akun Anda akan langsung aktif disertai uji coba gratis 14 hari. Link akses dashboard dikirimkan ke nomor WhatsApp Anda.
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[#5C5952] hover:text-[#1C1B18] font-medium cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#6F4E37] hover:bg-[#563B28] text-white font-semibold transition-all cursor-pointer"
            >
              Aktifkan Akun Sekarang
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
