import LazySpin from "@/components/lazy-spin";
import { RouterView } from "@/router";
import React, { Suspense } from "react";
interface Props {
  [key: string]: any;
}
const ArticleManage: React.FC<ViewProps<Props>> = (props) => {
  const { className = "" } = props;
  //render
  return (
    <Suspense fallback={<LazySpin />}>
      <RouterView routes={props.to?.children as []} className={className}></RouterView>
    </Suspense>
  );
};
export default ArticleManage;
