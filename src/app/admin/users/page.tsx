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
  LogOut,
  DoorOpen,
  SlidersHorizontal,
  ChevronDown,
  Download,
  RotateCcw,
  Ban,
  Lock,
  X,
  FileCheck2,
  Send,
  Building2,
  Pencil,
  Trash2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

interface UserItem {
  id: string;
  initials: string;
  avatarBg: string;
  name: string;
  email: string;
  role: string;
  roleColor: string;
  divisionTitle: string;
  divisionSubtitle: string;
  status: "Aktif" | "Ditangguhkan" | "Nonaktif";
}

interface RoleItem {
  name: string;
  staffCount: number;
  description: string;
  dashboard: "Full" | "Read / Write" | "Read Only" | "Dilarang";
  rooms: "Akses Penuh" | "Verifikasi Unit" | "Read Only" | "Dilarang";
  promo: "Akses Penuh" | "Ajukan (Draft)" | "Read Only" | "Dilarang";
  finance: "Akses Penuh" | "Read Only" | "Dilarang";
  usersManage: "Akses Penuh" | "Dilarang";
}

export default function ManageUsersPage() {
  const router = useRouter();

  // Sidebar Menu state
  const [isManageUserOpen, setIsManageUserOpen] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState<"user" | "role">("user");

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("Semua Peran");
  const [selectedStatus, setSelectedStatus] = useState("Semua Status");
  const [activeTab, setActiveTab] = useState<"daftar" | "matrix" | "undangan">("daftar");
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Selection state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [deleteConfirmUser, setDeleteConfirmUser] = useState<UserItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New User Form State
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("Admin Operasional");
  const [newUserDivision, setNewUserDivision] = useState("");
  const [newUserArea, setNewUserArea] = useState("");

  // Edit User Form State
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editDivision, setEditDivision] = useState("");
  const [editArea, setEditArea] = useState("");
  const [editStatus, setEditStatus] = useState<"Aktif" | "Ditangguhkan" | "Nonaktif">("Aktif");

  // Initial Seeded Users matching mockup
  const [users, setUsers] = useState<UserItem[]>([
    {
      id: "1",
      initials: "DP",
      avatarBg: "bg-neutral-100 text-neutral-700",
      name: "Dimas Pratama, S.Kom",
      email: "dimas.pratama@pintusatu.id",
      role: "Superadmin",
      roleColor: "bg-neutral-100 border-neutral-300 text-neutral-800",
      divisionTitle: "Headquarters Jakarta",
      divisionSubtitle: "Teknologi & Produk",
      status: "Aktif",
    },
    {
      id: "2",
      initials: "SN",
      avatarBg: "bg-orange-100 text-orange-800",
      name: "Siti Nurhaliza",
      email: "siti.nurhaliza@pintusatu.id",
      role: "Admin Operasional",
      roleColor: "bg-emerald-50 border-emerald-200 text-emerald-800",
      divisionTitle: "Area Bandung Raya",
      divisionSubtitle: "Cluster Dago & Dipatiukur",
      status: "Aktif",
    },
    {
      id: "3",
      initials: "HN",
      avatarBg: "bg-neutral-100 text-neutral-700",
      name: "Hendra Wijaya",
      email: "hendra.w@pintusatu.id",
      role: "Content Editor",
      roleColor: "bg-amber-50 border-amber-200 text-amber-800",
      divisionTitle: "Tim Editorial & Promo",
      divisionSubtitle: "Portal Edukasi & Landing",
      status: "Aktif",
    },
    {
      id: "4",
      initials: "MK",
      avatarBg: "bg-amber-100 text-amber-800",
      name: "Maya Kusuma, CFA",
      email: "maya.kusuma@pintusatu.id",
      role: "Auditor Keuangan",
      roleColor: "bg-neutral-100 border-neutral-200 text-neutral-700",
      divisionTitle: "Divisi Finance & Tax",
      divisionSubtitle: "Seluruh Unit Kost",
      status: "Aktif",
    },
    {
      id: "5",
      initials: "AW",
      avatarBg: "bg-neutral-100 text-neutral-500",
      name: "Arif Wicaksono",
      email: "arif.wicaksono@pintusatu.id",
      role: "Admin Operasional",
      roleColor: "bg-emerald-50 border-emerald-200 text-emerald-800",
      divisionTitle: "Area Sleman & Gejayan",
      divisionSubtitle: "Kost Putra Paviliun",
      status: "Ditangguhkan",
    },
    {
      id: "6",
      initials: "RP",
      avatarBg: "bg-orange-100 text-orange-800",
      name: "Rian Pratomo, S.T.",
      email: "rian.pratomo@pintusatu.id",
      role: "Kepala Wilayah Kost",
      roleColor: "bg-orange-50 border-orange-200 text-orange-800",
      divisionTitle: "Area BSD & Gading Serpong",
      divisionSubtitle: "14 Properti Aktif",
      status: "Aktif",
    },
  ]);

  // Roles list data
  const rolesList: RoleItem[] = [
    {
      name: "Superadmin",
      staffCount: 3,
      description: "Akses master penuh seluruh database, audit log, kelola payment gateway & API keys.",
      dashboard: "Full",
      rooms: "Akses Penuh",
      promo: "Akses Penuh",
      finance: "Akses Penuh",
      usersManage: "Akses Penuh",
    },
    {
      name: "Admin Operasional",
      staffCount: 5,
      description: "Operasional kamar, penagihan invoice, dan moderasi hunian tingkat branch kost.",
      dashboard: "Read / Write",
      rooms: "Akses Penuh",
      promo: "Ajukan (Draft)",
      finance: "Read Only",
      usersManage: "Dilarang",
    },
    {
      name: "Content Editor",
      staffCount: 4,
      description: "Kelola banner promo, artikel blog edukasi sewa, FAQ, dan kurasi ulasan kost.",
      dashboard: "Read Only",
      rooms: "Dilarang",
      promo: "Akses Penuh",
      finance: "Dilarang",
      usersManage: "Dilarang",
    },
    {
      name: "Auditor Keuangan",
      staffCount: 2,
      description: "Akses audit keuangan, rekonsiliasi arus kas sewa, dan laporan NOI bulanan.",
      dashboard: "Read Only",
      rooms: "Read Only",
      promo: "Dilarang",
      finance: "Akses Penuh",
      usersManage: "Dilarang",
    },
    {
      name: "Kepala Wilayah Kost",
      staffCount: 14,
      description: "Supervisi cluster cabang kost per wilayah, audit okupansi & pemeliharaan unit.",
      dashboard: "Read / Write",
      rooms: "Verifikasi Unit",
      promo: "Read Only",
      finance: "Read Only",
      usersManage: "Dilarang",
    },
  ];

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
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

  // Selection handlers
  const handleSelectAll = () => {
    if (selectedIds.length === filteredUsers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredUsers.map((u) => u.id));
    }
  };

  const handleToggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Add User submit
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      alert("Silakan lengkapi nama dan email.");
      return;
    }

    const initials = newUserName
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    let roleColor = "bg-neutral-100 border-neutral-200 text-neutral-700";
    if (newUserRole.includes("Superadmin")) {
      roleColor = "bg-neutral-100 border-neutral-300 text-neutral-800";
    } else if (newUserRole.includes("Operasional")) {
      roleColor = "bg-emerald-50 border-emerald-200 text-emerald-800";
    } else if (newUserRole.includes("Editor")) {
      roleColor = "bg-amber-50 border-amber-200 text-amber-800";
    } else if (newUserRole.includes("Kepala")) {
      roleColor = "bg-orange-50 border-orange-200 text-orange-800";
    }

    const newUser: UserItem = {
      id: Date.now().toString(),
      initials: initials || "ST",
      avatarBg: "bg-neutral-100 text-neutral-700",
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
      roleColor,
      divisionTitle: newUserDivision || "Operasional Lapangan",
      divisionSubtitle: newUserArea || "Unit Kost Terdaftar",
      status: "Aktif",
    };

    setUsers([newUser, ...users]);
    setIsAddModalOpen(false);
    setNewUserName("");
    setNewUserEmail("");
    setNewUserDivision("");
    setNewUserArea("");
    triggerToast("Pengguna baru berhasil ditambahkan!");
  };

  // Open Edit Modal
  const handleOpenEdit = (userItem: UserItem) => {
    setEditingUser(userItem);
    setEditName(userItem.name);
    setEditEmail(userItem.email);
    setEditRole(userItem.role);
    setEditDivision(userItem.divisionTitle);
    setEditArea(userItem.divisionSubtitle);
    setEditStatus(userItem.status);
  };

  // Save Edit submit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    let roleColor = editingUser.roleColor;
    if (editRole.includes("Superadmin")) {
      roleColor = "bg-neutral-100 border-neutral-300 text-neutral-800";
    } else if (editRole.includes("Operasional")) {
      roleColor = "bg-emerald-50 border-emerald-200 text-emerald-800";
    } else if (editRole.includes("Editor")) {
      roleColor = "bg-amber-50 border-amber-200 text-amber-800";
    } else if (editRole.includes("Kepala")) {
      roleColor = "bg-orange-50 border-orange-200 text-orange-800";
    }

    setUsers(
      users.map((u) =>
        u.id === editingUser.id
          ? {
            ...u,
            name: editName.trim(),
            email: editEmail.trim(),
            role: editRole,
            roleColor,
            divisionTitle: editDivision.trim(),
            divisionSubtitle: editArea.trim(),
            status: editStatus,
          }
          : u
      )
    );

    setEditingUser(null);
    triggerToast(`Perubahan data untuk ${editName} berhasil disimpan!`);
  };

  // Delete User
  const handleConfirmDelete = () => {
    if (!deleteConfirmUser) return;
    setUsers(users.filter((u) => u.id !== deleteConfirmUser.id));
    setSelectedIds(selectedIds.filter((id) => id !== deleteConfirmUser.id));
    triggerToast(`Pengguna ${deleteConfirmUser.name} telah berhasil dihapus.`);
    setDeleteConfirmUser(null);
  };

  // Export CSV
  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Nama,Email,Peran,Divisi,Status"]
        .concat(
          users.map(
            (u) =>
              `"${u.name}","${u.email}","${u.role}","${u.divisionTitle} - ${u.divisionSubtitle}","${u.status}"`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "pintusatu_users_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered rows
  const filteredUsers = users.filter((u) => {
    if (selectedRole !== "Semua Peran" && u.role !== selectedRole) return false;
    if (selectedStatus !== "Semua Status" && u.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.divisionTitle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-sans text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-medium animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

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
                {/* Dashboard Link */}
                <Link
                  href="/admin"
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70 text-xs font-medium transition"
                >
                  <LayoutDashboard className="w-4 h-4 text-neutral-500" />
                  <span>Dashboard CMS</span>
                </Link>

                {/* PARENT MENU: Manage User */}
                <div>
                  <button
                    type="button"
                    onClick={() => setIsManageUserOpen(!isManageUserOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-neutral-800 hover:bg-neutral-100/70 text-xs font-semibold transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <Users className="w-4 h-4 text-neutral-700" />
                      <span>Manage User</span>
                    </div>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${isManageUserOpen ? "rotate-0" : "-rotate-90"
                        }`}
                    />
                  </button>

                  {/* SUBMENUS: User & Role */}
                  {isManageUserOpen && (
                    <div className="pl-6 pr-1 py-1 space-y-1 border-l-2 border-neutral-200 ml-4 mt-1">
                      {/* Submenu 1: User */}
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSubmenu("user");
                          setActiveTab("daftar");
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition ${activeSubmenu === "user"
                            ? "bg-black text-white shadow-sm font-semibold"
                            : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70"
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${activeSubmenu === "user" ? "bg-[#956d49]" : "bg-neutral-300"
                              }`}
                          ></span>
                          <span>User</span>
                        </div>
                        <span
                          className={`text-[10px] font-mono ${activeSubmenu === "user" ? "text-neutral-300" : "text-neutral-400"
                            }`}
                        >
                          {users.length}
                        </span>
                      </button>

                      {/* Submenu 2: Role */}
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSubmenu("role");
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition ${activeSubmenu === "role"
                            ? "bg-black text-white shadow-sm font-semibold"
                            : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70"
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${activeSubmenu === "role" ? "bg-[#956d49]" : "bg-neutral-300"
                              }`}
                          ></span>
                          <span>Role</span>
                        </div>
                        <span
                          className={`text-[10px] font-mono ${activeSubmenu === "role" ? "text-neutral-300" : "text-neutral-400"
                            }`}
                        >
                          5
                        </span>
                      </button>
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

        {/* Sidebar Footer with Status Indicator & Logout */}
        <div className="p-3 border-t border-neutral-100 space-y-2">
          <div className="px-3 py-1 flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              API Gateway
            </span>
            <span>99.98%</span>
          </div>

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

        {/* ===================== PAGE CONTENT ===================== */}
        <main className="p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Header Row & Stat Badges */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase font-mono mb-1">
                SISTEM & TATA KELOLA / MANAGE USER / {activeSubmenu === "user" ? "USER" : "ROLE"}
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                {activeSubmenu === "user" ? "Kelola Pengguna & Akun Staf" : "Struktur Peran & Hak Akses (RBAC)"}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 max-w-2xl mt-1">
                {activeSubmenu === "user"
                  ? "Manajemen akun admin, staf operasional unit kost, aksi edit profil, dan kontrol aktivasi akses sistem."
                  : "Pengaturan matriks perizinan berjenjang, otorisasi fitur, dan hak delegasi operasional PintuSatu CMS."}
              </p>
            </div>

            {/* Quick Metrics Top Right */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-white border border-neutral-200/80 rounded-lg px-3.5 py-1.5 flex items-center gap-2 text-xs font-mono shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-neutral-500">Aktif Hari Ini:</span>
                <b className="text-neutral-900">36 / {users.length}</b>
              </div>

              <div className="bg-white border border-neutral-200/80 rounded-lg px-3.5 py-1.5 flex items-center gap-2 text-xs font-mono shadow-sm">
                <Shield className="w-3.5 h-3.5 text-[#956d49]" />
                <span className="text-neutral-500">Peran Aktif:</span>
                <b className="text-neutral-900">5 Tingkat</b>
              </div>
            </div>
          </div>

          {/* ===================== VIEW 1: SUBMENU USER ===================== */}
          {activeSubmenu === "user" && (
            <div className="space-y-6">
              {/* Tab Navigation Bar */}
              <div>
                <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab("daftar")}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activeTab === "daftar"
                        ? "bg-white text-neutral-900 shadow-sm border border-neutral-200/90"
                        : "text-neutral-500 hover:text-neutral-900"
                      }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Daftar Pengguna</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-600">
                      {users.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSubmenu("role")}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-500 hover:text-neutral-900 transition"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Peran & Hak Akses (Role Matrix)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("undangan")}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${activeTab === "undangan"
                        ? "bg-white text-neutral-900 shadow-sm border border-neutral-200/90 font-semibold"
                        : "text-neutral-500 hover:text-neutral-900"
                      }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Undangan Pending</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200">
                      3
                    </span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-400 mt-2 px-1">
                  <span>🔄</span>
                  <span>Sinkronisasi Direktori: Baru saja (09:42 WIB)</span>
                </div>
              </div>

              {/* Toolbar & Filter Row */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2.5 flex-1">
                  {/* Local Search */}
                  <div className="relative min-w-[240px] flex-1 sm:flex-initial">
                    <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Cari nama, email korporat, atau ID staf..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 shadow-sm"
                    />
                  </div>

                  {/* Role Dropdown Filter */}
                  <div className="relative">
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="appearance-none bg-white border border-neutral-200 rounded-lg px-3 py-1.5 pr-7 text-xs font-medium text-neutral-700 hover:border-neutral-300 focus:outline-none shadow-sm cursor-pointer"
                    >
                      <option value="Semua Peran">Semua Peran (5)</option>
                      <option value="Superadmin">Superadmin</option>
                      <option value="Admin Operasional">Admin Operasional</option>
                      <option value="Content Editor">Content Editor</option>
                      <option value="Auditor Keuangan">Auditor Keuangan</option>
                      <option value="Kepala Wilayah Kost">Kepala Wilayah Kost</option>
                    </select>
                    <ChevronDown className="w-3 h-3 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Status Dropdown Filter */}
                  <div className="relative">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="appearance-none bg-white border border-neutral-200 rounded-lg px-3 py-1.5 pr-7 text-xs font-medium text-neutral-700 hover:border-neutral-300 focus:outline-none shadow-sm cursor-pointer"
                    >
                      <option value="Semua Status">Semua Status</option>
                      <option value="Aktif">Aktif</option>
                      <option value="Ditangguhkan">Ditangguhkan</option>
                      <option value="Nonaktif">Nonaktif</option>
                    </select>
                    <ChevronDown className="w-3 h-3 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Export CSV Button */}
                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="bg-white hover:bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-1.5 text-xs font-medium text-neutral-700 flex items-center gap-1.5 shadow-sm transition"
                  >
                    <Download className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Export CSV</span>
                  </button>
                </div>

                {/* Tambah Pengguna Baru CTA */}
                <div>
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(true)}
                    className="w-full sm:w-auto bg-black hover:bg-neutral-800 text-white px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Tambah Pengguna Baru</span>
                  </button>
                </div>
              </div>

              {/* Grid 2 Kolom: Table (8 cols) & Detail Hak Izin (4 cols) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Tabel Pengguna */}
                <div className="lg:col-span-8 bg-white rounded-xl border border-neutral-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
                  {/* Bulk Action Header Bar */}
                  <div className="p-3.5 border-b border-neutral-100 bg-neutral-50/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={
                          filteredUsers.length > 0 &&
                          selectedIds.length === filteredUsers.length
                        }
                        onChange={handleSelectAll}
                        className="w-3.5 h-3.5 rounded border-neutral-300 text-black focus:ring-black accent-black cursor-pointer"
                      />
                      <span className="font-semibold text-neutral-800">
                        Pilih Semua Akun
                      </span>
                      <span className="text-neutral-400">|</span>
                      <span className="text-neutral-500 font-mono text-[11px]">
                        {selectedIds.length} akun dipilih untuk aksi massal
                      </span>
                    </div>

                    {/* Bulk Actions */}
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        disabled={selectedIds.length === 0}
                        onClick={() =>
                          triggerToast(
                            `Reset kredensial untuk ${selectedIds.length} akun terkirim ke email.`
                          )
                        }
                        className="flex items-center gap-1 text-[11px] font-medium text-neutral-600 hover:text-black disabled:opacity-40 transition"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset Kredensial</span>
                      </button>

                      <button
                        type="button"
                        disabled={selectedIds.length === 0}
                        onClick={() => {
                          if (confirm(`Nonaktifkan ${selectedIds.length} akun terpilih?`)) {
                            setUsers(
                              users.map((u) =>
                                selectedIds.includes(u.id)
                                  ? { ...u, status: "Nonaktif" }
                                  : u
                              )
                            );
                            setSelectedIds([]);
                            triggerToast(`${selectedIds.length} akun dinonaktifkan.`);
                          }
                        }}
                        className="flex items-center gap-1 text-[11px] font-medium text-rose-600 hover:text-rose-700 disabled:opacity-40 transition"
                      >
                        <Ban className="w-3 h-3" />
                        <span>Nonaktifkan</span>
                      </button>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-neutral-100 text-[10px] font-bold text-neutral-400 uppercase tracking-wider bg-white">
                          <th className="py-3 px-3.5 w-8"></th>
                          <th className="py-3 px-2 font-semibold">PENGGUNA & IDENTITAS</th>
                          <th className="py-3 px-2 font-semibold">PERAN (ROLE)</th>
                          <th className="py-3 px-2 font-semibold">DIVISI / PENUGASAN</th>
                          <th className="py-3 px-2 font-semibold">STATUS AKUN</th>
                          <th className="py-3 px-3.5 font-semibold text-right">AKSI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100 font-sans">
                        {filteredUsers.map((item) => {
                          const isSelected = selectedIds.includes(item.id);
                          return (
                            <tr
                              key={item.id}
                              className={`hover:bg-neutral-50/70 transition group ${isSelected ? "bg-neutral-50/80" : ""
                                }`}
                            >
                              {/* Row Checkbox */}
                              <td className="py-3 px-3.5">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => handleToggleRow(item.id)}
                                  className="w-3.5 h-3.5 rounded border-neutral-300 text-black focus:ring-black accent-black cursor-pointer"
                                />
                              </td>

                              {/* Name & Email */}
                              <td className="py-3 px-2">
                                <div className="flex items-center gap-2.5">
                                  <div
                                    className={`w-8 h-8 rounded-lg ${item.avatarBg} font-bold text-xs flex items-center justify-center shrink-0 border border-neutral-200/40`}
                                  >
                                    {item.initials}
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="font-semibold text-neutral-900 leading-tight">
                                      {item.name}
                                    </span>
                                    <span className="text-[11px] text-neutral-400">
                                      {item.email}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* Role Pill */}
                              <td className="py-3 px-2">
                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono border ${item.roleColor}`}
                                >
                                  <span className="w-1 h-1 rounded-full bg-current opacity-70"></span>
                                  {item.role}
                                </span>
                              </td>

                              {/* Division / Penugasan */}
                              <td className="py-3 px-2">
                                <div className="flex flex-col leading-tight">
                                  <span className="font-semibold text-neutral-800 text-[11px]">
                                    {item.divisionTitle}
                                  </span>
                                  <span className="text-[10px] text-neutral-400">
                                    {item.divisionSubtitle}
                                  </span>
                                </div>
                              </td>

                              {/* Status */}
                              <td className="py-3 px-2">
                                {item.status === "Aktif" && (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    Aktif
                                  </span>
                                )}
                                {item.status === "Ditangguhkan" && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-100 text-neutral-500 border border-neutral-200">
                                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400"></span>
                                    Ditangguhkan
                                  </span>
                                )}
                                {item.status === "Nonaktif" && (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400"></span>
                                    Nonaktif
                                  </span>
                                )}
                              </td>

                              {/* Action Buttons: Edit & Delete */}
                              <td className="py-3 px-3.5 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEdit(item)}
                                    title="Edit Pengguna"
                                    className="p-1.5 rounded-md hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition"
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => setDeleteConfirmUser(item)}
                                    title="Hapus Pengguna"
                                    className="p-1.5 rounded-md hover:bg-rose-50 text-neutral-400 hover:text-rose-600 transition"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Table Pagination */}
                  <div className="p-3.5 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                    <span className="font-mono text-[11px]">
                      Menampilkan <b>1 - {filteredUsers.length}</b> dari <b>{users.length}</b> pengguna
                    </span>

                    <div className="flex items-center gap-1 font-mono text-xs">
                      <button
                        type="button"
                        className="w-7 h-7 rounded border border-neutral-200 hover:bg-neutral-50 flex items-center justify-center text-neutral-400"
                      >
                        &lt;
                      </button>
                      <button
                        type="button"
                        className="w-7 h-7 rounded bg-black text-white font-bold flex items-center justify-center shadow-sm"
                      >
                        1
                      </button>
                      <button
                        type="button"
                        className="w-7 h-7 rounded border border-neutral-200 hover:bg-neutral-50 flex items-center justify-center"
                      >
                        2
                      </button>
                      <button
                        type="button"
                        className="w-7 h-7 rounded border border-neutral-200 hover:bg-neutral-50 flex items-center justify-center"
                      >
                        3
                      </button>
                      <span className="px-1 text-neutral-400">...</span>
                      <button
                        type="button"
                        className="w-7 h-7 rounded border border-neutral-200 hover:bg-neutral-50 flex items-center justify-center text-neutral-700"
                      >
                        &gt;
                      </button>
                    </div>
                  </div>
                </div>

                {/* Detail Hak Izin Panel Kanan */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Card Detail Hak Izin */}
                  <div className="bg-white rounded-xl border border-neutral-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-6">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-[#956d49]" />
                        <h2 className="text-base font-bold text-neutral-900">
                          Detail Hak Izin
                        </h2>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400">
                        RBAC v2.4
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
                      Pratinjau batas wewenang berdasarkan profil yang aktif dipilih saat ini:
                    </p>

                    {/* Role Header Badge */}
                    <div className="p-3 rounded-lg border border-neutral-100 bg-neutral-50/80 flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-xs font-bold text-neutral-900">
                          Admin Operasional
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400">
                        Default Kost
                      </span>
                    </div>

                    {/* Permission Matrix Rows */}
                    <div className="space-y-3 mb-5 text-xs font-medium">
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-50/80 transition">
                        <div className="flex items-center gap-2 text-neutral-700">
                          <LayoutDashboard className="w-3.5 h-3.5 text-neutral-400" />
                          <span>Akses Dashboard</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Read / Write
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-50/80 transition">
                        <div className="flex items-center gap-2 text-neutral-700">
                          <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                          <span>Manajemen Kamar & Unit</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Akses Penuh
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-50/80 transition">
                        <div className="flex items-center gap-2 text-neutral-700">
                          <ImageIcon className="w-3.5 h-3.5 text-neutral-400" />
                          <span>Publikasi Promo & Banner</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono text-neutral-600 bg-neutral-100 border border-neutral-200">
                          Ajukan (Draft)
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-50/80 transition">
                        <div className="flex items-center gap-2 text-neutral-700">
                          <FileCheck2 className="w-3.5 h-3.5 text-neutral-400" />
                          <span>Ekspor Laporan Keuangan</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono text-neutral-600 bg-neutral-100 border border-neutral-200">
                          Read Only
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-50/80 transition">
                        <div className="flex items-center gap-2 text-neutral-700">
                          <Users className="w-3.5 h-3.5 text-neutral-400" />
                          <span>Manajemen User Lain</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                          Dilarang
                        </span>
                      </div>
                    </div>

                    {/* Konfigurasi Matriks Peran CTA */}
                    <button
                      type="button"
                      onClick={() => setActiveSubmenu("role")}
                      className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold py-2.5 rounded-lg text-center flex items-center justify-center gap-2 transition"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>Konfigurasi Matriks Peran</span>
                    </button>
                  </div>

                  {/* Keamanan Kredensial Box */}
                  <div className="bg-white rounded-xl border border-neutral-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-5 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
                      <Lock className="w-3.5 h-3.5 text-[#956d49]" />
                      <span>Keamanan Kredensial</span>
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Setiap staf operasional diwajibkan mengaktifkan 2FA (Two-Factor Authentication) saat
                      pertama kali mengelola inventaris sewa kost.
                    </p>
                    <div className="pt-1">
                      <span className="text-xs font-semibold text-[#956d49]">
                        Kepatuhan 2FA Terdata: <b>94.8%</b>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================== VIEW 2: SUBMENU ROLE (ROLE MATRIX) ===================== */}
          {activeSubmenu === "role" && (
            <div className="space-y-6">
              {/* Header Info */}
              <div className="bg-white rounded-xl border border-neutral-200/80 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#956d49] mb-1">
                    <Shield className="w-4 h-4" />
                    <span>Role-Based Access Control (RBAC)</span>
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    Matriks Tingkat Peran & Batasan Izin
                  </h2>
                  <p className="text-xs text-neutral-500 mt-1 max-w-2xl">
                    Konfigurasi hak akses modular setiap tingkatan peran. Setiap perubahan wewenang akan
                    langsung berlaku pada sesi staf terkait.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setActiveSubmenu("user")}
                    className="bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200 px-3.5 py-2 rounded-lg text-xs font-medium transition"
                  >
                    ← Kembali ke User
                  </button>
                  <button
                    type="button"
                    onClick={() => alert("Fitur pembuatan custom role akan segera tersedia.")}
                    className="bg-black hover:bg-neutral-800 text-white px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Buat Role Baru</span>
                  </button>
                </div>
              </div>

              {/* Roles Matrix Table */}
              <div className="bg-white rounded-xl border border-neutral-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-neutral-200 text-[10px] font-bold text-neutral-400 uppercase tracking-wider bg-neutral-50/70">
                        <th className="py-3.5 px-4 font-semibold">TINGKAT PERAN (ROLE)</th>
                        <th className="py-3.5 px-3 font-semibold">STAF TERDATA</th>
                        <th className="py-3.5 px-3 font-semibold">DASHBOARD</th>
                        <th className="py-3.5 px-3 font-semibold">KAMAR & UNIT</th>
                        <th className="py-3.5 px-3 font-semibold">PROMO & BANNER</th>
                        <th className="py-3.5 px-3 font-semibold">KEUANGAN</th>
                        <th className="py-3.5 px-3 font-semibold">USER MANAGEMENT</th>
                        <th className="py-3.5 px-4 font-semibold text-right">AKSI</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 font-sans">
                      {rolesList.map((r, i) => (
                        <tr key={i} className="hover:bg-neutral-50/70 transition">
                          <td className="py-4 px-4">
                            <div className="flex flex-col">
                              <span className="font-bold text-neutral-900 text-xs">
                                {r.name}
                              </span>
                              <span className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1 max-w-xs">
                                {r.description}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-3">
                            <span className="inline-block px-2 py-0.5 rounded font-mono text-[11px] bg-neutral-100 text-neutral-700">
                              {r.staffCount} Staf
                            </span>
                          </td>
                          <td className="py-4 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${r.dashboard === "Full" || r.dashboard === "Read / Write"
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                  : r.dashboard === "Read Only"
                                    ? "bg-neutral-100 text-neutral-700 border border-neutral-200"
                                    : "bg-rose-50 text-rose-700 border border-rose-200"
                                }`}
                            >
                              {r.dashboard}
                            </span>
                          </td>
                          <td className="py-4 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${r.rooms === "Akses Penuh" || r.rooms === "Verifikasi Unit"
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                  : r.rooms === "Read Only"
                                    ? "bg-neutral-100 text-neutral-700 border border-neutral-200"
                                    : "bg-rose-50 text-rose-700 border border-rose-200"
                                }`}
                            >
                              {r.rooms}
                            </span>
                          </td>
                          <td className="py-4 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${r.promo === "Akses Penuh"
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                  : r.promo === "Ajukan (Draft)" || r.promo === "Read Only"
                                    ? "bg-neutral-100 text-neutral-700 border border-neutral-200"
                                    : "bg-rose-50 text-rose-700 border border-rose-200"
                                }`}
                            >
                              {r.promo}
                            </span>
                          </td>
                          <td className="py-4 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${r.finance === "Akses Penuh"
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                  : r.finance === "Read Only"
                                    ? "bg-neutral-100 text-neutral-700 border border-neutral-200"
                                    : "bg-rose-50 text-rose-700 border border-rose-200"
                                }`}
                            >
                              {r.finance}
                            </span>
                          </td>
                          <td className="py-4 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${r.usersManage === "Akses Penuh"
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                  : "bg-rose-50 text-rose-700 border border-rose-200"
                                }`}
                            >
                              {r.usersManage}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button
                              type="button"
                              onClick={() =>
                                alert(`Konfigurasi izin granular untuk ${r.name}`)
                              }
                              className="text-xs font-semibold text-neutral-700 hover:text-black hover:underline"
                            >
                              Detail Izin
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ===================== MODAL: TAMBAH PENGGUNA BARU ===================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl w-full max-w-md p-6 relative">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-neutral-900">
                  Tambah Pengguna Baru
                </h3>
                <p className="text-xs text-neutral-400">
                  Buat akun staf operasional atau admin baru
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Nama Lengkap & Gelar
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Dimas Pratama, S.Kom"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Email Korporat
                </label>
                <input
                  type="email"
                  placeholder="nama.staf@pintusatu.id"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Peran / Wewenang Akses
                </label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400"
                >
                  <option value="Admin Operasional">Admin Operasional</option>
                  <option value="Content Editor">Content Editor</option>
                  <option value="Auditor Keuangan">Auditor Keuangan</option>
                  <option value="Kepala Wilayah Kost">Kepala Wilayah Kost</option>
                  <option value="Superadmin">Superadmin</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Divisi Utama
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Area Bandung Raya"
                    value={newUserDivision}
                    onChange={(e) => setNewUserDivision(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Cluster / Penugasan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Cluster Dago"
                    value={newUserArea}
                    onChange={(e) => setNewUserArea(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-2 rounded-lg text-neutral-600 hover:bg-neutral-100 font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-black hover:bg-neutral-800 text-white font-semibold shadow-sm"
                >
                  Simpan Pengguna
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== MODAL: EDIT PENGGUNA ===================== */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl w-full max-w-md p-6 relative">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                  <Pencil className="w-4 h-4 text-[#956d49]" />
                  <span>Edit Profil Pengguna</span>
                </h3>
                <p className="text-xs text-neutral-400">
                  Perbarui informasi staf atau ubah hak akses
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Nama Lengkap & Gelar
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">
                  Email Korporat
                </label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Peran (Role)
                  </label>
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400"
                  >
                    <option value="Superadmin">Superadmin</option>
                    <option value="Admin Operasional">Admin Operasional</option>
                    <option value="Content Editor">Content Editor</option>
                    <option value="Auditor Keuangan">Auditor Keuangan</option>
                    <option value="Kepala Wilayah Kost">Kepala Wilayah Kost</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Status Akun
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) =>
                      setEditStatus(e.target.value as "Aktif" | "Ditangguhkan" | "Nonaktif")
                    }
                    className="w-full px-3 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Ditangguhkan">Ditangguhkan</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Divisi Utama
                  </label>
                  <input
                    type="text"
                    value={editDivision}
                    onChange={(e) => setEditDivision(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-neutral-700 mb-1">
                    Cluster / Penugasan
                  </label>
                  <input
                    type="text"
                    value={editArea}
                    onChange={(e) => setEditArea(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-3.5 py-2 rounded-lg text-neutral-600 hover:bg-neutral-100 font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-black hover:bg-neutral-800 text-white font-semibold shadow-sm"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== MODAL: KONFIRMASI DELETE ===================== */}
      {deleteConfirmUser && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl w-full max-w-sm p-6 relative text-center">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3 border border-rose-100">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-neutral-900 mb-1">
              Hapus Pengguna?
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed mb-5">
              Apakah Anda yakin ingin menghapus akun <b>{deleteConfirmUser.name}</b> (
              {deleteConfirmUser.email})? Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="flex items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteConfirmUser(null)}
                className="w-full py-2 px-3 rounded-lg border border-neutral-200 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="w-full py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
