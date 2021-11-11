import { Table } from "antd";
import React, { useEffect, useState } from "react";
interface Props extends Antd.TableProps<any> {
  [key: string]: any;
}
const AppTable: React.FC<ViewProps<Props>> = (props) => {
  const [pagination, setPagination] = useState<false | Antd.TablePaginationConfig | undefined>();
  useEffect(() => {
    if (!props.pagination) return;
    setPagination({
      ...props.pagination,
      showQuickJumper: true,
      showTotal: () => props.pagination && `共 ${String(props.pagination.total || 0)} 条`,
    });
  }, [props.pagination]);
  //render
  return <Table {...props} pagination={pagination}></Table>;
};
export default AppTable;
