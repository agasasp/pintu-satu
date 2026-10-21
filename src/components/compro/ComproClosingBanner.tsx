"use client";

interface ComproClosingBannerProps {
  onOpenTrialModal: (planName?: string) => void;
}

export function ComproClosingBanner({ onOpenTrialModal }: ComproClosingBannerProps) {
  return (
    <section className="py-16 bg-white border-t border-[#E6E3DC]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#1C1B18] text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C88A58]">
              UJI COBA TANPA RISIKO
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Kost terkelola rapi. Mulai langkah pertama Anda hari ini.
            </h3>
            <p className="text-xs sm:text-sm text-[#F9F8F6]/80 leading-relaxed">
              Coba gratis selama 14 hari penuh. Tim Pintu Satu siap membantu memasukkan data kamar dan meteran awal kost Anda.
            </p>
          </div>
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => onOpenTrialModal("Uji Coba 14 Hari")}
              className="px-6 py-3.5 rounded-xl bg-[#C88A58] hover:bg-[#DFB08A] text-[#1C1B18] font-bold text-xs sm:text-sm transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
            >
              Daftar Uji Coba Gratis &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
