import React from 'react';
import proceedData from '../hoc-helpers';

import './item-list.css';

const ItemList = (props) => {
  const { data, onItemSelected, renderItem } = props;
  const items = data.map((item) => {
    const label = renderItem(item);
    return (
      <li
        className="list-group-item"
        key={item.id}
        onClick={() => onItemSelected(item.id)}
        role="menuitem"
      >
        {label}
      </li>
    );
  });

  return (
    <ul className="item-list list-group">
      {items}
    </ul>
  );
};

export default proceedData(ItemList);
