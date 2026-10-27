"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  DoorClosed,
  Users,
  Receipt,
  TrendingUp,
  Settings,
  Users2,
  HelpCircle,
  Sparkles,
  ChevronsUpDown,
  LogOut,
  User,
  Building,
} from "lucide-react";
import { DashboardTab } from "./types";
import { useDashboard } from "./DashboardContext";

interface PemilikKostSidebarProps {
  activeTab?: DashboardTab;
  onTabChange?: (tab: DashboardTab) => void;
  pendingInvoicesCount?: number;
  onLogout: () => void;
}

export function PemilikKostSidebar({
  onTabChange,
  pendingInvoicesCount,
  onLogout,
}: PemilikKostSidebarProps) {
  const pathname = usePathname();
  const { invoices, rooms } = useDashboard();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const activePendingCount =
    pendingInvoicesCount !== undefined
      ? pendingInvoicesCount
      : invoices.filter((i) => i.status !== "lunas").length;

  const mainMenuItems = [
    {
      id: "ringkasan" as DashboardTab,
      label: "Ringkasan",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "kamar" as DashboardTab,
      label: "Manajemen kamar",
      href: "/dashboard/kamar",
      icon: DoorClosed,
    },
    {
      id: "penghuni" as DashboardTab,
      label: "Data penghuni",
      href: "/dashboard/penghuni",
      icon: Users,
    },
    {
      id: "tagihan" as DashboardTab,
      label: "Tagihan & pembayaran",
      href: "/dashboard/tagihan",
      icon: Receipt,
      badge: activePendingCount > 0 ? activePendingCount : null,
    },
    {
      id: "keuangan" as DashboardTab,
      label: "Laporan keuangan",
      href: "/dashboard/keuangan",
      icon: TrendingUp,
    },
    {
      id: "pengaturan" as DashboardTab,
      label: "Properti & pengaturan",
      href: "/dashboard/pengaturan",
      icon: Settings,
    },
  ];

  const secondaryMenuItems = [
    {
      id: "tim" as DashboardTab,
      label: "Tim & hak akses",
      href: "/dashboard/tim",
      icon: Users2,
    },
    {
      id: "bantuan" as DashboardTab,
      label: "Pusat bantuan",
      href: "/dashboard/bantuan",
      icon: HelpCircle,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#E6E3DC] flex flex-col justify-between shrink-0 h-full overflow-y-auto select-none">
      {/* Top Branding & Main Navigation */}
      <div className="p-4 flex flex-col gap-6">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 px-2 py-1 group transition-transform duration-200 hover:scale-[1.02]"
        >
          <div className="w-8 h-8 rounded-xl bg-[#1C1B18] text-[#DFB08A] flex items-center justify-center font-extrabold text-sm shadow-xs border border-[#33312C] group-hover:bg-[#6F4E37] transition-colors">
            <span className="font-mono text-xs text-white">P1</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-[#1C1B18] leading-none">
              pintu satu
            </span>
            <span className="text-[10px] text-[#8C887F] font-medium tracking-wide">
              portal pemilik kost
            </span>
          </div>
        </Link>

        {/* Section: RUANG KELOLA */}
        <div className="space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#8C887F]">
            Ruang Kelola
          </div>

          <nav className="space-y-1">
            {mainMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    if (onTabChange) onTabChange(item.id);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#F4EFEA] text-[#6F4E37] shadow-xs"
                      : "text-[#5C5952] hover:bg-[#F9F8F6] hover:text-[#1C1B18]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? "text-[#6F4E37]" : "text-[#8C887F]"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== null && item.badge !== undefined && (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold leading-none ${
                        isActive
                          ? "bg-[#6F4E37] text-white"
                          : "bg-[#FBF5EF] text-[#C88A58] border border-[#E6E3DC]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#E6E3DC] mx-2" />

        {/* Secondary Menu (Tim & Bantuan & Logout) */}
        <div className="space-y-1">
          {secondaryMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname?.startsWith(item.href);

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => {
                  if (onTabChange) onTabChange(item.id);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#F4EFEA] text-[#6F4E37] font-semibold"
                    : "text-[#5C5952] hover:bg-[#F9F8F6] hover:text-[#1C1B18]"
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? "text-[#6F4E37]" : "text-[#8C887F]"
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-[#8C887F] hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer text-left group"
          >
            <LogOut className="w-4 h-4 text-[#8C887F] group-hover:text-red-600 transition-colors" />
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </div>

      {/* Bottom Area: Subscription Card & User Profile */}
      <div className="p-4 space-y-3">
        {/* Subscription Plan Card */}
        <div className="p-3.5 rounded-2xl bg-[#F9F8F6] border border-[#E6E3DC] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1C1B18]">Paket Tumbuh</span>
            <div className="w-5 h-5 rounded-md bg-[#F4EFEA] flex items-center justify-center text-[#6F4E37]">
              <Sparkles className="w-3 h-3" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] text-[#5C5952]">
              {rooms.length} dari 75 kamar digunakan
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#E6E3DC] overflow-hidden">
              <div
                className="h-full bg-[#6F4E37] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (rooms.length / 75) * 100)}%` }}
              />
            </div>
          </div>

          <Link
            href="/dashboard/pengaturan"
            className="text-[11px] font-semibold text-[#6F4E37] hover:text-[#563B28] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Kelola langganan</span>
            <span>&rarr;</span>
          </Link>
        </div>

        {/* User Profile Selector */}
        <div className="relative">
          <div className="flex items-center justify-between p-1.5 rounded-xl hover:bg-[#F9F8F6] transition-colors border border-transparent hover:border-[#E6E3DC]">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center justify-between gap-2 text-left flex-1 min-w-0 cursor-pointer pr-1 group"
            >
              <div className="flex items-center gap-2.5 truncate">
                <div className="w-8 h-8 rounded-full bg-[#6F4E37] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  AP
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-[#1C1B18] truncate leading-tight">
                    Andi Pratama
                  </div>
                  <div className="text-[10px] text-[#8C887F]">Pemilik kost</div>
                </div>
              </div>
              <ChevronsUpDown className="w-3.5 h-3.5 text-[#8C887F] shrink-0 group-hover:text-[#1C1B18]" />
            </button>
            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg text-[#8C887F] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
              title="Keluar dari akun"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-xl border border-[#E6E3DC] shadow-lg py-1.5 z-50 text-xs">
              <div className="px-3 py-2 border-b border-[#E6E3DC]">
                <div className="font-bold text-[#1C1B18]">Andi Pratama</div>
                <div className="text-[10px] text-[#8C887F] truncate">andi.pratama@kostara.id</div>
              </div>

              <Link
                href="/dashboard/pengaturan"
                onClick={() => setShowProfileMenu(false)}
                className="w-full flex items-center gap-2 px-3 py-2 text-[#5C5952] hover:bg-[#F9F8F6] hover:text-[#1C1B18] text-left cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-[#8C887F]" />
                <span>Profil Akun</span>
              </Link>

              <Link
                href="/dashboard/pengaturan"
                onClick={() => setShowProfileMenu(false)}
                className="w-full flex items-center gap-2 px-3 py-2 text-[#5C5952] hover:bg-[#F9F8F6] hover:text-[#1C1B18] text-left cursor-pointer"
              >
                <Building className="w-3.5 h-3.5 text-[#8C887F]" />
                <span>Pengaturan Kost</span>
              </Link>

              <div className="h-px bg-[#E6E3DC] my-1" />

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onLogout();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 text-left cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar Akun</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
