import React from 'react';
import { Bell, X } from 'lucide-react';

interface NotificationToastProps {
  notification: {
    id: string;
    title: string;
    body: string;
  } | null;
  onDismiss: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ notification, onDismiss }) => {
  if (!notification) return null;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm w-full bg-slate-900 text-white p-4 rounded-xl shadow-2xl border border-slate-700 animate-in slide-in-from-top duration-200">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-blue-600 text-white shrink-0 mt-0.5">
          <Bell className="w-4 h-4" />
        </div>
        <div className="flex-1 text-xs">
          <p className="font-bold text-slate-100">{notification.title}</p>
          <p className="text-slate-300 mt-1 leading-relaxed">{notification.body}</p>
        </div>
        <button
          onClick={onDismiss}
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
