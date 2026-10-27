"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ComproTrialModalProps {
  isOpen: boolean;
  selectedPlan: string;
  packageId?: number;
  onClose: () => void;
  onSubmitSuccess?: (ownerName: string, kostName: string, packageId?: number) => void;
}

export function ComproTrialModal({
  isOpen,
  selectedPlan,
  packageId,
  onClose,
  onSubmitSuccess,
}: ComproTrialModalProps) {
  const router = useRouter();

  // State Form
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [kostName, setKostName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [roomTotal, setRoomTotal] = useState("10");

  // State Status Request
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    // Dynamic package_id dari props dengan fallback aman ke 1 (Paket Trial Rintisan)
    const targetPackageId = packageId ?? 1;

    const payload = {
      name: ownerName.trim(),
      email: email.trim(),
      password,
      nama_kos: kostName.trim(),
      whatsapp: whatsapp.trim(),
      jumlah_pintu: parseInt(roomTotal, 10) || 1,
      package_id: targetPackageId,
    };

    try {
      const response = await fetch(`${apiUrl}/api/register/trial`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || data.status === "error") {
        let errText = "Gagal melakukan registrasi trial. Silakan periksa kembali data Anda.";
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

      // Tutup modal terlebih dahulu
      onClose();

      // Panggil callback parent jika dibutuhkan
      onSubmitSuccess?.(ownerName, kostName, targetPackageId);

      // Simpan email terdaftar sebelum form di-reset
      const registeredEmail = email.trim();

      // Reset Form
      setOwnerName("");
      setEmail("");
      setPassword("");
      setKostName("");
      setWhatsapp("");
      setRoomTotal("10");

      // Redirect user ke halaman login (/login) dengan query param email otomatis
      router.push(`/login?email=${encodeURIComponent(registeredEmail)}&registered=true`);
    } catch (err: unknown) {
      console.error("Trial registration error:", err);
      setErrorMessage("Tidak dapat terhubung ke server. Pastikan backend Pintu Satu sedang berjalan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1B18]/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white border border-[#E6E3DC] rounded-2xl p-6 sm:p-7 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#E6E3DC] pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#F4EFEA] text-[#6F4E37] font-semibold">
              {selectedPlan}
            </span>
            <h3 className="text-lg font-bold text-[#1C1B18] mt-1">Mulai Gunakan Pintu Satu</h3>
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
            <svg className="w-4 h-4 shrink-0 mt-0.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="leading-snug">{errorMessage}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-[#1C1B18] font-medium mb-1">Nama Lengkap Pemilik</label>
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
              <label className="block text-[#1C1B18] font-medium mb-1">Email Akun</label>
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
              <label className="block text-[#1C1B18] font-medium mb-1">Password</label>
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
            <label className="block text-[#1C1B18] font-medium mb-1">Nama Kost &amp; Kota</label>
            <input
              type="text"
              required
              placeholder="Contoh: Griya Kost BSD"
              value={kostName}
              onChange={(e) => setKostName(e.target.value)}
              className="w-full bg-[#F9F8F6] border border-[#E6E3DC] rounded-lg px-3 py-2 text-[#1C1B18] focus:outline-none focus:border-[#6F4E37]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#1C1B18] font-medium mb-1">Nomor WhatsApp</label>
              <input
                type="tel"
                required
                placeholder="0812xxxx"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full bg-[#F9F8F6] border border-[#E6E3DC] rounded-lg px-3 py-2 text-[#1C1B18] font-mono focus:outline-none focus:border-[#6F4E37]"
              />
            </div>
            <div>
              <label className="block text-[#1C1B18] font-medium mb-1">Jumlah Pintu / Kamar</label>
              <input
                type="number"
                min="1"
                required
                value={roomTotal}
                onChange={(e) => setRoomTotal(e.target.value)}
                className="w-full bg-[#F9F8F6] border border-[#E6E3DC] rounded-lg px-3 py-2 text-[#1C1B18] font-mono focus:outline-none focus:border-[#6F4E37]"
              />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#F9F8F6] text-[11px] text-[#5C5952] leading-relaxed">
            Akun Anda akan langsung aktif disertai uji coba gratis 14 hari. Akses dashboard langsung terbuka setelah pendaftaran.
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
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Mengaktifkan...</span>
                </>
              ) : (
                "Aktifkan Akun Sekarang"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
