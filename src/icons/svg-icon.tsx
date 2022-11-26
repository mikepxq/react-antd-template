import React from 'react';
import styled from 'styled-components';
interface Props {
  name: string;
}
/** 模块 */
const SvgIcon: React.FC<ViewProps<Props>> = (props) => {
  const { name, className } = props;
  const symbolId = `#${name}`;
  //render
  return (
    <SvgDom className={`svg-icon ${className}`} name={name} aria-hidden="true">
      <use href={symbolId} />
    </SvgDom>
  );
};
//styles
const SvgDom = styled.svg`
  flex-shrink: 0;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  width: 14px; //默认
  height: 14px;
`;
export default SvgIcon;
