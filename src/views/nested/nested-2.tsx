import React from "react";
interface Props {
  [key: string]: any;
}
const Nested2: React.FC<ViewProps<Props>> = (props) => {
  const { className } = props;
  //render
  return <div className={className}>Nested2</div>;
};
export default Nested2;
