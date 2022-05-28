/* Libraries Imported */
import React, { useEffect, useState } from "react";
import app from "../FirestoreConnection/firebase"
import { getAuth } from "firebase/auth"
import MenuLoading from "../MainPages/MenuLoading";

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  /* Set variables*/
  const [currentUser, setCurrentUser] = useState(null)
  const [pending, setPending] = useState(true)
  /* check user */
  useEffect(() => {
    getAuth(app).onAuthStateChanged((user) => {
      setCurrentUser(user)
      setPending(false)
    })
  }, [])
  /* waiting for result */
  if(pending){
    return <><MenuLoading/></>
  }

  return (
    <AuthContext.Provider
      value={{currentUser}}>
      {children}
    </AuthContext.Provider>
  );
};