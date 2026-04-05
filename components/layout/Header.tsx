"use client"

import * as React from "react";
import { Menu, Bell } from "lucide-react";
import { Profile } from "@/types";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header({ user }: { user?: Profile }) {
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return (
    <header className="h-16 bg-background border-b border-stone-200 dark:border-stone-800 flex items-center justify-between px-6 md:px-8 sticky top-0 z-20 transition-colors">
      <div className="flex items-center">
        <button className="md:hidden mr-4 text-stone-500 hover:text-zen-green dark:text-stone-400 dark:hover:text-zen-green">
          <Menu size={24} />
        </button>
        <div className="text-sm text-stone-500 dark:text-stone-400 hidden md:block">
          歡迎回來，<span className="font-semibold text-zen-tea dark:text-zen-green">{user?.name || '使用者'}</span> 菩薩
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <button 
          className="relative p-2 text-stone-400 hover:text-zen-green dark:hover:text-zen-green rounded-full hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
          onClick={() => showToast("通知功能建置中，敬請期待。")}
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div 
          className="w-8 h-8 rounded-full bg-zen-green/10 flex items-center justify-center text-zen-green font-semibold ring-2 ring-transparent hover:ring-zen-green/20 cursor-pointer transition-all"
          onClick={() => showToast("個人設定與登出功能開發中。")}
        >
          {user?.name?.[0] || 'U'}
        </div>
      </div>

      {toastMessage && (
        <div className="absolute top-[72px] right-6 z-50 bg-stone-800 text-stone-100 dark:bg-stone-100 dark:text-stone-800 px-4 py-2 rounded-xl shadow-xl text-sm font-medium transition-all animate-in fade-in slide-in-from-top-2">
          {toastMessage}
        </div>
      )}
    </header>
  );
}
