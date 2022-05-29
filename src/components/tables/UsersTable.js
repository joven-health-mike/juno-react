// Copyright 2022 Social Fabric, LLC

import React from "react"
import DataTable from "./DataTable"
import TableSearchFilter from "./TableSearchFilter"

const UsersTable = ({ users }) => {
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
        Header: "Password",
        accessor: "password",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Associated Account",
        accessor: "associatedAccount",
      },
    ],
    []
  )

  return (
    <DataTable data={users} defaultColumn={defaultColumn} columns={columns} />
  )
}

export default UsersTable
