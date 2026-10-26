"use client";

interface ComproStepsProps {
  onOpenTrialModal: (planName?: string) => void;
}

export function ComproSteps({ onOpenTrialModal }: ComproStepsProps) {
  return (
    <section id="cara-kerja" className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#6F4E37] font-semibold">
            ALUR PENGGUNAAN
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1B18] mt-2 tracking-tight">
            Tiga langkah menuju kost yang lebih rapi.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 sm:p-7 rounded-2xl bg-[#F9F8F6] border border-[#E6E3DC] space-y-3 card-hover-lift group cursor-default">
            <span className="w-8 h-8 rounded-full bg-[#6F4E37] text-white font-mono text-xs font-bold flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#C88A58] shadow-xs">
              01
            </span>
            <h3 className="text-base font-bold text-[#1C1B18] group-hover:text-[#6F4E37] transition-colors">
              Masukkan data kost
            </h3>
            <p className="text-xs text-[#5C5952] leading-relaxed">
              Daftarkan nama properti, jumlah kamar, tarif sewa bulanan, dan mode listrik yang digunakan.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl bg-[#F9F8F6] border border-[#E6E3DC] space-y-3 card-hover-lift group cursor-default">
            <span className="w-8 h-8 rounded-full bg-[#6F4E37] text-white font-mono text-xs font-bold flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#C88A58] shadow-xs">
              02
            </span>
            <h3 className="text-base font-bold text-[#1C1B18] group-hover:text-[#6F4E37] transition-colors">
              Beri akses pengelola/staf
            </h3>
            <p className="text-xs text-[#5C5952] leading-relaxed">
              Undang penjaga kost untuk mencatat angka kWh meteran dan tugas kebersihan melalui smartphone.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl bg-[#F9F8F6] border border-[#E6E3DC] space-y-3 card-hover-lift group cursor-default">
            <span className="w-8 h-8 rounded-full bg-[#6F4E37] text-white font-mono text-xs font-bold flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#C88A58] shadow-xs">
              03
            </span>
            <h3 className="text-base font-bold text-[#1C1B18] group-hover:text-[#6F4E37] transition-colors">
              Arus sewa &amp; keuangan tenang
            </h3>
            <p className="text-xs text-[#5C5952] leading-relaxed">
              Tagihan terkirim otomatis, pembayaran terdata real-time, dan laporan laba bersih siap ditinjau.
            </p>
          </div>
        </div>

        {/* Banner Help Strip below steps */}
        <div className="mt-8 p-4 rounded-xl bg-[#F9F8F6] border border-[#E6E3DC] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-[#5C5952]">
            💡 Butuh bantuan input data kamar awal? Tim kami siap membantu memindahkan data dari buku atau Excel secara cuma-cuma.
          </span>
          <button
            onClick={() => onOpenTrialModal("Bantuan Input Data")}
            className="text-[#6F4E37] font-bold hover:underline shrink-0 cursor-pointer"
          >
            Jadwalkan Konsultasi Gratis &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
