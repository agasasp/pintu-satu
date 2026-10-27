"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { clearAuthSession } from "@/lib/auth";
import { ToastNotification } from "@/components/shared/ToastNotification";
import { ModalCatatPembayaran } from "./ModalCatatPembayaran";
import { ModalCatatPengeluaran } from "./ModalCatatPengeluaran";
import { ModalTambahPenghuni } from "./ModalTambahPenghuni";
import { ModalTambahKamar } from "./ModalTambahKamar";
import {
  RoomItem,
  TenantItem,
  FinancialTransaction,
  InvoiceItem,
  TeamMember,
  DocumentItem,
  PropertyItem,
  PropertyProfile,
} from "./types";
import {
  initialRooms,
  initialTenants,
  initialInvoices,
  initialTransactions,
  initialPropertyProfile,
  initialTeamMembers,
  initialDocuments,
  initialProperties,
} from "./mockData";

interface DashboardContextType {
  // Navigation & Property State
  currentProperty: string;
  currentLocation: string;
  setCurrentProperty: (name: string, location: string) => void;
  properties: PropertyItem[];
  addNewProperty: (name: string, location: string, rooms: number) => void;

  // Data States
  rooms: RoomItem[];
  tenants: TenantItem[];
  invoices: InvoiceItem[];
  transactions: FinancialTransaction[];
  propertyProfile: PropertyProfile;
  teamMembers: TeamMember[];
  documents: DocumentItem[];

  // Modals & Action Triggers
  openRecordPayment: (prefill?: {
    roomNumber?: string;
    tenantName?: string;
    amount?: number;
  }) => void;
  openRecordExpense: () => void;
  openAddTenant: (roomNumber?: string) => void;
  openAddRoom: () => void;

  // CRUD Operations
  addRoom: (room: RoomItem) => void;
  updateRoom: (id: string, updates: Partial<RoomItem>) => void;
  deleteRoom: (id: string) => void;
  addTenant: (tenant: TenantItem) => void;
  updateTenant: (id: string, updates: Partial<TenantItem>) => void;
  extendTenantContract: (id: string, months?: number) => void;
  deleteTenant: (id: string) => void;
  recordPayment: (data: {
    roomNumber: string;
    tenantName: string;
    amount: number;
    paymentMethod: string;
    period: string;
  }) => void;
  markInvoiceAsPaid: (invoiceId: string, paymentMethod?: string) => void;
  recordExpense: (tx: FinancialTransaction) => void;
  sendWhatsappReminder: (
    tenantName: string,
    room: string,
    phone: string,
    amount: string
  ) => void;
  sendBulkWhatsappReminder: () => void;
  updatePropertyProfile: (profile: PropertyProfile) => void;
  addTeamMember: (member: TeamMember) => void;
  deleteTeamMember: (id: string) => void;
  addDocument: (doc: DocumentItem) => void;
  deleteDocument: (id: string) => void;

  // Utilities
  showToast: (title: string, desc: string) => void;
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

  // Active Property State
  const [currentProperty, setProperty] = useState("Kost Cemara");
  const [currentLocation, setLocation] = useState("Sukajadi, Bandung");
  const [properties, setProperties] = useState<PropertyItem[]>(initialProperties);

  // Core Data Collections
  const [rooms, setRooms] = useState<RoomItem[]>(initialRooms);
  const [tenants, setTenants] = useState<TenantItem[]>(initialTenants);
  const [invoices, setInvoices] = useState<InvoiceItem[]>(initialInvoices);
  const [transactions, setTransactions] =
    useState<FinancialTransaction[]>(initialTransactions);
  const [propertyProfile, setPropertyProfile] =
    useState<PropertyProfile>(initialPropertyProfile);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);

  // Modals state & Prefill data
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [prefillPayment, setPrefillPayment] = useState<{
    roomNumber?: string;
    tenantName?: string;
    amount?: number;
  } | null>(null);

  const [isRecordExpenseOpen, setIsRecordExpenseOpen] = useState(false);
  const [isAddTenantOpen, setIsAddTenantOpen] = useState(false);
  const [prefillTenantRoom, setPrefillTenantRoom] = useState<string | null>(null);
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

  const setCurrentPropertyHandler = (name: string, location: string) => {
    setProperty(name);
    setLocation(location);
    showToast("Properti Beralih", `Sekarang mengelola ${name} (${location}).`);
  };

  const addNewProperty = (name: string, location: string, roomCount: number) => {
    const newProp: PropertyItem = { name, location, rooms: roomCount };
    setProperties((prev) => [...prev, newProp]);
    setProperty(name);
    setLocation(location);
    showToast(
      "Properti Baru Ditambahkan",
      `${name} (${location}) dengan ${roomCount} kamar berhasil ditambahkan ke akun Anda.`
    );
  };

  // ROOM OPERATIONS
  const addRoom = (room: RoomItem) => {
    setRooms((prev) => [room, ...prev]);
    showToast(
      "Kamar Baru Ditambahkan",
      `Unit ${room.roomNumber} (${room.type} • Lantai ${room.floor}) siap dipasarkan.`
    );
  };

  const updateRoom = (id: string, updates: Partial<RoomItem>) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
    showToast("Kamar Diperbarui", "Informasi kamar berhasil disimpan.");
  };

  const deleteRoom = (id: string) => {
    setRooms((prev) => prev.filter((r) => r.id !== id));
    showToast("Kamar Dihapus", `Unit kamar ${id} telah dihapus dari sistem.`);
  };

  // TENANT OPERATIONS
  const addTenant = (tenant: TenantItem) => {
    setTenants((prev) => [tenant, ...prev]);
    // update assigned room to occupied
    setRooms((prev) =>
      prev.map((r) =>
        r.roomNumber === tenant.roomNumber
          ? {
              ...r,
              status: "terisi" as const,
              tenantName: tenant.name,
              tenantPhone: tenant.phone,
              tenantAvatar: tenant.initials,
              rentalPeriod: `${tenant.startDate} – ${tenant.endDate}`,
              paymentStatus: "Lunas",
            }
          : r
      )
    );

    showToast(
      "Penghuni Berhasil Didaftarkan",
      `${tenant.name} telah didaftarkan untuk Kamar ${tenant.roomNumber}. Kontrak digital terkirim ke WhatsApp ${tenant.phone}.`
    );
  };

  const updateTenant = (id: string, updates: Partial<TenantItem>) => {
    setTenants((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
    showToast("Data Penghuni Diperbarui", "Data kontrak penghuni berhasil diperbarui.");
  };

  const extendTenantContract = (id: string, months = 12) => {
    const target = tenants.find((t) => t.id === id);
    if (!target) return;
    setTenants((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: "aktif" as const,
              endDate: months > 6 ? "31 Okt 2027" : "30 Apr 2027",
              daysRemaining: undefined,
            }
          : t
      )
    );
    showToast(
      "Kontrak Diperpanjang",
      `Masa sewa ${target.name} (${target.roomNumber}) berhasil diperpanjang ${months} bulan.`
    );
  };

  const deleteTenant = (id: string) => {
    setTenants((prev) => prev.filter((t) => t.id !== id));
    showToast("Penghuni Dihapus", "Data penghuni telah dinonaktifkan.");
  };

  // PAYMENT & EXPENSE OPERATIONS
  const recordPayment = (data: {
    roomNumber: string;
    tenantName: string;
    amount: number;
    paymentMethod: string;
    period: string;
  }) => {
    // 1. Mark corresponding invoice as lunas
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.room === data.roomNumber ||
        inv.tenant.toLowerCase() === data.tenantName.toLowerCase()
          ? {
              ...inv,
              status: "lunas" as const,
              statusLabel: "Lunas",
              paidAt: `26 Okt 2026, ${new Date().toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })} WIB via ${data.paymentMethod}`,
              paymentMethod: data.paymentMethod,
            }
          : inv
      )
    );

    // 2. Update room payment status
    setRooms((prev) =>
      prev.map((r) =>
        r.roomNumber === data.roomNumber
          ? { ...r, paymentStatus: "Lunas" as const }
          : r
      )
    );

    // 3. Add to financial transactions
    const newTx: FinancialTransaction = {
      id: `TRX-${Date.now().toString().slice(-4)}`,
      date: "26 Okt 2026",
      title: `Sewa kamar ${data.roomNumber} • ${data.tenantName}`,
      category: "Sewa kamar",
      type: "pemasukan",
      amount: data.amount,
      roomNumber: data.roomNumber,
    };
    setTransactions((prev) => [newTx, ...prev]);

    showToast(
      "Pembayaran Berhasil Dicatat",
      `Sewa ${data.roomNumber} (${data.tenantName}) sebesar Rp${data.amount.toLocaleString(
        "id-ID"
      )} via ${data.paymentMethod} telah lunas.`
    );
  };

  const markInvoiceAsPaid = (
    invoiceId: string,
    paymentMethod: string = "Transfer Bank BCA"
  ) => {
    const target = invoices.find((i) => i.id === invoiceId);
    if (!target) return;

    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId
          ? {
              ...inv,
              status: "lunas" as const,
              statusLabel: "Lunas",
              paidAt: `26 Okt 2026, ${new Date().toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })} WIB via ${paymentMethod}`,
              paymentMethod,
            }
          : inv
      )
    );

    setRooms((prev) =>
      prev.map((r) =>
        r.roomNumber === target.room
          ? { ...r, paymentStatus: "Lunas" as const }
          : r
      )
    );

    const newTx: FinancialTransaction = {
      id: `TRX-${Date.now().toString().slice(-4)}`,
      date: "26 Okt 2026",
      title: `Sewa kamar ${target.room} • ${target.tenant}`,
      category: "Sewa kamar",
      type: "pemasukan",
      amount: target.amountNumber || 1500000,
      roomNumber: target.room,
    };
    setTransactions((prev) => [newTx, ...prev]);

    showToast(
      "Tagihan Ditandai Lunas",
      `Tagihan ${target.room} (${target.tenant}) Rp${target.amount} berhasil dilunasi via ${paymentMethod}.`
    );
  };

  const recordExpense = (tx: FinancialTransaction) => {
    setTransactions((prev) => [tx, ...prev]);
    showToast(
      "Pengeluaran Dicatat",
      `Biaya "${tx.title}" sebesar Rp${tx.amount.toLocaleString(
        "id-ID"
      )} berhasil dibukukan.`
    );
  };

  // WHATSAPP REMINDER OPERATIONS
  const sendWhatsappReminder = (
    tenantName: string,
    room: string,
    phone: string,
    amount: string
  ) => {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const formattedPhone = cleanPhone.startsWith("0")
      ? "62" + cleanPhone.slice(1)
      : cleanPhone;
    const message = `Halo Kak ${tenantName},\n\nMengingatkan tagihan sewa Kamar ${room} sebesar ${amount} di Kost Cemara sudah mendekati/melewati tanggal jatuh tempo.\n\nPembayaran dapat ditransfer ke:\nRekening BCA 1234567890 a.n. Andi Pratama.\n\nMohon kirimkan bukti transfer jika sudah melakukan pembayaran ya. Terima kasih! 🙏`;
    const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
    showToast(
      "WhatsApp Invoice Terkirim",
      `Pesan penagihan sewa ${amount} dikirim ke nomor WhatsApp ${tenantName} (${phone}).`
    );
  };

  const sendBulkWhatsappReminder = () => {
    const pending = invoices.filter((i) => i.status !== "lunas");
    showToast(
      "WhatsApp Massal Terkirim",
      `Pesan pengingat tagihan otomatis telah dikirimkan ke WhatsApp ${pending.length} penghuni yang belum lunas.`
    );
  };

  // PROFILE, TEAM, DOCUMENT OPERATIONS
  const updatePropertyProfile = (prof: PropertyProfile) => {
    setPropertyProfile(prof);
    showToast(
      "Pengaturan Disimpan",
      `Data profil & operasional ${prof.name} berhasil diperbarui.`
    );
  };

  const addTeamMember = (member: TeamMember) => {
    setTeamMembers((prev) => [...prev, member]);
    showToast(
      "Anggota Tim Ditambahkan",
      `${member.name} berhasil diberikan akses sebagai ${member.role}.`
    );
  };

  const deleteTeamMember = (id: string) => {
    const target = teamMembers.find((m) => m.id === id);
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
    showToast(
      "Akses Dicabut",
      `Akses staf ${target?.name || "tersebut"} berhasil dinonaktifkan.`
    );
  };

  const addDocument = (doc: DocumentItem) => {
    setDocuments((prev) => [doc, ...prev]);
    showToast(
      "Dokumen Diunggah",
      `Dokumen "${doc.name}" berhasil diarsipkan.`
    );
  };

  const deleteDocument = (id: string) => {
    const target = documents.find((d) => d.id === id);
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    showToast(
      "Dokumen Dihapus",
      `File "${target?.name || "tersebut"}" berhasil dihapus dari arsip.`
    );
  };

  return (
    <DashboardContext.Provider
      value={{
        currentProperty,
        currentLocation,
        setCurrentProperty: setCurrentPropertyHandler,
        properties,
        addNewProperty,

        rooms,
        tenants,
        invoices,
        transactions,
        propertyProfile,
        teamMembers,
        documents,

        openRecordPayment: (prefill) => {
          setPrefillPayment(prefill || null);
          setIsRecordPaymentOpen(true);
        },
        openRecordExpense: () => setIsRecordExpenseOpen(true),
        openAddTenant: (roomNumber) => {
          setPrefillTenantRoom(roomNumber || null);
          setIsAddTenantOpen(true);
        },
        openAddRoom: () => setIsAddRoomOpen(true),

        addRoom,
        updateRoom,
        deleteRoom,
        addTenant,
        updateTenant,
        extendTenantContract,
        deleteTenant,
        recordPayment,
        markInvoiceAsPaid,
        recordExpense,
        sendWhatsappReminder,
        sendBulkWhatsappReminder,
        updatePropertyProfile,
        addTeamMember,
        deleteTeamMember,
        addDocument,
        deleteDocument,

        showToast,
        logout,
      }}
    >
      {children}

      {/* Global Modals */}
      <ModalCatatPembayaran
        isOpen={isRecordPaymentOpen}
        onClose={() => {
          setIsRecordPaymentOpen(false);
          setPrefillPayment(null);
        }}
        initialData={prefillPayment}
        onSubmit={recordPayment}
      />

      <ModalCatatPengeluaran
        isOpen={isRecordExpenseOpen}
        onClose={() => setIsRecordExpenseOpen(false)}
        onSubmit={recordExpense}
      />

      <ModalTambahPenghuni
        isOpen={isAddTenantOpen}
        onClose={() => {
          setIsAddTenantOpen(false);
          setPrefillTenantRoom(null);
        }}
        initialRoomNumber={prefillTenantRoom}
        onSubmit={addTenant}
      />

      <ModalTambahKamar
        isOpen={isAddRoomOpen}
        onClose={() => setIsAddRoomOpen(false)}
        onSubmit={addRoom}
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
