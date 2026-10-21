/**
 * PINTU SATU - GLOBAL CONSTANTS & BRAND CONFIGURATION
 */

export const BRAND_CONFIG = {
  name: "Pintu Satu",
  badge: "P1",
  tagline: "Sistem Manajemen Kost Simpel & Modern Indonesia",
  contact: {
    whatsapp: "0812-9988-7766",
    email: "halo@pintusatu.id",
  },
  colors: {
    primary: "#1C1B18",
    secondary: "#6F4E37",
    tertiary: "#C88A58",
    neutralBg: "#F9F8F6",
    neutralBorder: "#E6E3DC",
  },
};

export const USER_ROLES = {
  SUPERADMIN: "superadmin",
  ADMIN_OPS: "admin_ops",
  PEMILIK_KOST: "pemilik_kost",
  PENJAGA_KOST: "penjaga_kost",
} as const;

export const DOMAINS = {
  COMPRO: {
    name: "Company Profile",
    description: "Landing page publik untuk calon pelanggan dan pengunjung web",
    path: "/",
  },
  PEMILIK_KOST: {
    name: "Portal Pemilik Kost",
    description: "Portal operasional juragan kost untuk mengelola kamar, sewa, dan tagihan WA",
    loginPath: "/login",
    dashboardPath: "/dashboard",
  },
  CMS: {
    name: "CMS Proptech Superadmin",
    description: "Panel kendali admin internal untuk pengelolaan pengguna, konten, dan audit",
    loginPath: "/login/admin-pintu",
    dashboardPath: "/admin",
  },
};
