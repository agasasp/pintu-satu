"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Definisi Interface Global untuk Window.snap (Midtrans Snap)
declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        callbacks?: {
          onSuccess?: (result: unknown) => void;
          onPending?: (result: unknown) => void;
          onError?: (result: unknown) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

interface ComproPaidModalProps {
  isOpen: boolean;
  selectedPlan: string;
  packageId?: number;
  planPrice?: number;
  billingCycle?: string;
  onClose: () => void;
  onSubmitSuccess?: (orderId: string, email: string) => void;
}

export function ComproPaidModal({
  isOpen,
  selectedPlan,
  packageId,
  planPrice,
  billingCycle,
  onClose,
  onSubmitSuccess,
}: ComproPaidModalProps) {
  const router = useRouter();

  // State Form Input Registrasi Paket Berbayar
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [kostName, setKostName] = useState("");

  // State Status Request & Pesan Error
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Dynamic Midtrans Snap Script Loader
  useEffect(() => {
    const clientKey =
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ||
      "SB-Mid-client-wIleTD7hevcOlsJdN5l-lI50";
    const snapScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.querySelector(
      `script[src="${snapScriptUrl}"]`
    ) as HTMLScriptElement | null;

    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.src = snapScriptUrl;
      scriptTag.setAttribute("data-client-key", clientKey);
      scriptTag.async = true;
      document.body.appendChild(scriptTag);
    }
  }, []);

  if (!isOpen) return null;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  // Format harga ke Rupiah
  const formattedPrice = planPrice
    ? new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(planPrice)
    : "Rp 229.000";

  const billingSuffix =
    billingCycle?.toLowerCase() === "yearly" ? "/ tahun" : "/ bulan";

  // Eksekusi Submit Form & Midtrans Snap API Call
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    // Fallback ID paket berbayar dinamis (default ke 2 = Paket Juragan Pro)
    const targetPackageId = packageId ?? 2;

    const payload = {
      name: ownerName.trim(),
      email: email.trim(),
      password,
      nama_kos: kostName.trim(),
      package_id: targetPackageId,
    };

    try {
      const response = await fetch(`${apiUrl}/api/register/paid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || data.status === "error") {
        let errText =
          "Gagal memproses pendaftaran paket berbayar. Silakan cek data Anda.";
        if (data?.errors && typeof data.errors === "object") {
          const errorList = Object.values(data.errors).flat();
          if (errorList.length > 0) {
            errText = errorList.join(" ");
          } else if (data.message) {
            errText = data.message;
          }
        } else if (data?.message) {
          errText = data.message;
        }
        setErrorMessage(errText);
        setIsLoading(false);
        return;
      }

      const orderData = data.data?.order;
      const snapToken = orderData?.snap_token;
      const snapRedirectUrl = orderData?.snap_redirect_url;
      const registeredEmail = email.trim();
      const orderId = orderData?.order_id || "";

      onSubmitSuccess?.(orderId, registeredEmail);

      // Integrasi Midtrans Snap Popup / Redirect
      if (typeof window !== "undefined" && window.snap && snapToken) {
        setIsLoading(false);

        window.snap.pay(snapToken, {
          onSuccess: (result: unknown) => {
            console.log("Pembayaran Midtrans Sukses:", result);
            onClose();
            router.push(
              `/login?email=${encodeURIComponent(
                registeredEmail
              )}&payment=success&order_id=${encodeURIComponent(orderId)}`
            );
          },
          onPending: (result: unknown) => {
            console.log("Pembayaran Midtrans Pending:", result);
            onClose();
            router.push(
              `/login?email=${encodeURIComponent(
                registeredEmail
              )}&payment=pending&order_id=${encodeURIComponent(orderId)}`
            );
          },
          onError: (result: unknown) => {
            console.error("Pembayaran Midtrans Gagal:", result);
            setErrorMessage(
              "Pembayaran tidak berhasil diselesaikan. Silakan coba metode lain."
            );
          },
          onClose: () => {
            setErrorMessage(
              "Jendela pembayaran ditutup sebelum transaksi selesai. Klik 'Lanjut Pembayaran' untuk membuka kembali."
            );
          },
        });
      } else if (snapRedirectUrl) {
        // Fallback jika window.snap belum ready: arahkan langsung ke Midtrans Snap Redirection URL
        window.location.href = snapRedirectUrl;
      } else {
        setErrorMessage(
          "Token pembayaran tidak ditemukan. Silakan hubungi customer service Pintu Satu."
        );
        setIsLoading(false);
      }
    } catch (err: unknown) {
      console.error("Paid registration error:", err);
      setErrorMessage(
        "Tidak dapat terhubung ke server. Pastikan backend Pintu Satu sedang berjalan."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1B18]/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white border border-[#E6E3DC] rounded-2xl p-6 sm:p-7 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#E6E3DC] pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#F4EFEA] text-[#6F4E37] font-semibold">
                {selectedPlan}
              </span>
              <span className="text-xs font-bold font-mono text-[#6F4E37]">
                {formattedPrice}
                <span className="text-[10px] text-[#8C887F] font-normal">
                  {billingSuffix}
                </span>
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#1C1B18] mt-1.5">
              Langganan Paket Pintu Satu
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="text-[#8C887F] hover:text-[#1C1B18] text-xs font-mono p-1 cursor-pointer disabled:opacity-50"
          >
            Tutup [✕]
          </button>
        </div>

        {/* Banner Alert Pesan Error */}
        {errorMessage && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2 animate-in fade-in">
            <svg
              className="w-4 h-4 shrink-0 mt-0.5 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="leading-snug">{errorMessage}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-[#1C1B18] font-medium mb-1">
              Nama Lengkap Pemilik
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Bpk. Hendra Wijaya"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="w-full bg-[#F9F8F6] border border-[#E6E3DC] rounded-lg px-3 py-2 text-[#1C1B18] focus:outline-none focus:border-[#6F4E37]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#1C1B18] font-medium mb-1">
                Email Akun
              </label>
              <input
                type="email"
                required
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F9F8F6] border border-[#E6E3DC] rounded-lg px-3 py-2 text-[#1C1B18] focus:outline-none focus:border-[#6F4E37]"
              />
            </div>
            <div>
              <label className="block text-[#1C1B18] font-medium mb-1">
                Kata Sandi
              </label>
              <input
                type="password"
                required
                minLength={6}
                placeholder="Minimal 6 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F9F8F6] border border-[#E6E3DC] rounded-lg px-3 py-2 text-[#1C1B18] focus:outline-none focus:border-[#6F4E37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#1C1B18] font-medium mb-1">
              Nama Kost &amp; Kota
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Griya Kost BSD, Tangerang"
              value={kostName}
              onChange={(e) => setKostName(e.target.value)}
              className="w-full bg-[#F9F8F6] border border-[#E6E3DC] rounded-lg px-3 py-2 text-[#1C1B18] focus:outline-none focus:border-[#6F4E37]"
            />
          </div>

          {/* Info Integrasi Midtrans */}
          <div className="p-3 rounded-lg bg-[#F9F8F6] border border-[#E6E3DC] text-[11px] text-[#5C5952] leading-relaxed space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-[#1C1B18]">
              <svg
                className="w-3.5 h-3.5 text-[#6F4E37]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>Pembayaran Aman via Midtrans Snap</span>
            </div>
            <p className="text-[10px] text-[#8C887F]">
              Mendukung QRIS, GoPay, ShopeePay, Virtual Account (BCA, Mandiri, BRI, BNI), &amp; Kartu Kredit.
            </p>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-[#5C5952] hover:text-[#1C1B18] font-medium cursor-pointer disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 rounded-lg bg-[#6F4E37] hover:bg-[#563B28] text-white font-semibold transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Menyiapkan Midtrans...</span>
                </>
              ) : (
                "Lanjut ke Pembayaran"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
