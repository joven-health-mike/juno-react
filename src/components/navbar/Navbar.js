// Copyright 2022 Social Fabric, LLC

import React from "react"
import { IconContext } from "react-icons"
import { Link } from "react-router-dom"
import styles from "./navbar.module.css"

const Navbar = ({ items }) => {
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className={styles.navMenu}>
          <ul>
            {items.map((item, index) => (
              <li key={index} className={styles.navText}>
                <Link key={index} to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </IconContext.Provider>
    </>
  )
}

export default Navbar
