// Copyright 2022 Social Fabric, LLC

import React, { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Appointment } from "../../data/appointments"
import {
  SelectCounselorList,
  SelectFacilitatorList,
  SelectStudentList,
} from "./SelectList"

type CreateAppointmentFormProps = {
  defaultAppointment?: Appointment
  onSubmit: any
  onCancel: any
}

const CreateAppointmentForm: React.FC<CreateAppointmentFormProps> = ({
  defaultAppointment,
  onSubmit,
  onCancel,
}) => {
  const emptyAppointment = {
    title: "",
    start: new Date(),
    end: new Date(),
    counselor: "",
    student: "",
    facilitator: "",
  }

  const [appointment, setAppointment] = useState(
    defaultAppointment ?? emptyAppointment
  )

  const onCounselorChanged = (counselorName: string) => {
    setAppointment({ ...appointment, counselor: counselorName })
  }

  const onFacilitatorChanged = (facilitatorName: string) => {
    setAppointment({ ...appointment, facilitator: facilitatorName })
  }

  const onStudentChanged = (studentName: string) => {
    setAppointment({ ...appointment, student: studentName })
  }

  const onFormSubmit = (e: any) => {
    e.preventDefault()
    onSubmit(appointment)
  }

  const onFormCancel = (e: any) => {
    e.preventDefault()
    setAppointment(emptyAppointment)
    onCancel()
  }

  return (
    <form onSubmit={onFormSubmit}>
      <label>
        Title
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={appointment.title}
          required
          onChange={(e) =>
            setAppointment({ ...appointment, title: e.target.value })
          }
        />
      </label>
      <label>
        Start Time
        <DatePicker
          selected={new Date(appointment.start)}
          onChange={(date: Date) =>
            setAppointment({ ...appointment, start: date })
          }
          showTimeSelect
          timeFormat="h:mm"
          timeCaption="Start Time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </label>
      <label>
        End Time
        <DatePicker
          selected={new Date(appointment.end)}
          onChange={(date: Date) =>
            setAppointment({ ...appointment, end: date })
          }
          showTimeSelect
          timeFormat="h:mm"
          timeCaption="End Time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </label>
      <label>
        Counselor:{" "}
        <SelectCounselorList
          value={appointment.counselor}
          onCounselorChanged={onCounselorChanged}
        />
      </label>
      <label>
        Student:{" "}
        <SelectStudentList
          value={appointment.student}
          onStudentChanged={onStudentChanged}
        />
      </label>
      <label>
        Facilitator:{" "}
        <SelectFacilitatorList
          value={appointment.facilitator}
          onFacilitatorChanged={onFacilitatorChanged}
        />
      </label>

      <button type="submit">Submit</button>
      <button type="button" onClick={onFormCancel}>
        Cancel
      </button>
    </form>
  )
}

export default CreateAppointmentForm
