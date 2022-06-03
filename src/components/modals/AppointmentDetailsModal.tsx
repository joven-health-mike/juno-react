import React from 'react'
import Modal from "react-modal"
import { Appointment } from '../../data/appointments'
import AppointmentDetails from '../details/AppointmentDetails'

type AppointmentDetailsModalProps = {
    isOpen: boolean
    onClose: () => void
    appointment: Appointment
}

const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({
    isOpen,
    onClose,
    appointment }) => {
    return (
        <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={"modal"}
      overlayClassName={"overlay"}
    >
      <h1>Appointment Details</h1>
      <AppointmentDetails appointment={appointment} />
        </Modal>
    )
}

export default AppointmentDetailsModal