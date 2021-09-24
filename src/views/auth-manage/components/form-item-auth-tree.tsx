import React, { useState } from "react";
import { Tree, Form, FormProps } from "antd";
import { useRoutes } from "@/routes";
import { generatorAuthTreeOptionFromRoutes } from "@/model/auth-tree";

interface FormOptionAuthTreeProps {
  [key: string]: any;
}
const FormOptionAuthTree: React.FC<ViewProps<FormOptionAuthTreeProps>> = (props) => {
  const { className = "" } = props;
  const { routeList } = useRoutes();
  const [treeOption] = useState(generatorAuthTreeOptionFromRoutes(routeList)); //不会每次只需
  console.log("[treeOption]", treeOption);
  return <Tree checkable className={className} treeData={treeOption}></Tree>;
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
