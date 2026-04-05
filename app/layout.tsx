import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { MockAuthProvider } from "@/contexts/MockAuthContext";
import { MockRoleSwitcher } from "@/components/MockRoleSwitcher";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0C0A" }
  ],
};

export const metadata: Metadata = {
  title: "法鼓山傳燈院 | 活動管理平台",
  description: "法鼓山傳燈院專用，活動報名與義工邀約管理系統。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MockAuthProvider>
            {children}
            <MockRoleSwitcher />
          </MockAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
