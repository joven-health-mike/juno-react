// Copyright 2022 Social Fabric, LLC

import React from "react"
import DataTable from "./DataTable"
import TableSearchFilter from "./TableSearchFilter"

const AppointmentsTable = ({ appointments }) => {
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
      },
      {
        Header: "End",
        accessor: "end",
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
