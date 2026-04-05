"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Download, UploadCloud, FileSpreadsheet, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ExcelImportPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    
    if (window.confirm(`確定要匯入檔案「${file.name}」建立義工名冊嗎？\n\n系統將自動比對四眾編號並更新資料。`)) {
      setIsUploading(true);
      // Mock upload delay
      setTimeout(() => {
        setIsUploading(false);
        alert("匯入成功！共新增 5 筆，更新 2 筆。");
        router.push("/dashboard/activities/1/invitations");
      }, 1500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="lg" onClick={() => router.back()} className="h-14 w-14 p-0 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zen-green dark:text-zen-green">匯入義工名冊</h1>
          <p className="text-stone-500 dark:text-stone-400 mt-2 text-lg">透過 Excel 批次上傳該次活動的義工名單</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="h-full border-0 shadow-md ring-1 ring-stone-200 dark:ring-stone-800">
          <CardHeader className="bg-stone-50 dark:bg-stone-900/50 p-6 md:p-8 border-b border-stone-100 dark:border-stone-800">
            <CardTitle className="text-2xl font-medium text-stone-800 dark:text-stone-100 flex items-center gap-3">
              <Download className="text-zen-green" /> 步驟一：下載範本
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-6">
            <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
              請先下載標準 Excel 範本，依照格式填寫「四眾編號」、「姓名」、「手機」等必填資料。
            </p>
            <Button variant="outline" size="lg" className="w-full h-16 text-xl border-zen-green text-zen-green hover:bg-zen-green/10">
              <FileSpreadsheet className="w-6 h-6 mr-3" />
              下載標準範本.xlsx
            </Button>
          </CardContent>
        </Card>

        <Card className="h-full border-0 shadow-md ring-1 ring-stone-200 dark:ring-stone-800">
          <CardHeader className="bg-stone-50 dark:bg-stone-900/50 p-6 md:p-8 border-b border-stone-100 dark:border-stone-800">
            <CardTitle className="text-2xl font-medium text-stone-800 dark:text-stone-100 flex items-center gap-3">
              <UploadCloud className="text-zen-green" /> 步驟二：上傳檔案
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-2xl p-8 text-center hover:border-zen-green transition-colors cursor-pointer relative bg-stone-50/50 dark:bg-stone-900/20">
              <input 
                type="file" 
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                title="選擇檔案"
              />
              <UploadCloud className="w-12 h-12 text-stone-400 mx-auto mb-4" />
              <div className="text-xl font-medium text-stone-700 dark:text-stone-200">
                {file ? file.name : '點擊選擇或拖曳 Excel 檔案至此'}
              </div>
              <p className="text-stone-500 mt-2 text-base">僅支援 .xlsx 格式</p>
            </div>

            <Button 
              size="lg" 
              className="w-full h-16 text-xl rounded-2xl shadow-md" 
              disabled={!file || isUploading}
              onClick={handleUpload}
            >
              {isUploading ? (
                '努力匯入中請稍候...'
              ) : (
                <>
                  <CheckCircle2 className="w-6 h-6 mr-3" />
                  確認上傳名冊
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
