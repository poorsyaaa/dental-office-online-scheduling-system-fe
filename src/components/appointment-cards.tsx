import { useState } from "react";
import InitialsAvatar from "react-initials-avatar";

import "react-initials-avatar/lib/ReactInitialsAvatar.css";

import { UserAllAppointments } from "./appointment-section";
import { cancelAppointment } from "../services/api/api-helper";
import { AppointmentStatus, CancelAppointment } from "../types";
import Modal from "./modal";
import { useUserAppointmentContext } from "../context/user-appointments-context";
import { AxiosError } from "axios";

interface AppointmentCardProps {
  appointment: UserAllAppointments;
}
const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const { appointmentId, appointmentDate, serviceType, dentistName, status, specialNotes } = appointment;
  const userId = localStorage.getItem("userId") as string;
  const isDisabled = status === "CANCELLED" ? true : false;
  const { toggleReload } = useUserAppointmentContext();

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onHandleCancel = () => {
    handleModal();
    setCategory("CANCEL");
    setTitle("Are you sure you want to cancel appointment?");
  };

  const onHandleRebook = () => {
    handleModal();
    setCategory("REBOOK");
    setTitle("Rebook Appointment");
  };

  const handleCancelAppointment = async () => {
    try {
      const params: CancelAppointment = {
        userId,
        appointmentId,
        status: AppointmentStatus.CANCELLED,
      };
      await cancelAppointment(params);
      toggleReload();
      handleModal();
      setShowDetails(!showDetails);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("error");
      }
    }
  };

  return (
    <>
      {isModalOpen && <Modal isOpen={isModalOpen} category={category} actionCommand={handleCancelAppointment} data={appointment} title={title} handleModal={handleModal} />}
      <div className="flex flex-col text-[#181945] mb-2">
        <div className="flex flex-col justify-between bg-white rounded-md h-24 px-4 py-4 hover:bg-[#DBDEFA]">
          <div className="flex flex-row justify-between text-[#181945] font-semibold">
            <h3>{serviceType}</h3>
            <h3>{status}</h3>
          </div>
          <div className="flex flex-row justify-between">
            <h3 className="text-[#181945] font-semibold">{appointmentDate}</h3>
            <button onClick={toggleDetails} className="text-[#583FBC] font-bold">
              View Details
            </button>
          </div>
        </div>
        {showDetails && (
          <div className="flex flex-col mt-2 px-4 py-4 border-t rounded-md bg-white text-[#181945]">
            <div className="flex flex-col items-center">
              <InitialsAvatar name={dentistName} />
              <p>{dentistName}</p>
            </div>
            <div className="flex flex-col justify-start mb-4">
              <p>
                <span className="text-[#181945] font-semibold">Service type: </span>
                <span className="text-[#181945]">{serviceType}</span>
              </p>
              <p>
                <span className="text-[#181945] font-semibold">Special notes: </span>
                <span className="text-[#181945]">{specialNotes}</span>
              </p>
            </div>
            <div className="flex flex-row justify-end text-sm">
              <button className={`rounded-full bg-[#583FBC] text-[#FFFFFF] px-2 py-2 mr-2  w-48 ${isDisabled ? "bg-gray-400" : "bg-[#583FBC]"}`} disabled={isDisabled} onClick={onHandleCancel}>
                Cancel Appointment
              </button>
              <button className={`rounded-full bg-[#583FBC] text-[#FFFFFF] px-2 py-2 w-48 ${isDisabled ? "bg-gray-400" : "bg-[#583FBC]"}`} disabled={isDisabled} onClick={onHandleRebook}>
                Rebook Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AppointmentCard;
