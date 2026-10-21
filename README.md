# Pintu Satu — Platform SaaS Manajemen Kost Modern

> Platform terintegrasi untuk pengelolaan operasional kost, pembukuan kas, pencatatan meteran listrik 3-mode, rekonsiliasi pembayaran sewa, dan pengingat tagihan otomatis via WhatsApp Resmi.

---

## 🏛️ Arsitektur & Struktur Proyek

Proyek ini dibagi secara rapi ke dalam **3 Domain Utama**:

```
pintu-satu/
├── src/
│   ├── app/                      # [ROUTING LAYER] Next.js App Router
│   │   ├── page.tsx              # 1. COMPRO: Landing page publik (/)
│   │   ├── login/
│   │   │   ├── page.tsx          # 2. PEMILIK KOST: Portal login juragan (/login)
│   │   │   └── admin-pintu/      # 3. CMS: Portal login superadmin (/login/admin-pintu)
│   │   │       └── page.tsx
│   │   ├── dashboard/            # 2. PEMILIK KOST: Dashboard operasional (/dashboard)
│   │   │   └── page.tsx
│   │   ├── admin/                # 3. CMS: Dashboard superadmin (/admin)
│   │   │   ├── page.tsx
│   │   │   └── users/            # 3. CMS: Manajemen user & peran (/admin/users)
│   │   │       └── page.tsx
│   │   ├── layout.tsx            # Root HTML layout & fonts (Plus Jakarta Sans)
│   │   └── globals.css           # Tailwind v4 configuration, theme tokens, & 3D keyframes
│   │
│   ├── components/               # [COMPONENT LAYER] Dikelompokkan per Domain
│   │   ├── compro/               # ── KOMPONEN COMPANY PROFILE (Landing Page)
│   │   │   ├── ComproNavbar.tsx          # Navigasi sticky, logo P1, & drawer mobile
│   │   │   ├── ComproHero.tsx            # Hero section, teks utama, & visual 3D floating
│   │   │   ├── ComproDashboardPreview.tsx# Mockup interaktif live preview dashboard
│   │   │   ├── ComproPillars.tsx         # 3 pilar solusi pemilik kost
│   │   │   ├── ComproFeatures.tsx        # Fitur andalan WhatsApp, kamar, kas kecil, listrik
│   │   │   ├── ComproSteps.tsx           # 3 langkah alur penggunaan
│   │   │   ├── ComproPricing.tsx         # Paket langganan (Rintisan, Juragan Pro, Korporat)
│   │   │   ├── ComproClosingBanner.tsx   # Banner ajakan uji coba 14 hari
│   │   │   ├── ComproFooter.tsx          # Footer brand & link
│   │   │   └── ComproTrialModal.tsx      # Modal form pendaftaran uji coba gratis
│   │   │
│   │   ├── pemilik-kost/         # ── KOMPONEN PEMILIK KOST (Portal Juragan)
│   │   │   ├── PemilikKostDashboardHeader.tsx # Header dashboard & selector properti
│   │   │   ├── PemilikKostKpiCards.tsx        # 4 ringkasan KPI (okupansi, omzet, kas kecil)
│   │   │   ├── PemilikKostUnitTable.tsx       # Tabel unit kamar, filter lantai & status
│   │   │   └── types.ts                       # Tipe data unit kamar & profil pemilik
│   │   │
│   │   ├── cms/                  # ── KOMPONEN CMS ADMIN (Superadmin Proptech)
│   │   │   ├── CmsSidebar.tsx            # Navigasi panel samping Superadmin
│   │   │   └── types.ts                  # Tipe data user CMS & matriks peran
│   │   │
│   │   └── shared/               # ── KOMPONEN BERSAMA
│   │       └── ToastNotification.tsx     # Komponen notifikasi toast pop-up
│   │
│   └── lib/                      # [UTILITIES & CONSTANTS LAYER]
│       ├── constants.ts          # Konfigurasi brand, token warna Figma, & daftar role
│       └── auth.ts               # Helper sesi autentikasi & token local storage
```

---

## 🧭 Panduan 3 Domain

### 1. Compro (Company Profile)
- **Tujuan**: Halaman muka publik untuk memperkenalkan produk Pintu Satu kepada calon pelanggan dan investor.
- **Rute URL**: `http://localhost:3000/`
- **File Halaman**: `src/app/page.tsx`
- **Komponen**: `src/components/compro/`
- **Fitur Utama**:
  - Palet warna resmi Figma (Primary: `#1C1B18`, Secondary: `#6F4E37`, Tertiary: `#C88A58`, Neutral: `#F9F8F6`).
  - Latar belakang putih bersih (`#FFFFFF`).
  - Visual lengkungan courtyard kost dengan efek **3D perspective tilt & card floating pop-out**.
  - Kalkulator harga bulanan/tahunan (diskon 20%).
  - Formulir pendaftaran instan uji coba 14 hari.

### 2. Portal Pemilik Kost (Juragan)
- **Tujuan**: Area kerja pemilik kost untuk memantau kamar, menagih sewa, dan memeriksa meteran listrik.
- **Rute Login**: `http://localhost:3000/login`
- **Rute Dashboard**: `http://localhost:3000/dashboard`
- **File Halaman**: `src/app/login/page.tsx` & `src/app/dashboard/page.tsx`
- **Komponen**: `src/components/pemilik-kost/`
- **Fitur Utama**:
  - Login via WhatsApp atau Email terdaftar.
  - Tombol **1-Klik "Isi Akun Demo"** untuk pengujian cepat.
  - Monitoring okupansi 32 pintu kamar dengan filter lantai dan status pembayaran.
  - Tombol aksi kirim tagihan sewa instan langsung ke nomor WhatsApp penyewa.

### 3. CMS Superadmin (Internal Management)
- **Tujuan**: Panel kendali tim operasional dan teknis Pintu Satu untuk mengelola staf internal, konten landing page, dan audit trail.
- **Rute Login**: `http://localhost:3000/login/admin-pintu`
- **Rute Dashboard**: `http://localhost:3000/admin`
- **Rute Manajemen Pengguna**: `http://localhost:3000/admin/users`
- **Komponen**: `src/components/cms/`
- **Fitur Utama**:
  - Matriks perizinan hak akses per divisi (Teknologi, Operasional, Keuangan).
  - Penjadwalan konten promosi musiman dan tips kost.

---

## ⚡ Cara Menjalankan Project

```bash
# 1. Install dependencies (jika belum)
npm install

# 2. Jalankan server development
npm run dev

# 3. Jalankan pengecekan linter & typecheck
npm run lint

# 4. Build produksi
npm run build
```

---

## 🔐 Kredensial Pengujian Cepat

| Portal | Identifier / Email | Kata Sandi |
|---|---|---|
| **Pemilik Kost** | `adit.griya@pintusatu.id` *(atau klik tombol Isi Akun Demo)* | `JuraganPintu123!` |
| **Superadmin CMS** | `chief.ops@pintusatu.id` | `Password123!` |
