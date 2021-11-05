/**对antd的封装 */
import { message, notification } from "antd";
import { ArgsProps } from "node_modules/antd/lib/message/index.d";
import { ArgsProps as NotificationArgsProps } from "node_modules/antd/lib/notification/index.d";
type NotificationType = "error" | "info" | "warning" | "warn" | "success";
const messageFn = (type: MessageType, option?: JointContent) => {
  message.destroy();
  message[type](option);
};
const notificationFn = (type: NotificationType, option: NotificationArgsProps) => {
  notification.destroy();
  notification[type](option);
};
/** 封装 antd notification 去重提示 */
export const appNotification = {
  /**兼容antd 但主要为直接的文案 */
  success: (content: NotificationArgsProps) => notificationFn("success", content),
  warn: (content: NotificationArgsProps) => notificationFn("warn", content),
  error: (content: NotificationArgsProps) => notificationFn("error", content),
  info: (content: NotificationArgsProps) => notificationFn("info", content),
};

declare type ConfigContent = React.ReactNode | string;
declare type JointContent = ConfigContent | ArgsProps;
type MessageType = "error" | "info" | "warning" | "loading" | "warn" | "success";
/** 封装 antd message 去重提示 */
export const appMessage = {
  /**兼容antd 但主要为直接的文案 */
  success: (content: ConfigContent) => messageFn("success", content),
  warn: (content: ConfigContent) => messageFn("warn", content),
  error: (content: ConfigContent) => messageFn("error", content),
  info: (content: ConfigContent) => messageFn("info", content),
};
