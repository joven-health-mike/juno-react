// Copyright 2022 Social Fabric, LLC

import React from "react"
import Navbar from "../navbar/Navbar"
import { getItems } from "../navbar/navBarItems"

const NotFoundPage = () => {
  const role = "admin"

  return (
    <div className={"mainContainer"}>
      <nav>
        <Navbar items={getItems(role)} />
      </nav>
      <h1>404 - Not Found</h1>
    </div>
  )
}

export default NotFoundPage
