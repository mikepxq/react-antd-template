export * from "antd";
import type { ArgsProps as _ArgsProps } from "node_modules/antd/lib/message/index.d.ts";
import type { AlignType, RenderedCell } from "node_modules/rc-table/lib/interface.d.ts";
export type ArgsProps = _ArgsProps;
type ColumnsType<T> = { actions: string } & T;
/** 重写 可以提示key值 */
export type TableColumnsType<Item = Record<string, any>> = {
  key: keyof ColumnsType<Item>;
  dataIndex?: keyof ColumnsType<Item>;
  title?: React.ReactNode;
  render?: (value: any, record: Item, index: number) => React.ReactNode | RenderedCell<Item>;
  width?: number | string;
  align?: AlignType;
  //用哪个补上那个
}[];

//node_modules\rc-tree\lib\Tree.d.ts
export interface CheckInfo {
  event: "check";
  node: EventDataNode;
  checked: boolean;
  nativeEvent: MouseEvent;
  checkedNodes: DataNode[];
  checkedNodesPositions?: {
    node: DataNode;
    pos: string;
  }[];
  halfCheckedKeys?: Key[];
}

export type TreeCheckedKeys = { checkedKeys: React.Key[]; halfCheckedKeys: React.Key[] };
export as namespace Antd;
