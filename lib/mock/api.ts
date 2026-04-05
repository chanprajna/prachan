import { Profile, Activity, Group, Invitation, EmailTemplate } from '@/types';
import { mockProfiles, mockActivities, mockGroups, mockInvitations, mockEmailTemplates } from './data';

// 模擬網路延遲
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getActivities(): Promise<Activity[]> {
  await delay(500);
  return [...mockActivities];
}

export async function getActivityById(id: string): Promise<Activity | undefined> {
  await delay(300);
  return mockActivities.find(a => a.id === id);
}

export async function getProfiles(): Promise<Profile[]> {
  await delay(500);
  return [...mockProfiles];
}

export async function getProfileById(id: string): Promise<Profile | undefined> {
  await delay(300);
  return mockProfiles.find(p => p.id === id);
}

export async function getGroupsByActivityId(activityId: string): Promise<Group[]> {
  await delay(300);
  return mockGroups.filter(g => g.activityId === activityId && g.isActive);
}

export async function getEmailTemplates(): Promise<EmailTemplate[]> {
  await delay(400);
  return [...mockEmailTemplates];
}

// TODO: 後續可補充 mock 新增/更新/刪除的函式，例如 createActivity, updateActivity 等，
// 但目前做為 UI Mock 展示，只需讀取即可，表單送出可先 console.log()。
