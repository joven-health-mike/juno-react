// Copyright 2022 Social Fabric, LLC

import React from "react"
import DataTable from "./DataTable"
import TableSearchFilter from "./TableSearchFilter"

const StudentsTable = ({ students }) => {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: TableSearchFilter,
    }),
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        accessor: "last_name",
      },
      {
        Header: "School",
        accessor: "school",
      },
      {
        Header: "Counselor",
        accessor: "counselor",
      },
    ],
    []
  )

  return (
    <DataTable
      data={students}
      defaultColumn={defaultColumn}
      columns={columns}
    />
  )
}

export default StudentsTable
