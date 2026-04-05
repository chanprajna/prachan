"use client"

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LinkAccountPage() {
  const router = useRouter();
  const [fourAsmId, setFourAsmId] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.formEvent?.preventDefault?.(); // Prevent standard submit via react event
    e.preventDefault();

    if (!fourAsmId || !mobile) {
      alert("請填寫您的四眾編號與手機號碼，以免無法辨識身分。");
      return;
    }

    // 依據「菩薩為中心設計」提供明確的中文操作確認
    const isConfirmed = window.confirm(`請確認您填寫的資料是否正確：\n\n四眾編號：${fourAsmId}\n手機號碼：${mobile}\n\n確認後將與您的 Google 帳號綁定。`);
    
    if (isConfirmed) {
      alert("綁定成功！即將為您導向審核儀表板。");
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 transition-colors relative">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-lg space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-wider text-zen-green dark:text-zen-green mb-3">法鼓山傳燈院</h1>
          <h2 className="text-xl text-stone-500 dark:text-stone-400">首次登入身分驗證</h2>
        </div>

        <Card className="border-0 shadow-lg ring-1 ring-stone-200 dark:ring-stone-800">
          <CardHeader className="bg-stone-50 dark:bg-stone-900/50 p-8 border-b border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-4">
              <AlertCircle className="w-8 h-8 text-yellow-600" />
              <CardTitle className="text-2xl font-medium text-stone-800 dark:text-stone-100">
                需要綁定四眾編號
              </CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            <p className="text-lg text-stone-600 dark:text-stone-300 mb-8 leading-relaxed">
              系統發現您是第一次使用此登入信箱。為了保障活動安全與確認義工身分，請輸入您的四眾編號與聯絡手機，以完成帳號綁定。
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label htmlFor="fourAsmId" className="block text-xl font-medium text-stone-800 dark:text-stone-200">
                  四眾編號
                </label>
                <Input
                  id="fourAsmId"
                  autoFocus
                  placeholder="請輸入您的四眾編號"
                  className="h-16 text-xl px-4 rounded-xl"
                  value={fourAsmId}
                  onChange={(e) => setFourAsmId(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="mobile" className="block text-xl font-medium text-stone-800 dark:text-stone-200">
                  聯絡手機
                </label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="例如：0912345678"
                  className="h-16 text-xl px-4 rounded-xl"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full text-xl h-16 rounded-2xl shadow-md"
                >
                  <CheckCircle2 className="w-6 h-6 mr-3" />
                  確認綁定資料
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
