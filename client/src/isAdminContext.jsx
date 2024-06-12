import React, { createContext, useContext, useState } from "react";

const IsAdminContext = createContext();

export const IsAdminProvider = ({ children }) => {
  const [isAdmin, setisAdmin] = useState(false);

  return (
    <IsAdminContext.Provider value={{ isAdmin, setisAdmin }}>
      {children}
    </IsAdminContext.Provider>
  );
};

export const useIsAdminBarContext = () => useContext(IsAdminContext);
