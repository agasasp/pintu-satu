"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { PemilikKostDashboardHeader } from "@/components/pemilik-kost/PemilikKostDashboardHeader";
import { PemilikKostKpiCards } from "@/components/pemilik-kost/PemilikKostKpiCards";
import { PemilikKostUnitTable } from "@/components/pemilik-kost/PemilikKostUnitTable";
import { ToastNotification } from "@/components/shared/ToastNotification";
import { UnitItem } from "@/components/pemilik-kost/types";

/**
 * PINTU SATU - DASHBOARD PEMILIK KOST
 * Portal operasional khusus Juragan / Pemilik Kost (/dashboard)
 */
export default function PemilikKostDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    document.title = "Dashboard Pemilik Kost | Pintu Satu";
  }, []);

  // Filter & Search states
  const [activeTab, setActiveTab] = useState<"semua" | "terisi" | "kosong" | "nunggak">("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFloor, setSelectedFloor] = useState<"all" | "1" | "2">("all");

  // Notification Toast
  const [toast, setToast] = useState<{ show: boolean; title: string; desc: string }>({
    show: false,
    title: "",
    desc: "",
  });

  const showToast = (title: string, desc: string) => {
    setToast({ show: true, title, desc });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3500);
  };

  // Seeded units for Griya BSD Signature
  const [units, setUnits] = useState<UnitItem[]>([
    {
      id: "A-01",
      roomNumber: "A-01",
      floor: 1,
      type: "Deluxe Balcony",
      tenantName: "Alya Putri",
      phone: "0812-3456-7890",
      priceMonthly: 2400000,
      electricMode: "Pascabayar (kWh)",
      lastKwh: 342,
      dueDate: "25 Okt 2026",
      paymentStatus: "Lunas",
    },
    {
      id: "A-02",
      roomNumber: "A-02",
      floor: 1,
      type: "Deluxe Balcony",
      tenantName: "Dimas Prasetyo",
      phone: "0813-8877-6655",
      priceMonthly: 2400000,
      electricMode: "Pascabayar (kWh)",
      lastKwh: 388,
      dueDate: "25 Okt 2026",
      paymentStatus: "Belum Lunas",
    },
    {
      id: "A-03",
      roomNumber: "A-03",
      floor: 1,
      type: "Standard Room",
      tenantName: "Fajar Nugraha",
      phone: "0819-1122-3344",
      priceMonthly: 1950000,
      electricMode: "Token PLN",
      lastKwh: null,
      dueDate: "28 Okt 2026",
      paymentStatus: "Lunas",
    },
    {
      id: "A-04",
      roomNumber: "A-04",
      floor: 1,
      type: "Standard Room",
      tenantName: null,
      phone: null,
      priceMonthly: 1950000,
      electricMode: "Pascabayar (kWh)",
      lastKwh: 120,
      dueDate: null,
      paymentStatus: "Kosong",
    },
    {
      id: "B-01",
      roomNumber: "B-01",
      floor: 2,
      type: "Executive Suite",
      tenantName: "Siti Rahmawati",
      phone: "0852-9988-1122",
      priceMonthly: 2800000,
      electricMode: "Pascabayar (kWh)",
      lastKwh: 512,
      dueDate: "25 Okt 2026",
      paymentStatus: "Belum Lunas",
    },
    {
      id: "B-02",
      roomNumber: "B-02",
      floor: 2,
      type: "Executive Suite",
      tenantName: "Rizky Ramadhan",
      phone: "0878-6655-4433",
      priceMonthly: 2800000,
      electricMode: "All-in",
      lastKwh: null,
      dueDate: "30 Okt 2026",
      paymentStatus: "Lunas",
    },
    {
      id: "B-03",
      roomNumber: "B-03",
      floor: 2,
      type: "Standard Room",
      tenantName: null,
      phone: null,
      priceMonthly: 1950000,
      electricMode: "Pascabayar (kWh)",
      lastKwh: 88,
      dueDate: null,
      paymentStatus: "Kosong",
    },
    {
      id: "B-04",
      roomNumber: "B-04",
      floor: 2,
      type: "Deluxe Balcony",
      tenantName: "Budi Santoso",
      phone: "0812-7788-9900",
      priceMonthly: 2400000,
      electricMode: "Pascabayar (kWh)",
      lastKwh: 430,
      dueDate: "25 Okt 2026",
      paymentStatus: "Lunas",
    },
  ]);

  const handleTogglePayment = (unitId: string) => {
    setUnits((prev) =>
      prev.map((u) => {
        if (u.id === unitId) {
          const nextStatus = u.paymentStatus === "Lunas" ? "Belum Lunas" : "Lunas";
          showToast(
            nextStatus === "Lunas" ? "Pembayaran Dikonfirmasi" : "Status Tagihan Diubah",
            `Kamar ${u.roomNumber} (${u.tenantName}) sekarang berstatus ${nextStatus}.`
          );
          return { ...u, paymentStatus: nextStatus };
        }
        return u;
      })
    );
  };

  const handleSendWhatsappReminder = (unit: UnitItem) => {
    if (!unit.tenantName) return;
    showToast(
      "WhatsApp Invoice Terkirim",
      `Pengingat tagihan sewa & meteran listrik telah dikirim ke nomor WhatsApp ${unit.tenantName} (${unit.phone}).`
    );
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("pintusatu_token");
      localStorage.removeItem("token");
      localStorage.removeItem("pintusatu_user");
      localStorage.removeItem("pintusatu_role");
      document.cookie = "pintusatu_token=; path=/; max-age=0;";
    } catch {
      // ignore
    }
    router.push("/login");
  };

  const occupiedCount = units.filter((u) => u.paymentStatus !== "Kosong").length;
  const unpaidCount = units.filter((u) => u.paymentStatus === "Belum Lunas").length;

  return (
    <div className="min-h-screen bg-white text-[#1C1B18] font-sans antialiased selection:bg-[#6F4E37]/15 selection:text-[#1C1B18]">
      {/* 1. Header with Property Selector & Logout */}
      <PemilikKostDashboardHeader
        ownerName="Adit Prasetya"
        kostName="Griya BSD Signature"
        roomTotal={32}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Greeting Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6E3DC]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1B18] tracking-tight">
              Dashboard Griya BSD Signature
            </h1>
            <p className="text-xs sm:text-sm text-[#5C5952] mt-1">
              Pantau seluruh unit kamar, verifikasi sewa, dan pengingat tagihan WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                showToast(
                  "Kirim WhatsApp Massal",
                  "Semua 4 penyewa yang belum lunas telah dikirimi pengingat WhatsApp otomatis."
                )
              }
              className="px-3.5 py-2 rounded-xl bg-[#6F4E37] hover:bg-[#563B28] text-white font-semibold text-xs transition-all shadow-xs flex items-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Send className="w-3.5 h-3.5 text-[#C88A58]" />
              <span>Tagih via WhatsApp</span>
            </button>
          </div>
        </div>

        {/* 2. Top KPI Summary Cards */}
        <PemilikKostKpiCards
          occupiedCount={occupiedCount}
          totalRooms={32}
          monthlyRevenue={38650000}
          pettyCashRemaining={780000}
          pendingInvoicesCount={unpaidCount}
        />

        {/* 3. Room Management Table with Filters */}
        <PemilikKostUnitTable
          units={units}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedFloor={selectedFloor}
          onFloorChange={setSelectedFloor}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onTogglePayment={handleTogglePayment}
          onSendWhatsapp={handleSendWhatsappReminder}
        />
      </main>

      {/* Toast Notification */}
      <ToastNotification show={toast.show} title={toast.title} desc={toast.desc} />
    </div>
  );
}
