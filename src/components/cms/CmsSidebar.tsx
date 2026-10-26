"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DoorOpen,
  LayoutDashboard,
  Users,
  ChevronDown,
  Shield,
  Image as ImageIcon,
  BookOpen,
  MessageSquareQuote,
  ScrollText,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";

interface CmsSidebarProps {
  onLogout?: () => void;
}

export function CmsSidebar({ onLogout }: CmsSidebarProps) {
  const pathname = usePathname();
  const [isManageUserOpen, setIsManageUserOpen] = useState(true);

  const isDashboardActive = pathname === "/admin";
  const isUserActive = pathname === "/admin/users";

  return (
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
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
                  isDashboardActive
                    ? "bg-black text-white shadow-sm"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard CMS</span>
                </div>
                {isDashboardActive && <span className="w-1.5 h-1.5 rounded-full bg-[#956d49]" />}
              </Link>

              {/* PARENT MENU: Manage User */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsManageUserOpen(!isManageUserOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70 text-xs font-semibold transition cursor-pointer"
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
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition ${
                        isUserActive
                          ? "bg-neutral-100 text-neutral-900 font-bold"
                          : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isUserActive ? "bg-[#956d49]" : "bg-neutral-300"
                          }`}
                        />
                        <span>User &amp; Peran</span>
                      </div>
                      <span className="text-[10px] text-neutral-400">12</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* KONTEN LANDING PAGE */}
          <div>
            <p className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase px-3 mb-2">
              KONTEN WEBSITE
            </p>
            <div className="space-y-1">
              <div className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-neutral-600 hover:bg-neutral-100/70 cursor-pointer">
                <div className="flex items-center gap-2.5">
                  <Shield className="w-4 h-4 text-neutral-500" />
                  <span>Fasilitas Kost</span>
                </div>
              </div>
              <div className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-neutral-600 hover:bg-neutral-100/70 cursor-pointer">
                <div className="flex items-center gap-2.5">
                  <ImageIcon className="w-4 h-4 text-neutral-500" />
                  <span>Galeri Media</span>
                </div>
              </div>
              <div className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-neutral-600 hover:bg-neutral-100/70 cursor-pointer">
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-neutral-500" />
                  <span>Artikel Blog</span>
                </div>
              </div>
              <div className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-neutral-600 hover:bg-neutral-100/70 cursor-pointer">
                <div className="flex items-center gap-2.5">
                  <MessageSquareQuote className="w-4 h-4 text-neutral-500" />
                  <span>Testimoni</span>
                </div>
              </div>
            </div>
          </div>

          {/* PENGATURAN */}
          <div>
            <p className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase px-3 mb-2">
              SISTEM
            </p>
            <div className="space-y-1">
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-neutral-600 hover:bg-neutral-100/70 cursor-pointer">
                <ScrollText className="w-4 h-4 text-neutral-500" />
                <span>Log Audit CMS</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-neutral-600 hover:bg-neutral-100/70 cursor-pointer">
                <Settings className="w-4 h-4 text-neutral-500" />
                <span>Pengaturan Sistem</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Footer with Portal Links */}
      <div className="p-3 border-t border-neutral-100 space-y-2">
        <Link
          href="/"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-neutral-600 hover:bg-neutral-100 transition"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Ke Landing Page</span>
          </span>
          <span className="text-[10px] text-neutral-400">&rarr;</span>
        </Link>

        <Link
          href="/dashboard"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-[#6F4E37] bg-[#F4EFEA] hover:bg-[#EFE6DC] font-medium transition"
        >
          <span>Portal Pemilik Kost</span>
          <span className="text-[10px] font-bold">&rarr;</span>
        </Link>

        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-600 hover:bg-red-50 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar Akun Admin</span>
          </button>
        )}
      </div>
    </aside>
  );
}
