"use client";

interface PemilikKostKpiCardsProps {
  occupiedCount: number;
  totalRooms: number;
  monthlyRevenue: number;
  pettyCashRemaining: number;
  pendingInvoicesCount: number;
}

export function PemilikKostKpiCards({
  occupiedCount,
  totalRooms,
  monthlyRevenue,
  pettyCashRemaining,
  pendingInvoicesCount,
}: PemilikKostKpiCardsProps) {
  const occupancyPercent = ((occupiedCount / totalRooms) * 100).toFixed(1);
  const vacantCount = totalRooms - occupiedCount;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Okupansi */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#F9F8F6] border border-[#E6E3DC] shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#8C887F] font-medium">Okupansi Kamar</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <div className="text-2xl font-black text-[#1C1B18] font-mono mt-1">
          {occupiedCount} <span className="text-xs text-[#8C887F] font-normal font-sans">/ {totalRooms} Pintu</span>
        </div>
        <div className="w-full bg-[#E6E3DC] h-1.5 rounded-full mt-2.5 overflow-hidden">
          <div
            className="bg-[#6F4E37] h-full rounded-full transition-all duration-700"
            style={{ width: `${occupancyPercent}%` }}
          />
        </div>
        <span className="text-[11px] text-[#6F4E37] font-semibold mt-1.5 block">
          {occupancyPercent}% Terisi • {vacantCount} Siap Huni
        </span>
      </div>

      {/* Omzet Bulanan */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#F9F8F6] border border-[#E6E3DC] shadow-xs">
        <span className="text-xs text-[#8C887F] font-medium">Pemasukan Bulan Ini</span>
        <div className="text-2xl font-black text-[#6F4E37] font-mono mt-1">
          Rp {monthlyRevenue.toLocaleString("id-ID")}
        </div>
        <span className="text-[11px] text-emerald-600 font-semibold mt-3 block">
          +8.4% dibanding bulan lalu
        </span>
      </div>

      {/* Kas Kecil Operasional */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#F9F8F6] border border-[#E6E3DC] shadow-xs">
        <span className="text-xs text-[#8C887F] font-medium">Kas Kecil Lapangan (Petty Cash)</span>
        <div className="text-2xl font-black text-[#1C1B18] font-mono mt-1">
          Rp 1.500.000
        </div>
        <span className="text-[11px] text-[#C88A58] font-semibold mt-3 block">
          Sisa kas penjaga: Rp {pettyCashRemaining.toLocaleString("id-ID")} (Foto Nota ✓)
        </span>
      </div>

      {/* Tagihan Jatuh Tempo */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#F9F8F6] border border-[#E6E3DC] shadow-xs">
        <span className="text-xs text-[#8C887F] font-medium">Tagihan Menunggu</span>
        <div className="text-2xl font-black text-[#C88A58] font-mono mt-1">
          {pendingInvoicesCount} Kamar
        </div>
        <span className="text-[11px] text-[#8C887F] font-medium mt-3 block">
          Jatuh tempo 25 Okt 2026
        </span>
      </div>
    </div>
  );
}
