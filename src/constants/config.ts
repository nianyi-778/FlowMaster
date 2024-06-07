interface HomeConfigType {
  title: string;
  id: number;
  link?: string;
  icon: string;
}

export const homeConfig: HomeConfigType[] = [
  {
    title: "四象限",
    id: 1,
    icon: "icon-dibutubiao-sixiangxian",
  },
  {
    title: "任务",
    id: 2,
    icon: "icon-todo-icon",
  },
];
