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
      showQuickJumper: true,
      showTotal: () => props.pagination && `${props.pagination.total || ""}`,
    });
  }, [props.pagination]);
  //render
  return <Table {...props} pagination={pagination}></Table>;
};
export default AppTable;
