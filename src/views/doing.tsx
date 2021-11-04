import ContentMain from "@/console-layout/content-main";
import { Steps } from "antd";
import React from "react";
const { Step } = Steps;
interface Props {
  [key: string]: any;
}
const StepList = [
  { title: "...", description: "构建，统一环境，基础架构等" },
  { title: "面包屑", description: "容器顶部面包屑" },
  { title: "访问记录tag", description: "明天 tag 状态 需要svg" },
  { title: "容器", description: "统一容器" },
  { title: "deving登录页", description: "使用异步动态路由，完成权限管理。路由组件 默认组件 route-view" },
  { title: "deving", description: "top nav user menu" },
  { title: "deving", description: "本地后端服务器跑起来" },
  { title: "deving", description: "github demo 页面" },
];
const Doing: React.FC<ViewProps<Props>> = (props) => {
  const { className } = props;
  //render
  return (
    <ContentMain className={className}>
      <h2>项目记录</h2>
      <Steps direction="vertical" current={4}>
        {StepList.map((item, index) => {
          return <Step title={item.title} description={item.description} key={`${item.title}-${index}`}></Step>;
        })}
      </Steps>
    </ContentMain>
  );
};
export default Doing;
