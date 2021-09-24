import LazySpin from "@/components/lazy-spin";
import { RouteView } from "@/routes";
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
        <RouteView routes={props.to?.children as []} className={className}></RouteView>
      </Suspense>
    </div>
  );
};
export default Nested;
