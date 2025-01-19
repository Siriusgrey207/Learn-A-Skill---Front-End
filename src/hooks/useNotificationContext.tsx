import React, { createContext, useState, ReactNode, useContext } from "react";

export type NotificationTypes = {
    show: boolean;
    type: string;
    message: string;
    displayDuration?: number; // in ms
};

// Define the context types
type NotificationContextTypes = {
    notification: NotificationTypes;
    setNotification: React.Dispatch<React.SetStateAction<NotificationTypes>>;
};

// Create the context with default values
const NotificationContext = createContext<NotificationContextTypes | undefined>(
    undefined
);

// Create a provider component (use in the JSX)
export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [notification, setNotification] = useState<NotificationTypes>({
        show: false,
        type: "danger",
        message: "",
        displayDuration: 5000,
    });

    return (
        <NotificationContext.Provider value={{ notification, setNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

// Custom Hook
export const useNotificationContext = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error(
            "useNotificationContext must be used within a UserProvider"
        );
    }
    return context;
};
