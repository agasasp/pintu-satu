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
