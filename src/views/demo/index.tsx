import React from "react";
import useModal from "./hooks-modal";
// interface Props {}
const Demo: React.FC<ViewsProps> = () => {
  const DemoButton = useModal();

  //render
  return (
    <div>
      <DemoButton.Button active={"点击试试"}>点击试试</DemoButton.Button>
      <DemoButton.Button active={"点击试试1"}>点击试试1</DemoButton.Button>
      <DemoButton.Button active={"点击试试2"}>点击试试2</DemoButton.Button>
      <DemoButton.Button active={"点击试试3"}>点击试试3</DemoButton.Button>

      <DemoButton.Modal></DemoButton.Modal>
    </div>
  );
};
export default Demo;
