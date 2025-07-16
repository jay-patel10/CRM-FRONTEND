export interface Client {
  id: number;
  sfId: string;
  name: string;
  email?: string;
  departmentType: string;
  checklistStatus?: string;
  status?: string;
  assigningUserId?: number;
}
