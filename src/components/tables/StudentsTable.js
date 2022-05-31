// Copyright 2022 Social Fabric, LLC

import React from "react"
import XButton from "../buttons/XButton"
import DataTable from "./DataTable"
import TableSearchFilter from "./TableSearchFilter"

const StudentsTable = ({ students, onDeleteClicked }) => {
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
            value={cell.row.values.first_name + " " + cell.row.values.last_name}
            onClick={(e) => {
              e.preventDefault()
              onDeleteClicked(e.target.value)
            }}
          />
        ),
      },
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
    [onDeleteClicked]
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
