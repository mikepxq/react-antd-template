import { reqRoleOptionList } from "@/apis";
import { appMessage } from "@/plugins/antd";
import { Select } from "antd";
const { Option } = Select;
import React, { useEffect, useState } from "react";
interface Props {
  [key: string]: any;
  value?: number;
  onChange?: (value: number) => void;
}
let isUnMount = false;
const FormRoleOption: React.FC<ViewProps<Props>> = (props) => {
  const { className = "", value, onChange } = props;
  const [list, setList] = useState<OptionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const getList = async () => {
    if (loading) return;
    setLoading(true);
    const res = await reqRoleOptionList();
    if (isUnMount) return; //避免卸载后渲染
    setLoading(false);
    if (res.code != 200) appMessage.error(res.message || "获取数据失败！");
    setList(res.data);
    if (value === undefined) onChange && onChange(res.data[0].value);
  };
  useEffect(() => {
    isUnMount = false;
    getList();
    return () => {
      isUnMount = true;
    };
  }, []);
  //render
  return (
    <Select className={className} loading={loading} value={value} onChange={onChange} placeholder="请选择">
      {list.map((item, index) => (
        <Option value={item.value} key={`${item.value}-${index}`}>
          {item.text}
        </Option>
      ))}
    </Select>
  );
};
export default FormRoleOption;
