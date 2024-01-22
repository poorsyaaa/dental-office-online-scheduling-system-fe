import FooterComponent from "../components/footer";
import Sidebar from "../components/sidebar";
import UserDashboard from "../components/user-dashboard";

const Dashboard = () => {
  return (
    <div className="flex flex-col flex-grow h-screen bg-gray-200 text-[#196686]">
      <div className="flex flex-row h-screen">
        <div className="sidebar w-64 bg-slate-50 text-[#181945] p-4">
          <Sidebar />
        </div>
        <div className="main-content overflow-y-auto flex-1 p-4">
          <div className="flex flex-row justify-between items-center my-4">
            <h2 className="text-2xl font-extrabold text-[#181945]">Dashboard</h2>
          </div>

          <UserDashboard />
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default Dashboard;
