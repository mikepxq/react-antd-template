import React from "react";
interface Props {
  [key: string]: any;
  iconName: string;
}
const SvgIcon: React.FC<ViewProps<Props>> = (props) => {
  const { className = "", iconName } = props;
  //render
  //deving 暂时页面无效果
  return (
    <svg className={className}>
      <use xlinkHref={`#${iconName}`} />
    </svg>
  );
};
export default SvgIcon;
