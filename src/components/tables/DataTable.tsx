// Copyright 2022 Social Fabric, LLC

import { TablePagination } from '@mui/material';
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
  useSortBy,
} from 'react-table';
import styled from 'styled-components';
import { User } from '../../data/users';
import { spanStyles } from '../styles/mixins';
import { TableAppointment } from './AppointmentsTable';
import { TableCounselor } from './CounselorsTable';
import { TableSchool } from './SchoolsTable';
import { TableStudent } from './StudentsTable';

const Wrapper = styled.span`
  ${spanStyles}
`;

const Table = styled.table`
  padding: 5px;
  border: 1px solid;
  margin: 10px;
  width: 99%;
  table-layout: fixed;
`;

const TableHeader = styled.th`
  padding: 5px;
  border: 1px solid;
  margin: 10px;
  width: 99%;
  background-color: #385aa8;
  color: whitesmoke;
`;

const TableRow = styled.tr`
  padding: 5px;

  &:nth-child(even) {
    background-color: #77caf2;
  }

  &:nth-child(odd) {
    background-color: #4891ce;
  }

  &:hover {
    background-color: #f6f740;
  }
`;

const TableCell = styled.td`
  padding: 5px;
  border: 1px solid;
  text-align: center;
`;

type DataTableData =
  | TableAppointment[]
  | TableCounselor[]
  | TableSchool[]
  | TableStudent[]
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
    gotoPage,
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
    useSortBy,
    useExpanded,
    usePagination
  );

  return (
    <>
      <Table {...getTableProps()}>
        <HeaderGroups headerGroups={headerGroups} />
        <BodyRows
          getTableBodyProps={getTableBodyProps}
          rows={page}
          prepareRow={prepareRow}
          visibleColumns={visibleColumns}
          renderRowSubComponent={renderRowSubComponent}
          addNewItem={addNewItem}
        />
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        showFirstButton={canPreviousPage}
        showLastButton={canNextPage}
        onPageChange={(e, newPage) => {
          gotoPage(newPage);
        }}
        onRowsPerPageChange={e => {
          setPageSize(Number(e.target.value));
        }}
      />
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
    <TableRow {...restHeaderGroupProps}>
      {headerGroup.headers.map(column => {
        const { key } = column.getHeaderProps();
        return <TableHeaderCell key={key} column={column} />;
      })}
    </TableRow>
  );
};

// Component representing a header cell
type TableHeaderCellProps = {
  column: HeaderGroup;
};

const TableHeaderCell: React.FC<TableHeaderCellProps> = ({ column }) => {
  const { ...restColumn } = column.getHeaderProps(
    column.getSortByToggleProps()
  );
  return (
    <TableHeader {...restColumn}>
      {column.render('Header')}
      <Wrapper>
        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
      </Wrapper>
      {column.canFilter && <div>{column.render('Filter')}</div>}
    </TableHeader>
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
    <TableRow>
      {row.cells.map(cell => {
        const { key } = cell.getCellProps();
        return <BodyRowCell key={key} cell={cell} />;
      })}
    </TableRow>
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
    <TableRow>
      <TableCell colSpan={visibleColumns.length}>
        {renderRowSubComponent(row)}
      </TableCell>
    </TableRow>
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
      <TableRow>
        <TableCell colSpan={visibleColumns.length} onClick={addNewItem}>
          +
        </TableCell>
      </TableRow>
    </>
  );
};

// Component representing a cell of data
type BodyRowCellProps = {
  cell: Cell;
};

const BodyRowCell: React.FC<BodyRowCellProps> = ({ cell }) => {
  const { ...restCellProps } = cell.getCellProps();
  return <TableCell {...restCellProps}>{cell.render('Cell')}</TableCell>;
};

export default DataTable;
