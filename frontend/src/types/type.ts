export interface TaskType {
  id: number;
  title: string;
  description: string;
  assigned_member_1: string;
  assigned_member_2: string | null;
  priority: string;
  deadline: string;
}
