import React from "react";
interface Props {
  [key: string]: any;
}
const ArticleList: React.FC<ViewProps<Props>> = (props) => {
  const { className = "" } = props;
  //render
  return <div className={className}>ArticleList</div>;
};
export default ArticleList;
