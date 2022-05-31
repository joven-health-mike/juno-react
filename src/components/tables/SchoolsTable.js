// Copyright 2022 Social Fabric, LLC

import React from "react"
import XButton from "../buttons/XButton"
import DataTable from "./DataTable"
import TableSearchFilter from "./TableSearchFilter"

const SchoolsTable = ({ schools, onDeleteClicked }) => {
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
            value={cell.row.values.name}
            onClick={(e) => {
              e.preventDefault()
              onDeleteClicked(e.target.value)
            }}
          />
        ),
      },
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
        Cell: ({ cell }) => (
          <>
            {cell.row.values.facilitators.map((facilitatorName, index) => {
              return <p key={index}>{facilitatorName}</p>
            })}
          </>
        ),
      },
    ],
    [onDeleteClicked]
  )

  return (
    <DataTable data={schools} defaultColumn={defaultColumn} columns={columns} />
  )
}

export default SchoolsTable
