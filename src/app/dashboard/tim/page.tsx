"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Users2, Shield, ArrowRight } from "lucide-react";

export default function TimPage() {
  useEffect(() => {
    document.title = "Tim & Hak Akses • Kost Cemara | Pintu Satu";
  }, []);

  const teamMembers = [
    {
      name: "Sari Wulandari",
      role: "Pengelola Properti (Admin Operasional)",
      email: "sari.ops@kostcemara.id",
      phone: "0812-3344-5566",
      access: "Penuh (Kamar, Penghuni, Tagihan, Kas Lapangan)",
      initials: "SW",
    },
    {
      name: "Pak Dedi",
      role: "Teknisi & Maintenance",
      email: "dedi.maintenance@kostcemara.id",
      phone: "0856-7788-9911",
      access: "Terbatas (Tiket Perbaikan & Servis AC)",
      initials: "PD",
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1B18] tracking-tight">
          Tim &amp; Hak Akses
        </h1>
        <p className="text-xs sm:text-sm text-[#5C5952] mt-1">
          Kelola peran staf operasional, pengelola lapangan, dan teknisi Kost Cemara.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E6E3DC] shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-[#E6E3DC] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users2 className="w-4 h-4 text-[#6F4E37]" />
            <h2 className="text-sm font-bold text-[#1C1B18]">Daftar Anggota Tim</h2>
          </div>
          <Link
            href="/dashboard/pengaturan"
            className="text-xs font-semibold text-[#6F4E37] hover:text-[#563B28] flex items-center gap-1"
          >
            <span>Pengaturan properti</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-[#E6E3DC]">
          {teamMembers.map((member) => (
            <div key={member.name} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

              <div className="sm:text-right">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F9F8F6] border border-[#E6E3DC] text-[11px] font-medium text-[#5C5952]">
                  <Shield className="w-3 h-3 text-[#6F4E37]" />
                  <span>{member.access}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
