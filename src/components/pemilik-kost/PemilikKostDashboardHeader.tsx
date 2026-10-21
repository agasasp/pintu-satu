"use client";

import Link from "next/link";
import { Building2, ExternalLink, LogOut } from "lucide-react";

interface PemilikKostDashboardHeaderProps {
  ownerName: string;
  kostName: string;
  roomTotal: number;
  onLogout: () => void;
}

export function PemilikKostDashboardHeader({
  ownerName,
  kostName,
  roomTotal,
  onLogout,
}: PemilikKostDashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E6E3DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & Property Selector */}
        <div className="flex items-center gap-3 sm:gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#1C1B18] flex items-center justify-center text-white font-bold font-mono text-xs tracking-wider group-hover:bg-[#6F4E37] transition-colors shadow-xs">
              P1
            </div>
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#1C1B18] hidden sm:inline">
              Pintu Satu
            </span>
          </Link>

          <span className="w-px h-5 bg-[#E6E3DC] hidden sm:inline-block" />

          {/* Current Kost Property Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F9F8F6] border border-[#E6E3DC] text-xs">
            <Building2 className="w-3.5 h-3.5 text-[#6F4E37]" />
            <span className="font-bold text-[#1C1B18]">{kostName}</span>
            <span className="text-[10px] text-[#8C887F] font-mono hidden md:inline">
              ({roomTotal} Pintu)
            </span>
          </div>
        </div>

        {/* Right Profile & Actions */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs">
          <Link
            href="/"
            className="hidden md:flex items-center gap-1.5 text-[#5C5952] hover:text-[#1C1B18] transition-colors font-medium px-2.5 py-1.5 rounded-lg hover:bg-[#F9F8F6]"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Lihat Website</span>
          </Link>

          {/* Juragan Avatar */}
          <div className="flex items-center gap-2.5 pl-2 sm:border-l sm:border-[#E6E3DC]">
            <div className="w-8 h-8 rounded-full bg-[#6F4E37] text-white flex items-center justify-center font-bold font-mono text-xs shadow-xs">
              AP
            </div>
            <div className="hidden sm:block text-left">
              <div className="font-bold text-[#1C1B18] leading-tight">{ownerName}</div>
              <div className="text-[10px] text-[#6F4E37] font-semibold">Pemilik Properti</div>
            </div>
          </div>

          {/* Logout button */}
          <button
            onClick={onLogout}
            className="p-2 rounded-lg text-[#8C887F] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            title="Keluar dari akun"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
