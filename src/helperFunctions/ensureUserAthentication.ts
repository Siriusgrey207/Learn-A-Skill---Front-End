import { NavigateFunction } from "react-router-dom";

async function ensureUserAuthentication(
    userDetails: { isLoggedIn: boolean }, // Pass user details from the component
    navigate: NavigateFunction, // Pass navigate function for redirection
    next: () => void // Function to call if authenticated
): Promise<void> {
    console.log("[ensureUserAuthentication]");

    if (userDetails.isLoggedIn) {
        await next(); // Proceed if the user is logged in
    } else {
        navigate("/login"); // Redirect to login page if not authenticated
    }
}

export default ensureUserAuthentication;
