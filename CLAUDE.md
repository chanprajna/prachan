# 法鼓山傳燈院活動管理網站 - 開發規範

## 專案核心策略
- **階段一（目前）**：UI/UX 靜態 Mock 優先。**絕對不要**連接真實資料庫、OAuth 或 SMTP 服務。
- 所有資料獲取請使用 `lib/mock/api.ts` 中的假資料 Promise。

## 技術棧
- Next.js 14+ App Router (React Server Components 優先)
- TypeScript (嚴格模式)
- Tailwind CSS (使用 Tailwind Merge 與 clsx 組合 class)
- Prisma + Turso (階段二)
- Auth.js + Brevo (階段二)

## 命名慣例 (Naming Conventions)
- **元件/檔案名稱**：React 元件與其檔案名稱一律使用 `PascalCase.tsx` (如 `ActivityCard.tsx`)。
- **路由目錄**：一律使用 `kebab-case` (如 `app/activity-details`)。
- **變數/函式**：使用 `camelCase` (如 `fetchActivityList`)。
- **資料庫/Prisma Schema**：實體表名使用 `ch_` 前綴加 `snake_case` (如 `@@map("ch_profile")`)，但 Prisma Client 內仍使用 `camelCase`/`PascalCase` 進行操作。

## 系統核心業務規則
1. **零刪除原則**：資料庫全域禁止實體刪除(DELETE)。一律使用 `isDeleted` 軟刪除，或針對特定狀態如活動組別使用 `isActive: false`。
2. **全域稽核**：所有的資料寫入（新增、更新）動作，在未來對接 DB 時都必須搭配寫入一份 `AuditLog`。
3. **安全防護**：
   - 階段一不處理實際認證，但是需要建立假登入狀態的概念。
   - API 需預先思考 Server-side 權限驗證邏輯。

## UI/UX 設計語言：現代禪風 (Modern Zen)
- 留白與呼吸感 (Padding/Margin 適度放大)。
- 大面積使用溫潤底色：`bg-stone-50`。
- 主要操作按鈕與強調色：深綠 `bg-[#2D5A5A]` 或 大地茶 `bg-[#5E5345]`。
- 柔和的邊緣：元件多採 `rounded-xl` 或 `rounded-2xl`，按鈕避免銳角。
- 平緩的陰影：使用 `shadow-sm` 避免生硬的黑影。
