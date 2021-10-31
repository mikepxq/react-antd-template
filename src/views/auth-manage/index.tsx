import React, { Suspense } from "react";
import ContentMain from "@/console-layout/content-main";
import LazySpin from "@/components/lazy-spin";
import { RouterView } from "@/router";
interface Props {
  [key: string]: any;
}
const AuthManage: React.FC<ViewProps<Props>> = (props) => {
  const { className = "" } = props;

  //render
  return (
    <ContentMain className={className}>
      <Suspense fallback={<LazySpin />}>
        <RouterView routes={props.to?.children as []} className={className}></RouterView>
      </Suspense>
    </ContentMain>
  );
};
export default AuthManage;
