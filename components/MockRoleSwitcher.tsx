"use client"

import { useState } from "react"
import { useMockAuth } from "@/contexts/MockAuthContext"
import { UserRole } from "@/types"
import { UserCog, X } from "lucide-react"

export function MockRoleSwitcher() {
  const { role, setRole } = useMockAuth()
  const [isOpen, setIsOpen] = useState(false)

  const roles: { value: UserRole, label: string }[] = [
    { value: 'ADMIN', label: '管理者 (Admin)' },
    { value: 'STAFF', label: '專職 (Staff)' },
    { value: 'YUEZONG', label: '悅眾 (YueZhong)' },
    { value: 'VOLUNTEER', label: '義工 (Volunteer)' },
  ];

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all text-stone-500 hover:text-zen-green dark:text-stone-400 dark:hover:text-zen-green"
        title="開啟身份切換面板"
      >
        <UserCog className="w-6 h-6" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 rounded-2xl shadow-2xl space-y-3">
      <div className="flex items-center justify-between gap-4 text-stone-500 dark:text-stone-400 font-medium pb-2 border-b border-stone-100 dark:border-stone-800">
        <div className="flex items-center gap-2">
          <UserCog className="w-5 h-5 text-zen-green" />
          切換測試身分
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {roles.map(r => (
          <button
            key={r.value}
            onClick={() => {
              setRole(r.value);
              setIsOpen(false);
              alert(`已將測試身分切換為：${r.label}`);
            }}
            className={`px-4 py-2 text-left rounded-xl transition-colors text-sm font-medium ${
              role === r.value 
                ? 'bg-zen-green text-white shadow-md' 
                : 'bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
      <div className="text-xs text-stone-400 max-w-[150px] leading-tight pt-2">
        註：此面板僅供 UAT 系統測試使用。
      </div>
    </div>
  )
}
