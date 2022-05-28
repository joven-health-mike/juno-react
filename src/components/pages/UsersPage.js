// Copyright 2022 Social Fabric, LLC

import React from "react"
import { UsersContext } from "../../data/users"
import CreateUserForm from "../forms/CreateUserForm"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"
import UsersTable from "../tables/UsersTable"
import styles from "./pages.module.css"

const UsersPage = () => {
  const role = "admin"

  const onFormSubmit = (user) => {
    console.log("addUser:", user)
    // figure out how to add the user to the global context object
  }

  const onFormCancel = () => {}

  return (
    <div className={styles.mainContainer}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Users</h1>
      <UsersContext.Consumer>
        {(users) => {
          return (
            <>
              <CreateUserForm onSubmit={onFormSubmit} onCancel={onFormCancel} />
              <UsersTable users={users} />
            </>
          )
        }}
      </UsersContext.Consumer>
    </div>
  )
}

export default UsersPage
