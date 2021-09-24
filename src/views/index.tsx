import React from "react";
interface Props {
  [key: string]: any;
}
const App: React.FC<ViewProps<Props>> = (props) => {
  const { className } = props;
  //render
  return <div className={`${className}`}>app</div>;
};
export default App;
