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

type MaterialTableProps = {
  rows: string[][];
  columnHeaders: string[];
  hideColumnIndexes: number[];
};

const MaterialTable: React.FC<MaterialTableProps> = ({
  rows,
  columnHeaders,
  hideColumnIndexes,
}) => {
  const { data: appointments } = React.useContext(AppointmentsContext);
  const getAppointmentForId = (id: string) => {
    return (
      appointments.find(appointment => appointment.id === id) ||
      emptyAppointment
    );
  };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
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
          {rows.map((row, index) => (
            <Row
              key={index}
              rowData={row}
              expandComponent={
                <AppointmentDetails appointment={getAppointmentForId(row[0])} />
              }
              hideColumnIndexes={hideColumnIndexes}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

type RowProps = {
  rowData: string[];
  expandComponent: React.ReactNode;
  hideColumnIndexes: number[];
};

const Row: React.FC<RowProps> = ({
  rowData,
  expandComponent,
  hideColumnIndexes,
}) => {
  const [open, setOpen] = React.useState(false);
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

export default MaterialTable;
