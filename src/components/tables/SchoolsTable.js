// Copyright 2022 Social Fabric, LLC

import React from "react"
import DataTable from "./DataTable"
import TableSearchFilter from "./TableSearchFilter"

const SchoolsTable = ({ schools }) => {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: TableSearchFilter,
    }),
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Facilitators",
        accessor: "facilitators",
      },
    ],
    []
  )

  return (
    <DataTable data={schools} defaultColumn={defaultColumn} columns={columns} />
  )
}

export default SchoolsTable
