// Copyright 2022 Social Fabric, LLC

import React from "react"
import XButton from "../buttons/XButton"
import DataTable from "./DataTable"
import TableSearchFilter from "./TableSearchFilter"

const CounselorsTable = ({ counselors, onDeleteClicked }) => {
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
        Header: "Room Link",
        accessor: "roomLink",
      },
      {
        Header: "Assigned Schools",
        accessor: "assignedSchools",
        Cell: ({ cell }) => (
          <>
            {cell.row.values.assignedSchools.map((schoolName, index) => {
              return <p key={index}>{schoolName}</p>
            })}
          </>
        ),
      },
    ],
    [onDeleteClicked]
  )

  return (
    <DataTable
      data={counselors}
      defaultColumn={defaultColumn}
      columns={columns}
    />
  )
}

export default CounselorsTable
