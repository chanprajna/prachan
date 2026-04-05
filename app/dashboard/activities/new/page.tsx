"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ActivityScheduleType } from "@/types";

export default function NewActivityPage() {
  const router = useRouter();
  const [scheduleType, setScheduleType] = useState<ActivityScheduleType>('SINGLE_DAY');
  
  // Form State
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !startDate || !startTime || !endTime) {
      alert("請填寫所有必填欄位");
      return;
    }

    const typeLabel = scheduleType === 'SINGLE_DAY' ? '單日活動' : 
                      scheduleType === 'TWO_DAYS_NO_OVERNIGHT' ? '兩日(不過夜)' : 
                      scheduleType === 'TWO_DAYS_OVERNIGHT' ? '兩日(過夜)' : '規律週課';

    const isConfirmed = window.confirm(
      `確定要建立此活動嗎？\n\n名稱：${title}\n排程類型：${typeLabel}\n時間：${startTime} ~ ${endTime}\n\n按下確定後，將建立活動草稿。`
    );

    if (isConfirmed) {
      alert("活動建立成功！");
      router.push("/dashboard/activities");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="lg" onClick={() => router.back()} className="h-14 w-14 p-0 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zen-green dark:text-zen-green">建立新活動</h1>
          <p className="text-stone-500 dark:text-stone-400 mt-2 text-lg">設定活動的基本資訊與排程方式。</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="border-0 shadow-lg ring-1 ring-stone-200 dark:ring-stone-800">
          <CardHeader className="bg-stone-50 dark:bg-stone-900/50 p-6 md:p-8 border-b border-stone-100 dark:border-stone-800">
            <CardTitle className="text-2xl font-medium text-stone-800 dark:text-stone-100">基本資料</CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-8">
            <div className="space-y-3">
              <label className="block text-xl font-medium text-stone-800 dark:text-stone-200">活動名稱 <span className="text-red-500">*</span></label>
              <Input 
                placeholder="例如：第44屆傳燈法會" 
                className="h-14 text-xl px-4 rounded-xl max-w-xl"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <label className="block text-xl font-medium text-stone-800 dark:text-stone-200">排程類型 <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: 'SINGLE_DAY', label: '單日活動' },
                  { value: 'TWO_DAYS_NO_OVERNIGHT', label: '兩日(不過夜)' },
                  { value: 'TWO_DAYS_OVERNIGHT', label: '兩日(過夜)' },
                  { value: 'REGULAR_WEEKLY', label: '規律週課' }
                ].map(type => (
                  <label 
                    key={type.value}
                    className={`flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      scheduleType === type.value 
                        ? 'border-zen-green bg-zen-green/10 text-zen-green dark:text-zen-green/90 font-medium' 
                        : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:border-zen-green/50 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="scheduleType" 
                      value={type.value} 
                      className="hidden"
                      checked={scheduleType === type.value}
                      onChange={() => setScheduleType(type.value as ActivityScheduleType)}
                    />
                    <span className="text-lg">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-stone-100 dark:border-stone-800">
              <div className="space-y-3">
                <label className="block text-xl font-medium text-stone-800 dark:text-stone-200">開始日期 <span className="text-red-500">*</span></label>
                <Input 
                  type="date" 
                  className="h-14 text-xl px-4 rounded-xl"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                />
              </div>
              
              {scheduleType !== 'SINGLE_DAY' && (
                <div className="space-y-3">
                  <label className="block text-xl font-medium text-stone-800 dark:text-stone-200">結束日期 <span className="text-red-500">*</span></label>
                  <Input 
                    type="date" 
                    className="h-14 text-xl px-4 rounded-xl"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                  />
                  {scheduleType === 'REGULAR_WEEKLY' && (
                    <p className="text-sm text-stone-500">系統將自動略過國定假日不排課</p>
                  )}
                </div>
              )}

              <div className="space-y-3">
                <label className="block text-xl font-medium text-stone-800 dark:text-stone-200">每日開始時間 <span className="text-red-500">*</span></label>
                <Input 
                  type="time" 
                  className="h-14 text-xl px-4 rounded-xl"
                  value={startTime}
                  onChange={e => setStartTime(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <label className="block text-xl font-medium text-stone-800 dark:text-stone-200">每日結束時間 <span className="text-red-500">*</span></label>
                <Input 
                  type="time" 
                  className="h-14 text-xl px-4 rounded-xl"
                  value={endTime}
                  onChange={e => setEndTime(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <div className="bg-stone-50 dark:bg-stone-900/40 p-6 md:p-8 border-t border-stone-200 dark:border-stone-800 flex justify-end">
            <Button type="submit" size="lg" className="w-full md:w-auto h-14 text-xl px-12 rounded-2xl">
              <CheckCircle2 className="w-6 h-6 mr-3" />
              確認建立活動
            </Button>
          </div>
        </Card>
      </form>
    </div>
  )
}
