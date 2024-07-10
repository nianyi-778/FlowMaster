import { Quadrant } from "@/types/todo";

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
    link: "/",
    icon: "icon-dibutubiao-sixiangxian",
  },
  {
    title: "任务",
    id: 2,
    link: "/quest",
    icon: "icon-todo-icon",
  },
];

export const levels = [
  {
    level: Quadrant.First,
    label: "高",
    color: "#c33d30",
  },
  {
    level: Quadrant.NumberFour,
    label: "中",
    color: "#eeac3e",
  },
  {
    level: Quadrant.Second,
    label: "低",
    color: "#5070f2",
  },
  {
    level: Quadrant.Third,
    label: "无",
    color: "#999998",
  },
];
