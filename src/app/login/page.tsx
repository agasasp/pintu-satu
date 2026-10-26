"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Check,
  ShieldCheck,
  Loader2,
  Sparkles,
  HelpCircle,
  X,
  Building2,
} from "lucide-react";

export default function PemilikKostLoginPage() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("andi.pratama@kostara.id");
  const [password, setPassword] = useState("KostCemara2026!");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);

  useEffect(() => {
    document.title = "Masuk Portal Pemilik Kost | Pintu Satu";

    // Tangkap query param email dari hasil registrasi trial
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const emailParam = params.get("email");
      const isRegistered = params.get("registered");

      if (emailParam || isRegistered) {
        queueMicrotask(() => {
          if (emailParam) {
            setIdentifier(emailParam);
            setPassword(""); // Kosongkan password agar user memasukkan kata sandinya
          }

          if (isRegistered === "true") {
            setSuccessMessage(
              "Akun trial Anda berhasil dibuat! Silakan masukkan kata sandi untuk masuk ke akun kost Anda."
            );
          }
        });
      }
    }
  }, []);

  // Hardcoded instant login logic for Pemilik Kost (Andi Pratama - Kost Cemara)
  const executeHardcodedLogin = (
    name = "Andi Pratama",
    kost = "Kost Cemara"
  ) => {
    setIsLoading(true);
    setErrorMessage(null);

    const ownerUser = {
      id: "owner-andi-pratama",
      name,
      email: identifier.trim() || "andi.pratama@kostara.id",
      role: "pemilik_kost",
      kostName: kost,
      location: "Sukajadi, Bandung",
      roomCount: 32,
    };

    try {
      localStorage.setItem("pintusatu_token", "demo-token-andi-pratama-kostara-2026");
      localStorage.setItem("token", "demo-token-andi-pratama-kostara-2026");
      localStorage.setItem("pintusatu_user", JSON.stringify(ownerUser));
      localStorage.setItem("pintusatu_role", "pemilik_kost");
      document.cookie = `pintusatu_token=demo-token-andi-pratama-kostara-2026; path=/; max-age=604800; SameSite=Lax`;
    } catch (err) {
      console.warn("Storage warning:", err);
    }

    setSuccessMessage(`Login berhasil! Selamat datang, Pak ${name}. Mengalihkan ke Dashboard...`);
    setTimeout(() => {
      router.push("/dashboard");
    }, 400);
  };

  const handleUseDemo = () => {
    setIdentifier("andi.pratama@kostara.id");
    setPassword("KostCemara2026!");
    executeHardcodedLogin("Andi Pratama", "Kost Cemara");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeHardcodedLogin("Andi Pratama", "Kost Cemara");
  };

  return (
    <div className="min-h-screen bg-white text-[#1C1B18] font-sans antialiased selection:bg-[#6F4E37]/15 selection:text-[#1C1B18] flex flex-col justify-between">
      {/* Top Header Navigation */}
      <header className="border-b border-[#E6E3DC] bg-white sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Back to Landing */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-[#1C1B18] flex items-center justify-center text-white font-bold font-mono text-xs tracking-wider group-hover:bg-[#6F4E37] transition-colors shadow-xs">
                P1
              </div>
              <span className="font-extrabold text-lg tracking-tight text-[#1C1B18] group-hover:text-[#6F4E37] transition-colors">
                Pintu Satu
              </span>
            </Link>

            <span className="hidden sm:inline-block w-px h-5 bg-[#E6E3DC]" />

            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#5C5952] hover:text-[#1C1B18] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>

          {/* Right Header Navigation Links */}
          <div className="flex items-center gap-3 text-xs">
            <span className="text-[#8C887F] hidden md:inline">Belum mendaftarkan properti?</span>
            <Link
              href="/#harga"
              className="font-semibold text-[#6F4E37] hover:text-[#563B28] hover:underline transition-colors"
            >
              Daftar Uji Coba Gratis 14 Hari
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Pemilik Kost Login Form */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="max-w-lg w-full mx-auto lg:mx-0">
              {/* Badge Pemilik Kost */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4EFEA] border border-[#E6E3DC] text-xs font-semibold text-[#6F4E37] mb-4">
                <Building2 className="w-3.5 h-3.5 text-[#C88A58]" />
                <span>Portal Khusus Pemilik Kost &amp; Pengelola</span>
              </div>

              {/* Title & Description */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1B18] tracking-tight">
                Masuk ke Akun Kost Anda
              </h1>
              <p className="text-xs sm:text-sm text-[#5C5952] mt-2 leading-relaxed">
                Kelola status kamar, tagihan otomatis WhatsApp penghuni, dan laporan kas kost Anda dalam satu layar.
              </p>

              {/* 1-Click Demo Login Helper */}
              <div className="mt-5 p-3.5 rounded-xl bg-[#F4EFEA] border border-[#C88A58]/30 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-[#1C1B18]">
                  <Sparkles className="w-4 h-4 text-[#C88A58] shrink-0" />
                  <span className="text-[11px] sm:text-xs font-medium">
                    Ingin langsung melihat menu? Klik untuk login otomatis.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleUseDemo}
                  className="px-3.5 py-1.5 rounded-lg bg-[#6F4E37] text-white font-semibold text-[11px] hover:bg-[#563B28] transition-all shrink-0 cursor-pointer shadow-xs active:scale-95"
                >
                  ⚡ Masuk Langsung
                </button>
              </div>

              {/* Notifications / Alerts */}
              {errorMessage && (
                <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2 animate-in fade-in duration-200">
                  <span className="font-bold text-sm shrink-0">⚠️</span>
                  <div className="flex-1">{errorMessage}</div>
                  <button
                    onClick={() => setErrorMessage(null)}
                    className="text-red-400 hover:text-red-700 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {successMessage && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2 animate-in fade-in duration-200">
                  <span className="font-bold text-sm shrink-0">✓</span>
                  <div className="flex-1">{successMessage}</div>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {/* Identifier Input (WhatsApp / Email) */}
                <div>
                  <label
                    htmlFor="identifier"
                    className="block text-xs font-semibold text-[#1C1B18] mb-1.5"
                  >
                    Nomor WhatsApp atau Email Terdaftar
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 text-[#8C887F] pointer-events-none">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="identifier"
                      type="text"
                      autoComplete="username"
                      required
                      placeholder="Contoh: 08123456789 atau juragan@kost.com"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F9F8F6] border border-[#E6E3DC] text-xs sm:text-sm text-[#1C1B18] placeholder-[#8C887F] focus:outline-none focus:border-[#6F4E37] focus:bg-white focus:ring-1 focus:ring-[#6F4E37] transition-all"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="password"
                      className="block text-xs font-semibold text-[#1C1B18]"
                    >
                      Kata Sandi
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-xs text-[#6F4E37] hover:underline font-medium cursor-pointer"
                    >
                      Lupa kata sandi?
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 text-[#8C887F] pointer-events-none">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      placeholder="Masukkan kata sandi akun kost Anda"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#F9F8F6] border border-[#E6E3DC] text-xs sm:text-sm text-[#1C1B18] placeholder-[#8C887F] focus:outline-none focus:border-[#6F4E37] focus:bg-white focus:ring-1 focus:ring-[#6F4E37] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-[#8C887F] hover:text-[#1C1B18] transition-colors cursor-pointer"
                      aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                    <div
                      onClick={() => setRememberMe(!rememberMe)}
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        rememberMe
                          ? "bg-[#6F4E37] border-[#6F4E37] text-white"
                          : "bg-white border-[#E6E3DC]"
                      }`}
                    >
                      {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="text-xs text-[#5C5952]">Ingat saya di perangkat ini</span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-[#6F4E37] hover:bg-[#563B28] active:scale-[0.99] transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Memverifikasi Akun...</span>
                      </>
                    ) : (
                      <>
                        <span>Masuk ke Dashboard Kost</span>
                        <ArrowRight className="w-4 h-4 text-[#C88A58]" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Portal Separator & Link to Admin Login */}
              <div className="mt-8 pt-6 border-t border-[#E6E3DC] space-y-3">
                <div className="p-3.5 rounded-xl bg-[#F9F8F6] border border-[#E6E3DC] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#6F4E37] shrink-0" />
                    <span className="text-xs text-[#5C5952]">
                      Anda pengelola internal / staf teknis?
                    </span>
                  </div>
                  <Link
                    href="/login/admin-pintu"
                    className="text-xs font-semibold text-[#1C1B18] hover:text-[#6F4E37] transition-colors flex items-center gap-1 shrink-0 group"
                  >
                    <span>Masuk Portal Admin</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase & Juragan Testimonial */}
          <div className="lg:col-span-5 hidden lg:flex flex-col justify-between p-7 rounded-2xl bg-[#F9F8F6] border border-[#E6E3DC] shadow-[0_15px_35px_-10px_rgba(28,27,24,0.06)] relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#F4EFEA] text-[#6F4E37] font-semibold">
                  Dashboard Pemilik Kost
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <h2 className="text-xl font-bold text-[#1C1B18] tracking-tight">
                Griya BSD Signature
              </h2>
              <p className="text-xs text-[#5C5952] leading-relaxed">
                32 Pintu Kamar • 28 Terisi (Okupansi 87.5%) • Tagihan WhatsApp aktif terkirim otomatis.
              </p>

              {/* Courtyard Image Snippet */}
              <div className="relative rounded-xl overflow-hidden aspect-[16/10] border border-[#E6E3DC] shadow-sm">
                <Image
                  src="/images/kost-courtyard.jpg"
                  alt="Kost Courtyard Pintu Satu"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium">
                  <span>Omzet Bln Ini: Rp 38.650.000</span>
                  <span className="px-2 py-0.5 rounded bg-[#6F4E37]/90 text-[10px] font-mono">
                    Laporan Bersih
                  </span>
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="mt-6 pt-5 border-t border-[#E6E3DC] space-y-2.5">
              <p className="text-xs text-[#5C5952] italic leading-relaxed">
                &ldquo;Dulu setiap tanggal 25 pusing cek mutasi bank manual dan sungkan nagih penyewa satu per satu. Dengan Pintu Satu, tagihan WhatsApp jalan otomatis dan kas kecil penjaga kost terkontrol foto nota.&rdquo;
              </p>
              <div className="flex items-center gap-2.5 pt-1">
                <div className="w-7 h-7 rounded-full bg-[#6F4E37] text-white flex items-center justify-center font-bold font-mono text-[11px]">
                  AP
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1C1B18]">Adit Prasetya</div>
                  <div className="text-[10px] text-[#8C887F]">Pemilik Properti Griya BSD</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E6E3DC] py-6 bg-white text-xs text-[#8C887F]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#1C1B18]">Pintu Satu</span>
            <span>— Sistem Manajemen Kost Simpel &amp; Modern</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-[#1C1B18]">
              Beranda
            </Link>
            <Link href="/#keunggulan" className="hover:text-[#1C1B18]">
              Keunggulan
            </Link>
            <Link href="/#harga" className="hover:text-[#1C1B18]">
              Paket Harga
            </Link>
            <Link href="/login/admin-pintu" className="text-[#6F4E37] font-semibold hover:underline">
              Portal Admin
            </Link>
          </div>
          <div>© 2026 Pintu Satu. Hak cipta dilindungi.</div>
        </div>
      </footer>

      {/* Lupa Kata Sandi Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1B18]/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white border border-[#E6E3DC] rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E6E3DC] pb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#6F4E37]" />
                <h3 className="text-base font-bold text-[#1C1B18]">Bantuan Pemulihan Akun</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="text-[#8C887F] hover:text-[#1C1B18] text-xs font-mono p-1 cursor-pointer"
              >
                [✕]
              </button>
            </div>

            <p className="text-xs text-[#5C5952] leading-relaxed">
              Untuk keamanan properti Anda, tautan reset kata sandi akan dikirimkan langsung ke nomor WhatsApp pemilik kost yang telah terdaftar.
            </p>

            <div className="p-3 rounded-xl bg-[#F9F8F6] border border-[#E6E3DC] text-xs space-y-1.5">
              <span className="font-semibold text-[#1C1B18] block">Layanan Cepat via WhatsApp:</span>
              <p className="text-[#5C5952] text-[11px]">
                Hubungi Customer Support Pintu Satu di{" "}
                <span className="font-mono font-bold text-[#6F4E37]">0812-9988-7766</span> dengan menyebutkan nama properti kost Anda.
              </p>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="px-4 py-2 rounded-lg bg-[#6F4E37] text-white text-xs font-semibold hover:bg-[#563B28] cursor-pointer transition-colors"
              >
                Saya Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
