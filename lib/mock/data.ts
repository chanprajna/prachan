import { Profile, Activity, Group, Invitation, EmailTemplate, AuditLog } from '@/types';

export const mockProfiles: Profile[] = [
  {
    id: 'p-1',
    fourAsmId: 'A000001',
    name: '首位管理員',
    gender: 'M',
    email: 'admin@example.com',
    phone: '0912345678',
    role: 'ADMIN',
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  },
  {
    id: 'p-2',
    fourAsmId: 'S000001',
    name: '活動專職',
    gender: 'F',
    email: 'staff@example.com',
    phone: '0987654321',
    role: 'STAFF',
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  },
  {
    id: 'p-3',
    fourAsmId: 'Y000001',
    name: '內護悅眾',
    gender: 'M',
    email: 'yuezong@example.com',
    phone: '0911222333',
    role: 'YUEZONG',
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  },
  {
    id: 'p-4',
    fourAsmId: 'V000001',
    name: '王小明',
    gender: 'M',
    email: 'volunteer1@example.com',
    phone: '0988777666',
    role: 'VOLUNTEER',
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
  }
];

export const mockActivities: Activity[] = [
  {
    id: 'a-1',
    title: '法鼓山傳燈院禪修體驗營',
    description: '引領新手體驗禪修的基礎課程。',
    scheduleType: 'TWO_DAYS_OVERNIGHT',
    startDate: new Date('2026-05-10'),
    endDate: new Date('2026-05-11'),
    startTime: '09:00',
    endTime: '17:00',
    status: 'PUBLISHED',
  },
  {
    id: 'a-2',
    title: '初階禪訓班',
    description: '為期八週的規律性週課。',
    scheduleType: 'REGULAR_WEEKLY',
    startDate: new Date('2026-06-01'),
    endDate: new Date('2026-07-20'),
    startTime: '19:00',
    endTime: '21:00',
    scheduleDetails: { weeks: 8, dayOfWeek: 3, skipHolidays: true },
    status: 'DRAFT',
  }
];

export const mockGroups: Group[] = [
  { id: 'g-1', activityId: 'a-1', name: '內護', quota: 10, isActive: true },
  { id: 'g-2', activityId: 'a-1', name: '外護', quota: 20, isActive: true },
  { id: 'g-3', activityId: 'a-2', name: '學長', quota: 5, isActive: true },
];

export const mockInvitations: Invitation[] = [
  {
    id: 'i-1',
    profileId: 'p-4',
    groupId: 'g-1',
    status: 'PENDING',
    token: 'token-abcde',
    tokenExpiresAt: new Date('2026-05-01'),
    isApproved: false,
    invitedAt: new Date(),
  }
];

export const mockEmailTemplates: EmailTemplate[] = [
  {
    id: 'et-1',
    name: '活動邀約信',
    subject: '邀請您參與 {{活動名稱}}',
    bodyHtml: '<p>親愛的 {{義工姓名}} 菩薩 您好，</p><p>誠摯邀請您參與護持 {{活動名稱}}。</p><p>請點擊下方連結回覆您的意願：<br><a href="{{RSVP連結}}">填寫護持意願</a></p>',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];
