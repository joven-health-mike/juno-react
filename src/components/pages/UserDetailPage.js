// Copyright 2022 Social Fabric, LLC

import React from "react"
import UserDetails from "../details/UserDetails"

const UserDetailPage = ({ user }) => {
  return (
    <>
      <h1>User Detail</h1>
      <UserDetails user={user} />
    </>
  )
}

export default UserDetailPage
