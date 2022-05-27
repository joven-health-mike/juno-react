// Copyright 2022 Social Fabric, LLC

import React from "react"
import { UsersContext } from "../../data/users"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"
import UsersTable from "../tables/UsersTable"
import styles from "./pages.module.css"

const UsersPage = () => {
  const role = "admin"

  return (
    <div className={styles.mainContainer}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Users</h1>
      <UsersContext.Consumer>
        {(users) => {
          return <UsersTable users={users} />
        }}
      </UsersContext.Consumer>
    </div>
  )
}

export default UsersPage
