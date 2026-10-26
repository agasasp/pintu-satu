"use client";

import { useState } from "react";
import { X, Check, ArrowUpRight, Upload } from "lucide-react";
import { FinancialTransaction } from "./types";

interface ModalCatatPengeluaranProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tx: FinancialTransaction) => void;
}

export function ModalCatatPengeluaran({
  isOpen,
  onClose,
  onSubmit,
}: ModalCatatPengeluaranProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<FinancialTransaction["category"]>(
    "Perawatan & perbaikan"
  );
  const date = "26 Okt 2026";

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    onSubmit({
      id: `TRX-${Date.now()}`,
      date,
      title,
      category,
      type: "pengeluaran",
      amount: parseInt(amount) || 0,
    });

    setTitle("");
    setAmount("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in-up">
      <div className="bg-white rounded-2xl border border-[#E6E3DC] shadow-2xl max-w-md w-full p-6 space-y-5 text-xs text-[#1C1B18]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E6E3DC]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FBF5EF] text-[#C88A58] flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-[#1C1B18]">
                Catat Pengeluaran Kas Kost
              </h3>
              <p className="text-[11px] text-[#8C887F]">
                Pembukuan biaya operasional atau perbaikan fasilitas
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
            <label className="block font-semibold mb-1">Keterangan Pengeluaran</label>
            <input
              type="text"
              required
              placeholder="Contoh: Penggantian kran air lantai 1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] font-medium focus:bg-white focus:outline-none focus:border-[#6F4E37]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Nominal (Rp)</label>
              <input
                type="number"
                required
                placeholder="250000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] font-mono font-bold focus:bg-white focus:outline-none focus:border-[#6F4E37]"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Kategori</label>
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as FinancialTransaction["category"])
                }
                className="w-full px-3 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] font-medium focus:bg-white focus:outline-none focus:border-[#6F4E37]"
              >
                <option value="Perawatan & perbaikan">Perawatan & perbaikan</option>
                <option value="Listrik, air & internet">Listrik, air & internet</option>
                <option value="Gaji & operasional">Gaji & operasional</option>
                <option value="Kebersihan & lainnya">Kebersihan & lainnya</option>
              </select>
            </div>
          </div>

          {/* Upload Nota Simulation */}
          <div>
            <label className="block font-semibold mb-1">Unggah Bukti Nota / Kuitansi</label>
            <div className="border border-dashed border-[#E6E3DC] bg-[#F9F8F6] rounded-xl p-3 text-center text-[#8C887F] cursor-pointer hover:bg-white transition-colors">
              <Upload className="w-4 h-4 mx-auto text-[#6F4E37] mb-1" />
              <span className="text-[11px]">Klik untuk pilih foto bukti kasir</span>
            </div>
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
              <span>Simpan Pengeluaran</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
