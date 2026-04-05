"use client"

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // Mock login flow: User logs in, then needs to link Four Asm ID
    router.push("/link");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 transition-colors relative">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-wider text-zen-green dark:text-zen-green mb-4">法鼓山傳燈院</h1>
          <h2 className="text-2xl font-medium text-stone-600 dark:text-stone-300">活動管理與義工邀約系統</h2>
        </div>

        <Card className="mt-10 overflow-hidden border-0 shadow-lg ring-1 ring-stone-200 dark:ring-stone-800">
          <CardHeader className="bg-stone-50 dark:bg-stone-900/50 p-8 text-center border-b border-stone-100 dark:border-stone-800">
            <CardTitle className="text-xl font-medium text-stone-700 dark:text-stone-200">
              菩薩，歡迎登入系統
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <p className="text-lg text-stone-500 dark:text-stone-400 text-center leading-relaxed">
              因本系統處理義工重要報名資訊，請先透過 Google 帳號登入以確認您的身分。
            </p>
            
            <Button 
              size="lg" 
              className="w-full text-lg h-14" 
              onClick={handleLogin}
            >
              <LogIn className="w-6 h-6 mr-3" />
              使用 Google 帳號登入
            </Button>
          </CardContent>
        </Card>

        <div className="text-center text-stone-400 dark:text-stone-500 text-sm">
          阿彌陀佛 🙏 
        </div>
      </div>
    </div>
  );
}
