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
  Plus,
  X,
  FileText,
  Download,
  Upload,
  Edit2,
  Trash2,
  Phone,
  DoorClosed,
  KeyRound,
  FileCheck,
} from "lucide-react";
import { initialPropertyProfile } from "./mockData";
import { PropertyProfile, DashboardTab } from "./types";
import { useDashboard } from "./DashboardContext";

interface ViewPropertiPengaturanProps {
  onNavigateTab: (tab: DashboardTab) => void;
  onSaveProfile: (profile: PropertyProfile) => void;
}

interface RoomTypeItem {
  id: string;
  name: string;
  count: number;
  occupied: number;
  price: number | string;
  size: string;
  facilities: string[];
}

export function ViewPropertiPengaturan({
  onNavigateTab,
  onSaveProfile,
}: ViewPropertiPengaturanProps) {
  const {
    propertyProfile,
    updatePropertyProfile,
    teamMembers,
    addTeamMember,
    deleteTeamMember,
    documents,
    addDocument,
    deleteDocument,
    showToast,
  } = useDashboard();

  const profile = propertyProfile;
  const setProfile = (updater: any) => {
    if (typeof updater === "function") {
      updatePropertyProfile(updater(propertyProfile));
    } else {
      updatePropertyProfile(updater);
    }
  };

  const [activeSubTab, setActiveSubTab] = useState<
    "profil" | "tipe_kamar" | "tim" | "dokumen"
  >("profil");
  const [copiedBank, setCopiedBank] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("/images/kost-courtyard.jpg");

  // Modals state
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isAddFacilityModalOpen, setIsAddFacilityModalOpen] = useState(false);
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
  const [isUploadDocModalOpen, setIsUploadDocModalOpen] = useState(false);
  const [isEditRoomTypeModalOpen, setIsEditRoomTypeModalOpen] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState<RoomTypeItem | null>(null);

  // Temporary form states for Modals
  const [bankForm, setBankForm] = useState(profile.bankAccount);
  const [rulesForm, setRulesForm] = useState(profile.rules);
  const [newFacilityName, setNewFacilityName] = useState("");
  const [newTeamMember, setNewTeamMember] = useState({
    name: "",
    role: "Pengelola Properti (Admin Operasional)",
    phone: "",
    email: "",
    access: "Penuh (Kamar, Penghuni, Tagihan, Kas Lapangan)",
  });
  const [newDoc, setNewDoc] = useState({
    name: "",
    category: "Legalitas Tanah & Properti",
  });

  // Room types state
  const [roomTypes, setRoomTypes] = useState([
    {
      id: "RT-1",
      name: "Tipe Standard",
      count: 18,
      occupied: 14,
      price: 1750000,
      size: "3 x 4 m",
      facilities: ["Kasur single", "Lemari pakaian", "Meja belajar", "Kamar mandi luar", "Wi-Fi 100 Mbps"],
    },
    {
      id: "RT-2",
      name: "Tipe Deluxe",
      count: 14,
      occupied: 12,
      price: 2350000,
      size: "4 x 5 m",
      facilities: ["Kasur queen", "Lemari 2 pintu", "Meja kerja", "Kamar mandi dalam", "Water heater", "AC 1 PK", "Wi-Fi 100 Mbps"],
    },
  ]);

  const handleCopyBankAccount = () => {
    navigator.clipboard.writeText(profile.bankAccount.number);
    setCopiedBank(true);
    showToast("Nomor Rekening Disalin", `${profile.bankAccount.bank} ${profile.bankAccount.number}`);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const toggleFacility = (facility: string) => {
    setProfile((prev: PropertyProfile) => ({
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

  const handleSaveBankDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile((prev: PropertyProfile) => ({
      ...prev,
      bankAccount: bankForm,
    }));
    setIsBankModalOpen(false);
    showToast("Data Pembayaran Diperbarui", `Rekening ${bankForm.bank} ${bankForm.number} a.n. ${bankForm.holder} berhasil disimpan.`);
  };

  const handleSaveRules = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile((prev: PropertyProfile) => ({
      ...prev,
      rules: rulesForm,
    }));
    setIsRulesModalOpen(false);
    showToast("Aturan Kost Diperbarui", "Aturan jam bertamu, jam tenang, dan rokok berhasil diperbarui.");
  };

  const handleAddCustomFacility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFacilityName.trim()) return;
    if (!profile.facilities.includes(newFacilityName.trim())) {
      setProfile((prev: PropertyProfile) => ({
        ...prev,
        facilities: [...prev.facilities, newFacilityName.trim()],
      }));
    }
    showToast("Fasilitas Ditambahkan", `Fasilitas "${newFacilityName.trim()}" kini aktif untuk Kost Cemara.`);
    setNewFacilityName("");
    setIsAddFacilityModalOpen(false);
  };

  const handleAddTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamMember.name.trim()) return;
    const initials = newTeamMember.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const created = {
      id: `TM-${Date.now().toString().slice(-4)}`,
      name: newTeamMember.name.trim(),
      role: newTeamMember.role,
      phone: newTeamMember.phone || "0812-0000-0000",
      email: newTeamMember.email || "staf@kostcemara.id",
      access: newTeamMember.access,
      initials,
    };

    addTeamMember(created);
    setIsAddTeamModalOpen(false);
    setNewTeamMember({
      name: "",
      role: "Pengelola Properti (Admin Operasional)",
      phone: "",
      email: "",
      access: "Penuh (Kamar, Penghuni, Tagihan, Kas Lapangan)",
    });
  };

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoc.name.trim()) return;

    const created = {
      id: `DOC-${Date.now().toString().slice(-4)}`,
      name: newDoc.name.trim(),
      category: newDoc.category,
      date: "26 Okt 2026",
      size: "1.2 MB",
      type: "PDF",
    };

    addDocument(created);
    setIsUploadDocModalOpen(false);
    setNewDoc({
      name: "",
      category: "Legalitas Tanah & Properti",
    });
  };

  const handleDownloadDoc = (docName: string) => {
    showToast("Mengunduh Dokumen", `File PDF "${docName}" sedang diunduh.`);
  };

  const handleSaveRoomTypePrice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoomType) return;
    setRoomTypes((prev) =>
      prev.map((rt) =>
        rt.id === selectedRoomType.id
          ? { ...rt, price: Number(selectedRoomType.price), size: selectedRoomType.size }
          : rt
      )
    );
    setIsEditRoomTypeModalOpen(false);
    showToast("Tarif Tipe Kamar Diperbarui", `Tarif untuk ${selectedRoomType.name} berhasil diubah menjadi Rp${Number(selectedRoomType.price).toLocaleString("id-ID")}/bln.`);
  };

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
            onClick={() => {
              setProfile(initialPropertyProfile);
              showToast("Perubahan Dibatalkan", "Data profil telah dikembalikan ke pengaturan awal.");
            }}
            className="px-4 py-2 rounded-xl bg-white border border-[#E6E3DC] text-xs font-semibold text-[#1C1B18] hover:bg-[#F9F8F6] transition-colors cursor-pointer shadow-2xs active:scale-[0.98]"
          >
            Batalkan
          </button>

          <button
            onClick={() => {
              onSaveProfile(profile);
              showToast("Pengaturan Disimpan", `Data profil & operasional ${profile.name} berhasil diperbarui.`);
            }}
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
            <div className="relative w-full sm:w-44 h-32 rounded-xl overflow-hidden bg-[#F9F8F6] border border-[#E6E3DC] shrink-0 group">
              <Image
                src={profilePhoto}
                alt={profile.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 176px"
              />
              <button
                onClick={() => setIsPhotoModalOpen(true)}
                className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/75 hover:bg-black/90 text-white text-[10px] font-semibold backdrop-blur-xs transition-colors cursor-pointer"
              >
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
              onClick={() => setActiveSubTab("tim")}
              className="text-[11px] font-semibold text-[#6F4E37] hover:text-[#563B28] flex items-center gap-1 pt-1 transition-colors cursor-pointer"
            >
              <span>Kelola akses tim ({teamMembers.length} staf)</span>
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
          <span>Tim pengelola ({teamMembers.length})</span>
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
          <span>Dokumen properti ({documents.length})</span>
          {activeSubTab === "dokumen" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6F4E37] rounded-full" />
          )}
        </button>
      </div>

      {/* 4. Tab 1: Profil & Operasional Layout */}
      {activeSubTab === "profil" && (
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

                <button
                  onClick={() => setIsAddFacilityModalOpen(true)}
                  className="text-xs font-semibold text-[#6F4E37] hover:text-[#563B28] cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah fasilitas</span>
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

                {/* Additional custom facilities if any */}
                {profile.facilities
                  .filter((f) => !allFacilitiesList.some((af) => af.name === f))
                  .map((customFac) => (
                    <label
                      key={customFac}
                      onClick={() => toggleFacility(customFac)}
                      className="flex items-center gap-3 p-3 rounded-xl border bg-[#F4EFEA]/40 border-[#6F4E37]/30 text-[#1C1B18] cursor-pointer"
                    >
                      <div className="w-5 h-5 rounded-md flex items-center justify-center bg-[#6F4E37] text-white">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <Shield className="w-4 h-4 text-[#6F4E37]" />
                      <span className="text-xs font-semibold">{customFac}</span>
                    </label>
                  ))}
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
                <button
                  onClick={() => {
                    setBankForm(profile.bankAccount);
                    setIsBankModalOpen(true);
                  }}
                  className="text-xs font-semibold text-[#6F4E37] hover:text-[#563B28] cursor-pointer flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
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
                    onClick={() => {
                      const nextState = !profile.autoWaReminder;
                      setProfile({
                        ...profile,
                        autoWaReminder: nextState,
                      });
                      showToast(
                        "Pengingat Otomatis",
                        nextState ? "Pengingat WA otomatis H-3 aktif" : "Pengingat WA otomatis dinonaktifkan"
                      );
                    }}
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
                  Tanggal jatuh tempo dapat disesuaikan per kontrak penghuni.
                </div>
              </div>
            </div>

            {/* Card 2: Aturan Kost */}
            <div className="bg-white rounded-2xl border border-[#E6E3DC] p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#1C1B18]">Aturan kost</h3>
                  <p className="text-xs text-[#8C887F] mt-0.5">
                    Disertakan pada kontrak dan panduan penghuni.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setRulesForm(profile.rules);
                    setIsRulesModalOpen(true);
                  }}
                  className="text-xs font-semibold text-[#6F4E37] hover:text-[#563B28] cursor-pointer flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
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
      )}

      {/* 5. Tab 2: Tipe & Harga Kamar */}
      {activeSubTab === "tipe_kamar" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#1C1B18]">
                Tipe &amp; Tarif Kamar Kost Cemara
              </h2>
              <p className="text-xs text-[#8C887F] mt-0.5">
                Konfigurasi tipe kamar, fasilitas bawaan, dan harga sewa bulanan.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedRoomType({
                  id: `RT-${Date.now().toString().slice(-4)}`,
                  name: "Tipe Baru",
                  count: 4,
                  occupied: 0,
                  price: 1800000,
                  size: "3.5 x 4 m",
                  facilities: ["Kasur springbed", "Meja belajar", "Lemari", "Wi-Fi"],
                });
                setIsEditRoomTypeModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#6F4E37] hover:bg-[#563B28] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah tipe kamar</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {roomTypes.map((rt) => {
              const occupancyPct = Math.round((rt.occupied / rt.count) * 100);

              return (
                <div
                  key={rt.id}
                  className="bg-white rounded-2xl border border-[#E6E3DC] p-5 shadow-2xs space-y-4 hover:border-[#6F4E37]/30 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <DoorClosed className="w-4 h-4 text-[#6F4E37]" />
                        <h3 className="font-extrabold text-sm text-[#1C1B18]">
                          {rt.name}
                        </h3>
                      </div>
                      <div className="text-xs text-[#8C887F] mt-0.5">
                        Ukuran {rt.size} • {rt.count} Unit Total
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-extrabold font-mono text-[#1C1B18]">
                        Rp{rt.price.toLocaleString("id-ID")}
                      </div>
                      <div className="text-[10px] text-[#8C887F]">per bulan</div>
                    </div>
                  </div>

                  {/* Occupancy bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#5C5952]">Tingkat Hunian</span>
                      <span className="font-bold text-[#1C1B18]">
                        {rt.occupied} / {rt.count} terisi ({occupancyPct}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#E6E3DC] overflow-hidden">
                      <div
                        className="h-full bg-[#6F4E37] rounded-full transition-all duration-500"
                        style={{ width: `${occupancyPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Facilities tag list */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-semibold text-[#8C887F]">
                      Fasilitas Kamar:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {rt.facilities.map((fac: string) => (
                        <span
                          key={fac}
                          className="px-2.5 py-1 rounded-lg bg-[#F9F8F6] border border-[#E6E3DC] text-[11px] text-[#5C5952]"
                        >
                          {fac}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#E6E3DC] flex items-center justify-between">
                    <button
                      onClick={() => onNavigateTab("kamar")}
                      className="text-xs font-semibold text-[#6F4E37] hover:text-[#563B28] flex items-center gap-1 cursor-pointer"
                    >
                      <span>Lihat daftar kamar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedRoomType(rt);
                        setIsEditRoomTypeModalOpen(true);
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#E6E3DC] text-xs font-semibold text-[#1C1B18] hover:bg-[#F9F8F6] transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3 text-[#6F4E37]" />
                      <span>Ubah tarif &amp; ukuran</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. Tab 3: Tim Pengelola */}
      {activeSubTab === "tim" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#1C1B18]">
                Staf &amp; Hak Akses Operasional Kost
              </h2>
              <p className="text-xs text-[#8C887F] mt-0.5">
                Kelola hak akses pengelola lapangan, teknisi, dan admin kas.
              </p>
            </div>
            <button
              onClick={() => setIsAddTeamModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#6F4E37] hover:bg-[#563B28] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah anggota staf</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-[#E6E3DC] shadow-2xs overflow-hidden">
            <div className="divide-y divide-[#E6E3DC]">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F9F8F6]/50 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-[#F4EFEA] border border-[#E6E3DC] text-[#6F4E37] flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                      {member.initials}
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-[#1C1B18]">
                        {member.name}
                      </div>
                      <div className="text-xs text-[#6F4E37] font-semibold">
                        {member.role}
                      </div>
                      <div className="text-[11px] text-[#8C887F] font-mono mt-0.5">
                        {member.phone} • {member.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F9F8F6] border border-[#E6E3DC] text-[11px] font-medium text-[#5C5952]">
                      <KeyRound className="w-3 h-3 text-[#6F4E37]" />
                      <span>{member.access}</span>
                    </span>

                    <button
                      onClick={() => {
                        window.open(`https://wa.me/${member.phone.replace(/[^0-9]/g, "")}`, "_blank");
                        showToast("Hubungi Staf", `Membuka WhatsApp untuk ${member.name}`);
                      }}
                      className="p-2 rounded-xl border border-[#E6E3DC] text-[#5C5952] hover:text-[#1C1B18] hover:bg-white transition-colors cursor-pointer"
                      title="Hubungi WhatsApp"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        deleteTeamMember(member.id);
                      }}
                      className="p-2 rounded-xl border border-[#E6E3DC] text-[#8C887F] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Cabut akses"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 7. Tab 4: Dokumen Properti */}
      {activeSubTab === "dokumen" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#1C1B18]">
                Dokumen &amp; Legalitas Properti
              </h2>
              <p className="text-xs text-[#8C887F] mt-0.5">
                Penyimpanan aman surat tanah, izin bangunan, asuransi, dan draft kontrak.
              </p>
            </div>
            <button
              onClick={() => setIsUploadDocModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#6F4E37] hover:bg-[#563B28] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Unggah dokumen</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-[#E6E3DC] p-4.5 shadow-2xs flex items-center justify-between gap-4 hover:border-[#6F4E37]/30 transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#F4EFEA] text-[#6F4E37] flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-[#1C1B18]">
                      {doc.name}
                    </div>
                    <div className="text-[11px] text-[#6F4E37] font-semibold">
                      {doc.category}
                    </div>
                    <div className="text-[10px] text-[#8C887F] mt-0.5">
                      Diperbarui {doc.date} • {doc.size} • {doc.type}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownloadDoc(doc.name)}
                    className="p-2 rounded-xl border border-[#E6E3DC] text-[#5C5952] hover:text-[#1C1B18] hover:bg-[#F9F8F6] transition-colors cursor-pointer"
                    title="Unduh file"
                  >
                    <Download className="w-4 h-4 text-[#6F4E37]" />
                  </button>

                  <button
                    onClick={() => {
                      deleteDocument(doc.id);
                    }}
                    className="p-2 rounded-xl border border-[#E6E3DC] text-[#8C887F] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Hapus dokumen"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. Bottom Timestamp Note */}
      <div className="flex items-center gap-2 text-xs text-[#8C887F] pt-2">
        <Clock className="w-4 h-4 text-[#8C887F]" />
        <span>Terakhir disinkronkan oleh Andi Pratama • 26 Oktober 2026, 15.30 WIB</span>
      </div>

      {/* MODAL 1: Ubah Foto Properti */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-[#E6E3DC] shadow-xl max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E3DC]">
              <h3 className="font-extrabold text-sm text-[#1C1B18]">Pilih Foto Properti</h3>
              <button
                onClick={() => setIsPhotoModalOpen(false)}
                className="p-1 rounded-lg text-[#8C887F] hover:text-[#1C1B18] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#5C5952]">
              Pilih foto galeri representasi bangunan Kost Cemara untuk ditampilkan di aplikasi &amp; kuitansi.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Halaman Courtyard", path: "/images/kost-courtyard.jpg" },
                { name: "Kamar Smart Kost", path: "/images/smart-kost-room.jpg" },
                { name: "Gedung Depan", path: "/images/hero-dashboard.jpg" },
                { name: "Lobby Kost", path: "/images/juragan-kost.jpg" },
              ].map((img) => (
                <div
                  key={img.path}
                  onClick={() => {
                    setProfilePhoto(img.path);
                    setIsPhotoModalOpen(false);
                    showToast("Foto Diperbarui", `Foto utama properti diubah ke "${img.name}".`);
                  }}
                  className={`group relative h-24 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                    profilePhoto === img.path
                      ? "border-[#6F4E37] ring-2 ring-[#6F4E37]/20"
                      : "border-[#E6E3DC] hover:border-[#6F4E37]/50"
                  }`}
                >
                  <Image src={img.path} alt={img.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1 text-[10px] text-white text-center font-medium">
                    {img.name}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsPhotoModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-[#E6E3DC] text-xs font-semibold text-[#1C1B18] hover:bg-[#F9F8F6] cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Edit Data Pembayaran */}
      {isBankModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-[#E6E3DC] shadow-xl max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E3DC]">
              <h3 className="font-extrabold text-sm text-[#1C1B18]">Edit Rekening Pembayaran</h3>
              <button
                onClick={() => setIsBankModalOpen(false)}
                className="p-1 rounded-lg text-[#8C887F] hover:text-[#1C1B18] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveBankDetails} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#1C1B18] mb-1">Nama Bank / E-Wallet</label>
                <select
                  value={bankForm.bank}
                  onChange={(e) => setBankForm({ ...bankForm, bank: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-[#1C1B18] focus:bg-white focus:outline-none focus:border-[#6F4E37] cursor-pointer"
                >
                  <option value="BCA">BCA (Bank Central Asia)</option>
                  <option value="Mandiri">Bank Mandiri</option>
                  <option value="BRI">Bank BRI</option>
                  <option value="BNI">Bank BNI</option>
                  <option value="BSI">BSI (Bank Syariah Indonesia)</option>
                  <option value="QRIS">QRIS All Payment</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#1C1B18] mb-1">Nomor Rekening</label>
                <input
                  type="text"
                  required
                  value={bankForm.number}
                  onChange={(e) => setBankForm({ ...bankForm, number: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-[#1C1B18] font-mono font-medium focus:bg-white focus:outline-none focus:border-[#6F4E37]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1C1B18] mb-1">Atas Nama Rekening</label>
                <input
                  type="text"
                  required
                  value={bankForm.holder}
                  onChange={(e) => setBankForm({ ...bankForm, holder: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-[#1C1B18] font-medium focus:bg-white focus:outline-none focus:border-[#6F4E37]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsBankModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E6E3DC] text-xs font-semibold text-[#1C1B18] hover:bg-[#F9F8F6] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#6F4E37] hover:bg-[#563B28] text-white text-xs font-semibold cursor-pointer"
                >
                  Simpan Rekening
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Edit Aturan Kost */}
      {isRulesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-[#E6E3DC] shadow-xl max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E3DC]">
              <h3 className="font-extrabold text-sm text-[#1C1B18]">Edit Aturan Kost</h3>
              <button
                onClick={() => setIsRulesModalOpen(false)}
                className="p-1 rounded-lg text-[#8C887F] hover:text-[#1C1B18] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveRules} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#1C1B18] mb-1">Jam Bertamu</label>
                <input
                  type="text"
                  required
                  value={rulesForm.visitingHours}
                  onChange={(e) => setRulesForm({ ...rulesForm, visitingHours: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-[#1C1B18] focus:bg-white focus:outline-none focus:border-[#6F4E37]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1C1B18] mb-1">Ketentuan Merokok</label>
                <input
                  type="text"
                  required
                  value={rulesForm.smoking}
                  onChange={(e) => setRulesForm({ ...rulesForm, smoking: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-[#1C1B18] focus:bg-white focus:outline-none focus:border-[#6F4E37]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1C1B18] mb-1">Jam Tenang</label>
                <input
                  type="text"
                  required
                  value={rulesForm.quietHours}
                  onChange={(e) => setRulesForm({ ...rulesForm, quietHours: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-[#1C1B18] focus:bg-white focus:outline-none focus:border-[#6F4E37]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsRulesModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E6E3DC] text-xs font-semibold text-[#1C1B18] hover:bg-[#F9F8F6] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#6F4E37] hover:bg-[#563B28] text-white text-xs font-semibold cursor-pointer"
                >
                  Simpan Aturan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: Tambah Fasilitas */}
      {isAddFacilityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-[#E6E3DC] shadow-xl max-w-sm w-full p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E3DC]">
              <h3 className="font-extrabold text-sm text-[#1C1B18]">Tambah Fasilitas Baru</h3>
              <button
                onClick={() => setIsAddFacilityModalOpen(false)}
                className="p-1 rounded-lg text-[#8C887F] hover:text-[#1C1B18] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCustomFacility} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#1C1B18] mb-1">Nama Fasilitas</label>
                <input
                  type="text"
                  placeholder="Contoh: Kulkas Bersama, Dispenser RO"
                  required
                  value={newFacilityName}
                  onChange={(e) => setNewFacilityName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-[#1C1B18] focus:bg-white focus:outline-none focus:border-[#6F4E37]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddFacilityModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E6E3DC] text-xs font-semibold text-[#1C1B18] hover:bg-[#F9F8F6] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#6F4E37] hover:bg-[#563B28] text-white text-xs font-semibold cursor-pointer"
                >
                  Tambahkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: Tambah Anggota Tim */}
      {isAddTeamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-[#E6E3DC] shadow-xl max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E3DC]">
              <h3 className="font-extrabold text-sm text-[#1C1B18]">Tambah Staf / Anggota Tim</h3>
              <button
                onClick={() => setIsAddTeamModalOpen(false)}
                className="p-1 rounded-lg text-[#8C887F] hover:text-[#1C1B18] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddTeamMember} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#1C1B18] mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  placeholder="Nama staf operasional"
                  value={newTeamMember.name}
                  onChange={(e) => setNewTeamMember({ ...newTeamMember, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-[#1C1B18] focus:bg-white focus:outline-none focus:border-[#6F4E37]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1C1B18] mb-1">Peran / Posisi</label>
                <select
                  value={newTeamMember.role}
                  onChange={(e) => setNewTeamMember({ ...newTeamMember, role: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-[#1C1B18] focus:bg-white focus:outline-none focus:border-[#6F4E37] cursor-pointer"
                >
                  <option value="Pengelola Properti (Admin Operasional)">Pengelola Properti (Admin Operasional)</option>
                  <option value="Teknisi & Maintenance">Teknisi &amp; Maintenance</option>
                  <option value="Staf Kebersihan & Kasir">Staf Kebersihan &amp; Kasir</option>
                  <option value="Keamanan (Security)">Keamanan (Security)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1C1B18] mb-1">No. WhatsApp</label>
                  <input
                    type="text"
                    placeholder="0812-xxxx-xxxx"
                    value={newTeamMember.phone}
                    onChange={(e) => setNewTeamMember({ ...newTeamMember, phone: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-[#1C1B18] focus:bg-white focus:outline-none focus:border-[#6F4E37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#1C1B18] mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="staf@kostcemara.id"
                    value={newTeamMember.email}
                    onChange={(e) => setNewTeamMember({ ...newTeamMember, email: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-[#1C1B18] focus:bg-white focus:outline-none focus:border-[#6F4E37]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#1C1B18] mb-1">Tingkat Hak Akses</label>
                <select
                  value={newTeamMember.access}
                  onChange={(e) => setNewTeamMember({ ...newTeamMember, access: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-[#1C1B18] focus:bg-white focus:outline-none focus:border-[#6F4E37] cursor-pointer"
                >
                  <option value="Penuh (Kamar, Penghuni, Tagihan, Kas Lapangan)">Penuh (Kamar, Penghuni, Tagihan, Kas Lapangan)</option>
                  <option value="Terbatas (Tiket Perbaikan & Servis AC)">Terbatas (Tiket Perbaikan &amp; Servis AC)</option>
                  <option value="Hanya Lihat (Monitoring Hunian)">Hanya Lihat (Monitoring Hunian)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddTeamModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E6E3DC] text-xs font-semibold text-[#1C1B18] hover:bg-[#F9F8F6] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#6F4E37] hover:bg-[#563B28] text-white text-xs font-semibold cursor-pointer"
                >
                  Simpan Anggota
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 6: Unggah Dokumen */}
      {isUploadDocModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-[#E6E3DC] shadow-xl max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E3DC]">
              <h3 className="font-extrabold text-sm text-[#1C1B18]">Unggah Dokumen Properti</h3>
              <button
                onClick={() => setIsUploadDocModalOpen(false)}
                className="p-1 rounded-lg text-[#8C887F] hover:text-[#1C1B18] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddDocument} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#1C1B18] mb-1">Judul Dokumen</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Sertifikat Laik Fungsi, Bukti PBB 2026"
                  value={newDoc.name}
                  onChange={(e) => setNewDoc({ ...newDoc, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-[#1C1B18] focus:bg-white focus:outline-none focus:border-[#6F4E37]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1C1B18] mb-1">Kategori Dokumen</label>
                <select
                  value={newDoc.category}
                  onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-[#1C1B18] focus:bg-white focus:outline-none focus:border-[#6F4E37] cursor-pointer"
                >
                  <option value="Legalitas Tanah & Properti">Legalitas Tanah &amp; Properti</option>
                  <option value="Perizinan Bangunan">Perizinan Bangunan</option>
                  <option value="Asuransi & Perlindungan">Asuransi &amp; Perlindungan</option>
                  <option value="Draft & Dokumen Kontrak">Draft &amp; Dokumen Kontrak</option>
                </select>
              </div>

              <div className="p-4 border-2 border-dashed border-[#E6E3DC] rounded-xl text-center bg-[#F9F8F6]/50">
                <FileCheck className="w-6 h-6 text-[#6F4E37] mx-auto mb-1.5" />
                <div className="font-semibold text-xs text-[#1C1B18]">Pilih berkas PDF, JPG, atau PNG</div>
                <div className="text-[10px] text-[#8C887F] mt-0.5">Maksimal ukuran file 15 MB</div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadDocModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E6E3DC] text-xs font-semibold text-[#1C1B18] hover:bg-[#F9F8F6] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#6F4E37] hover:bg-[#563B28] text-white text-xs font-semibold cursor-pointer"
                >
                  Simpan Dokumen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 7: Edit Tipe Kamar */}
      {isEditRoomTypeModalOpen && selectedRoomType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-[#E6E3DC] shadow-xl max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E3DC]">
              <h3 className="font-extrabold text-sm text-[#1C1B18]">
                Sesuaikan Tarif {selectedRoomType.name}
              </h3>
              <button
                onClick={() => setIsEditRoomTypeModalOpen(false)}
                className="p-1 rounded-lg text-[#8C887F] hover:text-[#1C1B18] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveRoomTypePrice} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#1C1B18] mb-1">Tarif Bulanan (Rp)</label>
                <input
                  type="number"
                  required
                  value={selectedRoomType.price}
                  onChange={(e) =>
                    setSelectedRoomType({
                      ...selectedRoomType,
                      price: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-[#1C1B18] font-mono font-bold focus:bg-white focus:outline-none focus:border-[#6F4E37]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1C1B18] mb-1">Dimensi Kamar</label>
                <input
                  type="text"
                  required
                  value={selectedRoomType.size}
                  onChange={(e) =>
                    setSelectedRoomType({
                      ...selectedRoomType,
                      size: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-[#1C1B18] focus:bg-white focus:outline-none focus:border-[#6F4E37]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditRoomTypeModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E6E3DC] text-xs font-semibold text-[#1C1B18] hover:bg-[#F9F8F6] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#6F4E37] hover:bg-[#563B28] text-white text-xs font-semibold cursor-pointer"
                >
                  Simpan Tarif
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
