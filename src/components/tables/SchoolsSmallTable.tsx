// Copyright 2022 Social Fabric, LLC

import React from "react"
import { School } from "../../data/schools"
import DataTable from "./DataTable"
import TableSearchFilter from "./TableSearchFilter"

type SchoolsSmallTableProps = {
  schools: School[]
}

const SchoolsSmallTable: React.FC<SchoolsSmallTableProps> = ({ schools }) => {
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
    ],
    []
  )

  return (
    <DataTable data={schools} defaultColumn={defaultColumn} columns={columns} />
  )
}

export default SchoolsSmallTable
