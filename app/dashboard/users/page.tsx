"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Search, Plus, UserPlus, Filter } from "lucide-react";
import { Profile } from "@/types";
import { mockProfiles } from "@/lib/mock/data";

export default function UsersPage() {
  const [users, setUsers] = useState<Profile[]>(mockProfiles);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(u => 
    u.name.includes(search) || u.fourAsmId.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zen-green dark:text-zen-green">人員維護</h1>
          <p className="text-stone-500 dark:text-stone-400 mt-2 text-lg">維護系統內的專職、悅眾與義工菩薩名單。</p>
        </div>
        <Button size="lg" className="w-full sm:w-auto h-14 text-lg">
          <UserPlus className="w-5 h-5 mr-2" />
          新增人員
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <Input 
              placeholder="搜尋姓名或四眾編號..." 
              className="pl-12 h-14 text-lg max-w-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" size="lg" className="h-14">
            <Filter className="w-5 h-5 mr-2" />
            角色篩選
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400">
                  <th className="p-6 font-medium">四眾編號</th>
                  <th className="p-6 font-medium">姓名</th>
                  <th className="p-6 font-medium">角色</th>
                  <th className="p-6 font-medium">聯絡電話</th>
                  <th className="p-6 font-medium text-right">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-stone-100 dark:border-stone-800 hover:bg-stone-50/50 dark:hover:bg-stone-800/50 transition-colors">
                    <td className="p-6 text-lg font-mono text-stone-600 dark:text-stone-300">{user.fourAsmId}</td>
                    <td className="p-6 text-xl font-medium text-stone-800 dark:text-stone-100">{user.name}</td>
                    <td className="p-6">
                      <Badge variant={user.role === 'ADMIN' ? 'danger' : user.role === 'STAFF' ? 'warning' : 'default'} className="px-3 py-1 text-sm">
                        {user.role}
                      </Badge>
                    </td>
                    <td className="p-6 text-lg text-stone-600 dark:text-stone-400">{user.phone || '-'}</td>
                    <td className="p-6 text-right">
                      <Button variant="outline" size="sm" className="h-10 px-4 text-base">編輯</Button>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-lg text-stone-500">
                      找不到符合條件的菩薩紀錄
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
