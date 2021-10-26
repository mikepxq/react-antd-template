import React, { Suspense } from "react";
import ContentMain from "@/console-layout/content-main";
import LazySpin from "@/components/lazy-spin";
import { RouteView } from "@/routes";
interface Props {
  [key: string]: any;
}
const AuthManage: React.FC<ViewProps<Props>> = (props) => {
  const { className = "" } = props;

  //render
  return (
    <ContentMain className={className}>
      <Suspense fallback={<LazySpin />}>
        <RouteView routes={props.to?.children as []} className={className}></RouteView>
      </Suspense>
    </ContentMain>
  );
};
export default AuthManage;
