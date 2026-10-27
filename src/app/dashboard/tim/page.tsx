"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users2, Shield, ArrowRight, Plus, Phone, Trash2, X } from "lucide-react";
import { useDashboard } from "@/components/pemilik-kost/DashboardContext";

export default function TimPage() {
  const { teamMembers, addTeamMember, deleteTeamMember, showToast } = useDashboard();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    role: "Pengelola Properti (Admin Operasional)",
    email: "",
    phone: "",
    access: "Penuh (Kamar, Penghuni, Tagihan, Kas Lapangan)",
  });

  useEffect(() => {
    document.title = "Tim & Hak Akses • Kost Cemara | Pintu Satu";
  }, []);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const initials = formData.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const newMember = {
      id: `TM-${Date.now().toString().slice(-4)}`,
      name: formData.name.trim(),
      role: formData.role,
      email: formData.email || "staf@kostcemara.id",
      phone: formData.phone || "0812-0000-0000",
      access: formData.access,
      initials,
    };

    addTeamMember(newMember);
    setIsAddModalOpen(false);
    setFormData({
      name: "",
      role: "Pengelola Properti (Admin Operasional)",
      email: "",
      phone: "",
      access: "Penuh (Kamar, Penghuni, Tagihan, Kas Lapangan)",
    });
  };

  const handleDeleteMember = (id: string, name: string) => {
    deleteTeamMember(id);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1B18] tracking-tight">
            Tim &amp; Hak Akses
          </h1>
          <p className="text-xs sm:text-sm text-[#5C5952] mt-1">
            Kelola peran staf operasional, pengelola lapangan, dan teknisi Kost Cemara.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6F4E37] hover:bg-[#563B28] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah anggota tim</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#E6E3DC] shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-[#E6E3DC] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users2 className="w-4 h-4 text-[#6F4E37]" />
            <h2 className="text-sm font-bold text-[#1C1B18]">Daftar Anggota Tim ({teamMembers.length})</h2>
          </div>
          <Link
            href="/dashboard/pengaturan"
            className="text-xs font-semibold text-[#6F4E37] hover:text-[#563B28] flex items-center gap-1 cursor-pointer"
          >
            <span>Pengaturan properti</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-[#E6E3DC]">
          {teamMembers.map((member) => (
            <div key={member.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F9F8F6]/40 transition-colors">
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

              <div className="flex items-center gap-3 sm:justify-end">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F9F8F6] border border-[#E6E3DC] text-[11px] font-medium text-[#5C5952]">
                  <Shield className="w-3 h-3 text-[#6F4E37]" />
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
                  onClick={() => handleDeleteMember(member.id, member.name)}
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

      {/* MODAL: Tambah Anggota Tim */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-[#E6E3DC] shadow-xl max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E3DC]">
              <h3 className="font-extrabold text-sm text-[#1C1B18]">Tambah Anggota Tim Baru</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-[#8C887F] hover:text-[#1C1B18] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#1C1B18] mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  placeholder="Nama staf operasional"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-[#1C1B18] focus:bg-white focus:outline-none focus:border-[#6F4E37]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1C1B18] mb-1">Peran / Posisi</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
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
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-[#1C1B18] focus:bg-white focus:outline-none focus:border-[#6F4E37]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#1C1B18] mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="staf@kostcemara.id"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#F9F8F6] rounded-xl border border-[#E6E3DC] text-[#1C1B18] focus:bg-white focus:outline-none focus:border-[#6F4E37]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#1C1B18] mb-1">Tingkat Hak Akses</label>
                <select
                  value={formData.access}
                  onChange={(e) => setFormData({ ...formData, access: e.target.value })}
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
                  onClick={() => setIsAddModalOpen(false)}
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
    </div>
  );
}
