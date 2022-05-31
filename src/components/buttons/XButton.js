import React from "react"

const XButton = ({ value, onClick }) => {
  return (
    <>
      <button className={"button-x"} value={value} onClick={onClick}>
        X
      </button>
    </>
  )
}

export default XButton
