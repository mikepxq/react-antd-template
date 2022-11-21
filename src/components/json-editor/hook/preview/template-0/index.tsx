import React from 'react';
import PartItem from './part-item';
import './style.scss';
interface Props {
  list?: ArticleModuleItem[];
}

const JsonEditorPreview: React.FC<ViewProps<Props>> = (props) => {
  const { className = '', list = [] } = props;
  //render
  return (
    <section className={` json-editor-preview template-0 ${className}`}>
      {/* 模块列表 */}
      {list.map((item, index) => (
        <div className={`module-item module-item-${index}`} key={`module-item-${index}`}>
          {item.title && <h2 className="title">{item.title}</h2>}
          <div className={`part-wrap `}>
            {/* 段落列表  */}
            {item.partList &&
              item.partList.map((item, index) => {
                item._partKey = `part-item-${index}`; //挂载值
                return <PartItem item={item} {...item} partKey={item._partKey} key={item._partKey}></PartItem>;
              })}
          </div>
        </div>
      ))}
    </section>
  );
};
export default React.memo(JsonEditorPreview);
