import { StarOutlined } from "@ant-design/icons";
import React from "react";
interface Props {
  [key: string]: any;
  number: HotNumber;
}
const HotStar: React.FC<ViewProps<Props>> = (props) => {
  const { className = "", number = 0 } = props;
  //render
  return (
    <div className={className} style={{ color: "#faad14" }}>
      {Array(number)
        .fill(1)
        .map((item, index) => (
          <StarOutlined key={index} />
        ))}
    </div>
  );
};
export default HotStar;
