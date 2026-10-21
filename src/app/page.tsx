"use client";

import { useState } from "react";
import { ComproNavbar } from "@/components/compro/ComproNavbar";
import { ComproHero } from "@/components/compro/ComproHero";
import { ComproDashboardPreview } from "@/components/compro/ComproDashboardPreview";
import { ComproPillars } from "@/components/compro/ComproPillars";
import { ComproFeatures } from "@/components/compro/ComproFeatures";
import { ComproSteps } from "@/components/compro/ComproSteps";
import { ComproPricing } from "@/components/compro/ComproPricing";
import { ComproClosingBanner } from "@/components/compro/ComproClosingBanner";
import { ComproFooter } from "@/components/compro/ComproFooter";
import { ComproTrialModal } from "@/components/compro/ComproTrialModal";
import { ToastNotification } from "@/components/shared/ToastNotification";

/**
 * PINTU SATU - COMPANY PROFILE (COMPRO)
 * Landing page utama untuk calon pelanggan & pengunjung publik.
 */
export default function PintuSatuLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Paket Juragan Pro");

  // Toast state
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

  const handleOpenModal = (planName: string = "Uji Coba Gratis") => {
    setSelectedPlan(planName);
    setIsModalOpen(true);
  };

  const handleModalSubmitSuccess = (ownerName: string, kostName: string) => {
    setIsModalOpen(false);
    showToast(
      "Pendaftaran Diterima",
      `Terima kasih ${ownerName || "Bpk/Ibu"}, akses uji coba 14 hari untuk ${
        kostName || "properti Anda"
      } telah disiapkan ke WhatsApp.`
    );
  };

  return (
    <div className="bg-white text-[#1C1B18] font-sans antialiased min-h-screen selection:bg-[#6F4E37]/15 selection:text-[#1C1B18]">
      {/* 1. Header & Navigation */}
      <ComproNavbar onOpenTrialModal={handleOpenModal} />

      {/* 2. Hero Section with 3D Floating Visual */}
      <ComproHero onOpenTrialModal={handleOpenModal} />

      {/* 3. Interactive Live Dashboard Preview */}
      <ComproDashboardPreview onShowToast={showToast} />

      {/* 4. Solusi Untuk Pemilik Kost (3 Pillars) */}
      <ComproPillars />

      {/* 5. Fitur-fitur Andalan (Feature Showcase) */}
      <ComproFeatures />

      {/* 6. Alur Penggunaan (3 Steps) */}
      <ComproSteps onOpenTrialModal={handleOpenModal} />

      {/* 7. Paket Berlangganan (Pricing) */}
      <ComproPricing onOpenTrialModal={handleOpenModal} />

      {/* 8. Closing CTA Banner */}
      <ComproClosingBanner onOpenTrialModal={handleOpenModal} />

      {/* 9. Footer */}
      <ComproFooter />

      {/* 10. Trial Registration Modal */}
      <ComproTrialModal
        isOpen={isModalOpen}
        selectedPlan={selectedPlan}
        onClose={() => setIsModalOpen(false)}
        onSubmitSuccess={handleModalSubmitSuccess}
      />

      {/* Toast Notification */}
      <ToastNotification show={toast.show} title={toast.title} desc={toast.desc} />
    </div>
  );
}
