import { db } from "@/firebase";
import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "John Doe", email: "john.doe@example.com",coins:0 });
  const updateUser = async (coins) => {
    try {
      const userRef = db.collection("users").doc(user.email);
      const doc = await userRef.get();
      const data = doc.data();
      const newCoins = (data.coins || 0) + coins;
      const lastPlayedDate=new Date();
      //await userRef.update({ name: "New Name" });
      await userRef.update({lastPlayedDate:lastPlayedDate});
      await userRef.update({ coins: newCoins });
      const updatedUser = await userRef.get();
      setUser(updatedUser.data());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser ,updateUser}}>
      {children}
    </UserContext.Provider>
  );
};


