"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Users, Zap, ShieldBan } from "lucide-react";
import { useRouter } from "next/navigation";
import { Group } from "@/types";

export default function ActivityGroupsPage() {
  const router = useRouter();
  
  // 假資料直接寫在 State，方便 Mock
  const [groups, setGroups] = useState<Group[]>([
    { id: '1', activityId: '1', name: '內護', quota: 20, isActive: true },
    { id: '2', activityId: '1', name: '外護', quota: 15, isActive: true },
    { id: '3', activityId: '1', name: '學長', quota: 5, isActive: true },
    { id: '4', activityId: '1', name: '交通組', quota: 0, isActive: false },
  ]);

  const toggleGroupStatus = (id: string) => {
    const group = groups.find(g => g.id === id);
    const intent = group?.isActive ? '停用' : '啟用';
    
    if (window.confirm(`確定要「${intent}」${group?.name}組別嗎？\n停用後的組別將不會出現在義工邀約的回覆選項中。`)) {
      setGroups(groups.map(g => g.id === id ? { ...g, isActive: !g.isActive } : g));
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="lg" onClick={() => router.back()} className="h-14 w-14 p-0 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="flex-1 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zen-green dark:text-zen-green">組別配置與維護</h1>
            <p className="text-stone-500 dark:text-stone-400 mt-2 text-lg">設定活動的各組報名上限與狀態。</p>
          </div>
          <Button size="lg" className="h-14 text-lg">
            新增組別
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {groups.map(group => (
          <Card key={group.id} className={`${!group.isActive ? 'opacity-60 bg-stone-50 dark:bg-stone-900/50' : 'hover:border-zen-green/30'} transition-all`}>
            <CardContent className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-bold text-stone-800 dark:text-stone-100">{group.name}</h3>
                  {!group.isActive && <Badge variant="outline" className="text-sm">已停用</Badge>}
                </div>
                <div className="flex items-center text-stone-500 dark:text-stone-400 text-lg">
                  <Users className="w-5 h-5 mr-2" />
                  名額上限：{group.quota === 0 ? '無上限' : `${group.quota} 人`}
                </div>
              </div>
              
              <div className="flex flex-wrap md:flex-nowrap items-center gap-4 w-full md:w-auto">
                <div className="text-right flex-1 md:flex-none md:mr-6">
                  <div className="text-sm text-stone-500 mb-1">目前已確認名額</div>
                  <div className="text-2xl font-bold text-zen-green">
                    {group.isActive ? Math.floor(Math.random() * (group.quota || 10)) : 0} <span className="text-lg text-stone-400 font-medium">/ {group.quota === 0 ? '∞' : group.quota}</span>
                  </div>
                </div>
                
                <div className="flex gap-3 w-full md:w-auto">
                  <Button variant="outline" size="lg" className="flex-1 md:flex-none h-12 text-base w-32" disabled={!group.isActive}>
                    編輯設定
                  </Button>
                  <Button 
                    variant={group.isActive ? "danger" : "default"} 
                    size="lg" 
                    className={`flex-1 md:flex-none h-12 text-base w-32 ${!group.isActive ? 'bg-stone-500 dark:bg-stone-600 hover:bg-stone-600' : ''}`}
                    onClick={() => toggleGroupStatus(group.id)}
                  >
                    {group.isActive ? <><ShieldBan className="w-5 h-5 mr-2" />停用</> : <><Zap className="w-5 h-5 mr-2" />啟用</>}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
