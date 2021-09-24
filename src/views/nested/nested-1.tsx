import React from "react";
interface Props {
  [key: string]: any;
}
const Nested1: React.FC<ViewProps<Props>> = (props) => {
  const { className } = props;
  //render
  return <div className={className}>Nested1</div>;
};
export default Nested1;
