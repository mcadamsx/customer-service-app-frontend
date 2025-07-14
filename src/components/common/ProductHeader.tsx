import { Dropdown, type MenuProps } from 'antd';
import { FaSort } from 'react-icons/fa';
import React from 'react';

interface ProductHeaderProps {
  onSortClick: MenuProps['onClick'];
  sortOptions: MenuProps['items'];
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({ onSortClick, sortOptions }) => (
  <div className="flex items-center gap-2">
    <span>Product</span>
    <Dropdown
      trigger={['click']}
      menu={{ items: sortOptions, onClick: onSortClick }}
    >
      <FaSort className="cursor-pointer text-gray-600 hover:text-black" />
    </Dropdown>
  </div>
);
