// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { Row } from 'react-table';

type TableSearchFilterProps = {
  column: {
    filterValue: string;
    preFilteredRows: Row[];
    setFilter: (input: string) => void;
  };
};

const TableSearchFilter: React.FC<TableSearchFilterProps> = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const count = preFilteredRows.length;

  return (
    <>
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value);
        }}
        placeholder={`Search ${count} records...`}
      ></input>
    </>
  );
};

export default TableSearchFilter;
