/**对antd的封装 */
import { sleep } from '@/utils';
import { message, ModalFuncProps, notification, Modal } from 'antd';
import { ArgsProps } from 'antd/es/message';
import { ArgsProps as NotificationArgsProps } from 'antd/es/notification/interface';
const { confirm } = Modal;
type NotificationType = 'error' | 'info' | 'warning' | 'success';

const notificationFn = (type: NotificationType, option: NotificationArgsProps) => {
  notification.destroy();
  notification[type](option);
};
/** 封装 antd notification 去重提示 */
export const appNotification = {
  /**兼容antd 但主要为直接的文案 */
  success: (content: NotificationArgsProps) => notificationFn('success', content),
  warning: (content: NotificationArgsProps) => notificationFn('warning', content),
  error: (content: NotificationArgsProps) => notificationFn('error', content),
  info: (content: NotificationArgsProps) => notificationFn('info', content),
};

declare type ConfigContent = React.ReactNode | string;
declare type JointContent = ConfigContent | ArgsProps;
type MessageType = 'error' | 'info' | 'warning' | 'loading' | 'success';
const messageFn = (type: MessageType, option?: JointContent) => {
  message.destroy();
  message[type](option);
};
/** 封装 antd message 去重提示 */
export const appMessage = {
  /**兼容antd 但主要为直接的文案 */
  success: (content: ConfigContent) => messageFn('success', content),
  error: (content: ConfigContent) => messageFn('error', content),
  warning: (content: ConfigContent) => messageFn('warning', content),
  info: (content: ConfigContent) => messageFn('info', content),
};

declare type ConfigUpdate = ModalFuncProps | ((prevConfig: ModalFuncProps) => ModalFuncProps);
interface ConfirmCallBackResult {
  destroy: () => void;
  update: (configUpdate: ConfigUpdate) => void;
}
/**封装 antd  confirm
 *
 * 放弃使用部分回调函数
 * @param config
 * @returns
 */
export const appConfirm = (
  config: Omit<ModalFuncProps, 'onOk' | 'onCancel'>
): Promise<false | ConfirmCallBackResult> => {
  return new Promise((resolve) => {
    const _c = confirm({
      ...config,
      onOk() {
        resolve(_c); //外部异步关闭
        return sleep(30); //模拟加载中……
      },
      onCancel() {
        resolve(false);
      },
    });
  });
};
