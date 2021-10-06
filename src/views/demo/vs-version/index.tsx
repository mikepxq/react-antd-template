import AppInput from "@/components/app-input";
import { patternMap } from "@/model";
import { Button, Card, Col, Form, Row } from "antd";
import React, { useEffect, useState } from "react";
import "./index.less";
/**
 *
 * @param version
 * @returns 返回字符数组
 */
const getVersionSplit = (version: string) => {
  return version.split(".").map((v) => String(v)); //Number(0010)-->8
};
/**
 * 前提条件 版本字符是正确的
 * @param start
 * @param end
 */
const getIsLargeWithStart = (start: string, end: string) => {
  const startList = getVersionSplit(start),
    endList = getVersionSplit(end),
    len = startList.length > endList.length ? startList.length : endList.length;
  let isLargeWithStart = undefined; //
  // console.log("[]", startList, endList);
  for (let i = 0; i < len; i++) {
    if (Number(startList[i] || 0) == Number(endList[i] || 0)) continue; //一样大的就比较下一个
    if (isLargeWithStart !== undefined) break; //已经有结果，不用再比较
    // console.log("[]", Number(startList[i] || 0), Number(endList[i] || 0));
    isLargeWithStart = Number(startList[i] || 0) > Number(endList[i] || 0);
  }
  return isLargeWithStart;
};
interface Props {
  [key: string]: any;
}
interface FormProps {
  startVersion: string;
  endVersion: string;
}
const demoList = [
  { start: "0.0.1.0", end: "0.0.1" },
  { start: "0.0.0.1", end: "0.0.1" },
  { start: "0.0.0001.1", end: "0.0.1" },
];
const StartVsResultElementMap = {
  greater: <span style={{ color: "green" }}>大于</span>,
  less: <span style={{ color: "red" }}>小于</span>,
  equal: <span>等于</span>,
};
const VsVersion: React.FC<ViewProps<Props>> = (props) => {
  const { className = "" } = props;

  const [startVsResult, setStartVsResult] = useState<"greater" | "less" | "equal">();
  //render
  const [form] = Form.useForm<FormProps>();
  useEffect(() => {
    form.setFieldsValue({
      startVersion: "0.1",
      endVersion: "0.0.1",
    });
    validator();
  }, []);
  const validator = async () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const _form = await form.validateFields().catch(() => {});
    if (!_form) return;
    const isLargeWithStart = getIsLargeWithStart(_form.startVersion, _form.endVersion);
    if (isLargeWithStart) return setStartVsResult("greater");
    if (isLargeWithStart === undefined) return setStartVsResult("equal");
    setStartVsResult("less");
  };
  return (
    <div className={`${className} demo-page`}>
      <h3>有些时候，我们需要判断开始和结束版本的大小，这里是实现了一个算法来完成比较</h3>
      <Card style={{ width: 500 }}>
        <Form
          form={form}
          onValuesChange={() => {
            validator();
          }}>
          <Row>
            <Col span={11}>
              <Form.Item
                name="startVersion"
                rules={[{ pattern: patternMap.appVersion, message: "请输入正确的版本格式，如：0.0.1" }]}>
                <AppInput placeholder="请输入开始版本"></AppInput>
              </Form.Item>
            </Col>
            <Col span={2} style={{ textAlign: "center" }}>
              ---
            </Col>
            <Col span={11}>
              <Form.Item
                name="endVersion"
                rules={[{ pattern: patternMap.appVersion, message: "请输入正确的版本格式，如：0.0.1" }]}>
                <AppInput placeholder="请输入结束版本"></AppInput>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="clear">
            <Button className="fr" type="primary" onClick={validator}>
              验证
            </Button>
          </Form.Item>
        </Form>
        {startVsResult && <p>开始是大的版本号：{StartVsResultElementMap[startVsResult]}</p>}

        <ul className="demo-list">
          <li className="title-item">
            <span>开始版本</span>
            <span>结束版本</span> <Button></Button>
          </li>
          {demoList.map((item, index) => {
            return (
              <li key={`${item.start}-${index}`} className="clear">
                <span>{item.start}</span>
                <span>{item.end}</span>
                <Button
                  className="fr"
                  onClick={() => {
                    form.setFieldsValue({ startVersion: item.start, endVersion: item.end });
                    validator();
                  }}>
                  验证
                </Button>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
};
export default VsVersion;
