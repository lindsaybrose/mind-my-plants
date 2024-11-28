import React, { createContext, useState, useContext } from 'react';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [userType, setUserType] = useState('owner');

  return (
    <RoleContext.Provider value={{ userType, setUserType }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
