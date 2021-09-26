import React from "react";
import useModal from "./hook";
import "./index.less";
interface Props {
  [key: string]: any;
}
const HooksModalPage: React.FC<ViewProps<Props>> = (props) => {
  const { className = "" } = props;
  const DemoButton = useModal();

  //render
  return (
    <div className={className}>
      <div>
        <p>
          我们写modal的时候，总是要借用父组件的一个state，然后在不同的地方掉用show、hidden函数，那么我们为什么不把button
          和modal写在一起，并且将工具函数也封装在一起。这样用起来的时候，直接用button，及一个放modal的位置就好了。
        </p>
        <p>废话不多说，你们可以直接看原码</p>
      </div>
      <DemoButton.Button active={"我被点击了"}>hook modal</DemoButton.Button>
      <div className="article-wrap" style={{ marginTop: 10 }}>
        <p>现在有的问题，直接更新useRef的值无效，必须使用一个state触发渲染</p>
        <p>我也是总结、学习，如有大佬，往请指教。</p>
      </div>
      <DemoButton.Modal></DemoButton.Modal>
    </div>
  );
};
export default HooksModalPage;
