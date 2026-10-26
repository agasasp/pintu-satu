"use client";

import { useEffect } from "react";
import { ViewDataPenghuni } from "@/components/pemilik-kost/ViewDataPenghuni";
import { useDashboard } from "@/components/pemilik-kost/DashboardContext";

export default function PenghuniPage() {
  const { openAddTenant, showToast } = useDashboard();

  useEffect(() => {
    document.title = "Data Penghuni • Kost Cemara | Pintu Satu";
  }, []);

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
