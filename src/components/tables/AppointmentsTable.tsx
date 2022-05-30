// Copyright 2022 Social Fabric, LLC

import React from "react"
import { Appointment } from "../../data/appointments"
import DataTable from "./DataTable"
import TableSearchFilter from "./TableSearchFilter"

type AppointmentsTableProps = {
  appointments: Appointment[]
}

const AppointmentsTable = ({ appointments }: AppointmentsTableProps) => {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: TableSearchFilter,
    }),
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Start",
        accessor: "start",
        Cell: ({ cell }: any) => (
          <>
            <p>{cell.row.values.start.toISOString()}</p>
          </>
        ),
      },
      {
        Header: "End",
        accessor: "end",
        Cell: ({ cell }) => (
          <>
            <p>{cell.row.values.end.toISOString()}</p>
          </>
        ),
      },
      {
        Header: "Counselor",
        accessor: "counselor",
      },
      {
        Header: "Student",
        accessor: "student",
      },
      {
        Header: "Facilitator",
        accessor: "facilitator",
      },
    ],
    []
  )

  return (
    <DataTable
      data={appointments}
      defaultColumn={defaultColumn}
      columns={columns}
    />
  )
}

export default AppointmentsTable
