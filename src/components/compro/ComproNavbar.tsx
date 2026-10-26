"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ComproNavbarProps {
  onOpenTrialModal: (planName?: string) => void;
}

export function ComproNavbar({ onOpenTrialModal }: ComproNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E6E3DC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo Pintu Satu */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#1C1B18] flex items-center justify-center text-white font-bold font-mono text-xs tracking-wider group-hover:bg-[#6F4E37] group-hover:rotate-6 transition-all duration-300 shadow-xs">
            P1
          </div>
          <span className="font-extrabold text-lg tracking-tight text-[#1C1B18] group-hover:text-[#6F4E37] transition-colors">
            Pintu Satu
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5C5952]">
          <a href="#keunggulan" className="hover:text-[#6F4E37] transition-colors">
            Keunggulan
          </a>
          <a href="#fitur" className="hover:text-[#6F4E37] transition-colors">
            Fitur
          </a>
          <a href="#cara-kerja" className="hover:text-[#6F4E37] transition-colors">
            Cara Kerja
          </a>
          <a href="#harga" className="hover:text-[#6F4E37] transition-colors">
            Harga
          </a>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-xs font-semibold text-[#1C1B18] hover:text-[#6F4E37] transition-colors cursor-pointer"
          >
            Masuk
          </Link>
          <button
            onClick={() => onOpenTrialModal("Daftar Sekarang")}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#6F4E37] hover:bg-[#563B28] rounded-lg transition-all shadow-xs flex items-center gap-1.5 cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
          >
            <span>Gunakan Sekarang</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#1C1B18] hover:bg-[#F9F8F6] transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E6E3DC] bg-white px-4 py-4 space-y-3 text-sm font-medium animate-in slide-in-from-top-2 duration-200">
          <a
            href="#keunggulan"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-[#5C5952] hover:text-[#1C1B18] transition-colors"
          >
            Keunggulan
          </a>
          <a
            href="#fitur"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-[#5C5952] hover:text-[#1C1B18] transition-colors"
          >
            Fitur
          </a>
          <a
            href="#cara-kerja"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-[#5C5952] hover:text-[#1C1B18] transition-colors"
          >
            Cara Kerja
          </a>
          <a
            href="#harga"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-[#5C5952] hover:text-[#1C1B18] transition-colors"
          >
            Harga
          </a>
          <div className="pt-2 border-t border-[#E6E3DC] flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2 text-center text-xs font-semibold text-[#1C1B18] bg-[#F9F8F6] border border-[#E6E3DC] rounded-lg hover:bg-[#E6E3DC]/40 transition-colors cursor-pointer"
            >
              Masuk Akun
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrialModal("Uji Coba Gratis");
              }}
              className="w-full py-2.5 text-xs font-semibold text-white bg-[#6F4E37] rounded-lg hover:bg-[#563B28] transition-colors cursor-pointer"
            >
              Gunakan Sekarang &rarr;
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
