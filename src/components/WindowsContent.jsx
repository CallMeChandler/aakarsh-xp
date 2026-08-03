import { createContext, useContext, useState } from "react";

const WindowsContext = createContext();

export function WindowsProvider({ children }) {
  const [openWindows, setOpenWindows] = useState([]);
  const [focusedId, setFocusedId] = useState(null);

  return (
    <WindowsContext.Provider value={{ openWindows, setOpenWindows, focusedId, setFocusedId }}>
      {children}
    </WindowsContext.Provider>
  );
}

export function useWindows() {
  return useContext(WindowsContext);
}
