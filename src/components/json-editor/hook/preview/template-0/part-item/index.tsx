import React from 'react';
import PartItemTable from './table';

/***************************** PartItemList ***************************** */
interface PartItemListProps {
  list?: PartItemListItem[];
  orderType?: SerialOrderType;
  propertyKey?: keyof PreviewPartItem;
}
/** 列表数据结构 可 */
const PartItemList: React.FC<ViewProps<PartItemListProps>> = (props) => {
  const { className = '', list = [], orderType = 'common' } = props;

  return (
    <ul className={`list ${className} list-style-${orderType}`}>
      {/* 避免输入期间 */}
      {Array.isArray(list) &&
        list.map((item, index) => {
          return (
            <li className={`item `} key={`list-${index}`}>
              {/* 直接字符 */}
              {typeof item == 'string' && item}
              {/* 嵌套  */}
              {typeof item == 'object' && (
                <div>
                  {item.text && <p>{item.text}</p>}
                  {item.tableList && <PartItemTable tableList={item.tableList}></PartItemTable>}
                  {item.list && (
                    <PartItemList list={item.list} orderType={item.orderType} className="children-list"></PartItemList>
                  )}
                </div>
              )}
            </li>
          );
        })}
    </ul>
  );
};
/***************************** PartItem ***************************** */
interface Props {
  item: PreviewPartItem;
  partKey?: string;
}

const PartItem: React.FC<ViewProps<Props>> = (props) => {
  const { item, partKey = '' } = props;
  return (
    <div className="part-item">
      {(Object.keys(item) as (keyof PreviewPartItem)[]).map((k) => {
        // prettier-ignore
        if (k == 'title')return (<h3 className="title" key={`${partKey}-${k}`}>{item.title}</h3> );
        // prettier-ignore
        if (k == 'list')return <PartItemList propertyKey={k} list={item.list} orderType={item.orderType} key={`${partKey}-${k}`}></PartItemList>;
      })}
    </div>
  );
};
export default PartItem;
