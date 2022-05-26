// Copyright 2022 Social Fabric, LLC

import React, { useState } from "react"
import { ROLES } from "../../data/users"

const CreateUserForm = ({ defaultUser, onSubmit, onCancel }) => {
  const [user, setUser] = useState(
    defaultUser ?? {
      name: "",
      email: "",
      password: "",
      role: "",
      associatedAccountId: "",
    }
  )

  const onRoleChanged = (e) => {
    e.preventDefault()
    const role = e.target.value.includes("Select") ? "" : e.target.value
    setUser({ ...user, role: role })
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    onSubmit(user)
  }

  return (
    <form onSubmit={onFormSubmit}>
      <h1>Create User</h1>
      <label>
        Name
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={user.name}
          required
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </label>
      <label>
        Email
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={user.email}
          required
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={user.password}
          required
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </label>
      <label>
        Role:{" "}
        <select value={user.role} onChange={onRoleChanged}>
          <option key={"Select a Role"}>Select a Role</option>
          {ROLES.map((role) => {
            return <option key={role}>{role}</option>
          })}
        </select>
      </label>
      <label>Associated Account Id:</label>
      <button type="submit">Submit</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  )
}

export default CreateUserForm
