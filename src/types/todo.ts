export interface Todo {
  id: number;
  title: string;
  description: string;
  status: 0 | 1;
  completedTime?: number;
  priority: Quadrant;
  isDeleted: 0 | 1;
  updateTime?: number;
}

export enum Quadrant {
  First = 1,
  Second,
  Third,
  NumberFour,
}
