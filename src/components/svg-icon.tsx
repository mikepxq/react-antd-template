import React from 'react';
interface Props {
  prefix?: string;
  name: string;
  color?: string;
}
/** 默认去除前后空格 */
const SvgIcon: React.FC<ViewProps<Props>> = (props) => {
  const { className = '', prefix = 'icon', color = '#333', name } = props;

  //render
  return (
    <svg className={`icon ${className}`} aria-hidden="true">
      <use xlinkHref={`#${prefix}-${name}`} fill={color} />
    </svg>
  );
};
export default SvgIcon;
