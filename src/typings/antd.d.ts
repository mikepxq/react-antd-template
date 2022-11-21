export * from 'antd';
import { DataNode, EventDataNode } from 'antd/lib/tree';
import type { ArgsProps as _ArgsProps } from 'node_modules/antd/lib/message/index.d';
import type { AlignType, RenderedCell } from 'node_modules/rc-table/lib/interface.d';
import { Key } from 'react';
export type { ItemType as MenuItemType } from 'node_modules/antd/lib/menu/hooks/useItems.d';
export type { MenuClickEventHandler } from 'node_modules/rc-menu/lib/interface.d';

export type ArgsProps = _ArgsProps;
type ColumnsType<T> = { actions: string } & T;
/** 重写 可以提示key值;
 * 用哪个补上那个*/
export type TableColumnsType<Item = Record<string, any>> = {
  key: keyof ColumnsType<Item>;
  dataIndex?: keyof ColumnsType<Item>;
  title?: React.ReactNode;
  render?: (value: any, record: Item, index: number) => React.ReactNode | RenderedCell<Item>;
  width?: number | string;
  align?: AlignType;
  className?: string;
  //用哪个补上那个
}[];

//node_modules\rc-tree\lib\Tree.d.ts
export interface CheckInfo {
  event: 'check';
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
/** 也许是react18 兼容性问题 */
// declare module 'antd' {
//   export interface BreadcrumbProps {
//     children: any;
//   }
//   export interface BreadcrumbItemProps {
//     children: any;
//   }
// }
// /** 也许是react18 兼容性问题 */
// declare global {
//   namespace JSX {
//     interface IntrinsicAttributes {
//       children?: any;
//     }
//   }
// }
