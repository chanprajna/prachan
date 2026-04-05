"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FileText, Plus, Edit } from "lucide-react";

const mockTemplates = [
  { id: '1', name: '預設邀約信', subject: '法鼓山傳燈院【{{活動名稱}}】義工護持邀約' },
  { id: '2', name: '行前通知信', subject: '【{{活動名稱}}】行前溫馨提醒' }
];

export default function EmailTemplatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zen-green dark:text-zen-green">信件版樣管理</h1>
          <p className="text-stone-500 dark:text-stone-400 mt-2 text-lg">維護系統自動寄發的通知信件公版與變數。</p>
        </div>
        <Button size="lg" className="h-14 text-lg">
          <Plus className="w-5 h-5 mr-2" />
          新增版樣
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {mockTemplates.map(template => (
          <Card key={template.id} className="hover:border-zen-green/30 transition-colors">
            <CardHeader className="bg-stone-50 dark:bg-stone-900/50 p-6 border-b border-stone-100 dark:border-stone-800">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold text-stone-800 dark:text-stone-100 flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-zen-green" />
                  {template.name}
                </CardTitle>
                <Badge variant={template.id === '1' ? 'success' : 'outline'} className="px-3 py-1">
                  {template.id === '1' ? '系統預設' : '自訂'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <div className="text-sm text-stone-500 dark:text-stone-400 mb-2">主旨</div>
                <div className="text-xl font-medium text-stone-800 dark:text-stone-200 bg-stone-50 dark:bg-stone-800/50 p-4 rounded-xl font-mono">
                  {template.subject}
                </div>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" size="lg" className="flex-1 h-12 text-lg">
                  <Edit className="w-5 h-5 mr-2" /> 編輯版樣
                </Button>
                <Button variant="ghost" size="lg" className="flex-1 h-12 text-lg text-zen-green hover:text-zen-green hover:bg-zen-green/10">
                  發送測試信
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
