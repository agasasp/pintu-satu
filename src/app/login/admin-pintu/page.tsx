"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Loader2, Check } from "lucide-react";

export default function SuperadminLoginPage() {
  const router = useRouter();

  useEffect(() => {
    document.title = "Masuk ke Akun | PintuSatu";
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim()) {
      setErrorMessage("Silakan masukkan alamat email.");
      return;
    }
    if (!password) {
      setErrorMessage("Silakan masukkan kata sandi.");
      return;
    }

    setIsLoading(true);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        const msg =
          result?.message ||
          (response.status === 401
            ? "Email atau kata sandi tidak valid."
            : `Terjadi kendala (Status: ${response.status}).`);
        setErrorMessage(msg);
        setIsLoading(false);
        return;
      }

      const { user, token } = result.data;

      // Ensure superadmin access only
      if (user.role !== "superadmin") {
        setErrorMessage("Akses ditolak: Portal ini hanya diperuntukkan bagi Superadmin.");
        setIsLoading(false);
        return;
      }

      // Store auth session
      try {
        localStorage.setItem("pintusatu_token", token);
        localStorage.setItem("token", token);
        localStorage.setItem("pintusatu_user", JSON.stringify(user));
        document.cookie = `pintusatu_token=${token}; path=/; max-age=604800; SameSite=Lax`;
      } catch (err) {
        console.warn("Storage warning:", err);
      }

      setSuccessMessage("Autentikasi berhasil. Mengalihkan ke panel Superadmin...");
      setTimeout(() => {
        router.push("/admin");
      }, 1200);
    } catch {
      // Offline fallback handling: if backend is not reachable, provide helpful guidance
      setErrorMessage(
        "Tidak dapat terhubung ke server API (Port 8000). Pastikan backend aktif atau gunakan akun seeder."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f9fa] flex flex-col justify-between items-center py-10 px-4 font-sans text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Spacer to keep card vertically balanced */}
      <div className="w-full h-4 sm:h-8"></div>

      {/* Main Login Card */}
      <div className="w-full max-w-[420px] bg-white rounded-2xl border border-neutral-200/80 shadow-[0_2px_14px_rgba(0,0,0,0.04)] px-8 py-9 sm:px-10 sm:py-10">

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center tracking-tight text-xl font-bold mb-3">
            <span className="text-neutral-900">PINTU</span>
            <span className="text-[#956d49]">SATU</span>
          </div>

          <h1 className="text-xl font-bold text-neutral-900 mb-1">
            Masuk ke Akun
          </h1>
          <p className="text-xs text-neutral-500">
            Silakan masukkan email dan password Anda
          </p>
        </div>

        {/* Feedback Alerts */}
        {errorMessage && (
          <div className="mb-5 p-3 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-xs">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mb-5 p-3 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
            {successMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-neutral-800 mb-1.5"
            >
              Email
            </label>
            <div className="relative flex items-center bg-[#f0f0f0] rounded-md px-3.5 py-2.5 focus-within:bg-white focus-within:ring-1 focus-within:ring-neutral-400 transition-colors">
              <Mail className="w-4 h-4 text-neutral-500 shrink-0 mr-3" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-transparent text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-medium text-neutral-800"
              >
                Kata Sandi
              </label>
              <button
                type="button"
                onClick={() =>
                  alert("Silakan hubungi IT Security Administrator PintuSatu untuk pemulihan akun.")
                }
                className="text-xs text-[#956d49] hover:underline transition"
              >
                Lupa kata sandi?
              </button>
            </div>
            <div className="relative flex items-center bg-[#f0f0f0] rounded-md px-3.5 py-2.5 focus-within:bg-white focus-within:ring-1 focus-within:ring-neutral-400 transition-colors">
              <Lock className="w-4 h-4 text-neutral-500 shrink-0 mr-3" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={`w-full bg-transparent text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none pr-7 ${password ? "tracking-wider" : ""
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-neutral-500 hover:text-neutral-700 transition"
                aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="pt-1">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <div
                onClick={() => setRememberMe(!rememberMe)}
                className={`w-4 h-4 rounded-[3px] flex items-center justify-center transition-colors ${rememberMe
                    ? "bg-black text-white"
                    : "bg-white border border-neutral-300"
                  }`}
              >
                {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span className="text-xs text-neutral-700">Ingat saya</span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black hover:bg-neutral-800 active:bg-neutral-900 text-white text-xs sm:text-sm font-medium py-3 rounded-md transition duration-150 flex items-center justify-center gap-2 disabled:opacity-60 shadow-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <span>Masuk</span>
              )}
            </button>
          </div>
        </form>

        {/* Quick test credentials hint for Superadmin */}
        <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
          <span>Portal Khusus Superadmin</span>
          <button
            type="button"
            onClick={() => {
              setEmail("superadmin@pintusatu.id");
              setPassword("Password123!");
            }}
            className="text-neutral-500 hover:text-black hover:underline"
          >
            Isi Demo Superadmin
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-neutral-500 tracking-tight">
        &copy; 2026 Pintu Satu. All rights reserved.
      </footer>
    </div>
  );
}
