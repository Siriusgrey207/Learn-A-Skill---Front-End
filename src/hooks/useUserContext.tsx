import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

import { fakeGuest } from "../constants/fakeData";
import { api } from "../services/api";

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
  favoriteSkills: string[];
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

  // Check user session on app load
  useEffect(() => {
    async function fetchUserSession() {
      try {
        // Use the custom `api` instance to send the refresh-token request
        const response = await api.post(
          "/api/v1/auth/refresh-token",
          {},
          { withCredentials: true }
        );
        const { user, accessToken } = response.data;

        // Update user details and set the new access token
        setUserDetails({ ...user, isLoggedIn: true });
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      } catch (error) {
        console.error("Failed to restore user session:", error);
        setUserDetails(fakeGuest); // Default to logged-out state
      }
    }

    fetchUserSession();
  }, []);

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
