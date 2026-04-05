"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, XCircle } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function RSVPPage() {
  const [status, setStatus] = useState<'ACCEPT' | 'DECLINE' | null>(null);
  const [note, setNote] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!status) {
      alert("請選擇「可護持」或「不克參與」！");
      return;
    }

    const intent = status === 'ACCEPT' ? '可以護持' : '不克參與';
    if (window.confirm(`送出確認：您回覆的狀態為「${intent}」\n\n送出後將通知各組悅眾。`)) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-sm text-center p-8 border-0 shadow-xl ring-1 ring-stone-200 dark:ring-stone-800">
          <CheckCircle2 className="w-20 h-20 text-zen-green mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-4">感恩菩薩回覆</h2>
          <p className="text-xl text-stone-600 dark:text-stone-400">已將您的意願通知組內悅眾。<br/>阿彌陀佛！</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-10 px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-8 mt-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-wider text-zen-green dark:text-zen-green">義工邀約回覆</h1>
          <h2 className="text-2xl font-medium text-stone-600 dark:text-stone-300">第44屆傳燈法會</h2>
        </div>

        <Card className="border-0 shadow-lg ring-1 ring-stone-200 dark:ring-stone-800">
          <CardHeader className="bg-stone-50 dark:bg-stone-900/50 p-6 md:p-8 text-center border-b border-stone-100 dark:border-stone-800">
            <CardTitle className="text-2xl font-medium text-stone-800 dark:text-stone-100">
              果徹 菩薩 您好
            </CardTitle>
            <p className="text-lg text-stone-500 dark:text-stone-400 mt-2">
              誠摯邀請您參與本次活動，分配組別為：<span className="font-bold text-zen-tea dark:text-zen-green text-xl">內護</span>
            </p>
          </CardHeader>

          <CardContent className="p-6 md:p-8 space-y-8">
            <div className="space-y-4">
              <label className="block text-xl font-medium text-stone-800 dark:text-stone-200 mb-4">請選擇您的護持意願：</label>
              <div className="grid grid-cols-1 gap-4">
                <button 
                  type="button"
                  onClick={() => setStatus('ACCEPT')}
                  className={`flex items-center justify-center h-20 text-2xl rounded-2xl border-2 transition-all ${
                    status === 'ACCEPT' 
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold shadow-md' 
                      : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:border-emerald-300'
                  }`}
                >
                  <CheckCircle2 className={`w-8 h-8 mr-3 ${status === 'ACCEPT' ? 'opacity-100' : 'opacity-50'}`} />
                  法喜充滿，可護持
                </button>
                <button 
                  type="button"
                  onClick={() => setStatus('DECLINE')}
                  className={`flex items-center justify-center h-20 text-2xl rounded-2xl border-2 transition-all ${
                    status === 'DECLINE' 
                      ? 'border-red-600 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 font-bold shadow-md' 
                      : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:border-red-300'
                  }`}
                >
                  <XCircle className={`w-8 h-8 mr-3 ${status === 'DECLINE' ? 'opacity-100' : 'opacity-50'}`} />
                  因循遇緣，不克參與
                </button>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800">
              <label className="block text-xl font-medium text-stone-800 dark:text-stone-200">
                留言給悅眾 (選填)
              </label>
              <textarea 
                className="w-full h-32 rounded-2xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 p-4 text-xl focus:ring-2 focus:ring-zen-green focus:outline-none"
                placeholder="例如：需協助交通接駁、可幫忙前置作業等..."
                value={note}
                onChange={e => setNote(e.target.value)}
              />
            </div>

            <Button 
              size="lg" 
              className="w-full h-16 text-2xl rounded-2xl shadow-lg mt-8"
              onClick={handleSubmit}
            >
              送出我的回覆
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
