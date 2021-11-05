import { removeFirstLineOfTemplateString } from "@/utils";
import React from "react";
import { Collapse } from "antd";
import ContentMain from "@/console-layout/content-main";
const { Panel } = Collapse;
interface Props {
  [key: string]: any;
}
const regList = [
  {
    title: "手机号码的校验",
    reg: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
    code: removeFirstLineOfTemplateString(`
    const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
    
    const phoneStr1 = '18886233487'
    console.log(phoneReg.test(phoneStr1)) // true
    
    const phoneStr2 = '17283017203897'
    console.log(phoneReg.test(phoneStr2)) // false`),
  },
];
const Regular: React.FC<ViewProps<Props>> = (props) => {
  const { className = "" } = props;
  //render
  return (
    <ContentMain className={className}>
      <Collapse>
        {regList.map((item, index) => {
          return (
            <Panel
              key={`${item.title}-${index}`}
              header={
                <>
                  <span className="inline-block" style={{ minWidth: 100 }}>
                    {index + 1}.{item.title}:
                  </span>
                  <span style={{ marginLeft: 10 }}>{String(item.reg)}</span>
                </>
              }>
              <pre>
                <code>{item.code}</code>
              </pre>
            </Panel>
          );
        })}
      </Collapse>
      <ul></ul>
      <p>
        参照：
        <a href="https://mp.weixin.qq.com/s/PWwEgxg-rEASYCe04oBl2w">
          https://mp.weixin.qq.com/s/PWwEgxg-rEASYCe04oBl2w
        </a>
      </p>
    </ContentMain>
  );
};
export default Regular;
