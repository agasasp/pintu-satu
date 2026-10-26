"use client";

interface ToastProps {
  show: boolean;
  title: string;
  desc: string;
}

export function ToastNotification({ show, title, desc }: ToastProps) {
  if (!show) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 bg-[#1C1B18] text-white px-4 py-3 rounded-xl shadow-lg max-w-sm border border-[#33312C] animate-in slide-in-from-bottom-2 duration-200">
      <div className="flex items-start gap-2.5">
        <span className="text-[#C88A58] font-bold text-xs mt-0.5">✓</span>
        <div>
          <div className="text-xs font-bold">{title}</div>
          <p className="text-[11px] text-[#F9F8F6]/80 mt-0.5">{desc}</p>
        </div>
      </div>
    </div>
  );
}
