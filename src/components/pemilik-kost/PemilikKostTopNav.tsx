"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  ChevronDown,
  Bell,
  Check,
  Clock,
  AlertCircle,
  Plus,
  X,
  LogOut,
  User,
  ExternalLink,
} from "lucide-react";
import { useDashboard } from "./DashboardContext";

interface PemilikKostTopNavProps {
  currentProperty: string;
  currentLocation: string;
  onPropertyChange: (name: string, loc: string) => void;
  onOpenRecordPayment?: () => void;
  onLogout?: () => void;
}

export function PemilikKostTopNav({
  currentProperty,
  currentLocation,
  onPropertyChange,
  onLogout,
}: PemilikKostTopNavProps) {
  const { logout } = useDashboard();
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const handleLogout = () => {
    setShowUserDropdown(false);
    if (onLogout) {
      onLogout();
    } else {
      logout();
    }
  };

  const propertyOptions = [
    { name: "Kost Cemara", location: "Sukajadi, Bandung", rooms: 32 },
    { name: "Griya Dago Suites", location: "Coblong, Bandung", rooms: 18 },
  ];

  const notifications = [
    {
      id: "N1",
      title: "Tagihan A-05 Terlambat",
      desc: "Andi Saputra belum melunasi sewa Rp1.500.000 (jatuh tempo 20 Okt).",
      time: "2 jam lalu",
      icon: AlertCircle,
      color: "text-red-600 bg-red-50",
    },
    {
      id: "N2",
      title: "Kontrak Segera Berakhir",
      desc: "Kontrak Nadia Salsabila & Yoga Pratama berakhir pada 31 Oktober 2026.",
      time: "5 jam lalu",
      icon: Clock,
      color: "text-amber-600 bg-amber-50",
    },
    {
      id: "N3",
      title: "Pembayaran Diterima",
      desc: "Sewa kamar A-01 (Putri Aprilia) Rp1.500.000 berhasil diverifikasi.",
      time: "09:12 WIB",
      icon: Check,
      color: "text-emerald-600 bg-emerald-50",
    },
  ];

  return (
    <header className="h-16 bg-white border-b border-[#E6E3DC] px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left: Property Selector Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowPropertyDropdown(!showPropertyDropdown)}
          className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-[#F9F8F6] transition-colors cursor-pointer text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#F4EFEA] border border-[#E6E3DC] flex items-center justify-center text-[#6F4E37] group-hover:scale-105 transition-transform">
            <Building2 className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-[#1C1B18] tracking-tight">
                {currentProperty}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#8C887F]" />
            </div>
            <div className="text-[11px] text-[#8C887F]">{currentLocation}</div>
          </div>
        </button>

        {/* Dropdown list */}
        {showPropertyDropdown && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl border border-[#E6E3DC] shadow-lg py-2 z-50 text-xs">
            <div className="px-3 py-1.5 text-[10px] font-bold text-[#8C887F] uppercase tracking-wider">
              Pilih Properti Kost
            </div>

            {propertyOptions.map((prop) => {
              const isSelected = prop.name === currentProperty;
              return (
                <button
                  key={prop.name}
                  onClick={() => {
                    onPropertyChange(prop.name, prop.location);
                    setShowPropertyDropdown(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[#F4EFEA] text-[#6F4E37] font-bold"
                      : "text-[#1C1B18] hover:bg-[#F9F8F6]"
                  }`}
                >
                  <div>
                    <div className="font-semibold">{prop.name}</div>
                    <div className="text-[11px] text-[#8C887F]">
                      {prop.location} • {prop.rooms} kamar
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#6F4E37]" />}
                </button>
              );
            })}

            <div className="h-px bg-[#E6E3DC] my-1.5" />

            <button
              onClick={() => {
                setShowPropertyDropdown(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-[#6F4E37] font-semibold hover:bg-[#F9F8F6] text-left cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Properti Baru</span>
            </button>
          </div>
        )}
      </div>

      {/* Right: Date, Notifications & Avatar */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Date string */}
        <div className="text-xs text-[#5C5952] hidden md:block font-medium">
          Senin, 26 Oktober 2026
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#5C5952] hover:bg-[#F9F8F6] hover:text-[#1C1B18] transition-colors relative cursor-pointer"
            title="Notifikasi"
          >
            <Bell className="w-4 h-4" />
            {/* Notification Dot */}
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {/* Notifications Popover */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-[#E6E3DC] shadow-xl p-3 z-50 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#E6E3DC]">
                <span className="font-bold text-sm text-[#1C1B18]">Notifikasi</span>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-1 text-[#8C887F] hover:text-[#1C1B18]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="py-2 space-y-2 max-h-72 overflow-y-auto">
                {notifications.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-xl bg-[#F9F8F6] hover:bg-[#F4EFEA] transition-colors flex items-start gap-3 cursor-pointer"
                    >
                      <div className={`p-1.5 rounded-lg shrink-0 ${item.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#1C1B18] text-xs">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-[#8C887F]">{item.time}</span>
                        </div>
                        <p className="text-[11px] text-[#5C5952] mt-0.5 leading-snug">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-[#E6E3DC] text-center">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-[11px] font-semibold text-[#6F4E37] hover:underline"
                >
                  Tandai semua sudah dibaca
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Dedicated Logout Action Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E6E3DC] text-xs font-semibold text-[#5C5952] hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer shadow-2xs group"
          title="Keluar dari akun dan langsung ke halaman login"
        >
          <LogOut className="w-3.5 h-3.5 text-[#8C887F] group-hover:text-red-600 transition-colors" />
          <span className="hidden sm:inline">Keluar</span>
        </button>

        {/* User initials & profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center gap-1.5 p-1 rounded-xl hover:bg-[#F9F8F6] transition-colors cursor-pointer border border-transparent hover:border-[#E6E3DC]"
            title="Menu Akun"
          >
            <div className="w-8 h-8 rounded-full bg-[#6F4E37] text-white flex items-center justify-center font-bold text-xs select-none shadow-xs">
              AP
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#8C887F] hidden sm:block" />
          </button>

          {showUserDropdown && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl border border-[#E6E3DC] shadow-xl py-2 z-50 text-xs">
              <div className="px-4 py-2.5 border-b border-[#E6E3DC]">
                <div className="font-bold text-[#1C1B18] text-sm">Andi Pratama</div>
                <div className="text-[11px] text-[#8C887F] truncate">andi.pratama@kostara.id</div>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F4EFEA] text-[#6F4E37] border border-[#E6E3DC]">
                  Pemilik Kost
                </span>
              </div>

              <div className="py-1">
                <Link
                  href="/dashboard/pengaturan"
                  onClick={() => setShowUserDropdown(false)}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-[#5C5952] hover:bg-[#F9F8F6] hover:text-[#1C1B18] transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-[#8C887F]" />
                  <span>Profil &amp; Pengaturan</span>
                </Link>

                <Link
                  href="/"
                  onClick={() => setShowUserDropdown(false)}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-[#5C5952] hover:bg-[#F9F8F6] hover:text-[#1C1B18] transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 text-[#8C887F]" />
                  <span>Lihat Website Utama</span>
                </Link>
              </div>

              <div className="h-px bg-[#E6E3DC] my-1" />

              <div className="px-2 pt-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 text-left font-semibold transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-600" />
                  <span>Keluar (Logout)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
