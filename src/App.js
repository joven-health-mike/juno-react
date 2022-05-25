// Copyright 2022 Social Fabric, LLC

import React from "react"
import CounselorDetails from "./components/details/CounselorDetails"

function App() {
  // This is just test code for now. Feel free to delete/modify it to test your components.
  const counselor = {
    name: "Jacek McGuinness",
    email: "jacek-mcguinness@jovenhealth.com",
    roomLink: "https://blahblahblah.com",
    assignedSchools: [
      "Aardvark Academy",
      "Moose Middle School",
      "Rattlesnake School",
    ],
  }

  return (
    <>
      <CounselorDetails counselor={counselor} />
    </>
  )
}

export default App
