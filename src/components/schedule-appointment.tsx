import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Input, Alert } from "antd";

import CalendarAppointment from "./calendar";
import DropdownComponent from "./dropdown-menu";
import { AlertTypes, AppointmentStatus, UpdateApointment } from "../types/index";
import { UserAllAppointments } from "./appointment-section";
import { getAllDentistDetails, getListOfBookSlots, createAppointment, updateAppointment } from "../services/api/api-helper";
import { serviceCategory } from "../lib/variables";
import { useUserAppointmentContext } from "../context/user-appointments-context";

interface DentistListResponse {
  data: DentistListData[];
}

interface DentistListData {
  dentistId: string;
  name: string;
}

interface DentistBookedSlotsResponse {
  data: DentistBookedSlotsData[];
}

interface DentistBookedSlotsData {
  appointmentId: string;
  dentistId: string;
  appointmentDate: string;
}

interface ScheduleAppointmentSectionProps {
  category: string;
  data?: UserAllAppointments;
  handleClose?: () => void;
}

const ScheduleAppointmentSection = ({ category, data, handleClose }: ScheduleAppointmentSectionProps) => {
  const [dentistId, setDentistId] = useState<string>(data?.dentistId ?? "");
  const [serviceType, setServiceType] = useState<string>(data?.serviceType ?? "");
  const [unAvailableDate, setUnAvailableDate] = useState<string[]>([]);
  const [appointmentDate, setAppointmentDate] = useState<string>(data?.appointmentDate ?? "");
  const [listOfDentist, setListOfDentist] = useState<{ label: string; value: string }[]>([]);
  const [specialNotes, setSpecialNotes] = useState(data?.specialNotes ?? "");
  const [alert, setAlert] = useState({ show: false, message: "", type: undefined as AlertTypes | undefined });
  const { TextArea } = Input;
  const userId = localStorage.getItem("userId") as string;
  const { toggleReload } = useUserAppointmentContext();

  const onButtonClick = async () => {
    try {
      if (category === "SCHEDULE_APPOINTMENT") {
        const params = {
          userId,
          appointmentDate,
          serviceType,
          dentistId,
          status: AppointmentStatus.OPEN,
          specialNotes,
        };
        await createAppointment(params);
        handlerAlert("Appointment successfully booked!", AlertTypes.SUCCESS);
        handleButtonDisable();
        toggleReload();
        return;
      }

      if (category === "REBOOK_APPOINTMENT" && data && handleClose) {
        const params: UpdateApointment = {
          appointmentId: data.appointmentId,
          appointmentDate: appointmentDate,
          specialNotes,
          dentistId,
        };

        await updateAppointment(params);
        handlerAlert("Appointment successfully rebooked!", AlertTypes.SUCCESS);
        handleButtonDisable();
        toggleReload();
        handleClose();
        return;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("error");
        handlerAlert(error.response?.data.message, AlertTypes.ERROR);
      }
    }
  };

  const handlerAlert = (message: string, type: AlertTypes) => {
    setAlert({ show: true, message, type });

    setTimeout(() => {
      setAlert((alert) => ({ ...alert, show: false }));
    }, 10000);
  };

  const handleButtonDisable = () => {
    setServiceType("");
    setDentistId("");
    setAppointmentDate("");
    setSpecialNotes("");
  };
  const handleSpecialNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSpecialNotes(event.target.value);
  };

  useEffect(() => {
    const getAllDentistData = async () => {
      const listOfDentist = await getAllDentistDetails<DentistListResponse>();

      setListOfDentist(listOfDentist.data.map((value) => ({ label: value.name, value: value.dentistId })));
    };

    getAllDentistData();
  }, []);

  useEffect(() => {
    const getDentistBookedDate = async () => {
      const bookedSlots = await getListOfBookSlots<DentistBookedSlotsResponse>(dentistId);
      if (bookedSlots.data.length > 0) {
        setUnAvailableDate(bookedSlots.data.map((item) => item.appointmentDate));
      }
    };
    if (dentistId) getDentistBookedDate();
  }, [dentistId]);

  return (
    <div className="flex flex-col item-center">
      {alert.show && <Alert message={alert.message} type={alert.type} showIcon banner />}
      {category === "SCHEDULE_APPOINTMENT" ? <h2 className="text-xl font-semibold mb-2">Schedule Your Next Appointment</h2> : ""}
      <div className="flex flex-col justify-between">
        <DropdownComponent placeholder="Select a service" items={serviceCategory} setState={setServiceType} defaultValue={serviceType} category={category} />
        <DropdownComponent placeholder="Select a doctor" items={listOfDentist} setState={setDentistId} defaultValue={dentistId} category={category} />
      </div>
      {dentistId ? (
        <CalendarAppointment unAvailableDate={unAvailableDate} setState={setAppointmentDate} defaultValue={appointmentDate} />
      ) : (
        <h2 className="font-semibold text-[#583FBC]">Please select select dentist first to view available slots.</h2>
      )}
      <label htmlFor="specialNotes" className="mt-2 text-[#181945]">
        Special Notes
      </label>
      <TextArea
        className=""
        id="specialNotes"
        rows={4}
        placeholder="Please add your notes here."
        defaultValue={specialNotes}
        maxLength={1000}
        value={specialNotes}
        onChange={handleSpecialNotesChange}
      />
      {category === "SCHEDULE_APPOINTMENT" ? (
        <>
          <button
            className={`rounded-full text-white px-2 py-2 mt-4 ${serviceType && dentistId && appointmentDate ? "bg-[#583FBC]" : "bg-gray-400"}`}
            disabled={!serviceType || !dentistId || !appointmentDate}
            onClick={onButtonClick}
          >
            {`Make an appointment`}
          </button>
        </>
      ) : (
        <div className="flex flex-row justify-end">
          <button
            className={`rounded-full text-white px-2 py-2 mt-4 mr-2 ${serviceType && dentistId && appointmentDate ? "bg-[#583FBC]" : "bg-gray-400"}`}
            disabled={!serviceType || !dentistId || !appointmentDate}
            onClick={onButtonClick}
          >
            Rebook
          </button>
          <button className="rounded-full bg-[#583FBC] text-white px-2 py-2 mt-4 w-16" onClick={handleClose}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ScheduleAppointmentSection;
