"use client";

import { useEffect } from "react";
import { ViewTagihanPembayaran } from "@/components/pemilik-kost/ViewTagihanPembayaran";
import { useDashboard } from "@/components/pemilik-kost/DashboardContext";

export default function TagihanPage() {
  const { openRecordPayment, sendWhatsappReminder } = useDashboard();

  useEffect(() => {
    document.title = "Tagihan & Pembayaran • Kost Cemara | Pintu Satu";
  }, []);

  return (
    <ViewTagihanPembayaran
      onOpenRecordPayment={openRecordPayment}
      onSendWhatsappInvoice={(name, room, phone, amount) => {
        sendWhatsappReminder(name, room, phone, amount);
      }}
    />
  );
}
