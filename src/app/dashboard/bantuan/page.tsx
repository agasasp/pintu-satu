"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Phone, BookOpen, ChevronDown, ChevronUp, Search, CheckCircle2, X } from "lucide-react";
import { useDashboard } from "@/components/pemilik-kost/DashboardContext";

export default function BantuanPage() {
  const { showToast } = useDashboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Pusat Bantuan • Kost Cemara | Pintu Satu";
  }, []);

  const faqs = [
    {
      q: "Bagaimana cara mengirim tagihan dan pengingat WhatsApp ke penghuni?",
      a: "Buka menu 'Tagihan & pembayaran', pilih kamar penghuni yang belum lunas, lalu klik tombol 'Kirim WA' atau 'Tagih WA'. Sistem akan otomatis memformat pesan WhatsApp lengkap dengan nomor rekening BCA dan rincian nominal sewa.",
    },
    {
      q: "Bagaimana cara mencatat pembayaran saat penghuni transfer tunai / direct?",
      a: "Klik tombol 'Catat pembayaran' di pojok kanan atas atau klik tombol 'Catat Lunas' di baris tagihan penghuni. Pilih metode transfer atau tunai, isi tanggal pembayaran, lalu simpan. Kuitansi digital akan langsung diterbitkan.",
    },
    {
      q: "Apakah data kontrak penghuni dapat diunduh dalam bentuk CSV / PDF?",
      a: "Ya! Pada menu 'Data penghuni', klik tombol 'Ekspor (CSV)' untuk mengunduh seluruh database penghuni yang aktif maupun yang akan berakhir masa sewanya.",
    },
    {
      q: "Bagaimana jika ada biaya renovasi, servis AC, atau tagihan listrik PLN?",
      a: "Gunakan menu 'Laporan keuangan' lalu klik tombol 'Catat pengeluaran'. Pilih kategori (misal: 'Perawatan & perbaikan' atau 'Listrik, air & internet'), masukkan nominal, lalu simpan agar arus kas bersih Anda terhitung otomatis.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1B18] tracking-tight">
          Pusat Bantuan &amp; Panduan
        </h1>
        <p className="text-xs sm:text-sm text-[#5C5952] mt-1">
          Panduan operasional kost, integrasi WhatsApp otomatis, dan kontak layanan bantuan.
        </p>
      </div>

      {/* 3 Contact Support Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-[#E6E3DC] shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-9 h-9 rounded-xl bg-[#F4EFEA] text-[#6F4E37] flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-sm text-[#1C1B18]">WhatsApp Hotline</h2>
            <p className="text-xs text-[#5C5952]">
              Chat langsung dengan tim dukungan teknis Pintu Satu untuk kendala darurat operasional.
            </p>
          </div>
          <a
            href="https://wa.me/6281299887766?text=Halo%20Tim%20Pintu%20Satu,%20saya%20pemilik%20Kost%20Cemara%20membutuhkan%20bantuan."
            target="_blank"
            rel="noreferrer"
            onClick={() => showToast("Membuka WhatsApp", "Menghubungkan ke Tim Support Pintu Satu...")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6F4E37] hover:underline pt-2 cursor-pointer"
          >
            <span>Hubungi via WhatsApp</span>
            <span>&rarr;</span>
          </a>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-[#E6E3DC] shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-9 h-9 rounded-xl bg-[#F4EFEA] text-[#6F4E37] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-sm text-[#1C1B18]">Panduan Pemilik Kost</h2>
            <p className="text-xs text-[#5C5952]">
              Pelajari tutorial pencatatan meteran listrik, penagihan sewa otomatis, dan pembukuan kas.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedTopic("Panduan Lengkap Operasional Kost");
              setIsGuideModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6F4E37] hover:underline pt-2 cursor-pointer text-left"
          >
            <span>Buka Buku Panduan Digital</span>
            <span>&rarr;</span>
          </button>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-[#E6E3DC] shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-9 h-9 rounded-xl bg-[#F4EFEA] text-[#6F4E37] flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h2 className="font-bold text-sm text-[#1C1B18]">Konsultasi Langganan</h2>
            <p className="text-xs text-[#5C5952]">
              Diskusikan kebutuhan penambahan kuota kamar untuk properti kost baru Anda.
            </p>
          </div>
          <a
            href="tel:081299887766"
            onClick={() => showToast("Panggilan Suara", "Menghubungi Tim Konsultasi 0812-9988-7766")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6F4E37] hover:underline pt-2 cursor-pointer"
          >
            <span>Hubungi 0812-9988-7766</span>
            <span>&rarr;</span>
          </a>
        </div>
      </div>

      {/* FAQ & Knowledge Section */}
      <div className="bg-white rounded-2xl border border-[#E6E3DC] shadow-2xs p-5 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-[#1C1B18]">Pertanyaan yang Sering Diajukan (FAQ)</h2>
            <p className="text-xs text-[#8C887F] mt-0.5">
              Jawaban cepat untuk penggunaan fitur harian pemilik kost.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#8C887F] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari kendala atau fitur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-[#E6E3DC] bg-[#F9F8F6] text-xs text-[#1C1B18] focus:bg-white focus:outline-none focus:border-[#6F4E37]"
            />
          </div>
        </div>

        <div className="divide-y divide-[#E6E3DC] border-t border-[#E6E3DC]">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;

            return (
              <div key={idx} className="py-3.5">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 text-left font-bold text-xs sm:text-sm text-[#1C1B18] hover:text-[#6F4E37] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#6F4E37] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#8C887F] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <p className="text-xs text-[#5C5952] leading-relaxed mt-2.5 pt-1 pr-6 animate-in fade-in duration-200">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="py-8 text-center text-xs text-[#8C887F]">
              Tidak menemukan jawaban untuk &quot;{searchQuery}&quot;. Silakan hubungi Hotline WhatsApp kami.
            </div>
          )}
        </div>
      </div>

      {/* MODAL: Buku Panduan Digital */}
      {isGuideModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-[#E6E3DC] shadow-xl max-w-lg w-full p-5 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E3DC]">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#6F4E37]" />
                <h3 className="font-extrabold text-sm text-[#1C1B18]">
                  {selectedTopic || "Panduan Pemilik Kost Cemara"}
                </h3>
              </div>
              <button
                onClick={() => setIsGuideModalOpen(false)}
                className="p-1 rounded-lg text-[#8C887F] hover:text-[#1C1B18] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-[#5C5952]">
              <div className="p-3.5 rounded-xl bg-[#F9F8F6] border border-[#E6E3DC] space-y-2">
                <div className="flex items-center gap-2 text-[#1C1B18] font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Langkah 1: Setup Kamar &amp; Tarif</span>
                </div>
                <p>
                  Atur seluruh kamar kost di menu Manajemen Kamar. Pastikan nomor unit, lantai, dan tipe kamar (Standard / Deluxe) telah sesuai tarif sewa bulanan.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F9F8F6] border border-[#E6E3DC] space-y-2">
                <div className="flex items-center gap-2 text-[#1C1B18] font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Langkah 2: Daftarkan Penghuni Baru</span>
                </div>
                <p>
                  Masukkan nomor WhatsApp dan tanggal jatuh tempo penghuni saat check-in. Sistem otomatis membuat jadwal tagihan per bulan.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F9F8F6] border border-[#E6E3DC] space-y-2">
                <div className="flex items-center gap-2 text-[#1C1B18] font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Langkah 3: Pantau Arus Kas di Laporan Keuangan</span>
                </div>
                <p>
                  Semua transaksi sewa yang ditandai lunas akan otomatis masuk ke dalam pemasukan kas. Anda juga dapat mencatat biaya perbaikan secara berkala.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsGuideModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#6F4E37] text-white text-xs font-semibold hover:bg-[#563B28] cursor-pointer"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
