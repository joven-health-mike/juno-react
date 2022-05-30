// Copyright 2022 Social Fabric, LLC

import React from "react"
import { useTable, useFilters, useGlobalFilter, useSortBy } from "react-table"

type DataTableProps = {
  data: any
  defaultColumn: any
  columns: any
}

const DataTable = ({ data, defaultColumn, columns }: DataTableProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      { columns, data, defaultColumn },
      useFilters,
      useGlobalFilter,
      useSortBy
    )

  return (
    <table className={"jovenTable"} {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => {
          const { key, ...restHeaderGroupProps } =
            headerGroup.getHeaderGroupProps()
          return (
            <tr key={key} className={"jovenTr"} {...restHeaderGroupProps}>
              {headerGroup.headers.map((column) => {
                const { key, ...restColumn } = column.getHeaderProps(
                  column.getSortByToggleProps()
                )
                return (
                  <th key={key} className={"jovenTh"} {...restColumn}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                )
              })}
            </tr>
          )
        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          const { key, ...restRowProps } = row.getRowProps()
          return (
            <tr key={key} className={"jovenTr"} {...restRowProps}>
              {row.cells.map((cell) => {
                const { key, ...restCellProps } = cell.getCellProps()
                return (
                  <td key={key} className={"jovenTd"} {...restCellProps}>
                    {cell.render("Cell")}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default DataTable
