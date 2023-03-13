import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  CalendarMonth,
  Computer,
  Delete,
  Edit,
  Email,
  Folder,
} from '@mui/icons-material';
import { TablePagination } from '@mui/material';

export type TableButtonInfo = {
  onDeleteRow?: (rowId: string) => void;
  onEditRow?: (rowId: string) => void;
  onEmailRow?: (rowId: string) => void;
  onRoomLinkRow?: (rowId: string) => void;
  onFolderRow?: (rowId: string) => void;
  onAppointmentRow?: (rowId: string) => void;
};

type MaterialTableProps = {
  rows: string[][];
  columnHeaders: string[];
  hideColumnIndexes: number[];
  tableButtonInfo?: TableButtonInfo;
  defaultPageSize?: number;
  defaultPageIndex?: number;
  getExpandComponent?: (rowId: string) => React.ReactNode;
};

const MaterialTable: React.FC<MaterialTableProps> = ({
  rows,
  columnHeaders,
  hideColumnIndexes,
  tableButtonInfo,
  defaultPageSize = 10,
  defaultPageIndex = 0,
  getExpandComponent,
}) => {
  const [visibleRows, setVisibleRows] = React.useState(rows);
  const [pageSize, setPageSize] = React.useState(defaultPageSize);
  const [pageIndex, setPageIndex] = React.useState(defaultPageIndex);
  const [canNextPage, setCanNextPage] = React.useState(
    defaultPageIndex < rows.length - 1
  );
  const [canPreviousPage, setCanPreviousPage] = React.useState(
    defaultPageIndex > 0
  );

  const rowsPerPageOptions = [5, 10, 25];

  React.useEffect(() => {
    setCanNextPage(pageIndex <= rows.length / pageSize);
    setCanPreviousPage(pageIndex > 0);
  }, [rows, pageIndex, pageSize]);

  const gotoPage = React.useCallback(
    (newPage: number) => {
      setPageIndex(newPage);
      const firstRow = newPage * pageSize;
      const visibleRows = rows.slice(firstRow, firstRow + pageSize);
      setVisibleRows(visibleRows);
    },
    [pageSize, rows]
  );

  React.useEffect(() => gotoPage(0), [gotoPage]);

  const showButtonColumn =
    typeof tableButtonInfo?.onDeleteRow !== 'undefined' ||
    typeof tableButtonInfo?.onEditRow !== 'undefined' ||
    typeof tableButtonInfo?.onEmailRow !== 'undefined' ||
    typeof tableButtonInfo?.onRoomLinkRow !== 'undefined' ||
    typeof tableButtonInfo?.onFolderRow !== 'undefined' ||
    typeof tableButtonInfo?.onAppointmentRow !== 'undefined';

  const showExpandColumn = typeof getExpandComponent !== 'undefined';

  return (
    <TableContainer component={Paper}>
      <Table aria-label="material table">
        <TableHead>
          <TableRow>
            {showExpandColumn && <TableCell />}
            {showButtonColumn && <TableCell />}
            {columnHeaders.map((header, index) => {
              const show: boolean =
                hideColumnIndexes.find(
                  hideColumnIndex => hideColumnIndex === index
                ) === undefined;
              return show ? <TableCell key={index}>{header}</TableCell> : <></>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {visibleRows.map((row, index) => (
            <Row
              key={index}
              rowData={row}
              expandComponent={
                showExpandColumn ? getExpandComponent(row[0]) : undefined
              }
              hideColumnIndexes={hideColumnIndexes}
              tableButtonInfo={tableButtonInfo}
            />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={rows.length}
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
    </TableContainer>
  );
};

type RowProps = {
  rowData: string[];
  expandComponent?: React.ReactNode;
  hideColumnIndexes: number[];
  tableButtonInfo?: TableButtonInfo;
};

const Row: React.FC<RowProps> = ({
  rowData,
  expandComponent,
  hideColumnIndexes,
  tableButtonInfo,
}) => {
  const [open, setOpen] = React.useState(false);
  const showButtonsCell =
    typeof tableButtonInfo !== 'undefined' &&
    (typeof tableButtonInfo.onDeleteRow !== 'undefined' ||
      typeof tableButtonInfo.onEditRow !== 'undefined' ||
      typeof tableButtonInfo.onEmailRow !== 'undefined' ||
      typeof tableButtonInfo.onRoomLinkRow !== 'undefined' ||
      typeof tableButtonInfo.onFolderRow !== 'undefined' ||
      typeof tableButtonInfo.onAppointmentRow !== 'undefined');

  const showExpand = typeof expandComponent !== 'undefined';

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        {showExpand && (
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
        {showButtonsCell && (
          <ButtonsCell rowId={rowData[0]} tableButtonInfo={tableButtonInfo!} />
        )}
        {rowData.map((colString, index) => {
          const show: boolean =
            hideColumnIndexes.find(
              hideColumnIndex => hideColumnIndex === index
            ) === undefined;
          return show ? (
            <TableCell component="th" scope="row" key={index}>
              {colString}
            </TableCell>
          ) : (
            <></>
          );
        })}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>{expandComponent}</Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

type ButtonsCellProps = {
  rowId: string;
  tableButtonInfo: TableButtonInfo;
};

const ButtonsCell: React.FC<ButtonsCellProps> = ({
  rowId,
  tableButtonInfo,
}) => {
  const showDelete = typeof tableButtonInfo.onDeleteRow !== 'undefined';
  const showEdit = typeof tableButtonInfo.onEditRow !== 'undefined';
  const showEmail = typeof tableButtonInfo.onEmailRow !== 'undefined';
  const showRoomLink = typeof tableButtonInfo.onRoomLinkRow !== 'undefined';
  const showFolderRow = typeof tableButtonInfo.onFolderRow !== 'undefined';
  const showAppointmentRow =
    typeof tableButtonInfo.onAppointmentRow !== 'undefined';

  return (
    <TableCell>
      {showDelete && (
        <IconButton
          aria-label="delete row"
          onClick={() => tableButtonInfo.onDeleteRow!(rowId)}
        >
          <Delete />
        </IconButton>
      )}
      {showEdit && (
        <IconButton
          aria-label="edit row"
          onClick={() => tableButtonInfo.onEditRow!(rowId)}
        >
          <Edit />
        </IconButton>
      )}
      {showEmail && (
        <IconButton
          aria-label="email row"
          onClick={() => tableButtonInfo.onEmailRow!(rowId)}
        >
          <Email />
        </IconButton>
      )}
      {showRoomLink && (
        <IconButton
          aria-label="room link row"
          onClick={() => tableButtonInfo.onRoomLinkRow!(rowId)}
        >
          <Computer />
        </IconButton>
      )}
      {showFolderRow && (
        <IconButton
          aria-label="folder row"
          onClick={() => tableButtonInfo.onFolderRow!(rowId)}
        >
          <Folder />
        </IconButton>
      )}
      {showAppointmentRow && (
        <IconButton
          aria-label="folder row"
          onClick={() => tableButtonInfo.onAppointmentRow!(rowId)}
        >
          <CalendarMonth />
        </IconButton>
      )}
    </TableCell>
  );
};

export default MaterialTable;
