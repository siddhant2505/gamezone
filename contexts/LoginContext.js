import { db } from "@/firebase";
import { auth } from "@/firebase";
import React, { createContext, useEffect, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  
  const [loggedIn, setLoggedIn] = useState(false);
  



  return (
    <LoginContext.Provider value={{loggedIn, setLoggedIn}}>
      {children}
    </LoginContext.Provider>
  );
};

