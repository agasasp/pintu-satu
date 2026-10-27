"use client";

import Link from "next/link";

export function ComproFooter() {
  return (
    <footer className="bg-white border-t border-[#E6E3DC] py-10 text-xs text-[#5C5952]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-[#1C1B18] flex items-center justify-center text-white font-bold font-mono text-[10px]">
            P1
          </div>
          <span className="font-bold text-[#1C1B18]">Pintu Satu</span>
          <span>— Sistem Manajemen Kost Simpel &amp; Modern Indonesia</span>
        </div>
        <div className="flex gap-6">
          <a href="#keunggulan" className="hover:text-[#1C1B18] transition-colors">
            Keunggulan
          </a>
          <a href="#fitur" className="hover:text-[#1C1B18] transition-colors">
            Fitur
          </a>
          <a href="#harga" className="hover:text-[#1C1B18] transition-colors">
            Harga
          </a>
          <Link
            href="/login"
            className="hover:text-[#6F4E37] font-semibold transition-colors cursor-pointer"
          >
            Masuk Akun
          </Link>
        </div>
        <div className="font-mono text-[11px] text-[#8C887F]">
          © 2026 Pintu Satu. Seluruh hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
