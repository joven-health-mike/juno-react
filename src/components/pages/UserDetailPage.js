// Copyright 2022 Social Fabric, LLC

import React from "react"
import UserDetails from "../details/UserDetails"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"
import styles from "./pages.module.css"

const UserDetailPage = ({ user }) => {
  const role = "admin"

  return (
    <div className={styles.mainContainer}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>User Details</h1>
      <UserDetails user={user} />
    </div>
  )
}

export default UserDetailPage
