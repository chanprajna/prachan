# 專案開發計畫 (Project Plan)

> **版本**: v1.2 — 更新於 2026-04-04
> **策略**: UI 畫面先行確認 → 後端資料庫整合 → UAT 驗證 → PROD 上線

---

## 1. 技術選型 (零成本導向)

*   **框架**: [Next.js 14+ (App Router)](https://nextjs.org/) - 部署於 **Vercel**。
*   **資料庫**: **Turso (LibSQL)** - 邊緣運算優化的 SQLite，適合 Vercel Serverless 環境。
*   **ORM**: **Prisma** (搭配 `@libsql/client` adapter) - 提供型別安全的資料存取。
*   **身分認證**: [Auth.js (NextAuth)](https://authjs.dev/) - 使用 Google OAuth。
*   **電子郵件**: **Brevo (原 Sendinblue)** - 透過 SMTP/API 發送邀約信。
*   **版本控制**: **GitHub** - 與 Vercel 自動部署整合。
*   **試算表處理**: `xlsx` (SheetJS) - 處理 Excel 範本下載與批次匯入。

---

## 2. 系統架構與模組

### 2.1 資料庫設計 (ERD)

*   `Profile`: 人員基本資料，以 `四眾編號` 為唯一識別。
*   `UserRole`: 權限管理（管理者、專職、悅眾）。
*   `Activity`: 活動資訊（名稱、日期、負責人）。
*   `Group`: 活動組別（內護、外護等）與名額控管。
*   `Invitation`: 邀約狀態（待定、可護持、不克參與、已確認）。
*   `AuditLog`: 全域異動紀錄（操作者、時間、舊值、新值）。

**資料庫架構 (ch_ 前綴與 snake_case 映射)**

### 2.2 核心功能模組

*   **後台管理系統**: 管理人員權限、初始化首位管理員。
*   **活動與組別引擎**: 建立活動（包含每日「開始時間」與「結束時間」）、設定組別名額。
*   **信件版樣管理**: 編輯動態 Email 版樣、提供發送測試功能。
*   **Excel 名冊處理**: 提供範本下載、批次匯入並自動更新或建立義工資料。
*   **邀約回覆流程**: 自動發送 Email、提供免登入的 RSVP 回覆頁面。
*   **審核儀表板**: 悅眾檢視回覆、處理衝突（一人多組）、核准護持。

---

## 3. UI/UX 設計方向 (Refined)

*   **美學**: 「現代禪風 (Modern Zen)」。參考雲來寺設計，注重呼吸感與圓角設計 (`radius-2xl`)。
*   **深色模式 (Dark Mode)**: 提供禪風深色模式，允許每位使用者自行切換與啟動深淺色主題。深色模式下維持柔和不刺眼的對比度。
*   **配色**:
    *   **主色**: 深綠色 (`#2D5A5A`)、大地茶色 (`#5E5345`)。
    *   **背景**: 淺色溫潤石灰色 (`#F8F9FA` / Stone-50)；深色模式採用深邃沉穩的灰黑色系。
*   **響應式**: 完整支援手機與平板，具備頂部導覽列與側滑選單。
*   **以菩薩為中心設計**: 使用者多為 40-70 歲義工，UI 必須「大字、大按鈕、步驟清楚」，並且每個操作都有中文確認提示。

---

## 4. 開發工作流程：使用 Claude Code in VS Code

### 4.1 工具設定

1.  在 VS Code 安裝 **Claude Code 擴充套件**（或透過 Terminal 使用 `claude` CLI）。
2.  開啟專案資料夾，Claude Code 將讀取 `PLAN.md`、`REQUIREMENTS.md` 作為上下文。
3.  建議在專案根目錄建立 `CLAUDE.md`，補充給 Claude 的開發慣例說明（技術棧、命名規則、禁止事項等）。

### 4.2 需求調整與新增功能的操作方式

| 情境 | 操作建議 |
| :--- | :--- |
| **需求澄清** | 在 `REQUIREMENTS.md` 直接修改後，請 Claude Code：「根據更新後的需求文件，說明哪些部分需要調整程式碼」 |
| **新增功能** | 在 `REQUIREMENTS.md` 新增章節描述需求，再請 Claude Code：「根據 §X.X 新需求，規劃並實作對應的頁面與 API」 |
| **UI 微調** | 指向具體元件路徑，例如：「調整 `components/ActivityCard.tsx` 的樣式，符合現代禪風設計」 |
| **重構** | 請 Claude Code：「在不改變功能前提下，重構 `app/activities/page.tsx`，提升可讀性」 |

### 4.3 推薦的 CLAUDE.md 內容範本

```markdown
# 給 Claude 的開發慣例

## 技術棧
- Next.js 14 App Router, TypeScript, Tailwind CSS
- Prisma + Turso (LibSQL), Auth.js

## 命名規則
- 元件：PascalCase (e.g., ActivityCard)
- 函數/變數：camelCase
- 資料庫表格：ch_ 前綴 + snake_case

## 開發原則
- Server Component 優先，僅在需要互動時使用 Client Component
- 所有寫入操作必須紀錄 AuditLog
- 禁止直接刪除資料，一律採軟刪除（is_deleted flag 或 停用標記）

## 目前開發階段
- 階段一（進行中）：前端 UI Mock 畫面，使用靜態假資料，不連接資料庫
```

---

## 5. 開發階段規劃

### ✅ 階段一：UI 畫面先行（Frontend-First，靜態 Mock）

> **目標**：完成所有畫面，使用靜態假資料展示給使用者確認，**不連接資料庫**。

**策略**：
- 所有頁面使用硬編碼的假資料（mock data），存放於 `lib/mock/` 目錄。
- API Route 先以假資料回傳，之後僅需替換為真實 DB 查詢。
- 完成後安排使用者驗收（UAT Preview），確認所有畫面與流程符合預期。

**待開發畫面清單**：

| 功能模組 | 頁面 / 元件 | 狀態 |
| :--- | :--- | :--- |
| 登入 | Google OAuth 登入頁、首次連結四眾編號頁 | ⬜ 待開發 |
| 人員管理 | 人員列表、新增/編輯人員、權限設定 | ⬜ 待開發 |
| 活動管理 | 活動列表、建立/編輯活動（含排程類型與每日起迄時間）、組別設定 | ⬜ 待開發 |
| 信件管理 | 自訂 Email 內容版樣編輯器、發送測試信功能 | ⬜ 待開發 |
| Excel 匯入 | 範本下載、上傳預覽、匯入結果摘要 | ⬜ 待開發 |
| 邀約管理 | 發送邀約、邀約狀態總覽 | ⬜ 待開發 |
| RSVP 頁面 | 義工免登入回覆頁（Token 連結） | ⬜ 待開發 |
| 審核儀表板 | 悅眾審核畫面、衝突警示、名額剩餘 | ⬜ 待開發 |
| Audit Log | 異動紀錄查詢頁 | ⬜ 待開發 |

**使用者確認里程碑（Stage Gate）**：
- [ ] 所有畫面完成靜態 Mock
- [ ] 安排使用者 Demo（建議錄影存檔）
- [ ] 使用者簽核確認畫面 → 進入階段二

---

### ⬜ 階段二：後端資料庫整合

> **目標**：將靜態 Mock 替換為真實資料庫連線，實作所有 API Route。

**工作項目**：
1.  設定 Turso DB（建立 UAT 與 PROD 各自的資料庫實例）。
2.  執行 `prisma migrate` 建立資料表（ch_ 前綴）。
3.  實作 CRUD API Route（`app/api/`）。
4.  整合 Auth.js（Google OAuth + 四眾編號連結流程）。
5.  整合 Brevo Email 發信（邀約信、RSVP Token 產生）。
6.  Excel Upsert 邏輯（SheetJS 解析 → Prisma upsert → AuditLog）。

**待確認項目**：
- [ ] Turso 免費方案限制（讀寫頻率、儲存空間）是否符合需求？
- [ ] Brevo 每日發信上限（300 封免費）是否足夠？如超過需升級方案。
- [ ] Google OAuth 的 Authorized Redirect URIs 是否已設定 UAT / PROD 兩組？

---

### ⬜ 階段三：測試、UAT 驗收與 PROD 上線

詳見第 6 節「部署環境規劃」。

---

## 6. 部署環境規劃（UAT / PROD）

### 6.1 環境架構

| 項目 | UAT 環境 | PROD 環境 |
| :--- | :--- | :--- |
| **用途** | 使用者驗收測試、新功能預覽 | 正式對外服務 |
| **Vercel Project** | 同一個 Project，`uat` branch 自動部署 | `main` branch 自動部署 |
| **網址** | `uat-xxx.vercel.app`（Vercel Preview URL）| 自訂網域（如 `ddm-volunteer.org`）|
| **資料庫 (Turso)** | 獨立的 UAT DB 實例 | 獨立的 PROD DB 實例 |
| **Email (Brevo)** | 測試寄件者 / 限制收件人 | 正式寄件者設定 |
| **Auth.js Secret** | 獨立 `UAT_NEXTAUTH_SECRET` | 獨立 `PROD_NEXTAUTH_SECRET` |
| **Google OAuth** | 獨立 Client ID（Redirect URI 指向 UAT URL）| 獨立 Client ID（Redirect URI 指向 PROD URL）|

### 6.2 Vercel 環境變數設定方式

在 Vercel Dashboard → Settings → Environment Variables，依照環境分別設定：

```
# UAT (Preview)
TURSO_DATABASE_URL=libsql://your-uat-db.turso.io
TURSO_AUTH_TOKEN=...
NEXTAUTH_URL=https://uat-xxx.vercel.app
NEXTAUTH_SECRET=...（UAT 專用）
GOOGLE_CLIENT_ID=...（UAT OAuth App）
GOOGLE_CLIENT_SECRET=...
BREVO_API_KEY=...

# PROD (Production)
TURSO_DATABASE_URL=libsql://your-prod-db.turso.io
TURSO_AUTH_TOKEN=...
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=...（PROD 專用，不同於 UAT）
GOOGLE_CLIENT_ID=...（PROD OAuth App）
GOOGLE_CLIENT_SECRET=...
BREVO_API_KEY=...
```

### 6.3 分支策略（Git Flow 簡化版）

```
main          ← PROD，只接受來自 uat 的 PR merge
  ↑
uat           ← UAT，接受來自 feature/* 的 PR merge
  ↑
feature/xxx   ← 功能開發分支（開發人員日常工作）
```

**部署流程**：
1. 開發者在 `feature/xxx` 完成功能 → PR 合入 `uat`。
2. Vercel 自動部署至 UAT Preview URL。
3. 使用者在 UAT 環境驗收 → 確認無誤。
4. `uat` → `main` PR merge → Vercel 自動部署至 PROD。

### 6.4 資料庫 Migration 流程

```bash
# UAT migration
DATABASE_URL="libsql://your-uat-db.turso.io?authToken=..." npx prisma migrate deploy

# PROD migration（在 uat 驗證後執行）
DATABASE_URL="libsql://your-prod-db.turso.io?authToken=..." npx prisma migrate deploy
```

---

## 7. 待辦與待確認清單

### 🔴 高優先（開始開發前需確認）

- [ ] **Google Cloud Console**：建立兩組 OAuth 2.0 Client（UAT / PROD），設定各自的 Authorized Redirect URIs。
- [ ] **Turso**：建立 `uat` 與 `prod` 兩個資料庫實例，取得各自的 URL 與 Auth Token。
- [ ] **Brevo**：驗證寄件 Domain，確認每日發信配額是否滿足需求。
- [ ] **Vercel**：設定 Project、綁定 GitHub Repo，並設定好 UAT / PROD 環境變數。
- [ ] **四眾編號格式確認**：欄位長度、是否有特定格式規則（數字/字母/混合）？
- [ ] **自訂網域**：PROD 環境的網域名稱是否已購買/申請？

### 🟡 中優先（階段一進行中需確認）

- [ ] **RSVP 連結有效期限**：Token 多久失效（建議 7 天或至活動日前）？
- [ ] **假日資料來源**：智慧順延功能所需的台灣國定假日 API / 資料集（建議使用政府開放資料）。
- [ ] **Excel 範本欄位定義**：確認匯入範本的必填欄位名稱（與四眾編號對應關係）。
- [ ] **活動負責人**：一個活動可否有多位專職/悅眾負責人？
- [ ] **通知設計**：邀約信、審核結果通知信的內文版樣需確認（文字/Logo）。

### 🟢 低優先（後續迭代）

- [ ] LINE Notify 串接設計（群組 Token 管理方式）。
- [ ] 系統管理員是否需要「重置/重新邀約」功能（當義工 Email 失效時）？
- [ ] 報表匯出功能範圍（活動統計、義工出席率）。

