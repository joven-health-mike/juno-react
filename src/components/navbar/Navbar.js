// Copyright 2022 Social Fabric, LLC

import React from "react"
import { IconContext } from "react-icons"
import { Link } from "react-router-dom"

const Navbar = ({ items }) => {
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        {items.map((item, index) => {
          return (
            <Link key={index} to={item.path}>
              {item.icon}
              <span>{item.title}</span>
            </Link>
          )
        })}
      </IconContext.Provider>
    </>
  )
}

export default Navbar
