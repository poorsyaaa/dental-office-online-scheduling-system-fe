import { createContext, useState, useContext } from "react";

const UserAppointmentContext = createContext({
  reload: 0,
  toggleReload: () => {},
});

export const useUserAppointmentContext = () => {
  return useContext(UserAppointmentContext);
};

export const UserAppointmentdProvider = ({ children }: any) => {
  const [reload, setReload] = useState(0);

  const toggleReload = () => {
    setReload((prevCounter) => prevCounter + 1);
  };

  const contextValue = {
    reload,
    toggleReload,
  };

  return <UserAppointmentContext.Provider value={contextValue}>{children}</UserAppointmentContext.Provider>;
};
