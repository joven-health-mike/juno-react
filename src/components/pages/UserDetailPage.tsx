// Copyright 2022 Social Fabric, LLC

import React from "react"
import { User } from "../../data/users"
import UserDetails from "../details/UserDetails"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"

type UserDetailPageProps = {
  user: User
}

const UserDetailPage: React.FC<UserDetailPageProps> = ({ user }) => {
  const role = "admin"

  return (
    <div className={"mainContainer"}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>User Details</h1>
      <UserDetails user={user} />
    </div>
  )
}

export default UserDetailPage
