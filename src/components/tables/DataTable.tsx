// Copyright 2022 Social Fabric, LLC

import React, { ReactNode } from 'react';
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
  usePagination,
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
  renderRowSubComponent?: (row: Row) => ReactNode;
};

const DataTable: React.FC<DataTableProps> = ({
  data,
  defaultColumn,
  columns,
  renderRowSubComponent,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    visibleColumns,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data, defaultColumn },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination
  );

  return (
    <>
      <table className={'jovenTable'} {...getTableProps()}>
        <HeaderRows headerGroups={headerGroups} isSortable={true} />
        <BodyRows
          getTableBodyProps={getTableBodyProps}
          rows={page}
          prepareRow={prepareRow}
          visibleColumns={visibleColumns}
          renderRowSubComponent={renderRowSubComponent}
        />
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
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
  visibleColumns: Column[];
  renderRowSubComponent?: (row: Row) => ReactNode;
};

const BodyRows: React.FC<BodyRowsProps> = ({
  getTableBodyProps,
  prepareRow,
  rows,
  visibleColumns,
  renderRowSubComponent,
}) => {
  return (
    <tbody {...getTableBodyProps()}>
      {rows.map(row => {
        prepareRow(row);
        const { key } = row.getRowProps();
        return (
          <React.Fragment key={key}>
            <BodyRow row={row} />
            {row.isExpanded && (
              <ExpandableBodyRow
                row={row}
                visibleColumns={visibleColumns}
                renderRowSubComponent={renderRowSubComponent}
              />
            )}
          </React.Fragment>
        );
      })}
    </tbody>
  );
};

type BodyRowProps = {
  row: Row;
};

const BodyRow: React.FC<BodyRowProps> = ({ row }) => {
  return (
    <tr className={'jovenTr'}>
      {row.cells.map(cell => {
        const { key } = cell.getCellProps();
        return <BodyRowCell key={key} cell={cell} />;
      })}
    </tr>
  );
};

type ExpandableBodyRowProps = {
  row: Row;
  visibleColumns: Column[];
  renderRowSubComponent?: (row: Row) => ReactNode;
};

const ExpandableBodyRow: React.FC<ExpandableBodyRowProps> = ({
  row,
  visibleColumns,
  renderRowSubComponent,
}) => {
  if (!renderRowSubComponent) {
    renderRowSubComponent = () => <></>;
  }
  return (
    <tr className={'jovenTr'}>
      <td className={'jovenTd'} colSpan={visibleColumns.length}>
        {renderRowSubComponent(row)}
      </td>
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
