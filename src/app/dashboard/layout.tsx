"use client";

import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { PemilikKostSidebar } from "@/components/pemilik-kost/PemilikKostSidebar";
import { PemilikKostTopNav } from "@/components/pemilik-kost/PemilikKostTopNav";
import {
  DashboardProvider,
  useDashboard,
} from "@/components/pemilik-kost/DashboardContext";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { currentProperty, currentLocation, setCurrentProperty, logout } = useDashboard();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1C1B18] font-sans antialiased flex selection:bg-[#6F4E37]/15 selection:text-[#1C1B18]">
      {/* Desktop Sidebar (Sticky, non-scrolling) */}
      <div className="hidden lg:block shrink-0 sticky top-0 h-screen z-30">
        <PemilikKostSidebar
          onLogout={handleLogout}
        />
      </div>

      {/* Mobile Drawer Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="w-64 h-full bg-white shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#8C887F] hover:text-[#1C1B18]"
            >
              <X className="w-5 h-5" />
            </button>
            <PemilikKostSidebar
              onTabChange={() => setIsMobileMenuOpen(false)}
              onLogout={handleLogout}
            />
          </div>
        </div>
      )}

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header Bar */}
        <div className="lg:hidden h-14 bg-white border-b border-[#E6E3DC] px-4 flex items-center justify-between sticky top-0 z-40">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-xl text-[#1C1B18] hover:bg-[#F9F8F6] cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-extrabold text-sm text-[#1C1B18]">
            {currentProperty}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-[#8C887F] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              title="Keluar dari akun"
            >
              <LogOut className="w-4 h-4" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#6F4E37] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              AP
            </div>
          </div>
        </div>

        {/* Top Navbar */}
        <PemilikKostTopNav
          currentProperty={currentProperty}
          currentLocation={currentLocation}
          onPropertyChange={setCurrentProperty}
          onLogout={handleLogout}
        />

        {/* Main Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </DashboardProvider>
  );
}
