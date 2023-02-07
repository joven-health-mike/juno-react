// Copyright 2022 Social Fabric, LLC

import React from 'react';
import { Row } from 'react-table';
import styled from 'styled-components';
import { inputStyles } from '../styles/mixins';

const Input = styled.input`
  ${inputStyles}
`;

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
      <Input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value);
        }}
        placeholder={`Search ${count} records...`}
      ></Input>
    </>
  );
};

export default TableSearchFilter;
