// Copyright 2022 Social Fabric, LLC

import React, { useContext } from "react"
import { UsersContext } from "../../data/users"
import CreateUserForm from "../forms/CreateUserForm"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"
import UsersTable from "../tables/UsersTable"
import styles from "./pages.module.css"

const UsersPage = () => {
  const role = "admin"

  const { users, setUsers } = useContext(UsersContext)

  const onFormSubmit = (user) => {
    setUsers([...users, user])
  }

  return (
    <div className={styles.mainContainer}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Users</h1>
      <>
        <CreateUserForm onSubmit={onFormSubmit} onCancel={() => {}} />
        <UsersTable users={users} />
      </>
    </div>
  )
}

export default UsersPage
