// Copyright 2022 Social Fabric, LLC

import React from "react"
import { User } from "../../data/users"

type UserDetailsProps = {
  user: User
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
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
        <p>{user.associatedAccount}</p>
      </label>
    </>
  )
}

export default UserDetails
