"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ViewManajemenKamar } from "@/components/pemilik-kost/ViewManajemenKamar";
import { useDashboard } from "@/components/pemilik-kost/DashboardContext";
import { DashboardTab } from "@/components/pemilik-kost/types";

export default function KamarPage() {
  const router = useRouter();
  const { openAddRoom } = useDashboard();

  useEffect(() => {
    document.title = "Manajemen Kamar • Kost Cemara | Pintu Satu";
  }, []);

  const handleNavigate = (tab: DashboardTab) => {
    if (tab === "ringkasan") router.push("/dashboard");
    else router.push(`/dashboard/${tab}`);
  };

  return (
    <ViewManajemenKamar
      onNavigateTab={handleNavigate}
      onOpenAddRoom={openAddRoom}
    />
  );
}
