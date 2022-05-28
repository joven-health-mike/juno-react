// Copyright 2022 Social Fabric, LLC

import React from "react"
import CreateUserForm from "../forms/CreateUserForm"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"
import styles from "./pages.module.css"

const AccountDetailPage = ({ defaultUser }) => {
  const role = "admin"

  const onFormSubmit = (user) => {
    if (defaultUser) {
      modifyUser(user)
    }
  }

  const modifyUser = (user) => {
    console.log("modifyUser:", user)
    // figure out how to modify the user in the global context object
  }

  const onFormCancel = () => {
    // what should we do if cancel is clicked here? go to Users page? go back?
    //window.location.href = "/users"
  }

  return (
    <div className={styles.mainContainer}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Account Details</h1>
      <CreateUserForm
        defaultUser={defaultUser}
        onSubmit={onFormSubmit}
        onCancel={onFormCancel}
      />
    </div>
  )
}

export default AccountDetailPage
