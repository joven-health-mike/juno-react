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
  useExpanded,
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
      useSortBy,
      useExpanded
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
      {headerGroups.map(headerGroup => {
        const { key } = headerGroup.getHeaderGroupProps();
        return (
          <HeaderRow
            key={key}
            headerGroup={headerGroup}
            isSortable={isSortable}
          />
        );
      })}
    </thead>
  );
};

type HeaderRowProps = {
  headerGroup: HeaderGroup;
  isSortable: boolean;
};

const HeaderRow: React.FC<HeaderRowProps> = ({ headerGroup, isSortable }) => {
  const { ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
  return (
    <tr className={'jovenTr'} {...restHeaderGroupProps}>
      {headerGroup.headers.map(column => {
        const { key } = column.getHeaderProps(column.getSortByToggleProps());
        return (
          <TableHeaderCell key={key} column={column} isSortable={isSortable} />
        );
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
  const { ...restColumn } = column.getHeaderProps(
    column.getSortByToggleProps()
  );
  return (
    <th className={'jovenTh'} {...restColumn}>
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
        const { key } = row.getRowProps();
        return <BodyRow key={key} row={row} />;
      })}
    </tbody>
  );
};

type BodyRowProps = {
  row: Row;
};

const BodyRow: React.FC<BodyRowProps> = ({ row }) => {
  const { ...restRowProps } = row.getRowProps();
  return (
    <tr className={'jovenTr'} {...restRowProps}>
      {row.cells.map(cell => {
        const { key } = cell.getCellProps();
        return <BodyRowCell key={key} cell={cell} />;
      })}
    </tr>
  );
};

type BodyRowCellProps = {
  cell: Cell;
};

const BodyRowCell: React.FC<BodyRowCellProps> = ({ cell }) => {
  const { ...restCellProps } = cell.getCellProps();
  return (
    <td className={'jovenTd'} {...restCellProps}>
      {cell.render('Cell')}
    </td>
  );
};

export default DataTable;
