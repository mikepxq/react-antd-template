/**对antd的封装 */
import { message } from "antd";
import { ArgsProps } from "node_modules/antd/lib/message/index.d";
declare type ConfigContent = React.ReactNode | string;
declare type JointContent = ConfigContent | ArgsProps;
type Type = "error" | "info" | "warning" | "loading" | "warn" | "success";
// deving
const messageFn = (type: Type, option?: JointContent) => {
  message.destroy();
  message[type](option);
};
/** 封装 antd message 去重提示 */
export const appMessage = {
  /**兼容antd 但主要为直接的文案 */
  success: (content: ConfigContent) => messageFn("success", content),
  warn: (content: ConfigContent) => messageFn("warn", content),
  error: (content: ConfigContent) => messageFn("error", content),
  info: (content: ConfigContent) => messageFn("info", content),
};
