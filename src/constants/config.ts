import { Quadrant } from "@/types/todo";
import a from "@/assets/images/反馈问题.png";
import b from "@/assets/images/工作分配.png";
import c from "@/assets/images/接受工作.png";
import d from "@/assets/images/汇报工作.png";
import e from "@/assets/images/工作复盘.png";
import f from "@/assets/images/说服他人.png";

interface QuestConfigType {
  title: string;
  id: number;
  description?: string;
  img?: string;
  link?: string;
  icon: string;
  explain?: string;
}
export const QuestConfig: QuestConfigType[] = [
  {
    title: "工作分配",
    description: "能抓住重点",
    img: b,
    id: 1,
    icon: "icon-xing",
    explain: `领导安排的任务总能快速抓到重点，按『四象限法则』安排事情优先级，所有事情都能安排得非常有条理

重要且紧急:马上做(精力分配20%)

重要但不紧急:有计划地做(精力分配50%)

不重要不紧急:少做或尽量不做(精力分配5%)

不重要但紧急:授权别人做(精力分配25%)`,
  },
  {
    title: "接受工作",
    description: "问清标准",
    img: c,
    id: 2,
    icon: "icon-xingxing",
    explain: `对领导安排的工作从不拒绝，但是一定要按照『3W原则』提前梳理工作框架，和领导沟通清楚这样工作思路是否正确

Why:为什么做这件事，背景是什么?

What:做这件事需要准备什么
     准备这些东西领导是否能支持?

When:这项任务什么时候开始，和现在的工作是否有冲突?`,
  },
  {
    title: "反馈问题",
    description: "带解决方案",
    img: a,
    id: 3,
    icon: "icon-shengdanshu",
    explain: `能力强的人会让领导做选择题,遇到问题会按照『SCOA模型』想至少3种解决方案，然后与领导沟通哪种更合适

Situation:讲述现状，描述事实

Complication:目标与现实之间的差距

Question:主要面临的问题，一个或多个

Answer: 根据问题做出的解决方案`,
  },
  {
    title: "汇报工作",
    description: "突出结果",
    img: d,
    id: 4,
    icon: "icon-shengdanbaozhu",
    explain: `能力强的人知道领导关心的是工作结果而不是工作过程。汇报工作按『STAR法则』简述背景突出重点

Situation-情景:描述事件的背景和基本情况

Task-任务:主要负责任务

Action-行动:完成任务做了哪些事情

Result-结果:最终结果情况如何`,
  },
  {
    title: "复盘总结",
    description: "有舍有得",
    img: e,
    id: 5,
    icon: "icon-shengdanquqi",
    explain: `能力强的人所有的工作都会进行详细复盘总结，按『KISS模型』分析执行任务的优势和不足，以防下次犯同样的错误

Keep-保持:需要保持的是什么

Improve-改进: 需要改进的是什么

Start-开始: 哪些可以立即开始

Stop-停止: 哪些要立即停止`,
  },
  {
    title: "说服他人",
    description: "有理有据",
    img: f,
    id: 6,
    icon: "icon-shengdanmaozi",
    explain: `能力强的人在说服别人是总能按照『WWRH模型』找到利益共同点，让大家愿意一起做事

Why:说明做事动机，对大家有什么好处，不做有什么后果

What: 从动机出发明确要做什么，达到什么程度

Result: 做这件事会产生什么结果，收益如何

How:这件事要怎么做，团队怎么分工，需要哪些资源`,
  },
];
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
    title: "头脑风暴",
    id: 2,
    link: "/quest",
    icon: "icon-tounaofengbao",
  },
];

export const levels = [
  {
    level: Quadrant.First,
    label: "高",
    color: "#c33d30",
  },
  {
    level: Quadrant.Second,
    label: "中",
    color: "#eeac3e",
  },
  {
    level: Quadrant.Third,
    label: "低",
    color: "#5070f2",
  },
  {
    level: Quadrant.NumberFour,
    label: "无",
    color: "#999998",
  },
];
