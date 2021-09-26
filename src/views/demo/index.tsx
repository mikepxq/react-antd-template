import ContentMain from "@/console-layout/content-main";
import React, { Suspense } from "react";
import { RouteView } from "@/routes";
import LazySpin from "@/components/lazy-spin";
// interface Props {}
const Demo: React.FC<ViewProps> = (props) => {
  //render
  return (
    <ContentMain className="demo-page">
      <Suspense fallback={<LazySpin />}>
        <RouteView routes={props.to?.children || []}></RouteView>
      </Suspense>
    </ContentMain>
  );
};
export default Demo;
