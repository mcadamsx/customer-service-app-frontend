import React, { useState } from "react";
import { Table, Flex, Typography } from "antd";
import type { TableProps, TableColumnsType } from "antd";

const { Title } = Typography;

type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface CustomTableProps<T extends object> {
  columns: TableColumnsType<T>;
  dataSource: T[];
  rowKey: keyof T;
  title?: string;
  selectable?: boolean;
}

function CustomTable<T extends object>({
                                         columns,
                                         dataSource,
                                         rowKey,
                                         title,
                                         selectable = false,
                                       }: CustomTableProps<T>) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<T> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <Flex gap="middle" vertical className="p-4 rounded-md shadow-md">
      {title && (
        <Title level={4} className="!text-gray-800 bg-white p-4 rounded">
          {title}
        </Title>
      )}

      <Flex align="center" justify="space-between">
        {hasSelected && selectable ? (
          <span className="text-sm text-gray-600">
            Selected {selectedRowKeys.length} items
          </span>
        ) : (
          <div />
        )}
      </Flex>

      <Table<T>
        rowKey={rowKey as string}
        rowSelection={selectable ? rowSelection : undefined}
        columns={columns}
        dataSource={dataSource}
        pagination={{ position: ["bottomCenter"] }}
        locale={{ emptyText: "No records found." }}
      />
    </Flex>
  );
}

export default CustomTable;
