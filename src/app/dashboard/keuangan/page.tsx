"use client";

import { useEffect } from "react";
import { ViewLaporanKeuangan } from "@/components/pemilik-kost/ViewLaporanKeuangan";
import { useDashboard } from "@/components/pemilik-kost/DashboardContext";

export default function KeuanganPage() {
  const { openRecordExpense, showToast } = useDashboard();

  useEffect(() => {
    document.title = "Laporan Keuangan • Kost Cemara | Pintu Satu";
  }, []);

  const handleDownloadReport = () => {
    showToast(
      "Mengunduh Laporan Keuangan",
      "File PDF Laporan Arus Kas Kost Cemara Oktober 2026 sedang disiapkan."
    );
  };

  return (
    <ViewLaporanKeuangan
      onOpenRecordExpense={openRecordExpense}
      onDownloadReport={handleDownloadReport}
    />
  );
}
