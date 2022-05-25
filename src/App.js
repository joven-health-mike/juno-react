// Copyright 2022 Social Fabric, LLC

import React from "react"
import SchoolDetails from "./components/details/SchoolDetails"

function App() {
  // This is just test code for now. Feel free to delete/modify it to test your components.
  const school = {
    name: "Jacek McGuinness",
    email: "jacek-mcguinness@jovenhealth.com",
    facilitators: [
      "Aardvark Academy",
      "Moose Middle School",
      "Rattlesnake School",
    ],
  }

  return (
    <>
      <SchoolDetails school={school} />
    </>
  )
}

export default App
