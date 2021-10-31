import LazySpin from "@/components/lazy-spin";
import { RouterView } from "@/router";
import React, { Suspense } from "react";
interface Props {
  [key: string]: any;
}
const Nested: React.FC<ViewProps<Props>> = (props) => {
  const { className } = props;
  //render
  return (
    <div>
      Nested
      <Suspense fallback={<LazySpin />}>
        <RouterView routes={props.to?.children as []} className={className}></RouterView>
      </Suspense>
    </div>
  );
};
export default Nested;
