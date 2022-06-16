// Copyright 2022 Social Fabric, LLC

import React from 'react';
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useSortBy,
  Column,
  HeaderGroup,
  Row,
  TableBodyProps,
  Cell,
} from 'react-table';
import { Appointment } from '../../data/appointments';
import { Counselor } from '../../data/counselors';
import { School } from '../../data/schools';
import { Student } from '../../data/students';
import { User } from '../../data/users';

type DataTableData =
  | Appointment[]
  | Counselor[]
  | School[]
  | Student[]
  | User[];

type DataTableProps = {
  data: DataTableData;
  defaultColumn: Record<string, unknown>;
  columns: Column[];
};

const DataTable: React.FC<DataTableProps> = ({
  data,
  defaultColumn,
  columns,
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      { columns, data, defaultColumn },
      useFilters,
      useGlobalFilter,
      useSortBy
    );

  return (
    <table className={'jovenTable'} {...getTableProps()}>
      <HeaderRows headerGroups={headerGroups} isSortable={true} />
      <BodyRows
        getTableBodyProps={getTableBodyProps}
        rows={rows}
        prepareRow={prepareRow}
      />
    </table>
  );
};

// Helper components

type HeaderRowsProps = {
  headerGroups: HeaderGroup[];
  isSortable: boolean;
};

const HeaderRows: React.FC<HeaderRowsProps> = ({
  headerGroups,
  isSortable,
}) => {
  return (
    <thead>
      {headerGroups.map(headerGroup => (
        <HeaderRow headerGroup={headerGroup} isSortable={isSortable} />
      ))}
    </thead>
  );
};

type HeaderRowProps = {
  headerGroup: HeaderGroup;
  isSortable: boolean;
};

const HeaderRow: React.FC<HeaderRowProps> = ({ headerGroup, isSortable }) => {
  const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
  return (
    <tr key={key} className={'jovenTr'} {...restHeaderGroupProps}>
      {headerGroup.headers.map(column => {
        return <TableHeaderCell column={column} isSortable={isSortable} />;
      })}
    </tr>
  );
};

type TableHeaderCellProps = {
  column: HeaderGroup;
  isSortable: boolean;
};

const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  column,
  isSortable,
}) => {
  const { key, ...restColumn } = column.getHeaderProps(
    column.getSortByToggleProps()
  );
  return (
    <th key={key} className={'jovenTh'} {...restColumn}>
      {column.render('Header')}
      {isSortable && (
        <span>
          {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
        </span>
      )}
      {column.canFilter && <div>{column.render('Filter')}</div>}
    </th>
  );
};

type BodyRowsProps = {
  getTableBodyProps: () => TableBodyProps;
  prepareRow: (row: Row) => void;
  rows: Row[];
};

const BodyRows: React.FC<BodyRowsProps> = ({
  getTableBodyProps,
  prepareRow,
  rows,
}) => {
  return (
    <tbody {...getTableBodyProps()}>
      {rows.map(row => {
        prepareRow(row);
        return <BodyRow row={row} />;
      })}
    </tbody>
  );
};

type BodyRowProps = {
  row: Row;
};

const BodyRow: React.FC<BodyRowProps> = ({ row }) => {
  const { key, ...restRowProps } = row.getRowProps();
  return (
    <tr key={key} className={'jovenTr'} {...restRowProps}>
      {row.cells.map(cell => {
        return <BodyRowCell cell={cell} />;
      })}
    </tr>
  );
};

type BodyRowCellProps = {
  cell: Cell;
};

const BodyRowCell: React.FC<BodyRowCellProps> = ({ cell }) => {
  const { key, ...restCellProps } = cell.getCellProps();
  return (
    <td key={key} className={'jovenTd'} {...restCellProps}>
      {cell.render('Cell')}
    </td>
  );
};

export default DataTable;
