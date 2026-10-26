"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { PemilikKostSidebar } from "@/components/pemilik-kost/PemilikKostSidebar";
import { PemilikKostTopNav } from "@/components/pemilik-kost/PemilikKostTopNav";
import {
  DashboardProvider,
  useDashboard,
} from "@/components/pemilik-kost/DashboardContext";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { currentProperty, currentLocation, setCurrentProperty } = useDashboard();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    try {
      localStorage.removeItem("pintusatu_token");
      localStorage.removeItem("token");
      localStorage.removeItem("pintusatu_user");
      document.cookie = "pintusatu_token=; path=/; max-age=0;";
    } catch {
      // ignore
    }
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1C1B18] font-sans antialiased flex selection:bg-[#6F4E37]/15 selection:text-[#1C1B18]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0">
        <PemilikKostSidebar
          pendingInvoicesCount={3}
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
              pendingInvoicesCount={3}
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
          <div className="w-8 h-8 rounded-full bg-[#6F4E37] text-white flex items-center justify-center font-bold text-xs">
            AP
          </div>
        </div>

        {/* Top Navbar */}
        <PemilikKostTopNav
          currentProperty={currentProperty}
          currentLocation={currentLocation}
          onPropertyChange={setCurrentProperty}
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
