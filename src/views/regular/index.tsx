import React from "react";
interface Props {
  [key: string]: any;
}
const regList = [
  {
    title: "手机号码的校验",
    reg: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
    code: `
    const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
    
    const phoneStr1 = '18886233487'
    console.log(phoneReg.test(phoneStr1)) // true
    
    const phoneStr2 = '17283017203897'
    console.log(phoneReg.test(phoneStr2)) // false`,
  },
];
const Regular: React.FC<ViewProps<Props>> = (props) => {
  const { className = "" } = props;
  //render
  return (
    <div className={className}>
      <h1>deving</h1>
      <ul>
        {regList.map((item, index) => {
          return (
            <li key={`${item.title}-${index}`}>
              {index + 1}
              <h3>{item.title}</h3>
              <p>{String(item.reg)}</p>
              <pre>{item.code}</pre>
            </li>
          );
        })}
      </ul>
      <p>
        参照：
        <a href="https://mp.weixin.qq.com/s/PWwEgxg-rEASYCe04oBl2w">
          https://mp.weixin.qq.com/s/PWwEgxg-rEASYCe04oBl2w
        </a>
      </p>
    </div>
  );
};
export default Regular;
