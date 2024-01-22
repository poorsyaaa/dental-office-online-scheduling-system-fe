import AppointmentSection from "../components/appointment-section";
import ScheduleAppointmentSection from "../components/schedule-appointment";
import { UserAppointmentdProvider } from "../context/user-appointments-context";

const UserDashboard = () => {
  return (
    <UserAppointmentdProvider>
      <div className="flex flex-col bg-gray-200 text-semibold text-[#181945]">
        <div className="main-content flex-1 p-4 bg-slate-50 rounded-md mb-4">
          <ScheduleAppointmentSection category="SCHEDULE_APPOINTMENT" />
        </div>
        <div className="main-content flex-1 p-4 bg-slate-50 rounded-md">
          <AppointmentSection />
        </div>
      </div>
    </UserAppointmentdProvider>
  );
};

export default UserDashboard;
