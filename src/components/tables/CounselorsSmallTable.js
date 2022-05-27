// Copyright 2022 Social Fabric, LLC

import React from "react"
import DataTable from "./DataTable"
import TableSearchFilter from "./TableSearchFilter"

const CounselorsSmallTable = ({ counselors }) => {
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
    <DataTable
      data={counselors}
      defaultColumn={defaultColumn}
      columns={columns}
    />
  )
}

export default CounselorsSmallTable
