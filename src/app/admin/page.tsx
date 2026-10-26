"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Shield,
  Image as ImageIcon,
  BookOpen,
  MessageSquareQuote,
  ScrollText,
  Settings,
  Search,
  Bell,
  User,
  Plus,
  Calendar,
  SlidersHorizontal,
  ArrowRight,
  LogOut,
  DoorOpen,
  ChevronDown,
} from "lucide-react";

export default function SuperadminDashboardPage() {
  const router = useRouter();

  // Interactive UI states
  const [activeTab, setActiveTab] = useState<"semua" | "admin" | "editor">("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isManageUserOpen, setIsManageUserOpen] = useState(true);

  // Toggle states for scheduled content items
  const [toggles, setToggles] = useState({
    promoRamadhan: true,
    cashbackTahunan: true,
    tipsKost: false,
    jamKunjung: true,
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("pintusatu_token");
      localStorage.removeItem("token");
      localStorage.removeItem("pintusatu_user");
      document.cookie = "pintusatu_token=; path=/; max-age=0;";
    } catch {
      // ignore
    }
    router.push("/login/admin-pintu");
  };

  const usersList = [
    {
      initials: "BS",
      name: "Budi Santoso",
      email: "budi.ops@pintusatu.id",
      role: "Superadmin",
      category: "admin",
      status: "Aktif",
      lastLogin: "10 mnt lalu",
    },
    {
      initials: "RA",
      name: "Rina Anggraini",
      email: "rina.editor@pintusatu.id",
      role: "Content Editor",
      category: "editor",
      status: "Aktif",
      lastLogin: "1 jam lalu",
    },
    {
      initials: "AH",
      name: "Andi Hermawan",
      email: "andi.ops@pintusatu.id",
      role: "Ops Manager",
      category: "admin",
      status: "Aktif",
      lastLogin: "Kemarin, 16:45",
    },
    {
      initials: "DK",
      name: "Dewi Kusuma",
      email: "dewi.finance@pintusatu.id",
      role: "Finance Viewer",
      category: "editor",
      status: "Nonaktif",
      lastLogin: "4 hari lalu",
    },
  ];

  const filteredUsers = usersList.filter((u) => {
    if (activeTab !== "semua" && u.category !== activeTab) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-sans text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* ===================== SIDEBAR ===================== */}
      <aside className="w-64 bg-white border-r border-neutral-200/80 shrink-0 flex flex-col justify-between hidden md:flex sticky top-0 h-screen overflow-y-auto">
        <div>
          {/* Logo Header */}
          <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold">
                <DoorOpen className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm tracking-tight text-neutral-900 leading-none">
                  PintuSatu
                </span>
                <span className="text-[9px] font-bold text-neutral-400 tracking-wider uppercase mt-1">
                  PROPTECH CMS
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-neutral-200 text-neutral-500 bg-neutral-50">
              v2.4
            </span>
          </div>

          {/* Navigation Links */}
          <div className="px-3 py-4 space-y-6">
            {/* UTAMA */}
            <div>
              <p className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase px-3 mb-2">
                UTAMA
              </p>
              <div className="space-y-1">
                <Link
                  href="/admin"
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-black text-white text-xs font-medium shadow-sm transition"
                >
                  <div className="flex items-center gap-2.5">
                    <LayoutDashboard className="w-4 h-4 text-white" />
                    <span>Dashboard CMS</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#956d49]"></span>
                </Link>

                {/* PARENT MENU: Manage User */}
                <div>
                  <button
                    type="button"
                    onClick={() => setIsManageUserOpen(!isManageUserOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70 text-xs font-semibold transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <Users className="w-4 h-4 text-neutral-500" />
                      <span>Manage User</span>
                    </div>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${
                        isManageUserOpen ? "rotate-0" : "-rotate-90"
                      }`}
                    />
                  </button>

                  {/* SUBMENUS: User & Role */}
                  {isManageUserOpen && (
                    <div className="pl-6 pr-1 py-1 space-y-1 border-l-2 border-neutral-100 ml-4 mt-1">
                      <Link
                        href="/admin/users"
                        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70 transition"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-300"></span>
                          <span>User</span>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-400">48</span>
                      </Link>

                      <Link
                        href="/admin/users"
                        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70 transition"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-300"></span>
                          <span>Role</span>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-400">5</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* KONTEN & LANDING PAGE */}
            <div>
              <p className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase px-3 mb-2">
                KONTEN & LANDING PAGE
              </p>
              <div className="space-y-1">
                <button
                  type="button"
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70 text-xs font-medium transition"
                >
                  <ImageIcon className="w-4 h-4 text-neutral-500" />
                  <span>Banner & Promo</span>
                </button>

                <button
                  type="button"
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70 text-xs font-medium transition"
                >
                  <BookOpen className="w-4 h-4 text-neutral-500" />
                  <span>Artikel & Edukasi</span>
                </button>

                <button
                  type="button"
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70 text-xs font-medium transition"
                >
                  <MessageSquareQuote className="w-4 h-4 text-neutral-500" />
                  <span>Testimoni & FAQ</span>
                </button>
              </div>
            </div>

            {/* SISTEM & KEAMANAN */}
            <div>
              <p className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase px-3 mb-2">
                SISTEM & KEAMANAN
              </p>
              <div className="space-y-1">
                <button
                  type="button"
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70 text-xs font-medium transition"
                >
                  <ScrollText className="w-4 h-4 text-neutral-500" />
                  <span>Log Aktivitas Admin</span>
                </button>

                <button
                  type="button"
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70 text-xs font-medium transition"
                >
                  <Settings className="w-4 h-4 text-neutral-500" />
                  <span>Konfigurasi Sistem</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer Logout */}
        <div className="p-3 border-t border-neutral-100">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-600 hover:bg-rose-50 text-xs font-medium transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Sesi</span>
          </button>
        </div>
      </aside>

      {/* ===================== MAIN WRAPPER ===================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* ===================== TOP HEADER BAR ===================== */}
        <header className="h-16 bg-white border-b border-neutral-200/80 px-6 flex items-center justify-between sticky top-0 z-20">
          {/* Global Search Bar */}
          <div className="relative w-72 sm:w-96">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari unit, pengguna, transaksi, atau log CMS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-neutral-100/80 border border-neutral-200/70 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400 transition"
            />
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            {/* Env Status Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Env: Production Superadmin</span>
            </div>

            {/* Notification Bell */}
            <button
              type="button"
              className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 relative transition"
              aria-label="Notifikasi"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1.5 right-1.5 ring-2 ring-white"></span>
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2.5 pl-2 py-1 rounded-lg hover:bg-neutral-100 transition text-left"
              >
                <div className="flex flex-col text-right hidden sm:flex">
                  <span className="text-xs font-semibold text-neutral-900 leading-tight">
                    Superadmin
                  </span>
                  <span className="text-[10px] text-neutral-500 leading-none">
                    Chief Ops
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
                  <User className="w-4 h-4 text-white" />
                </div>
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-neutral-200 shadow-lg py-1 z-30 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-2 border-b border-neutral-100">
                    <p className="text-xs font-bold text-neutral-900">Chief Ops</p>
                    <p className="text-[11px] text-neutral-500 truncate">chief.ops@pintusatu.id</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Keluar Sesi</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ===================== DASHBOARD CONTENT ===================== */}
        <main className="p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Header Greeting & Action Buttons */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-mono mb-1">
                <span className="inline-flex items-center gap-1 font-semibold text-neutral-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#956d49]"></span>
                  CMS v2.4 Multi-Tenant
                </span>
                <span>•</span>
                <span>Pembaruan otomatis 2 mnt lalu</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                Selamat Datang di CMS PintuSatu
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 max-w-2xl mt-1">
                Pusat kendali operasional, manajemen hak akses terpusat, dan orkestrasi konten
                landing page proptech Anda hari ini.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                className="bg-black hover:bg-neutral-800 text-white px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah User Baru</span>
              </button>
              <button
                type="button"
                className="bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200/90 px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Buat Artikel</span>
              </button>
              <button
                type="button"
                className="bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200/90 px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Upload Banner</span>
              </button>
            </div>
          </div>

          {/* ===================== 4 STAT CARDS ===================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: TOTAL PENGGUNA AKTIF */}
            <div className="p-5 rounded-xl bg-white border border-neutral-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-neutral-500 tracking-wider uppercase">
                    TOTAL PENGGUNA AKTIF
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 font-semibold">
                    ↗ +8.4%
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-neutral-900 tracking-tight mb-1">
                  1.248
                </div>
                <p className="text-[11px] text-neutral-400 mb-4">
                  Pengguna terverifikasi sistem
                </p>
              </div>
              <div className="bg-neutral-50 border border-neutral-100 rounded-lg px-2.5 py-1.5 flex items-center justify-between text-[11px] font-mono text-neutral-600">
                <span><b>Admin:</b> 12</span>
                <span><b>Pemilik:</b> 342</span>
                <span><b>Penyewa:</b> 894</span>
              </div>
            </div>

            {/* Card 2: ARTIKEL TERPUBLIKASI */}
            <div className="p-5 rounded-xl bg-white border border-neutral-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-neutral-500 tracking-wider uppercase">
                    ARTIKEL TERPUBLIKASI
                  </span>
                  <BookOpen className="w-4 h-4 text-neutral-400" />
                </div>
                <div className="text-3xl font-extrabold text-neutral-900 tracking-tight mb-1">
                  38
                </div>
                <p className="text-[11px] text-neutral-400 mb-4">
                  Edukasi sewa & manajemen kost
                </p>
              </div>
              <div className="bg-neutral-50 border border-neutral-100 rounded-lg px-2.5 py-1.5 flex items-center justify-between text-[11px] font-mono text-neutral-600">
                <span><b>Draft:</b> 4</span>
                <span><b>Review:</b> 2</span>
                <span><b>Live:</b> 32</span>
              </div>
            </div>

            {/* Card 3: BANNER PROMO AKTIF */}
            <div className="p-5 rounded-xl bg-white border border-neutral-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-neutral-500 tracking-wider uppercase">
                    BANNER PROMO AKTIF
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 font-semibold">
                    2 Expiring
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-neutral-900 tracking-tight mb-1">
                  6 <span className="text-sm font-medium text-neutral-400">slot</span>
                </div>
                <p className="text-[11px] text-neutral-400 mb-4">
                  Beranda Web & App Mobile
                </p>
              </div>
              <div className="bg-neutral-50 border border-neutral-100 rounded-lg px-2.5 py-1.5 flex items-center justify-between text-[11px] font-mono text-neutral-600">
                <span><b>Slot Utama:</b> 4</span>
                <span><b>Popup:</b> 2</span>
                <span className="text-rose-600"><b>Sisa:</b> 3 hari</span>
              </div>
            </div>

            {/* Card 4: AUDIT LOG TERKINI */}
            <div className="p-5 rounded-xl bg-white border border-neutral-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-neutral-500 tracking-wider uppercase">
                    AUDIT LOG TERKINI
                  </span>
                  <Shield className="w-4 h-4 text-neutral-400" />
                </div>
                <div className="text-3xl font-extrabold text-neutral-900 tracking-tight mb-1">
                  142
                </div>
                <p className="text-[11px] text-neutral-400 mb-4">
                  Aktivitas admin dalam 24 jam
                </p>
              </div>
              <div className="bg-neutral-50 border border-neutral-100 rounded-lg px-2.5 py-1.5 flex items-center justify-between text-[11px] font-mono text-neutral-600">
                <span><b>Insiden:</b> 0</span>
                <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  Status: Aman
                </span>
              </div>
            </div>
          </div>

          {/* ===================== TWO-COLUMN SPLIT GRID ===================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT COLUMN: Table & Scheduled Content (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Card: Pengguna & Staf Terbaru */}
              <div className="bg-white rounded-xl border border-neutral-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                  <div>
                    <h2 className="text-base font-bold text-neutral-900">
                      Pengguna & Staf Terbaru
                    </h2>
                    <p className="text-xs text-neutral-400">
                      Kelola kredensial akses dan verifikasi akun staf
                    </p>
                  </div>

                  {/* Tabs */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-neutral-100 p-0.5 rounded-lg text-xs">
                      <button
                        type="button"
                        onClick={() => setActiveTab("semua")}
                        className={`px-2.5 py-1 rounded-md font-medium transition ${
                          activeTab === "semua"
                            ? "bg-white text-neutral-900 shadow-sm font-semibold"
                            : "text-neutral-500 hover:text-neutral-900"
                        }`}
                      >
                        Semua
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("admin")}
                        className={`px-2.5 py-1 rounded-md font-medium transition ${
                          activeTab === "admin"
                            ? "bg-white text-neutral-900 shadow-sm font-semibold"
                            : "text-neutral-500 hover:text-neutral-900"
                        }`}
                      >
                        Admin
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("editor")}
                        className={`px-2.5 py-1 rounded-md font-medium transition ${
                          activeTab === "editor"
                            ? "bg-white text-neutral-900 shadow-sm font-semibold"
                            : "text-neutral-500 hover:text-neutral-900"
                        }`}
                      >
                        Editor
                      </button>
                    </div>

                    <button
                      type="button"
                      className="text-xs font-semibold text-neutral-800 hover:underline flex items-center gap-1 pl-1"
                    >
                      <span>Lihat Semua</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-neutral-100 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                        <th className="pb-3 font-semibold">NAMA & EMAIL</th>
                        <th className="pb-3 font-semibold">PERAN / ROLE</th>
                        <th className="pb-3 font-semibold">STATUS</th>
                        <th className="pb-3 font-semibold text-right">TERAKHIR LOGIN</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 font-sans">
                      {filteredUsers.map((item, idx) => (
                        <tr key={idx} className="hover:bg-neutral-50/70 transition">
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-700 font-bold text-xs flex items-center justify-center shrink-0">
                                {item.initials}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-semibold text-neutral-900">
                                  {item.name}
                                </span>
                                <span className="text-[11px] text-neutral-400">
                                  {item.email}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3">
                            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-100 border border-neutral-200/60 text-neutral-700">
                              {item.role}
                            </span>
                          </td>
                          <td className="py-3">
                            <span
                              className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                                item.status === "Aktif"
                                  ? "text-emerald-700"
                                  : "text-neutral-400"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  item.status === "Aktif"
                                    ? "bg-emerald-500"
                                    : "bg-neutral-400"
                                }`}
                              ></span>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3 text-right font-mono text-[11px] text-neutral-400">
                            {item.lastLogin}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Card: Konten & Publikasi Terjadwal */}
              <div className="bg-white rounded-xl border border-neutral-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-base font-bold text-neutral-900">
                      Konten & Publikasi Terjadwal
                    </h2>
                    <p className="text-xs text-neutral-400">
                      Kendali langsung visibilitas landing page tanpa buka editor lengkap
                    </p>
                  </div>
                  <button
                    type="button"
                    className="text-xs font-semibold text-[#956d49] hover:underline flex items-center gap-1"
                  >
                    <span>Lihat Kalender Rilis</span>
                    <Calendar className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 2x2 Scheduled Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Item 1 */}
                  <div className="p-3.5 rounded-lg border border-neutral-200/80 bg-neutral-50/50 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-neutral-500" />
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                          BANNER LANDING
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleToggle("promoRamadhan")}
                        className={`w-8 h-4 rounded-full transition-colors relative ${
                          toggles.promoRamadhan ? "bg-black" : "bg-neutral-300"
                        }`}
                      >
                        <span
                          className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform ${
                            toggles.promoRamadhan ? "left-4" : "left-0.5"
                          }`}
                        ></span>
                      </button>
                    </div>
                    <p className="text-xs font-bold text-neutral-900 mb-2 truncate">
                      Promo Ramadhan Berkah...
                    </p>
                    <div className="text-[10px] text-neutral-400 font-mono flex items-center justify-between">
                      <span>Slot: Hero Utama Web</span>
                      <span>Berakhir: <b>30 Mar 2025</b></span>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="p-3.5 rounded-lg border border-neutral-200/80 bg-neutral-50/50 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-neutral-500" />
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                          BANNER MOBILE APP
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleToggle("cashbackTahunan")}
                        className={`w-8 h-4 rounded-full transition-colors relative ${
                          toggles.cashbackTahunan ? "bg-black" : "bg-neutral-300"
                        }`}
                      >
                        <span
                          className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform ${
                            toggles.cashbackTahunan ? "left-4" : "left-0.5"
                          }`}
                        ></span>
                      </button>
                    </div>
                    <p className="text-xs font-bold text-neutral-900 mb-2 truncate">
                      Cashback Sewa Tahunan...
                    </p>
                    <div className="text-[10px] text-neutral-400 font-mono flex items-center justify-between">
                      <span>Slot: Card Slide Populer</span>
                      <span>Berakhir: <b>15 Apr 2025</b></span>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="p-3.5 rounded-lg border border-neutral-200/80 bg-neutral-50/50 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-neutral-500" />
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                          ARTIKEL EDUKASI
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleToggle("tipsKost")}
                        className={`w-8 h-4 rounded-full transition-colors relative ${
                          toggles.tipsKost ? "bg-black" : "bg-neutral-300"
                        }`}
                      >
                        <span
                          className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform ${
                            toggles.tipsKost ? "left-4" : "left-0.5"
                          }`}
                        ></span>
                      </button>
                    </div>
                    <p className="text-xs font-bold text-neutral-900 mb-2 truncate">
                      5 Tips Memilih Kost Dekat...
                    </p>
                    <div className="text-[10px] text-neutral-400 font-mono flex items-center justify-between">
                      <span>Status: Siap Terbit</span>
                      <span>Jadwal: <b>Besok, 09:00</b></span>
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className="p-3.5 rounded-lg border border-neutral-200/80 bg-neutral-50/50 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <MessageSquareQuote className="w-3.5 h-3.5 text-neutral-500" />
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                          PANDUAN KOMUNITAS
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleToggle("jamKunjung")}
                        className={`w-8 h-4 rounded-full transition-colors relative ${
                          toggles.jamKunjung ? "bg-black" : "bg-neutral-300"
                        }`}
                      >
                        <span
                          className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform ${
                            toggles.jamKunjung ? "left-4" : "left-0.5"
                          }`}
                        ></span>
                      </button>
                    </div>
                    <p className="text-xs font-bold text-neutral-900 mb-2 truncate">
                      Aturan Jam Kunjung &...
                    </p>
                    <div className="text-[10px] text-neutral-400 font-mono flex items-center justify-between">
                      <span>Status: Live Publik</span>
                      <span>Diperbarui: <b>2 hari lalu</b></span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Structure Roles & Audit Stream (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Card: Struktur Peran & Izin */}
              <div className="bg-white rounded-xl border border-neutral-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-6">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-base font-bold text-neutral-900">
                    Struktur Peran & Izin
                  </h2>
                  <SlidersHorizontal className="w-4 h-4 text-neutral-400" />
                </div>
                <p className="text-xs text-neutral-400 mb-4">
                  Matriks otoritas keamanan sistem
                </p>

                <div className="space-y-3 mb-5">
                  {/* Role 1 */}
                  <div className="p-3 rounded-lg border border-neutral-100 bg-neutral-50/60">
                    <div className="flex items-center justify-between text-xs font-bold text-neutral-900 mb-1">
                      <span>Superadmin</span>
                      <span className="text-[10px] font-mono text-neutral-500 font-normal">
                        3 Staf
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 leading-relaxed">
                      Akses penuh database, audit log, kelola payment gateway & API keys.
                    </p>
                  </div>

                  {/* Role 2 */}
                  <div className="p-3 rounded-lg border border-neutral-100 bg-neutral-50/60">
                    <div className="flex items-center justify-between text-xs font-bold text-neutral-900 mb-1">
                      <span>Property Ops Manager</span>
                      <span className="text-[10px] font-mono text-neutral-500 font-normal">
                        5 Staf
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 leading-relaxed">
                      Verifikasi unit kost baru, monitoring deposit, moderasi keluhan tenant.
                    </p>
                  </div>

                  {/* Role 3 */}
                  <div className="p-3 rounded-lg border border-neutral-100 bg-neutral-50/60">
                    <div className="flex items-center justify-between text-xs font-bold text-neutral-900 mb-1">
                      <span>Content Editor</span>
                      <span className="text-[10px] font-mono text-neutral-500 font-normal">
                        4 Staf
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 leading-relaxed">
                      Kelola banner promo, buat & edit artikel blog, FAQ, dan testimoni pengguna.
                    </p>
                  </div>

                  {/* Role 4 */}
                  <div className="p-3 rounded-lg border border-neutral-100 bg-neutral-50/60">
                    <div className="flex items-center justify-between text-xs font-bold text-neutral-900 mb-1">
                      <span>Finance Viewer</span>
                      <span className="text-[10px] font-mono text-neutral-500 font-normal">
                        2 Staf
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 leading-relaxed">
                      Akses baca laporan rekonsiliasi pembayaran sewa & tagihan utilitas.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold py-2.5 rounded-lg text-center transition"
                >
                  Atur Kebijakan Akses Granular
                </button>
              </div>

              {/* Card: Audit Stream Terkini */}
              <div className="bg-white rounded-xl border border-neutral-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-6">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-base font-bold text-neutral-900">
                    Audit Stream Terkini
                  </h2>
                  <span className="w-2 h-2 rounded-full bg-[#956d49]"></span>
                </div>
                <p className="text-xs text-neutral-400 mb-4">
                  Rekam jejak tindakan admin 24 jam
                </p>

                <div className="space-y-4">
                  {/* Stream 1 */}
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-md bg-neutral-100 text-neutral-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      BS
                    </div>
                    <div className="text-xs leading-snug">
                      <p className="text-neutral-800">
                        <b>Budi Santoso</b> mengubah izin role <b>Editor</b>.
                      </p>
                      <span className="text-[10px] font-mono text-neutral-400">
                        14 mnt yang lalu
                      </span>
                    </div>
                  </div>

                  {/* Stream 2 */}
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-md bg-neutral-100 text-neutral-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      RA
                    </div>
                    <div className="text-xs leading-snug">
                      <p className="text-neutral-800">
                        <b>Rina</b> mengunggah banner <b>&quot;Promo Ramadhan&quot;</b> ke slot Hero.
                      </p>
                      <span className="text-[10px] font-mono text-neutral-400">
                        1 jam yang lalu
                      </span>
                    </div>
                  </div>

                  {/* Stream 3 */}
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-md bg-neutral-100 text-neutral-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      AH
                    </div>
                    <div className="text-xs leading-snug">
                      <p className="text-neutral-800">
                        <b>Andi Hermawan</b> menambahkan admin properti kost baru: <b>Kost Paviliun Senopati</b>.
                      </p>
                      <span className="text-[10px] font-mono text-neutral-400">
                        3 jam yang lalu
                      </span>
                    </div>
                  </div>

                  {/* Stream 4 */}
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-md bg-neutral-100 text-neutral-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      SY
                    </div>
                    <div className="text-xs leading-snug">
                      <p className="text-neutral-800">
                        <b>Sistem Pusat</b> menyelesaikan siklus rekonsiliasi harian.
                      </p>
                      <span className="text-[10px] font-mono text-neutral-400">
                        6 jam yang lalu
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
