"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { clearAuthSession } from "@/lib/auth";
import { ToastNotification } from "@/components/shared/ToastNotification";
import { ModalCatatPembayaran } from "./ModalCatatPembayaran";
import { ModalCatatPengeluaran } from "./ModalCatatPengeluaran";
import { ModalTambahPenghuni } from "./ModalTambahPenghuni";
import { ModalTambahKamar } from "./ModalTambahKamar";
import { RoomItem, TenantItem, FinancialTransaction } from "./types";

interface DashboardContextType {
  openRecordPayment: () => void;
  openRecordExpense: () => void;
  openAddTenant: () => void;
  openAddRoom: () => void;
  showToast: (title: string, desc: string) => void;
  currentProperty: string;
  currentLocation: string;
  setCurrentProperty: (name: string, location: string) => void;
  logout: () => void;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [currentProperty, setProperty] = useState("Kost Cemara");
  const [currentLocation, setLocation] = useState("Sukajadi, Bandung");

  // Modals state
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [isRecordExpenseOpen, setIsRecordExpenseOpen] = useState(false);
  const [isAddTenantOpen, setIsAddTenantOpen] = useState(false);
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{
    show: boolean;
    title: string;
    desc: string;
  }>({
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

  const logout = () => {
    try {
      clearAuthSession();
      localStorage.removeItem("pintusatu_token");
      localStorage.removeItem("token");
      localStorage.removeItem("pintusatu_user");
      localStorage.removeItem("pintusatu_role");
      sessionStorage.clear();
      document.cookie = "pintusatu_token=; path=/; max-age=0;";
    } catch {
      // ignore
    }
    router.push("/login");
  };

  const setCurrentProperty = (name: string, location: string) => {
    setProperty(name);
    setLocation(location);
    showToast("Properti Beralih", `Sekarang mengelola ${name} (${location}).`);
  };

  const handlePaymentSubmit = (data: {
    roomNumber: string;
    tenantName: string;
    amount: number;
    paymentMethod: string;
  }) => {
    showToast(
      "Pembayaran Berhasil Dicatat",
      `Sewa ${data.roomNumber} (${data.tenantName}) sebesar Rp${data.amount.toLocaleString(
        "id-ID"
      )} via ${data.paymentMethod} telah lunas.`
    );
  };

  const handleExpenseSubmit = (tx: FinancialTransaction) => {
    showToast(
      "Pengeluaran Dicatat",
      `Biaya "${tx.title}" sebesar Rp${tx.amount.toLocaleString(
        "id-ID"
      )} berhasil dibukukan.`
    );
  };

  const handleAddTenantSubmit = (tenant: TenantItem) => {
    showToast(
      "Penghuni Berhasil Didaftarkan",
      `${tenant.name} telah didaftarkan untuk Kamar ${tenant.roomNumber}. Kontrak digital terkirim ke WhatsApp ${tenant.phone}.`
    );
  };

  const handleAddRoomSubmit = (room: RoomItem) => {
    showToast(
      "Kamar Baru Ditambahkan",
      `Unit ${room.roomNumber} (${room.type} • Lantai ${room.floor}) siap dipasarkan.`
    );
  };

  return (
    <DashboardContext.Provider
      value={{
        openRecordPayment: () => setIsRecordPaymentOpen(true),
        openRecordExpense: () => setIsRecordExpenseOpen(true),
        openAddTenant: () => setIsAddTenantOpen(true),
        openAddRoom: () => setIsAddRoomOpen(true),
        showToast,
        currentProperty,
        currentLocation,
        setCurrentProperty,
        logout,
      }}
    >
      {children}

      {/* Global Modals */}
      <ModalCatatPembayaran
        isOpen={isRecordPaymentOpen}
        onClose={() => setIsRecordPaymentOpen(false)}
        onSubmit={handlePaymentSubmit}
      />

      <ModalCatatPengeluaran
        isOpen={isRecordExpenseOpen}
        onClose={() => setIsRecordExpenseOpen(false)}
        onSubmit={handleExpenseSubmit}
      />

      <ModalTambahPenghuni
        isOpen={isAddTenantOpen}
        onClose={() => setIsAddTenantOpen(false)}
        onSubmit={handleAddTenantSubmit}
      />

      <ModalTambahKamar
        isOpen={isAddRoomOpen}
        onClose={() => setIsAddRoomOpen(false)}
        onSubmit={handleAddRoomSubmit}
      />

      {/* Global Toast */}
      <ToastNotification
        show={toast.show}
        title={toast.title}
        desc={toast.desc}
      />
    </DashboardContext.Provider>
  );
}
