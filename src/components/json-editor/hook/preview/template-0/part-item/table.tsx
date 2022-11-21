import { Table, ConfigProvider } from 'antd';
import React from 'react';
interface Props {
  tableList: PartItemTableItem[];
}

/** 模块 */
const PartItemTable: React.FC<ViewProps<Props>> = (props) => {
  const { className = '', tableList } = props;

  const getTableMap = () => {
    const titleList: Antd.TableColumnsType = [];
    const dataList: Record<string, string>[] = [];
    tableList.forEach((item, index) => {
      //用标题生成的，可以保证使用统一dataIndex  title-${index}
      titleList.push({
        key: `title-${index}`,
        dataIndex: `title-${index}`,
        title: item.title,
        align: 'center',
        render: (text) => <div className={`text-wrap ${text ? '' : 'empty'}`}>{text || '-'}</div>, // '-'撑起高度
      });
      item.list.forEach((iString, iIndex) => {
        if (!dataList[iIndex]) dataList[iIndex] = { key: `${index}-${iIndex}` };
        //同步使用key
        dataList[iIndex][`title-${index}`] = iString;
      });
    });
    return { titleList, dataList };
  };
  const tableMap = getTableMap();
  //render
  return (
    <div className={`part-item-table ${className}`}>
      <ConfigProvider renderEmpty={() => <></>}>
        <Table bordered columns={tableMap.titleList} dataSource={tableMap.dataList} pagination={false}></Table>
      </ConfigProvider>
    </div>
  );
};
export default PartItemTable;
