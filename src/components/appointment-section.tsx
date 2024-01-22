import { useEffect, useState } from "react";
import AppointmentCard from "./appointment-cards";
import { getAllAppointments } from "../services/api/api-helper";
import { useUserAppointmentContext } from "../context/user-appointments-context";

interface UserAllAppointmentsResponse {
  data: UserAllAppointments[];
}

export interface UserAllAppointments {
  userId: string;
  appointmentDate: string;
  serviceType: string;
  dentistId: string;
  status: string;
  specialNotes: string;
  appointmentId: string;
  dentistName: string;
}

const AppointmentSection = () => {
  const [appointmentList, setAppointmentList] = useState<UserAllAppointments[]>();
  const { reload } = useUserAppointmentContext();

  const userId = localStorage.getItem("userId") as string;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const userAllAppoinments = async () => {
      const userData = await getAllAppointments<UserAllAppointmentsResponse>(userId);
      if (userData.data.length > 0) {
        setAppointmentList(userData.data);
      }
    };

    if (userId) userAllAppoinments();
  }, [userId, reload, token]);

  return (
    <div className="flex flex-col bg-slate-50 rounded-md">
      <h2 className="text-xl font-semibold mb-2">My Appointments</h2>
      {appointmentList?.map((value) => (
        <AppointmentCard key={value.appointmentId} appointment={value} />
      ))}
    </div>
  );
};

export default AppointmentSection;
