// Copyright 2022 Social Fabric, LLC

import React from "react"
import { useTable, useFilters, useGlobalFilter, useSortBy } from "react-table"
import styles from "./tables.module.css"

const DataTable = ({ data, defaultColumn, columns }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      { columns, data, defaultColumn },
      useFilters,
      useGlobalFilter,
      useSortBy
    )

  return (
    <table className={styles.jovenTable} {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => {
          const { key, ...restHeaderGroupProps } =
            headerGroup.getHeaderGroupProps()
          return (
            <tr key={key} className={styles.jovenTr} {...restHeaderGroupProps}>
              {headerGroup.headers.map((column) => {
                const { key, ...restColumn } = column.getHeaderProps(
                  column.getSortByToggleProps()
                )
                return (
                  <th key={key} className={styles.jovenTh} {...restColumn}>
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
            <tr key={key} className={styles.jovenTr} {...restRowProps}>
              {row.cells.map((cell) => {
                const { key, ...restCellProps } = cell.getCellProps()
                return (
                  <td key={key} className={styles.jovenTd} {...restCellProps}>
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
