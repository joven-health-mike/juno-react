// Copyright 2022 Social Fabric, LLC

import React from "react"
import DataTable from "./DataTable"
import TableSearchFilter from "./TableSearchFilter"

const CounselorsTable = ({ counselors }) => {
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

export default CounselorsTable
