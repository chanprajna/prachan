import { Menu, Bell } from "lucide-react";
import { Profile } from "@/types";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header({ user }: { user?: Profile }) {
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
        <button className="relative p-2 text-stone-400 hover:text-zen-green dark:hover:text-zen-green rounded-full hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-zen-green/10 flex items-center justify-center text-zen-green font-semibold ring-2 ring-transparent hover:ring-zen-green/20 cursor-pointer transition-all">
          {user?.name?.[0] || 'U'}
        </div>
      </div>
    </header>
  );
}
