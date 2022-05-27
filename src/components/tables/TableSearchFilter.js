// Copyright 2022 Social Fabric, LLC

import React from "react"

const TableSearchFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const count = preFilteredRows.length

  return (
    <>
      <input
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined)
        }}
        placeholder={`Search ${count} records...`}
      ></input>
    </>
  )
}

export default TableSearchFilter
