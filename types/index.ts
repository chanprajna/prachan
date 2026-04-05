// 1. 使用者與人員相關
export type UserRole = 'ADMIN' | 'STAFF' | 'YUEZONG' | 'VOLUNTEER';

export interface Profile {
  id: string;             // 系統內部 UUID
  fourAsmId: string;      // 四眾編號 (關鍵識別)
  name: string;
  gender: 'M' | 'F' | 'OTHER';
  email: string | null;
  phone: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;     // 禁用實體刪除，採用軟刪除
}

// 2. 活動相關
export type ActivityScheduleType = 'SINGLE_DAY' | 'TWO_DAYS_NO_OVERNIGHT' | 'TWO_DAYS_OVERNIGHT' | 'REGULAR_WEEKLY';

export interface Activity {
  id: string;
  title: string;
  description: string | null;
  scheduleType: ActivityScheduleType;
  startDate: Date;
  endDate: Date;
  startTime: string;       // 每日開始時間，例如 "09:00"，整天過夜也可視為一個區段
  endTime: string;         // 每日結束時間，例如 "17:00"
  scheduleDetails?: any;   // 可彈性存放 JSON 格式的週課規律、例外順延假期等
  status: 'DRAFT' | 'PUBLISHED' | 'COMPLETED';
}

// 3. 組別與邀約相關
export interface Group {
  id: string;
  activityId: string;
  name: string;           // 預設: 內護、外護、學長等
  quota: number;          // 預設名額，0 表無上限
  isActive: boolean;      // 停用標記 (取代刪除)
}

export type ReplyStatus = 'PENDING' | 'ACCEPT' | 'DECLINE'; 

export interface Invitation {
  id: string;
  profileId: string;
  groupId: string;
  status: ReplyStatus;
  token: string;          // RSVP 專屬短網址代碼
  tokenExpiresAt: Date;
  replyNote?: string;     // 義工填寫的意見
  isApproved: boolean;    // 悅眾審核確認標記
  invitedAt: Date;
}

// 4. 全域日誌
export interface AuditLog {
  id: string;
  actorId: string;        // 執行此動作的操作者 Profile ID
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'EXCEL_IMPORT' | 'SEND_EMAIL';
  targetTable: string;    // 例如: ch_profile
  targetId: string;       // 關聯異動目標的實體 ID
  oldValue: Record<string, any> | null;
  newValue: Record<string, any> | null;
  createdAt: Date;
}

// 5. 信件版樣相關
export interface EmailTemplate {
  id: string;
  name: string;           // 版型名稱 (例：活動邀約信、行前通知)
  subject: string;        // 信件主旨 (可含變數)
  bodyHtml: string;       // HTML 內容 (含 {{活動名稱}}, {{義工姓名}} 等變數)
  createdAt: Date;
  updatedAt: Date;
}
