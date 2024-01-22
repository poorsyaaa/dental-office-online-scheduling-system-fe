import { UserAllAppointments } from "./appointment-section";
import { Modal } from "antd";
import ScheduleAppointmentSection from "./schedule-appointment";

interface ModalProps {
  category: string;
  title: string;
  actionCommand?: () => Promise<void>;
  data: UserAllAppointments;
  handleModal: () => void;
  isOpen: boolean;
}
const MyModal = ({ category, actionCommand, data, title, handleModal, isOpen }: ModalProps) => {
  return (
    <>
      <Modal title={title} open={isOpen} onCancel={handleModal} footer={null} className="text-[#181945] text-1xl ">
        <div className="flex flex-col justify-between">
          <div className="items-center">
            {category === "CANCEL" ? (
              <>
                <div className="">
                  <h1 className="text-base font-semibold">Appointment Details</h1>
                  <div className="flex flex-col items-start justify-start mb-4">
                    <p>
                      <span className="text-[#181945] font-semibold">Service type: </span>
                      <span className="text-[#181945]">{data.serviceType}</span>
                    </p>
                    <p>
                      <span className="text-[#181945] font-semibold">Appointment Date: </span>
                      <span className="text-[#181945]">{data.appointmentDate}</span>
                    </p>
                    <p>
                      <span className="text-[#181945] font-semibold">Doctor: </span>
                      <span className="text-[#181945]">{data.dentistName}</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-row justify-end">
                  <button className="rounded-full bg-[#583FBC] w-16 text-white px-2 py-2 mr-2" onClick={handleModal}>
                    Cancel
                  </button>
                  <button className="rounded-full bg-[#583FBC] w-16 text-white px-2 py-2 " onClick={actionCommand}>
                    Okay
                  </button>
                </div>
              </>
            ) : (
              <ScheduleAppointmentSection category="REBOOK_APPOINTMENT" data={data} handleClose={handleModal} />
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MyModal;
