// Copyright 2022 Social Fabric, LLC

import React from "react"
import CreateUserForm from "../forms/CreateUserForm"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"
import styles from "./pages.module.css"

const AccountDetailPage = ({ defaultUser }) => {
  const role = "admin"

  return (
    <div className={styles.mainContainer}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Account Details</h1>
      <CreateUserForm />
    </div>
  )
}

export default AccountDetailPage
