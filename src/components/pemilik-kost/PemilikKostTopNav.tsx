"use client";

import { useState } from "react";
import {
  Building2,
  ChevronDown,
  Bell,
  Check,
  Clock,
  AlertCircle,
  Plus,
  X,
} from "lucide-react";

interface PemilikKostTopNavProps {
  currentProperty: string;
  currentLocation: string;
  onPropertyChange: (name: string, loc: string) => void;
  onOpenRecordPayment?: () => void;
}

export function PemilikKostTopNav({
  currentProperty,
  currentLocation,
  onPropertyChange,
}: PemilikKostTopNavProps) {
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

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

        {/* User initials circle */}
        <div className="w-9 h-9 rounded-full bg-[#F4EFEA] border border-[#E6E3DC] text-[#6F4E37] flex items-center justify-center font-bold text-xs select-none shadow-xs">
          AP
        </div>
      </div>
    </header>
  );
}
