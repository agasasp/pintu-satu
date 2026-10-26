export interface CmsUserItem {
  id: string;
  initials: string;
  avatarBg?: string;
  name: string;
  email: string;
  role: string;
  roleColor?: string;
  divisionTitle?: string;
  divisionSubtitle?: string;
  status: "Aktif" | "Ditangguhkan" | "Nonaktif";
  category?: "admin" | "editor" | "semua";
  lastLogin?: string;
}

export interface CmsRoleItem {
  name: string;
  staffCount: number;
  description: string;
  dashboard: "Full" | "Read / Write" | "Read Only" | "Dilarang";
  rooms: "Akses Penuh" | "Verifikasi Unit" | "Read Only" | "Dilarang";
  promo: "Akses Penuh" | "Ajukan (Draft)" | "Read Only" | "Dilarang";
  finance: "Akses Penuh" | "Read Only" | "Dilarang";
  usersManage: "Akses Penuh" | "Dilarang";
}
