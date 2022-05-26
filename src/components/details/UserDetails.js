// Copyright 2022 Social Fabric, LLC

import React from "react"

const UserDetails = ({ user }) => {
  return (
    <>
      <label>
        Name:
        <h1>{user.name}</h1>
      </label>
      <label>
        Email:
        <p>{user.email}</p>
      </label>
      <label>
        Password:
        <p>{user.password}</p>
      </label>
      <label>
        Role:
        <p>{user.role}</p>
      </label>
      <label>
        Associated Account:
        <p>{user.associatedAccountId}</p>
      </label>
    </>
  )
}

export default UserDetails
