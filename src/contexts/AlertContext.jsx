import { createContext, useState, useContext } from "react";

//Contesto
const AlertContext = createContext();

//Provider
function AlertProvider({ children }) {
  const [alertData, setAlertData] = useState({
    type: "",
    message: "",
  });

  return (
    <AlertContext.Provider value={{ alertData, setAlertData }}>
      {children}
    </AlertContext.Provider>
  );
}
function useAlertContext() {
  const context = useContext(AlertContext);
  return context;
}

export { AlertProvider, useAlertContext };
