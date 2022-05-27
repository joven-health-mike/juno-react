// Copyright 2022 Social Fabric, LLC

import React from "react"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"

const HomePage = () => {
  const role = "admin"

  return (
    <>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>Hello World!</h1>
    </>
  )
}

export default HomePage
