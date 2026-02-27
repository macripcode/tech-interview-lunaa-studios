"use client";

import { memo } from "react";

export interface Toast {
  id: string;
  message: string;
  type: "success" | "error";
}

interface ToastListProps {
  toasts: Toast[];
}

function ToastList({ toasts }: ToastListProps) {
  return (
    <div
      role="region"
      aria-label="Notificaciones"
      aria-live="polite"
      aria-atomic="false"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role={toast.type === "error" ? "alert" : "status"}
          className={`rounded-lg px-5 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 ${
            toast.type === "success" ? "bg-emerald-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}

export default memo(ToastList);
