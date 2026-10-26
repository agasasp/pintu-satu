"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ViewRingkasan } from "@/components/pemilik-kost/ViewRingkasan";
import { ViewManajemenKamar } from "@/components/pemilik-kost/ViewManajemenKamar";
import { ViewDataPenghuni } from "@/components/pemilik-kost/ViewDataPenghuni";
import { ViewLaporanKeuangan } from "@/components/pemilik-kost/ViewLaporanKeuangan";
import { ViewPropertiPengaturan } from "@/components/pemilik-kost/ViewPropertiPengaturan";
import { ViewTagihanPembayaran } from "@/components/pemilik-kost/ViewTagihanPembayaran";
import { useDashboard } from "@/components/pemilik-kost/DashboardContext";
import { DashboardTab, PropertyProfile } from "@/components/pemilik-kost/types";

function DashboardMainContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as DashboardTab | null;

  const {
    openRecordPayment,
    openRecordExpense,
    openAddRoom,
    openAddTenant,
    showToast,
  } = useDashboard();

  useEffect(() => {
    document.title = "Ringkasan • Kost Cemara | Pintu Satu";
  }, []);

  const handleNavigate = (tab: DashboardTab) => {
    if (tab === "ringkasan") router.push("/dashboard");
    else router.push(`/dashboard/${tab}`);
  };

  const handleSendReminder = (
    tenantName: string,
    room: string,
    amount: string
  ) => {
    showToast(
      "WhatsApp Invoice Terkirim",
      `Invoice sewa ${amount} untuk Kamar ${room} telah dikirim ke nomor WhatsApp ${tenantName}.`
    );
  };

  // If query parameter ?tab= is provided, render that view; otherwise default to Ringkasan
  if (tabParam === "kamar") {
    return (
      <ViewManajemenKamar
        onNavigateTab={handleNavigate}
        onOpenAddRoom={openAddRoom}
      />
    );
  }

  if (tabParam === "penghuni") {
    return (
      <ViewDataPenghuni
        onOpenAddTenant={openAddTenant}
        onOpenTenantDetail={(tenant) => {
          showToast(
            "Detail Kontrak Penghuni",
            `Membuka berkas lengkap ${tenant.name} (${tenant.roomNumber}).`
          );
        }}
        onExtendContract={(tenant) => {
          showToast(
            "Perpanjangan Kontrak",
            `Draft adendum perpanjangan sewa untuk ${tenant.name} telah dikirim ke WhatsApp.`
          );
        }}
      />
    );
  }

  if (tabParam === "tagihan") {
    return (
      <ViewTagihanPembayaran
        onOpenRecordPayment={openRecordPayment}
        onSendWhatsappInvoice={(name, room, _phone, amount) => {
          showToast(
            "WhatsApp Invoice Terkirim",
            `Tagihan sewa ${amount} untuk ${name} (Kamar ${room}) telah terkirim.`
          );
        }}
      />
    );
  }

  if (tabParam === "keuangan") {
    return (
      <ViewLaporanKeuangan
        onOpenRecordExpense={openRecordExpense}
        onDownloadReport={() => {
          showToast(
            "Mengunduh Laporan Keuangan",
            "File PDF Laporan Arus Kas Kost Cemara Oktober 2026 sedang disiapkan."
          );
        }}
      />
    );
  }

  if (tabParam === "pengaturan") {
    return (
      <ViewPropertiPengaturan
        onNavigateTab={handleNavigate}
        onSaveProfile={(profile: PropertyProfile) => {
          showToast(
            "Pengaturan Disimpan",
            `Data profil & operasional ${profile.name} berhasil diperbarui.`
          );
        }}
      />
    );
  }

  return (
    <ViewRingkasan
      onNavigateTab={handleNavigate}
      onOpenRecordPayment={openRecordPayment}
      onSendReminder={handleSendReminder}
    />
  );
}

export default function PemilikKostDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[400px] flex items-center justify-center text-xs font-semibold text-[#8C887F]">
          Memuat ringkasan...
        </div>
      }
    >
      <DashboardMainContent />
    </Suspense>
  );
}
