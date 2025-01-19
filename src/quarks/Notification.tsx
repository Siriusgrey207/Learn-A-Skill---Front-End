import { useEffect } from "react";
import { useNotificationContext } from "../hooks/useNotificationContext";
import classNames from "classnames";

export default function Notification() {
    // Global Context
    const { notification, setNotification } = useNotificationContext();

    useEffect(() => {
        let duration = notification.displayDuration || 5000;
        setTimeout(() => {
            setNotification({ ...notification, show: false });
        }, duration);
    }, [notification.show]);

    return (
        <div
            className={classNames(
                "notification",
                notification.type && `notification--${notification.type}`,
                notification.show && `notification--show`
            )}
        >
            <span>{notification.message && notification.message}</span>
        </div>
    );
}
