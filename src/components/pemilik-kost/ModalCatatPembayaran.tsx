"use client";

import { useState, useEffect } from "react";
import { X, Check, Receipt } from "lucide-react";

interface ModalCatatPembayaranProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    roomNumber?: string;
    tenantName?: string;
    amount?: number;
  } | null;
  onSubmit: (data: {
    roomNumber: string;
    tenantName: string;
    amount: number;
    paymentMethod: string;
    period: string;
  }) => void;
}

export function ModalCatatPembayaran({
  isOpen,
  onClose,
  initialData,
  onSubmit,
}: ModalCatatPembayaranProps) {
  const [roomNumber, setRoomNumber] = useState("A-05");
  const [tenantName, setTenantName] = useState("Andi Saputra");
  const [amount, setAmount] = useState("1500000");
  const [paymentMethod, setPaymentMethod] = useState("Transfer Bank BCA");
  const [period, setPeriod] = useState("Oktober 2026");

  useEffect(() => {
    if (initialData) {
      if (initialData.roomNumber) setRoomNumber(initialData.roomNumber);
      if (initialData.tenantName) setTenantName(initialData.tenantName);
      if (initialData.amount) setAmount(initialData.amount.toString());
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      roomNumber,
      tenantName,
      amount: parseInt(amount) || 1500000,
      paymentMethod,
      period,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in-up">
      <div className="bg-white rounded-2xl border border-[#E6E3DC] shadow-2xl max-w-md w-full p-6 space-y-5 text-xs text-[#1C1B18]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E6E3DC]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#F4EFEA] text-[#6F4E37] flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-[#1C1B18]">
                Catat Pembayaran Sewa
              </h3>
              <p className="text-[11px] text-[#8C887F]">
                Verifikasi pembayaran sewa kamar dari penghuni
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
            <label className="block font-semibold mb-1">Pilih Kamar &amp; Penghuni</label>
            <select
              value={roomNumber}
              onChange={(e) => {
                setRoomNumber(e.target.value);
                if (e.target.value === "A-05") setTenantName("Andi Saputra");
                if (e.target.value === "A-03") setTenantName("Dewi Lestari");
                if (e.target.value === "A-04") setTenantName("Fajar Ramadhan");
              }}
              className="w-full px-3 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] font-medium focus:bg-white focus:outline-none focus:border-[#6F4E37]"
            >
              <option value="A-05">Kamar A-05 • Andi Saputra (Terlambat)</option>
              <option value="A-03">Kamar A-03 • Dewi Lestari (Belum Lunas)</option>
              <option value="A-04">Kamar A-04 • Fajar Ramadhan (Belum Lunas)</option>
              <option value="A-01">Kamar A-01 • Putri Aprilia</option>
              <option value="A-02">Kamar A-02 • Rizky Maulana</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Nominal Pembayaran (Rp)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] font-mono font-bold focus:bg-white focus:outline-none focus:border-[#6F4E37]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Metode Bayar</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] font-medium focus:bg-white focus:outline-none focus:border-[#6F4E37]"
              >
                <option value="Transfer Bank BCA">Transfer BCA</option>
                <option value="QRIS Pintu Satu">QRIS Pintu Satu</option>
                <option value="Tunai / Cash">Tunai / Cash</option>
                <option value="Transfer Bank Mandiri">Transfer Mandiri</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Periode Sewa</label>
              <input
                type="text"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full px-3 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] font-medium focus:bg-white focus:outline-none focus:border-[#6F4E37]"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#F4EFEA]/60 border border-[#E6E3DC] text-[11px] text-[#5C5952]">
            Kuitansi digital otomatis akan dikirim ke WhatsApp penghuni ({tenantName}) setelah disimpan.
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
              <span>Konfirmasi Bayar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
