import { IpcMainInvokeEvent, shell } from "electron";

export const OpenExternalName = "OpenExternal";
// 失焦
export function OpenExternal(_event: IpcMainInvokeEvent, { url }: { url: string }) {
  // 打开链接
  url && shell.openExternal(url);
}
