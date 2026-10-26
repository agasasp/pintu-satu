"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, RefreshCw, Check } from "lucide-react";

// 1. Interface TypeScript untuk Item Paket sesuai struktur API Backend
export interface PackageItem {
  id: number;
  name: string;
  category: string;
  max_doors: number;
  door_label: string;
  price: number;
  duration_days: number;
  billing_cycle: string;
  badge_text: string | null;
  discount_label: string | null;
  is_featured: boolean;
  description: string;
  features: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface ComproPricingProps {
  onOpenTrialModal?: (planName: string, packageId?: number) => void;
  onSelectPackage?: (pkg: PackageItem) => void;
}

export function ComproPricing({ onOpenTrialModal, onSelectPackage }: ComproPricingProps) {
  const router = useRouter();

  // State untuk data API, loading, error, dan tab filter aktif
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"monthly" | "yearly">("monthly");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // Fungsi reload untuk tombol Coba Lagi
  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    fetch(`${apiUrl}/api/packages`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Gagal memuat paket (Status HTTP: ${response.status})`);
        }
        return response.json();
      })
      .then((result) => {
        setPackages(Array.isArray(result.data) ? result.data : []);
      })
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : "Terjadi kesalahan saat menghubungi server.";
        setError(message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    let isCancelled = false;

    fetch(`${apiUrl}/api/packages`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Gagal memuat paket (Status HTTP: ${response.status})`);
        }
        return response.json();
      })
      .then((result) => {
        if (!isCancelled) {
          setPackages(Array.isArray(result.data) ? result.data : []);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!isCancelled) {
          const message =
            err instanceof Error ? err.message : "Terjadi kesalahan saat menghubungi server.";
          setError(message);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [apiUrl]);

  // Formatter harga ke format mata uang Rupiah
  const formatRupiah = (price: number): string => {
    if (price === 0) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Suffix periode penagihan sesuai billing_cycle paket
  const getBillingSuffix = (cycle: string): string => {
    switch (cycle?.toLowerCase()) {
      case "yearly":
        return "/ tahun";
      case "trial":
        return "/ 14 hari";
      case "monthly":
      default:
        return "/ bulan";
    }
  };

  // Handler tombol aksi (CTA) membawa user ke modal registrasi atau checkout dengan package_id
  const handleSelect = (pkg: PackageItem) => {
    if (onSelectPackage) {
      onSelectPackage(pkg);
    } else if (onOpenTrialModal) {
      onOpenTrialModal(pkg.name, pkg.id);
    } else {
      router.push(`/login?package_id=${pkg.id}&action=register`);
    }
  };

  // LOGIKA FILTERING BERDASARKAN TAB:
  // - Tab Bulanan ('monthly'): Menampilkan billing_cycle === 'monthly' DAN billing_cycle === 'trial'
  // - Tab Tahunan ('yearly'): Menampilkan billing_cycle === 'yearly' DAN billing_cycle === 'trial'
  // Urutkan berdasarkan harga agar tiering terlihat jelas (Trial Rp 0 di kiri, lalu paket berbayar)
  const displayedPackages = packages
    .filter((pkg) => {
      if (!pkg.is_active) return false;
      const cycle = pkg.billing_cycle?.toLowerCase();

      // Paket trial wajib tampil di kedua tab
      if (cycle === "trial") {
        return true;
      }

      // Filter sesuai tab aktif
      return cycle === activeTab;
    })
    .sort((a, b) => a.price - b.price);

  return (
    <section id="harga" className="py-16 md:py-24 bg-white border-t border-[#E6E3DC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#6F4E37] font-semibold">
            PAKET BERLANGGANAN
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1B18] mt-2 tracking-tight">
            Harga Simpel Sesuai Jumlah Pintu Kost Anda
          </h2>
          <p className="text-[#5C5952] text-sm mt-2">
            Pilih paket bulanan atau tahunan. Tanpa biaya setup tambahan dan bisa berhenti kapan saja.
          </p>

          {/* 3. Interaktivitas Switch Tab: Bayar Bulanan vs Bayar Tahunan */}
          <div className="mt-6 inline-flex items-center p-1 rounded-xl bg-[#F9F8F6] border border-[#E6E3DC] shadow-xs">
            <button
              type="button"
              onClick={() => setActiveTab("monthly")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "monthly"
                  ? "bg-[#1C1B18] text-white shadow-xs"
                  : "text-[#5C5952] hover:text-[#1C1B18]"
              }`}
            >
              Bayar Bulanan
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("yearly")}
              className={`px-4 py-2 rounded-lg text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "yearly"
                  ? "font-semibold bg-[#1C1B18] text-white shadow-xs"
                  : "font-medium text-[#5C5952] hover:text-[#1C1B18]"
              }`}
            >
              <span>Bayar Tahunan</span>
              <span className="px-1.5 py-0.5 rounded bg-[#C88A58]/20 text-[#6F4E37] font-mono text-[10px] font-bold">
                Hemat 20%
              </span>
            </button>
          </div>
        </div>

        {/* State: Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E6E3DC] shadow-xs flex flex-col justify-between animate-pulse"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-24 bg-[#E6E3DC] rounded" />
                    <div className="h-4 w-20 bg-[#E6E3DC] rounded" />
                  </div>
                  <div className="h-6 w-3/4 bg-[#E6E3DC] rounded mt-4" />
                  <div className="h-4 w-full bg-[#E6E3DC] rounded mt-2" />
                  <div className="my-6 pb-6 border-b border-[#E6E3DC]">
                    <div className="h-8 w-1/2 bg-[#E6E3DC] rounded" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 w-5/6 bg-[#E6E3DC] rounded" />
                    <div className="h-4 w-4/6 bg-[#E6E3DC] rounded" />
                    <div className="h-4 w-3/4 bg-[#E6E3DC] rounded" />
                  </div>
                </div>
                <div className="h-10 w-full bg-[#E6E3DC] rounded-xl mt-8" />
              </div>
            ))}
          </div>
        )}

        {/* State: Error Feedback */}
        {!isLoading && error && (
          <div className="max-w-md mx-auto p-6 bg-red-50 border border-red-200 rounded-2xl text-center">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <h4 className="font-semibold text-red-800 text-sm">Gagal Mengambil Data Paket</h4>
            <p className="text-xs text-red-600 mt-1">{error}</p>
            <button
              type="button"
              onClick={handleRetry}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Coba Lagi</span>
            </button>
          </div>
        )}

        {/* State: Data Kosong */}
        {!isLoading && !error && displayedPackages.length === 0 && (
          <div className="text-center py-16 bg-[#F9F8F6] rounded-2xl border border-[#E6E3DC] max-w-lg mx-auto">
            <p className="text-[#5C5952] font-medium text-sm">
              Belum ada paket langganan untuk periode{" "}
              {activeTab === "monthly" ? "bulanan" : "tahunan"}.
            </p>
            <p className="text-xs text-[#8C887F] mt-1">
              Silakan cek kembali nanti atau hubungi customer service kami.
            </p>
          </div>
        )}

        {/* 2. Render & Mapping Dynamic Cards Sesuai Tab Aktif */}
        {!isLoading && !error && displayedPackages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {displayedPackages.map((pkg) => {
              const isFeatured = Boolean(pkg.is_featured);

              return (
                <div
                  key={pkg.id}
                  className={`bg-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 card-hover-lift group ${
                    isFeatured
                      ? "border-2 border-[#6F4E37] shadow-[0_10px_30px_-10px_rgba(111,78,55,0.08)] relative hover:-translate-y-2 hover:shadow-[0_20px_40px_-12px_rgba(111,78,55,0.22)]"
                      : "border border-[#E6E3DC] shadow-[0_2px_15px_-3px_rgba(28,27,24,0.04)]"
                  }`}
                >
                  {/* Badge Text Khusus (cth: "PALING BANYAK DIPILIH" atau "COBA GRATIS 14 HARI") */}
                  {pkg.badge_text && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#6F4E37] text-white font-mono text-[10px] font-semibold uppercase tracking-wider shadow-sm whitespace-nowrap">
                      {pkg.badge_text}
                    </div>
                  )}

                  <div>
                    {/* Header Card: Kategori & Door Label */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-xs font-mono uppercase font-semibold ${
                          isFeatured ? "text-[#6F4E37]" : "text-[#8C887F]"
                        }`}
                      >
                        {pkg.category}
                      </span>
                      <span
                        className={`text-xs font-mono px-2.5 py-0.5 rounded whitespace-nowrap ${
                          isFeatured
                            ? "text-[#6F4E37] bg-[#F4EFEA]"
                            : "text-[#5C5952] bg-[#F9F8F6]"
                        }`}
                      >
                        {pkg.door_label}
                      </span>
                    </div>

                    {/* Judul & Deskripsi Paket */}
                    <h3 className="text-xl font-bold text-[#1C1B18] mt-2 group-hover:text-[#6F4E37] transition-colors">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-[#5C5952] mt-1 line-clamp-2">
                      {pkg.description}
                    </p>

                    {/* Harga & Periode Penagihan */}
                    <div className="my-6 pb-6 border-b border-[#E6E3DC]">
                      <div className="flex items-baseline gap-1">
                        <span
                          className={`text-3xl font-extrabold font-mono ${
                            isFeatured ? "text-[#6F4E37]" : "text-[#1C1B18]"
                          }`}
                        >
                          {formatRupiah(pkg.price)}
                        </span>
                        <span className="text-xs text-[#8C887F]">
                          {getBillingSuffix(pkg.billing_cycle)}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#8C887F] block mt-1">
                        {pkg.discount_label ? `${pkg.discount_label} • ` : ""}
                        {pkg.billing_cycle === "yearly"
                          ? "Ditagih tahunan"
                          : pkg.billing_cycle === "trial"
                          ? "Uji coba gratis tanpa kartu kredit"
                          : "Ditagih bulanan"}
                      </span>
                    </div>

                    {/* Daftar Fitur Benefit (Checklist) */}
                    <ul
                      className={`space-y-3 text-xs ${
                        isFeatured ? "text-[#1C1B18]" : "text-[#5C5952]"
                      }`}
                    >
                      {Array.isArray(pkg.features) &&
                        pkg.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span
                              className={`font-bold shrink-0 mt-0.5 ${
                                isFeatured ? "text-[#C88A58]" : "text-[#6F4E37]"
                              }`}
                            >
                              <Check className="w-3.5 h-3.5 inline" />
                            </span>
                            <span>{feat}</span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* Tombol Aksi (CTA) */}
                  <button
                    type="button"
                    onClick={() => handleSelect(pkg)}
                    className={`w-full mt-8 py-3 rounded-xl font-semibold text-xs transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                      isFeatured
                        ? "bg-[#6F4E37] hover:bg-[#563B28] text-white shadow-xs hover:shadow-md"
                        : "border border-[#1C1B18] text-[#1C1B18] hover:bg-[#1C1B18] hover:text-white"
                    }`}
                  >
                    Pilih {pkg.name}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
