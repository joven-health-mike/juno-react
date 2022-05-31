// Copyright 2022 Social Fabric, LLC

import React from "react"
import XButton from "../buttons/XButton"
import DataTable from "./DataTable"
import TableSearchFilter from "./TableSearchFilter"

const AppointmentsTable = ({ appointments, onDeleteClicked }) => {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: TableSearchFilter,
    }),
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: " ",
        Cell: ({ cell }) => (
          <XButton
            value={cell.row.values.title}
            onClick={(e) => {
              e.preventDefault()
              onDeleteClicked(e.target.value)
            }}
          />
        ),
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Start",
        accessor: "start",
        Cell: ({ cell }) => <p>{cell.row.values.start.toISOString()}</p>,
      },
      {
        Header: "End",
        accessor: "end",
        Cell: ({ cell }) => <p>{cell.row.values.end.toISOString()}</p>,
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
    [onDeleteClicked]
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
