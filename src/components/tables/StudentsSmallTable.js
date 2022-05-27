// Copyright 2022 Social Fabric, LLC

import React from "react"
import DataTable from "./DataTable"
import TableSearchFilter from "./TableSearchFilter"

const StudentsSmallTable = ({ students }) => {
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

export default StudentsSmallTable
