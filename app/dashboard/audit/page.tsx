"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ActivitySquare, Database, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

const mockLogs = [
  { id: '1', actor: '系統管理者 (Admin)', action: 'EXCEL_IMPORT', target: '彙總名冊', time: '2026-04-05 10:30:21', details: '新增 5 筆、更新 2 筆' },
  { id: '2', actor: '常真菩薩 (YUE_ZHONG)', action: 'UPDATE', target: '內護組名額', time: '2026-04-05 09:12:44', details: '從 15 人修改為 20 人' },
  { id: '3', actor: '果徹菩薩 (RSVP 代碼)', action: 'UPDATE', target: '回覆意願', time: '2026-04-04 20:15:00', details: '變更為「可護持」' },
];

export default function AuditLogPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zen-green dark:text-zen-green">系統稽核日誌 (Audit Log)</h1>
            <p className="text-stone-500 dark:text-stone-400 mt-2 text-lg">紀錄系統中所有異動寫入行為，以符合資料保護規範。</p>
        </div>
        <Button variant="outline" size="lg" className="h-14 text-lg border-zen-green text-zen-green">
          <Download className="w-5 h-5 mr-2" />
          匯出 30 天紀錄
        </Button>
      </div>

      <Card className="border-0 shadow-md ring-1 ring-stone-200 dark:ring-stone-800">
        <CardHeader className="bg-stone-50 dark:bg-stone-900/50 p-6 border-b border-stone-100 dark:border-stone-800">
          <CardTitle className="text-2xl font-bold text-stone-800 dark:text-stone-100 flex items-center">
            <Database className="w-6 h-6 mr-3 text-zen-green" />
            最近異動紀錄
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-100/50 dark:bg-stone-900/50 border-b border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400">
                  <th className="p-6 font-medium text-lg">時間</th>
                  <th className="p-6 font-medium text-lg">操作者</th>
                  <th className="p-6 font-medium text-lg">動作類型</th>
                  <th className="p-6 font-medium text-lg">異動目標</th>
                  <th className="p-6 font-medium text-lg">摘要細節</th>
                </tr>
              </thead>
              <tbody>
                {mockLogs.map(log => (
                  <tr key={log.id} className="border-b border-stone-100 dark:border-stone-800 hover:bg-stone-50/50 dark:hover:bg-stone-800/50 transition-colors">
                    <td className="p-6 text-lg font-mono text-stone-500 dark:text-stone-400">{log.time}</td>
                    <td className="p-6 text-xl font-medium text-stone-800 dark:text-stone-200">{log.actor}</td>
                    <td className="p-6">
                      <Badge variant={log.action === 'EXCEL_IMPORT' ? 'warning' : 'outline'} className="text-base px-3 py-1">
                        {log.action}
                      </Badge>
                    </td>
                    <td className="p-6 text-lg text-stone-700 dark:text-stone-300">{log.target}</td>
                    <td className="p-6 text-lg text-stone-600 dark:text-stone-400">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center gap-3 text-stone-500 bg-stone-50 dark:bg-stone-900/30 p-4 rounded-xl border border-stone-200 dark:border-stone-800">
        <ActivitySquare className="w-6 h-6 text-stone-400" />
        <span className="text-lg">Audit Log 採不可覆寫機制，系統僅保存最核心的狀態異動追蹤。</span>
      </div>
    </div>
  )
}
