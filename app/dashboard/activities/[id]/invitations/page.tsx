"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Mail, Info, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
// 假資料直寫
const mockInvites = [
  { id: '1', name: '果徹', group: '內護', status: 'PENDING', email: 'user1@mock.com' },
  { id: '2', name: '常真', group: '外護', status: 'ACCEPT', email: 'user2@mock.com' },
  { id: '3', name: '演音', group: '學長', status: 'DECLINE', email: 'user3@mock.com' },
];

export default function InvitationsPage() {
  const router = useRouter();

  const handleSendAll = () => {
    if (window.confirm(`確定要針對目前「未回覆」的 1 位菩薩發送電子郵件邀約嗎？\n\n系統將自動套用預設信件版樣發送專屬連結。`)) {
      alert("發送作業已於背景處理中！");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="lg" onClick={() => router.back()} className="h-14 w-14 p-0 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zen-green dark:text-zen-green">邀約名冊與發送</h1>
            <p className="text-stone-500 dark:text-stone-400 mt-2 text-lg">檢視各組義工的報名狀態並統一發送通知信。</p>
          </div>
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 text-lg border-zen-green text-zen-green">
            <FileText className="w-5 h-5 mr-2" />
            預覽信件
          </Button>
          <Button size="lg" className="w-full sm:w-auto h-14 text-lg" onClick={handleSendAll}>
            <Mail className="w-5 h-5 mr-2" />
            發送邀約信
          </Button>
        </div>
      </div>

      <Card className="border-0 shadow-md ring-1 ring-stone-200 dark:ring-stone-800">
        <CardHeader className="bg-stone-50 dark:bg-stone-900/50 p-6 md:p-8 border-b border-stone-100 dark:border-stone-800 flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-medium">義工報名狀態清單</CardTitle>
          <div className="flex gap-4">
            <Badge variant="warning" className="px-3 py-1 text-base">待回覆: 1</Badge>
            <Badge variant="success" className="px-3 py-1 text-base">可護持: 1</Badge>
            <Badge variant="danger" className="px-3 py-1 text-base">不克參與: 1</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-100/50 dark:bg-stone-900/50 border-b border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400">
                  <th className="p-6 font-medium text-lg">姓名</th>
                  <th className="p-6 font-medium text-lg">分發組別</th>
                  <th className="p-6 font-medium text-lg">回覆狀態</th>
                  <th className="p-6 font-medium text-lg">電子郵件</th>
                  <th className="p-6 font-medium text-lg text-right">操作</th>
                </tr>
              </thead>
              <tbody>
                {mockInvites.map(inv => (
                  <tr key={inv.id} className="border-b border-stone-100 dark:border-stone-800 hover:bg-stone-50/50 dark:hover:bg-stone-800/50 transition-colors">
                    <td className="p-6 text-xl font-medium text-stone-800 dark:text-stone-100">{inv.name}</td>
                    <td className="p-6 text-lg text-stone-600 dark:text-stone-300">{inv.group}</td>
                    <td className="p-6">
                      <Badge 
                        variant={inv.status === 'ACCEPT' ? 'success' : inv.status === 'DECLINE' ? 'danger' : 'warning'} 
                        className="px-4 py-2 text-base"
                      >
                        {inv.status === 'ACCEPT' ? '可護持' : inv.status === 'DECLINE' ? '不克參與' : '尚未回覆'}
                      </Badge>
                    </td>
                    <td className="p-6 text-lg text-stone-600 dark:text-stone-400">{inv.email}</td>
                    <td className="p-6 text-right">
                      <Button variant="outline" className="h-12 px-6 text-base">檢視細節</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center gap-2 text-stone-500 p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-xl">
        <Info className="w-6 h-6 text-yellow-600" />
        <span className="text-lg">提示：發送邀約信後，義工菩薩將會在此信箱收到專屬回覆連結。</span>
      </div>
    </div>
  )
}
