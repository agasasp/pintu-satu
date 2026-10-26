"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ViewPropertiPengaturan } from "@/components/pemilik-kost/ViewPropertiPengaturan";
import { useDashboard } from "@/components/pemilik-kost/DashboardContext";
import { DashboardTab, PropertyProfile } from "@/components/pemilik-kost/types";

export default function PengaturanPage() {
  const router = useRouter();
  const { showToast } = useDashboard();

  useEffect(() => {
    document.title = "Properti & Pengaturan • Kost Cemara | Pintu Satu";
  }, []);

  const handleNavigate = (tab: DashboardTab) => {
    if (tab === "ringkasan") router.push("/dashboard");
    else router.push(`/dashboard/${tab}`);
  };

  const handleSaveProfile = (profile: PropertyProfile) => {
    showToast(
      "Pengaturan Disimpan",
      `Data profil & operasional ${profile.name} berhasil diperbarui.`
    );
  };

  return (
    <ViewPropertiPengaturan
      onNavigateTab={handleNavigate}
      onSaveProfile={handleSaveProfile}
    />
  );
}
