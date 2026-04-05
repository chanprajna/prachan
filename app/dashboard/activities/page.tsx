"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Plus, CalendarDays } from "lucide-react";
import { mockActivities } from "@/lib/mock/data";
import { format } from "date-fns";
import { zhTW } from "date-fns/locale";
import Link from "next/link";
import { ActivityScheduleType } from "@/types";

const getTypeLabel = (type: ActivityScheduleType) => {
  switch(type) {
    case 'SINGLE_DAY': return '單日活動';
    case 'TWO_DAYS_NO_OVERNIGHT': return '兩日(不過夜)';
    case 'TWO_DAYS_OVERNIGHT': return '兩日(過夜)';
    case 'REGULAR_WEEKLY': return '規律週課';
  }
}

export default function ActivitiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zen-green dark:text-zen-green">活動管理</h1>
          <p className="text-stone-500 dark:text-stone-400 mt-2 text-lg">建立與維護各項法鼓山傳燈院活動梯次。</p>
        </div>
        <Link href="/dashboard/activities/new">
          <Button size="lg" className="h-14 text-lg">
            <Plus className="w-6 h-6 mr-2" />
            建立新活動
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {mockActivities.map(activity => (
          <Card key={activity.id} className="hover:border-zen-green/30 transition-colors">
            <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant={activity.status === 'PUBLISHED' ? 'success' : 'outline'} className="text-sm px-3 py-1">
                    {activity.status === 'PUBLISHED' ? '已發布' : '草稿'}
                  </Badge>
                  <Badge variant="default" className="bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 border-0 text-sm px-3 py-1">
                    {getTypeLabel(activity.scheduleType)}
                  </Badge>
                </div>
                <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100">{activity.title}</h2>
                <div className="flex items-center text-stone-500 dark:text-stone-400 text-lg">
                  <CalendarDays className="w-5 h-5 mr-2" />
                  {format(new Date(activity.startDate), "yyyy年MM月dd日", { locale: zhTW })} - {format(new Date(activity.endDate), "yyyy年MM月dd日", { locale: zhTW })}
                  <span className="ml-3 px-2 py-0.5 bg-stone-100 dark:bg-stone-800 rounded font-mono text-sm">
                    {activity.startTime} ~ {activity.endTime}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full sm:w-auto">
                <Link href={`/dashboard/activities/${activity.id}/groups`} className="flex-1 sm:flex-none">
                  <Button variant="outline" size="lg" className="w-full h-12 text-base">組別管理</Button>
                </Link>
                <Link href={`/dashboard/activities/${activity.id}/invitations`} className="flex-1 sm:flex-none">
                  <Button variant="outline" size="lg" className="w-full h-12 text-base border-zen-green/30 text-zen-green dark:text-zen-green/90">邀約名冊</Button>
                </Link>
                <Link href={`/dashboard/activities/${activity.id}/edit`} className="flex-1 sm:flex-none">
                  <Button variant="ghost" size="lg" className="w-full h-12 text-base">編輯</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
