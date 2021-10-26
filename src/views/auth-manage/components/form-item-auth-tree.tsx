import React, { useState } from "react";
import { Tree, Form, FormProps } from "antd";
import { useRoutes } from "@/routes";
import { generatorAuthTreeOptionFromRoutes } from "@/model/auth-tree";

interface FormOptionAuthTreeProps {
  [key: string]: any;
  value?: Antd.TreeCheckedKeys;
  onChange?: (value: Antd.TreeCheckedKeys) => void;
}
const FormOptionAuthTree: React.FC<ViewProps<FormOptionAuthTreeProps>> = (props) => {
  const { className = "", value = { checkedKeys: [] }, onChange } = props;
  const { routeList } = useRoutes();
  const [treeOption] = useState(generatorAuthTreeOptionFromRoutes(routeList)); //不会每次只需

  return (
    <Tree
      checkedKeys={value.checkedKeys}
      checkable
      className={className}
      treeData={treeOption}
      //  React.Key[] antd 不兼容
      onCheck={(checkedKeys: any = [], info: Antd.CheckInfo) => {
        //tip 什么时候不是数组
        onChange && onChange({ checkedKeys, halfCheckedKeys: info.halfCheckedKeys || [] });
      }}></Tree>
  );
};

interface Props extends FormProps {
  [key: string]: any;
}
const FormItemAuthTree: React.FC<ViewProps<Props>> = (props) => {
  const { className = "", name = "authTree" } = props;
  //render
  return (
    <Form.Item className={className} name={name} label="权限列表">
      <FormOptionAuthTree />
    </Form.Item>
  );
};
export default FormItemAuthTree;
