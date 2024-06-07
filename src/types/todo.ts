export interface Todo {
  id: string;
  title: string;
  describe?: string;
  done: boolean;
  end_time?: number;
  quadrant: Quadrant;
  updated_at?: number;
}

export enum Quadrant {
  First = 1,
  Second,
  Third,
  NumberFour,
}
