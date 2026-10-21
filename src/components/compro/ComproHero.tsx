"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

interface ComproHeroProps {
  onOpenTrialModal: (planName?: string) => void;
}

export function ComproHero({ onOpenTrialModal }: ComproHeroProps) {
  // Interactive 3D tilt state for Hero visual
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0, active: false });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setHeroTilt({ x: x * 14, y: -y * 14, active: true });
  };

  const handleHeroMouseLeave = () => {
    setHeroTilt({ x: 0, y: 0, active: false });
  };

  return (
    <section className="pt-12 pb-16 md:pt-16 md:pb-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6 text-left animate-fade-in-up">
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#1C1B18] tracking-tight leading-[1.12]">
              Kost terkelola.<br />
              <span className="text-[#6F4E37]">Pikiran lebih lega.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#5C5952] max-w-xl leading-relaxed">
              Platform kelola kost lengkap namun sederhana. Dari tagihan otomatis ke WhatsApp, pencatatan meteran listrik, hingga laporan keuangan transparan tanpa pusing rekap manual.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenTrialModal("Mulai Coba Gratis")}
                className="group px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-[#6F4E37] hover:bg-[#563B28] transition-all shadow-xs flex items-center gap-2 cursor-pointer hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Mulai Coba Gratis</span>
                <ArrowRight className="w-4 h-4 text-[#C88A58] group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <a
                href="#fitur"
                className="px-6 py-3.5 rounded-xl font-semibold text-sm text-[#1C1B18] bg-white hover:bg-[#F9F8F6] border border-[#E6E3DC] hover:border-[#6F4E37]/50 transition-all hover:scale-[1.01] active:scale-[0.98]"
              >
                Pelajari Fitur Kami
              </a>
            </div>

            {/* Micro Trust Bullet Points */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-[#8C887F] font-medium">
              <span className="flex items-center gap-1.5 transition-colors hover:text-[#1C1B18]">
                <Check className="w-3.5 h-3.5 text-[#C88A58] stroke-[2.5]" /> Tanpa kartu kredit
              </span>
              <span className="flex items-center gap-1.5 transition-colors hover:text-[#1C1B18]">
                <Check className="w-3.5 h-3.5 text-[#C88A58] stroke-[2.5]" /> Setup mudah 15 menit
              </span>
              <span className="flex items-center gap-1.5 transition-colors hover:text-[#1C1B18]">
                <Check className="w-3.5 h-3.5 text-[#C88A58] stroke-[2.5]" /> Gratis migrasi data Excel
              </span>
            </div>
          </div>

          {/* Right Visual Image with 3D Perspective & Floating Pop-out Elements */}
          <div className="lg:col-span-5 relative [perspective:1200px] py-4 sm:py-6">
            {/* Warm Ambient 3D Depth Aura */}
            <div className="absolute inset-4 bg-gradient-to-tr from-[#6F4E37]/20 via-[#C88A58]/15 to-transparent rounded-[120px] blur-3xl -z-10 opacity-75 pointer-events-none animate-pulse-glow" />

            {/* 3D Floating Stage with Interactive Tilt */}
            <div
              onMouseMove={handleHeroMouseMove}
              onMouseLeave={handleHeroMouseLeave}
              style={
                heroTilt.active
                  ? {
                      transform: `perspective(1200px) rotateY(${heroTilt.x}deg) rotateX(${heroTilt.y}deg)`,
                      transition: "transform 0.15s ease-out",
                    }
                  : undefined
              }
              className={`relative group ${!heroTilt.active ? "animate-stage-3d" : ""}`}
            >
              {/* Arched image container with deep 3D drop shadow */}
              <div className="relative rounded-t-[100px] sm:rounded-t-[120px] rounded-b-3xl overflow-hidden border border-[#E6E3DC]/90 shadow-[0_30px_70px_-15px_rgba(28,27,24,0.22),0_12px_24px_-6px_rgba(111,78,55,0.12)] aspect-[4/5] w-full bg-[#F9F8F6] ring-1 ring-black/5">
                <Image
                  src="/images/kost-courtyard.jpg"
                  alt="Modern Boutique Kost Courtyard Pintu Satu"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Glass reflection highlight on top arch */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/45 pointer-events-none" />
              </div>

              {/* Top Right 3D Floating Pop-out Badge */}
              <div className="absolute -top-3 -right-2 sm:-right-4 z-20 animate-badge-3d pointer-events-none">
                <div className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/95 border border-white/90 shadow-[0_16px_32px_-6px_rgba(28,27,24,0.2),0_6px_12px_-3px_rgba(111,78,55,0.12)] backdrop-blur-xl flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold text-[#1C1B18] ring-1 ring-black/5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C88A58] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C88A58]"></span>
                  </span>
                  <span>Notifikasi tagihan terkirim</span>
                </div>
              </div>

              {/* Bottom Left 3D Floating Pop-out Card: Kamar Terisi */}
              <div className="absolute -bottom-6 -left-3 sm:-left-6 z-20 animate-card-3d">
                <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-white/90 shadow-[0_28px_60px_-12px_rgba(28,27,24,0.28),0_12px_24px_-6px_rgba(111,78,55,0.18)] backdrop-blur-xl w-60 sm:w-64 text-left ring-1 ring-black/5 group/card hover:scale-[1.03] transition-transform duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#8C887F] font-semibold tracking-wide uppercase font-mono">
                      Kamar Terisi
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#F4EFEA] text-[10px] font-mono font-bold text-[#6F4E37]">
                      87.5%
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-black text-[#1C1B18] font-mono tracking-tight">28</span>
                    <span className="text-xs text-[#8C887F] font-mono">/ 32 Pintu</span>
                  </div>

                  {/* Styled Gradient Progress Bar */}
                  <div className="w-full bg-[#E6E3DC] h-2 rounded-full mt-2.5 overflow-hidden p-0.5 shadow-inner">
                    <div className="bg-gradient-to-r from-[#6F4E37] to-[#C88A58] h-full rounded-full w-[87.5%] transition-all duration-1000 ease-out" />
                  </div>

                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] text-[#6F4E37] font-semibold">
                      28 Terisi • 4 Siap Huni
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Value Strip Below Hero */}
        <div className="mt-16 pt-8 border-t border-[#E6E3DC] grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="flex items-center gap-2.5 p-2 rounded-xl transition-all duration-300 hover:bg-[#F9F8F6] group cursor-default">
            <span className="w-5 h-5 rounded-full bg-[#F4EFEA] text-[#6F4E37] flex items-center justify-center font-bold text-xs shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#6F4E37] group-hover:text-white">
              ✓
            </span>
            <span className="text-xs font-semibold text-[#1C1B18] group-hover:text-[#6F4E37] transition-colors">
              Terhubung ke WhatsApp Resmi
            </span>
          </div>
          <div className="flex items-center gap-2.5 p-2 rounded-xl transition-all duration-300 hover:bg-[#F9F8F6] group cursor-default">
            <span className="w-5 h-5 rounded-full bg-[#F4EFEA] text-[#6F4E37] flex items-center justify-center font-bold text-xs shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#6F4E37] group-hover:text-white">
              ✓
            </span>
            <span className="text-xs font-semibold text-[#1C1B18] group-hover:text-[#6F4E37] transition-colors">
              Pencatatan Listrik Presisi
            </span>
          </div>
          <div className="flex items-center gap-2.5 p-2 rounded-xl transition-all duration-300 hover:bg-[#F9F8F6] group cursor-default">
            <span className="w-5 h-5 rounded-full bg-[#F4EFEA] text-[#6F4E37] flex items-center justify-center font-bold text-xs shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#6F4E37] group-hover:text-white">
              ✓
            </span>
            <span className="text-xs font-semibold text-[#1C1B18] group-hover:text-[#6F4E37] transition-colors">
              Tarif Fleksibel &amp; Transparan
            </span>
          </div>
          <div className="flex items-center gap-2.5 p-2 rounded-xl transition-all duration-300 hover:bg-[#F9F8F6] group cursor-default">
            <span className="w-5 h-5 rounded-full bg-[#F4EFEA] text-[#6F4E37] flex items-center justify-center font-bold text-xs shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#6F4E37] group-hover:text-white">
              ✓
            </span>
            <span className="text-xs font-semibold text-[#1C1B18] group-hover:text-[#6F4E37] transition-colors">
              Aman &amp; Anti-Kebocoran
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
