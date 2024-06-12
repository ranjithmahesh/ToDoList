import React, { createContext, useContext, useState } from "react";

const NavBarContext = createContext();

export const useNavBarContext = () => useContext(NavBarContext);

export const NavBarProvider = ({ children }) => {
  const [isNavBarShown, setIsNavBarShown] = useState(true);

  return (
    <NavBarContext.Provider value={{ isNavBarShown, setIsNavBarShown }}>
      {children}
    </NavBarContext.Provider>
  );
};
