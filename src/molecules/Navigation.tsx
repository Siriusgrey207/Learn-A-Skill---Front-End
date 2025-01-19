import NavLink from "../atoms/NavLink";

import { navigation } from "../constants/navigation";

import { useUserContext } from "../hooks/useUserContext";

type NavigationProps = {
  className: string;
};

export default function Navigation(props: NavigationProps) {
  const { className } = props;

  const { userDetails } = useUserContext();

  return (
    <div className={"navigation-container" + " " + className}>
      {navigation.map((navItem, index) => {
        let modifiedHref = navItem.href;
        // Account Page
        if (navItem.text === "Account" && !userDetails.isLoggedIn) return;
        if (navItem.text === "Account")
          modifiedHref = navItem.href + `/${userDetails.userId}`;
        // Remove the login nav item if the user is logged in
        if (userDetails.isLoggedIn && navItem.text.toLowerCase() === "login")
          return;
        return (
          <NavLink
            key={index + navItem.text}
            href={modifiedHref}
            text={navItem.text}
            icon={navItem.icon}
            className={navItem.customClass}
            requiresAuth={navItem.requiresAuth}
          />
        );
      })}
    </div>
  );
}
