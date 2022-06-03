import React from "react"
import Modal from "react-modal"
import { Appointment } from "../../data/appointments"
import CreateAppointmentForm from "../forms/CreateAppointmentForm"

type AddAppointmentModalProps = {
  isOpen: boolean
  onClose: () => void
  onAppointmentAdded: (appointment: Appointment) => void
  initialAppointment: Appointment
}

const AddAppointmentModal: React.FC<AddAppointmentModalProps> = ({
  isOpen,
  onClose,
  onAppointmentAdded,
  initialAppointment,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={"modal"}
      overlayClassName={"overlay"}
    >
      <h1>Create Appointment</h1>
      <CreateAppointmentForm
        onSubmit={onAppointmentAdded}
        onCancel={onClose}
        defaultAppointment={initialAppointment}
      />
    </Modal>
  )
}

export default AddAppointmentModal
