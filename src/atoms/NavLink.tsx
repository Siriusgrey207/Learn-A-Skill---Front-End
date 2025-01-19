import React from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useUserContext } from "../hooks/useUserContext"; // Import hook
import ensureUserAuthentication from "../helperFunctions/ensureUserAthentication"; // Import global function

type NavLinkProps = {
    href: string;
    text: string;
    icon: React.ReactNode;
    className: string;
    requiresAuth: boolean; // Indicate if link requires authentication
};

export default function NavLink(props: NavLinkProps) {
    const { href, text, icon, className, requiresAuth = true } = props;
    const { userDetails } = useUserContext(); // Use the hook inside component
    const navigate = useNavigate(); // Use navigate for redirection

    let isActive = false;
    const pathname = window.location.pathname;

    if (
        (href === "/" && pathname === "/") ||
        (href === "/teachASkill" && pathname.includes("teachASkill")) ||
        (href === "/promote" && pathname.includes("promote")) ||
        (href.includes("account") && pathname.includes("account")) ||
        (href === "/donate" && pathname.includes("donate")) ||
        (href === "/about" && pathname.includes("about")) ||
        (href === "/login" && pathname.includes("login"))
    ) {
        isActive = true;
    }

    const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (requiresAuth) {
            e.preventDefault(); // Prevent navigation if auth is required
            // Use the global helper function to check authentication
            await ensureUserAuthentication(userDetails, navigate, () => {
                navigate(href); // Continue navigation if authenticated
            });
        }
    };

    return (
        <Link
            to={href}
            className={classNames(
                "nav-link",
                className,
                isActive && "nav-link--active"
            )}
            onClick={requiresAuth ? handleClick : undefined} // Call auth check if needed
        >
            {icon}
            <span>{text}</span>
        </Link>
    );
}
