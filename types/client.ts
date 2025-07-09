// types/client.ts
export interface Client {
  id: number;
  sfId: string;
  name: string;
  departmentType: string;
  checklistStatus: string;
  assigningUserId: number;
  status: string;
  email: string;
  logo?: string;
  createdAt: string;
}
