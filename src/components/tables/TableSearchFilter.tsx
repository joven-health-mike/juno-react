// Copyright 2022 Social Fabric, LLC

import React from 'react';

type TableSearchFilterProps = {
  column: {
    filterValue: any;
    preFilteredRows: any;
    setFilter: any;
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
          setFilter(e.target.value || undefined);
        }}
        placeholder={`Search ${count} records...`}
      ></input>
    </>
  );
};

export default TableSearchFilter;
