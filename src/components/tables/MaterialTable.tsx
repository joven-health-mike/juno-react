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
import AppointmentDetails from '../details/AppointmentDetails';
import { AppointmentsContext, emptyAppointment } from '../../data/appointments';
import { Computer, Delete, Edit, Email } from '@mui/icons-material';
import { TablePagination } from '@mui/material';

export type TableButtonInfo = {
  onDeleteRow?: (rowId: string) => void;
  onEditRow?: (rowId: string) => void;
  onEmailRow?: (rowId: string) => void;
  onRoomLinkRow?: (rowId: string) => void;
};

type MaterialTableProps = {
  rows: string[][];
  columnHeaders: string[];
  hideColumnIndexes: number[];
  tableButtonInfo?: TableButtonInfo;
};

const MaterialTable: React.FC<MaterialTableProps> = ({
  rows,
  columnHeaders,
  hideColumnIndexes,
  tableButtonInfo,
}) => {
  const { data: appointments } = React.useContext(AppointmentsContext);
  const [visibleRows, setVisibleRows] = React.useState(rows);
  const [pageSize, setPageSize] = React.useState(10);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [canNextPage, setCanNextPage] = React.useState(false);
  const [canPreviousPage, setCanPreviousPage] = React.useState(false);

  React.useEffect(() => {
    setCanNextPage(pageIndex <= rows.length / pageSize);
    setCanPreviousPage(pageIndex > 0);
  }, [rows, pageIndex, pageSize]);

  const getAppointmentForId = (id: string) => {
    return (
      appointments.find(appointment => appointment.id === id) ||
      emptyAppointment
    );
  };

  const gotoPage = React.useCallback(
    (newPage: number) => {
      setPageIndex(newPage);
      const firstRow =
        newPage * (Math.trunc(rows.length / pageSize) + pageSize - 1);
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
    typeof tableButtonInfo?.onRoomLinkRow !== 'undefined';

  return (
    <TableContainer component={Paper}>
      <Table aria-label="material table">
        <TableHead>
          <TableRow>
            <TableCell />
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
                <AppointmentDetails appointment={getAppointmentForId(row[0])} />
              }
              hideColumnIndexes={hideColumnIndexes}
              tableButtonInfo={tableButtonInfo}
            />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
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
  expandComponent: React.ReactNode;
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
      typeof tableButtonInfo.onRoomLinkRow !== 'undefined');

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
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

  return (
    <TableCell>
      {showDelete && (
        <IconButton
          aria-label="delete row"
          size="small"
          onClick={() => tableButtonInfo.onDeleteRow!(rowId)}
        >
          <Delete />
        </IconButton>
      )}
      {showEdit && (
        <IconButton
          aria-label="edit row"
          size="small"
          onClick={() => tableButtonInfo.onEditRow!(rowId)}
        >
          <Edit />
        </IconButton>
      )}
      {showEmail && (
        <IconButton
          aria-label="email row"
          size="small"
          onClick={() => tableButtonInfo.onEmailRow!(rowId)}
        >
          <Email />
        </IconButton>
      )}
      {showRoomLink && (
        <IconButton
          aria-label="room link row"
          size="small"
          onClick={() => tableButtonInfo.onRoomLinkRow!(rowId)}
        >
          <Computer />
        </IconButton>
      )}
    </TableCell>
  );
};

export default MaterialTable;
