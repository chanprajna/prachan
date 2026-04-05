import Link from "next/link";
import { LayoutDashboard, Calendar, Users, Settings, LogOut } from "lucide-react";
import { useMockAuth } from "@/contexts/MockAuthContext";

export function Sidebar() {
  const { role } = useMockAuth();

  // 若為義工身分，完全不顯示後台導覽列，只顯示一個無權限的提示區塊
  if (role === 'VOLUNTEER') {
    return (
      <div className="hidden md:flex h-screen w-64 flex-col bg-background border-r border-stone-200 dark:border-stone-800 fixed left-0 top-0 transition-colors pt-6">
         <div className="p-6 text-center text-stone-500">此身分無後台權限</div>
      </div>
    );
  }

  return (
    <div className="hidden md:flex h-screen w-64 flex-col bg-background border-r border-stone-200 dark:border-stone-800 fixed left-0 top-0 transition-colors">
      <div className="p-6 flex items-center justify-center border-b border-stone-100 dark:border-stone-800">
        <h1 className="text-xl font-bold text-zen-green dark:text-zen-green tracking-wider">傳燈院活動管理</h1>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-2">
        <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-zen-green dark:hover:text-zen-green transition-colors">
          <LayoutDashboard size={20} />
          <span className="font-medium">審核儀表板</span>
        </Link>
        <Link href="/dashboard/activities" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-zen-green dark:hover:text-zen-green transition-colors">
          <Calendar size={20} />
          <span className="font-medium">活動管理</span>
        </Link>
        
        {/* 以下功能只有 ADMIN 與 STAFF 可以看見 */}
        {(role === 'ADMIN' || role === 'STAFF') && (
          <>
            <Link href="/dashboard/users" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-zen-green dark:hover:text-zen-green transition-colors">
              <Users size={20} />
              <span className="font-medium">人員維護</span>
            </Link>
            <Link href="/dashboard/email-templates" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-zen-green dark:hover:text-zen-green transition-colors">
              <Settings size={20} />
              <span className="font-medium">信件版樣</span>
            </Link>
            {role === 'ADMIN' && (
              <Link href="/dashboard/audit" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 hover:text-zen-green dark:hover:text-zen-green transition-colors">
                <Settings size={20} />
                <span className="font-medium">系統稽核</span>
              </Link>
            )}
          </>
        )}
      </div>

      <div className="p-4 border-t border-stone-100 dark:border-stone-800">
        <button className="flex w-full items-center space-x-3 px-4 py-3 rounded-xl text-stone-500 dark:text-stone-400 hover:bg-red-50 dark:hover:bg-red-950/50 hover:text-red-600 dark:hover:text-red-400 transition-colors">
          <LogOut size={20} />
          <span className="font-medium">登出系統</span>
        </button>
      </div>
    </div>
  );
}
