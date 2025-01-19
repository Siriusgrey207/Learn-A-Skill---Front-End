import React, { createContext, useState, ReactNode, useContext } from "react";

import { fakeGuest, SkillTypes } from "../constants/fakeData";

// Define the shape of the context state
export type UserDetailsTypes = {
  isLoggedIn: boolean;
  userId: string;
  name: string;
  surname: string;
  email: string;
  country: string;
  city: string;
  userIsPremium: boolean;
  userIsInOrganization: boolean;
  userImage: string;
  description: string;
  discord: string;
  phone: string;
  skype: string;
  rating: number;
  numberOfSkillsTaught: number;
  role: string;
  isVerified: boolean;
};

// Define the context types
type UserContextType = {
  userDetails: UserDetailsTypes;
  setUserDetails: React.Dispatch<React.SetStateAction<UserDetailsTypes>>;
};

// Create the context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component (use in the JSX)
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userDetails, setUserDetails] = useState<UserDetailsTypes>(fakeGuest);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
