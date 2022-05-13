import { createContext, useState, useEffect, ReactNode } from "react";
import { auth } from "../service/firebase";

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext(
  {} as {
    currentUser: any;
    setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
  }
);

export const AuthProvider: React.VFC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>("");

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
