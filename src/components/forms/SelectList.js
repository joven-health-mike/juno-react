import React, { useContext } from "react"
import { CounselorsContext } from "../../data/counselors"
import { SchoolsContext } from "../../data/schools"
import { StudentsContext } from "../../data/students"

const SelectList = ({ labelText, value, items, onItemChanged }) => {
  const itemChanged = (e) => {
    e.preventDefault()
    const item = e.target.value === labelText ? "" : e.target.value
    onItemChanged(item)
  }

  return (
    <select value={value} onChange={itemChanged}>
      <option key={labelText}>{labelText}</option>
      {items.map((item, index) => {
        return <option key={index}>{item}</option>
      })}
    </select>
  )
}

export default SelectList

export function SelectCounselorList({ value, onCounselorChanged }) {
  const { counselors } = useContext(CounselorsContext)
  const counselorNames = counselors.map((counselor) => counselor.name)

  return (
    <>
      <SelectList
        labelText={"Select a Counselor"}
        items={counselorNames}
        value={value}
        onItemChanged={onCounselorChanged}
      />
    </>
  )
}

export function SelectSchoolList({ value, onSchoolChanged }) {
  const { schools } = useContext(SchoolsContext)
  const schoolNames = schools.map((school) => school.name)

  return (
    <>
      <SelectList
        labelText={"Select a School"}
        items={schoolNames}
        value={value}
        onItemChanged={onSchoolChanged}
      />
    </>
  )
}

export function SelectStudentList({ value, onStudentChanged }) {
  const { students } = useContext(StudentsContext)
  const studentNames = students.map(
    (student) => student.first_name + " " + student.last_name
  )

  return (
    <SelectList
      labelText={"Select a Student"}
      items={studentNames}
      value={value}
      onItemChanged={onStudentChanged}
    />
  )
}

export function SelectFacilitatorList({ value, onFacilitatorChanged }) {
  const { schools } = useContext(SchoolsContext)
  const facilitatorNames = []
  schools.forEach((school) => {
    school.facilitators.forEach((facilitator) =>
      facilitatorNames.push(facilitator)
    )
  })

  return (
    <SelectList
      labelText={"Select a Facilitator"}
      items={facilitatorNames}
      value={value}
      onItemChanged={onFacilitatorChanged}
    />
  )
}
