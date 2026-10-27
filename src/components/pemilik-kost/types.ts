export type DashboardTab =
  | "ringkasan"
  | "kamar"
  | "penghuni"
  | "tagihan"
  | "keuangan"
  | "pengaturan"
  | "tim"
  | "bantuan";

export interface UnitItem {
  id: string;
  roomNumber: string;
  floor: number;
  type: string;
  tenantName: string | null;
  phone: string | null;
  priceMonthly: number;
  electricMode: "Pascabayar (kWh)" | "Token PLN" | "All-in";
  lastKwh: number | null;
  dueDate: string | null;
  paymentStatus: "Lunas" | "Belum Lunas" | "Kosong";
}

export interface OwnerProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  kostName: string;
  roomCount: number;
}

export interface RoomItem {
  id: string;
  roomNumber: string;
  floor: number;
  type: "Standard" | "Deluxe" | "Executive";
  sizeM2: number;
  status: "terisi" | "kosong" | "perawatan";
  tenantName: string | null;
  tenantPhone: string | null;
  tenantAvatar: string | null;
  priceMonthly: number;
  maintenanceNote?: string;
  rentalPeriod?: string;
  paymentStatus?: "Lunas" | "Belum Lunas" | "Terlambat";
  facilities?: string[];
  imageUrl?: string;
}

export interface TenantItem {
  id: string;
  name: string;
  initials: string;
  phone: string;
  roomNumber: string;
  startDate: string;
  endDate: string;
  rentAmount: number;
  status: "aktif" | "segera_berakhir" | "selesai";
  verified: boolean;
  daysRemaining?: number;
  ktpNumber?: string;
  emergencyContact?: string;
}

export interface FinancialTransaction {
  id: string;
  date: string;
  title: string;
  category: "Sewa kamar" | "Perawatan & perbaikan" | "Listrik, air & internet" | "Gaji & operasional" | "Kebersihan & lainnya";
  type: "pemasukan" | "pengeluaran";
  amount: number;
  roomNumber?: string;
}

export interface ExpenseBreakdownItem {
  category: string;
  percentage: number;
  amount: number;
  color: string;
}

export interface MonthlyTrendItem {
  month: string;
  pemasukan: number; // in millions IDR
  pengeluaran: number; // in millions IDR
  isCurrent?: boolean;
}

export interface PriorityTask {
  id: string;
  type: "tagihan_terlambat" | "kontrak_berakhir" | "perawatan";
  title: string;
  description: string;
  actionText: string;
  actionTarget: DashboardTab;
  badgeColor?: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  meta: string;
  type: "pembayaran" | "checkin" | "perawatan";
}

export interface PropertyProfile {
  name: string;
  status: "Aktif" | "Nonaktif";
  type: "Kost campur" | "Kost putra" | "Kost putri";
  address: string;
  roomCount: number;
  floorCount: number;
  managedSince: number;
  phone: string;
  email: string;
  managerName: string;
  managerRole: string;
  managerInitials: string;
  facilities: string[];
  bankAccount: {
    bank: string;
    number: string;
    holder: string;
  };
  rules: {
    visitingHours: string;
    smoking: string;
    quietHours: string;
  };
  dueDateDefault: string;
  lateFee: string;
  autoWaReminder: boolean;
}

export interface InvoiceItem {
  id: string;
  room: string;
  tenant: string;
  phone: string;
  amount: string;
  amountNumber: number;
  dueDate: string;
  status: "lunas" | "menunggu" | "terlambat";
  statusLabel: string;
  paidAt?: string;
  paymentMethod?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  access: string;
  initials: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  category: string;
  date: string;
  size: string;
  type: string;
}

export interface PropertyItem {
  name: string;
  location: string;
  rooms: number;
}

