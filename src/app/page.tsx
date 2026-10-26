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
import { ComproPaidModal } from "@/components/compro/ComproPaidModal";
import { ToastNotification } from "@/components/shared/ToastNotification";
import type { PackageItem } from "@/components/compro/ComproPricing";

/**
 * PINTU SATU - COMPANY PROFILE (COMPRO)
 * Landing page utama untuk calon pelanggan & pengunjung publik.
 */
export default function PintuSatuLanding() {
  // Modal Trial State
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [selectedTrialPlan, setSelectedTrialPlan] = useState("Paket Trial Rintisan");
  const [selectedTrialPackageId, setSelectedTrialPackageId] = useState<number | undefined>(undefined);

  // Modal Paid State
  const [isPaidModalOpen, setIsPaidModalOpen] = useState(false);
  const [selectedPaidPlan, setSelectedPaidPlan] = useState<PackageItem | null>(null);

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

  // Handler buka modal trial (dari navbar, hero, cta banner, dll)
  const handleOpenTrialModal = (planName: string = "Paket Trial Rintisan", packageId?: number) => {
    setSelectedTrialPlan(planName);
    setSelectedTrialPackageId(packageId);
    setIsTrialModalOpen(true);
  };

  // Handler seleksi paket dari kartu pricing
  const handleSelectPackage = (pkg: PackageItem) => {
    if (pkg.billing_cycle === "trial" || pkg.price === 0) {
      handleOpenTrialModal(pkg.name, pkg.id);
    } else {
      setSelectedPaidPlan(pkg);
      setIsPaidModalOpen(true);
    }
  };

  const handleModalSubmitSuccess = (ownerName: string, kostName: string) => {
    setIsTrialModalOpen(false);
    showToast(
      "Pendaftaran Diterima",
      `Terima kasih ${ownerName || "Bpk/Ibu"}, akun trial untuk ${
        kostName || "properti Anda"
      } telah disiapkan.`
    );
  };

  return (
    <div className="bg-white text-[#1C1B18] font-sans antialiased min-h-screen selection:bg-[#6F4E37]/15 selection:text-[#1C1B18]">
      {/* 1. Header & Navigation */}
      <ComproNavbar onOpenTrialModal={handleOpenTrialModal} />

      {/* 2. Hero Section with 3D Floating Visual */}
      <ComproHero onOpenTrialModal={handleOpenTrialModal} />

      {/* 3. Interactive Live Dashboard Preview */}
      <ComproDashboardPreview onShowToast={showToast} />

      {/* 4. Solusi Untuk Pemilik Kost (3 Pillars) */}
      <ComproPillars />

      {/* 5. Fitur-fitur Andalan (Feature Showcase) */}
      <ComproFeatures />

      {/* 6. Alur Penggunaan (3 Steps) */}
      <ComproSteps onOpenTrialModal={handleOpenTrialModal} />

      {/* 7. Paket Berlangganan (Pricing) */}
      <ComproPricing
        onOpenTrialModal={handleOpenTrialModal}
        onSelectPackage={handleSelectPackage}
      />

      {/* 8. Closing CTA Banner */}
      <ComproClosingBanner onOpenTrialModal={handleOpenTrialModal} />

      {/* 9. Footer */}
      <ComproFooter />

      {/* 10. Trial Registration Modal */}
      <ComproTrialModal
        isOpen={isTrialModalOpen}
        selectedPlan={selectedTrialPlan}
        packageId={selectedTrialPackageId}
        onClose={() => setIsTrialModalOpen(false)}
        onSubmitSuccess={handleModalSubmitSuccess}
      />

      {/* 11. Paid Registration Modal (Midtrans Snap) */}
      <ComproPaidModal
        isOpen={isPaidModalOpen}
        selectedPlan={selectedPaidPlan?.name || "Paket Berbayar"}
        packageId={selectedPaidPlan?.id}
        planPrice={selectedPaidPlan?.price}
        billingCycle={selectedPaidPlan?.billing_cycle}
        onClose={() => setIsPaidModalOpen(false)}
      />

      {/* Toast Notification */}
      <ToastNotification show={toast.show} title={toast.title} desc={toast.desc} />
    </div>
  );
}
