import { Button } from "antd";
import React, { useState } from "react";
interface Props {
  [key: string]: any;
}

const HookLog: React.FC<ViewProps<Props>> = (props) => {
  const { className = "" } = props;
  const [num, setNum] = useState(0);
  const onClick = () => {
    for (let index = 0; index < 5; index++) {
      setTimeout(() => {
        setNum(num + 1);
        console.log("[num]", num);
      }, 1000);
    }
  };
  const _code = `
  const [num, setNum] = useState(0);
  const onClick = () => {
    for (let index = 0; index < 5; index++) {
      setTimeout(() => {
        setNum(num + 1);
        console.log("[num]", num);
      }, 1000);
    }
  };`;
  //render
  return (
    <div>
      <a
        href="https://mp.weixin.qq.com/s?fontRatio=1&__biz=MzAxODE2MjM1MA==&mid=2651575129&idx=2&sn=453fc288b8abfe19404581ce77d548d9&scene=98&subscene=315&passparam=searchid%3D10982910159347627915&clicktime=1632653289&enterid=1632653289#wechat_redirect"
        target="_blank"
        rel="noreferrer">
        参考博文
      </a>
      <pre>{_code}</pre>
      <Button className={className} onClick={onClick}>
        F12 , 点击试试，输出啥。 {num}
      </Button>
    </div>
  );
};
export default HookLog;
