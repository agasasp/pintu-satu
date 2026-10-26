"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Check,
  Camera,
  MapPin,
  Clock,
  Copy,
  Ban,
  VolumeX,
  Wifi,
  Utensils,
  Shield,
  Bike,
  Shirt,
  Users,
  ArrowRight,
} from "lucide-react";
import { initialPropertyProfile } from "./mockData";
import { PropertyProfile, DashboardTab } from "./types";

interface ViewPropertiPengaturanProps {
  onNavigateTab: (tab: DashboardTab) => void;
  onSaveProfile: (profile: PropertyProfile) => void;
}

export function ViewPropertiPengaturan({
  onNavigateTab,
  onSaveProfile,
}: ViewPropertiPengaturanProps) {
  const [profile, setProfile] = useState<PropertyProfile>(initialPropertyProfile);
  const [activeSubTab, setActiveSubTab] = useState<
    "profil" | "tipe_kamar" | "tim" | "dokumen"
  >("profil");
  const [copiedBank, setCopiedBank] = useState(false);

  const handleCopyBankAccount = () => {
    navigator.clipboard.writeText(profile.bankAccount.number);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const toggleFacility = (facility: string) => {
    setProfile((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility],
    }));
  };

  const allFacilitiesList = [
    { name: "Wi-Fi 100 Mbps", icon: Wifi },
    { name: "Dapur bersama", icon: Utensils },
    { name: "CCTV 24 jam", icon: Shield },
    { name: "Parkir motor", icon: Bike },
    { name: "Area cuci & jemur", icon: Shirt },
    { name: "Ruang bersama", icon: Users },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1B18] tracking-tight">
            Properti &amp; pengaturan
          </h1>
          <p className="text-xs sm:text-sm text-[#5C5952] mt-1">
            Satu sumber informasi untuk profil kost, aturan, dan penerimaan pembayaran.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setProfile(initialPropertyProfile)}
            className="px-4 py-2 rounded-xl bg-white border border-[#E6E3DC] text-xs font-semibold text-[#1C1B18] hover:bg-[#F9F8F6] transition-colors cursor-pointer shadow-2xs"
          >
            Batalkan
          </button>

          <button
            onClick={() => onSaveProfile(profile)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6F4E37] hover:bg-[#563B28] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Check className="w-4 h-4" />
            <span>Simpan perubahan</span>
          </button>
        </div>
      </div>

      {/* 2. Top Property Overview Card */}
      <div className="bg-white rounded-2xl border border-[#E6E3DC] p-5 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left: Image & Info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 flex-1">
            {/* Photo with Change Button */}
            <div className="relative w-full sm:w-44 h-32 rounded-xl overflow-hidden bg-[#F9F8F6] border border-[#E6E3DC] shrink-0">
              <Image
                src="/images/kost-courtyard.jpg"
                alt="Kost Cemara"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 176px"
              />
              <button className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/65 hover:bg-black/80 text-white text-[10px] font-semibold backdrop-blur-xs transition-colors cursor-pointer">
                <Camera className="w-3 h-3" />
                <span>Ubah foto</span>
              </button>
            </div>

            {/* Info text */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-extrabold text-[#1C1B18]">
                  {profile.name}
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {profile.status}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#5C5952]">
                <MapPin className="w-3.5 h-3.5 text-[#6F4E37] shrink-0" />
                <span>{profile.address}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[#5C5952]">
                <span className="px-2.5 py-1 rounded-lg bg-[#F9F8F6] border border-[#E6E3DC] font-medium">
                  {profile.roomCount} kamar
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#F9F8F6] border border-[#E6E3DC] font-medium">
                  {profile.floorCount} lantai
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#F9F8F6] border border-[#E6E3DC] font-medium">
                  {profile.type}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#F9F8F6] border border-[#E6E3DC] font-medium">
                  Dikelola sejak {profile.managedSince}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Pengelola Properti Widget */}
          <div className="md:w-64 md:border-l md:border-[#E6E3DC] md:pl-6 space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C887F]">
              Pengelola Properti
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F4EFEA] border border-[#E6E3DC] text-[#6F4E37] flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                {profile.managerInitials}
              </div>
              <div>
                <div className="font-bold text-xs text-[#1C1B18]">
                  {profile.managerName}
                </div>
                <div className="text-[11px] text-[#8C887F]">
                  {profile.managerRole}
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab("tim")}
              className="text-[11px] font-semibold text-[#6F4E37] hover:text-[#563B28] flex items-center gap-1 pt-1 transition-colors cursor-pointer"
            >
              <span>Kelola akses tim</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Sub Tabs */}
      <div className="flex items-center gap-6 border-b border-[#E6E3DC] text-xs font-semibold text-[#8C887F]">
        <button
          onClick={() => setActiveSubTab("profil")}
          className={`pb-3 relative transition-colors cursor-pointer ${
            activeSubTab === "profil"
              ? "text-[#6F4E37] font-bold"
              : "hover:text-[#1C1B18]"
          }`}
        >
          <span>Profil &amp; operasional</span>
          {activeSubTab === "profil" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6F4E37] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveSubTab("tipe_kamar")}
          className={`pb-3 relative transition-colors cursor-pointer ${
            activeSubTab === "tipe_kamar"
              ? "text-[#6F4E37] font-bold"
              : "hover:text-[#1C1B18]"
          }`}
        >
          <span>Tipe &amp; harga kamar</span>
          {activeSubTab === "tipe_kamar" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6F4E37] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveSubTab("tim")}
          className={`pb-3 relative transition-colors cursor-pointer ${
            activeSubTab === "tim"
              ? "text-[#6F4E37] font-bold"
              : "hover:text-[#1C1B18]"
          }`}
        >
          <span>Tim pengelola</span>
          {activeSubTab === "tim" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6F4E37] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveSubTab("dokumen")}
          className={`pb-3 relative transition-colors cursor-pointer ${
            activeSubTab === "dokumen"
              ? "text-[#6F4E37] font-bold"
              : "hover:text-[#1C1B18]"
          }`}
        >
          <span>Dokumen properti</span>
          {activeSubTab === "dokumen" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6F4E37] rounded-full" />
          )}
        </button>
      </div>

      {/* 4. Two-Column Form Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Informasi Dasar & Fasilitas Bersama */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Informasi Dasar */}
          <div className="bg-white rounded-2xl border border-[#E6E3DC] p-5 shadow-2xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[#1C1B18]">Informasi dasar</h3>
              <p className="text-xs text-[#8C887F] mt-0.5">
                Informasi ini digunakan pada kontrak dan tagihan penghuni.
              </p>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* Row 1: Nama properti & Jenis kost */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1B18] mb-1">
                    Nama properti
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-[#1C1B18] focus:bg-white focus:outline-none focus:border-[#6F4E37] transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1B18] mb-1">
                    Jenis kost
                  </label>
                  <select
                    value={profile.type}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        type: e.target.value as PropertyProfile["type"],
                      })
                    }
                    className="w-full px-3.5 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-[#1C1B18] focus:bg-white focus:outline-none focus:border-[#6F4E37] transition-all font-medium cursor-pointer"
                  >
                    <option value="Kost campur">Kost campur</option>
                    <option value="Kost putra">Kost putra</option>
                    <option value="Kost putri">Kost putri</option>
                  </select>
                </div>
              </div>

              {/* Alamat lengkap */}
              <div>
                <label className="block text-xs font-semibold text-[#1C1B18] mb-1">
                  Alamat lengkap
                </label>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) =>
                    setProfile({ ...profile, address: e.target.value })
                  }
                  className="w-full px-3.5 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-[#1C1B18] focus:bg-white focus:outline-none focus:border-[#6F4E37] transition-all font-medium"
                />
              </div>

              {/* Row 3: WhatsApp pengelola & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1B18] mb-1">
                    Nomor WhatsApp pengelola
                  </label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-[#1C1B18] focus:bg-white focus:outline-none focus:border-[#6F4E37] transition-all font-mono font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1B18] mb-1">
                    Email properti
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-[#1C1B18] focus:bg-white focus:outline-none focus:border-[#6F4E37] transition-all font-medium"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Fasilitas Bersama */}
          <div className="bg-white rounded-2xl border border-[#E6E3DC] p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#1C1B18]">Fasilitas bersama</h3>
                <p className="text-xs text-[#8C887F] mt-0.5">
                  Fasilitas yang tersedia untuk semua penghuni.
                </p>
              </div>

              <button className="text-xs font-semibold text-[#6F4E37] hover:text-[#563B28] cursor-pointer">
                Edit fasilitas
              </button>
            </div>

            {/* Checkbox Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {allFacilitiesList.map((item) => {
                const Icon = item.icon;
                const isChecked = profile.facilities.includes(item.name);

                return (
                  <label
                    key={item.name}
                    onClick={() => toggleFacility(item.name)}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      isChecked
                        ? "bg-[#F4EFEA]/40 border-[#6F4E37]/30 text-[#1C1B18]"
                        : "bg-[#F9F8F6] border-[#E6E3DC] text-[#8C887F]"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                        isChecked
                          ? "bg-[#6F4E37] text-white"
                          : "border border-[#E6E3DC] bg-white"
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <Icon className="w-4 h-4 text-[#6F4E37]" />
                    <span className="text-xs font-semibold">{item.name}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Data Pembayaran & Aturan Kost */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: Data Pembayaran */}
          <div className="bg-white rounded-2xl border border-[#E6E3DC] p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#1C1B18]">Data pembayaran</h3>
                <p className="text-xs text-[#8C887F] mt-0.5">
                  Rekening tujuan pada tagihan penghuni.
                </p>
              </div>
              <button className="text-xs font-semibold text-[#6F4E37] hover:text-[#563B28] cursor-pointer">
                Edit
              </button>
            </div>

            {/* Bank Card Box */}
            <div className="p-4 rounded-xl bg-[#F9F8F6] border border-[#E6E3DC] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="px-2.5 py-1 rounded-lg bg-[#00529C] text-white font-black text-xs tracking-wider">
                  {profile.bankAccount.bank}
                </div>
                <div>
                  <div className="font-extrabold font-mono text-sm text-[#1C1B18]">
                    {profile.bankAccount.number}
                  </div>
                  <div className="text-[11px] text-[#8C887F]">
                    {profile.bankAccount.holder}
                  </div>
                </div>
              </div>

              <button
                onClick={handleCopyBankAccount}
                className="p-2 rounded-lg text-[#8C887F] hover:text-[#1C1B18] hover:bg-white transition-colors cursor-pointer"
                title="Salin nomor rekening"
              >
                {copiedBank ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Spec details */}
            <div className="space-y-3 text-xs pt-1">
              <div className="flex items-center justify-between text-[#5C5952]">
                <span>Jatuh tempo default</span>
                <span className="font-bold text-[#1C1B18]">
                  {profile.dueDateDefault}
                </span>
              </div>

              <div className="flex items-center justify-between text-[#5C5952]">
                <span>Denda keterlambatan</span>
                <span className="font-medium text-[#1C1B18]">
                  {profile.lateFee}
                </span>
              </div>

              <div className="flex items-center justify-between text-[#5C5952] pt-1 border-t border-[#E6E3DC]/60">
                <span>Pengingat WhatsApp otomatis</span>
                {/* Toggle Switch */}
                <button
                  onClick={() =>
                    setProfile({
                      ...profile,
                      autoWaReminder: !profile.autoWaReminder,
                    })
                  }
                  className={`w-10 h-6 rounded-full transition-colors p-0.5 cursor-pointer flex items-center ${
                    profile.autoWaReminder ? "bg-[#6F4E37]" : "bg-[#E6E3DC]"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                      profile.autoWaReminder ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="text-[10px] text-[#8C887F] pt-1">
                Tanggal jatuh tempo dapat disesuaikan per kontrak.
              </div>
            </div>
          </div>

          {/* Card 2: Aturan Kost */}
          <div className="bg-white rounded-2xl border border-[#E6E3DC] p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#1C1B18]">Aturan kost</h3>
                <p className="text-xs text-[#8C887F] mt-0.5">
                  Disertakan pada kontrak penghuni.
                </p>
              </div>
              <button className="text-xs font-semibold text-[#6F4E37] hover:text-[#563B28] cursor-pointer">
                Edit
              </button>
            </div>

            <div className="space-y-3.5 text-xs pt-1">
              {/* Item 1 */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#F4EFEA] flex items-center justify-center text-[#6F4E37] shrink-0 mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-[#1C1B18]">Jam bertamu</div>
                  <div className="text-[11px] text-[#5C5952] mt-0.5">
                    {profile.rules.visitingHours}
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#F4EFEA] flex items-center justify-center text-[#6F4E37] shrink-0 mt-0.5">
                  <Ban className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-[#1C1B18]">Bebas asap rokok</div>
                  <div className="text-[11px] text-[#5C5952] mt-0.5">
                    {profile.rules.smoking}
                  </div>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#F4EFEA] flex items-center justify-center text-[#6F4E37] shrink-0 mt-0.5">
                  <VolumeX className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-[#1C1B18]">Jam tenang</div>
                  <div className="text-[11px] text-[#5C5952] mt-0.5">
                    {profile.rules.quietHours}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Bottom Timestamp Note */}
      <div className="flex items-center gap-2 text-xs text-[#8C887F] pt-2">
        <Clock className="w-4 h-4 text-[#8C887F]" />
        <span>Terakhir diubah oleh Andi Pratama • 24 Oktober 2026, 16.30 WIB</span>
      </div>
    </div>
  );
}
