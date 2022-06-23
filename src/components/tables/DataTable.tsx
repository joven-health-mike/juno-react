// Copyright 2022 Social Fabric, LLC

import React, { ReactNode } from 'react';
import {
  useTable,
  useFilters,
  useGlobalFilter,
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
  addNewItem?: () => void;
  hiddenColumns?: string[];
};

const DataTable: React.FC<DataTableProps> = ({
  data,
  defaultColumn,
  columns,
  renderRowSubComponent,
  addNewItem,
  hiddenColumns,
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
    {
      columns,
      data,
      defaultColumn,
      initialState: { hiddenColumns: hiddenColumns || [] },
    },
    useFilters,
    useGlobalFilter,
    useExpanded,
    usePagination
  );

  return (
    <>
      <table className={'jovenTable'} {...getTableProps()}>
        <HeaderGroups headerGroups={headerGroups} />
        <BodyRows
          getTableBodyProps={getTableBodyProps}
          rows={page}
          prepareRow={prepareRow}
          visibleColumns={visibleColumns}
          renderRowSubComponent={renderRowSubComponent}
          addNewItem={addNewItem}
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

// Component representing the groups of headers for the table
type HeaderGroupsProps = {
  headerGroups: HeaderGroup[];
};

const HeaderGroups: React.FC<HeaderGroupsProps> = ({ headerGroups }) => {
  return (
    <thead>
      {headerGroups.map(headerGroup => {
        const { key } = headerGroup.getHeaderGroupProps();
        return <HeaderRow key={key} headerGroup={headerGroup} />;
      })}
    </thead>
  );
};

// Component representing a single group of headers
type HeaderRowProps = {
  headerGroup: HeaderGroup;
};

const HeaderRow: React.FC<HeaderRowProps> = ({ headerGroup }) => {
  const { ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
  return (
    <tr className={'jovenTr'} {...restHeaderGroupProps}>
      {headerGroup.headers.map(column => {
        const { key } = column.getHeaderProps();
        return <TableHeaderCell key={key} column={column} />;
      })}
    </tr>
  );
};

// Component representing a header cell
type TableHeaderCellProps = {
  column: HeaderGroup;
};

const TableHeaderCell: React.FC<TableHeaderCellProps> = ({ column }) => {
  const { ...restColumn } = column.getHeaderProps();
  return (
    <th className={'jovenTh'} {...restColumn}>
      {column.render('Header')}
      {column.canFilter && <div>{column.render('Filter')}</div>}
    </th>
  );
};

// Component representing the body rows of the table
type BodyRowsProps = {
  getTableBodyProps: () => TableBodyProps;
  prepareRow: (row: Row) => void;
  rows: Row[];
  visibleColumns: Column[];
  renderRowSubComponent?: (row: Row) => ReactNode;
  addNewItem?: () => void;
};

const BodyRows: React.FC<BodyRowsProps> = ({
  getTableBodyProps,
  prepareRow,
  rows,
  visibleColumns,
  renderRowSubComponent,
  addNewItem,
}) => {
  return (
    <tbody {...getTableBodyProps()}>
      {addNewItem && (
        <AddButtonRow visibleColumns={visibleColumns} addNewItem={addNewItem} />
      )}
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

// Component representing a row of data
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

// Component representing a row of data that can expand
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

type AddButtonRowProps = {
  visibleColumns: Column[];
  addNewItem: () => void;
};

const AddButtonRow: React.FC<AddButtonRowProps> = ({
  visibleColumns,
  addNewItem,
}) => {
  return (
    <>
      <tr className={'jovenTr'}>
        <td
          className={'jovenTd'}
          colSpan={visibleColumns.length}
          onClick={addNewItem}
        >
          +
        </td>
      </tr>
    </>
  );
};

// Component representing a cell of data
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
