import ContentMain from "@/console-layout/content-main";
import React, { Suspense } from "react";
import { RouterView } from "@/router";
import LazySpin from "@/components/lazy-spin";
// interface Props {}
const Demo: React.FC<ViewProps> = (props) => {
  //render
  return (
    <ContentMain className="demo-page">
      <Suspense fallback={<LazySpin />}>
        <RouterView routes={props.to?.children || []}></RouterView>
      </Suspense>
    </ContentMain>
  );
};
export default Demo;
