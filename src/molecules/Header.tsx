import { useEffect } from "react";
import { api } from "../services/api";
import { logoutUrl } from "../constants/endpoints";

import Logo from "../quarks/Logo";
import Button from "../quarks/Button";

// import CogIcon from "../icons/CogIcon";
import LoginIcon from "../icons/LoginIcon";
import LogoutIcon from "../icons/LogoutIcon";
import HeartIcon from "../icons/HeartIcon";
import BookedDateIcon from "../icons/BookedDateIcon";

import { useUserContext } from "../hooks/useUserContext";
// import { developmentMode } from "../constants/devTools";
import { fakeGuest } from "../constants/fakeData";
import returnUrlFromImageFile from "../helperFunctions/returnUrlFromImageFile";

export default function Header() {
  // Global State
  const { userDetails, setUserDetails } = useUserContext();
  //

  // ----- Handles the logout of the user
  const handleLogout = async () => {
    try {
      const res = await api.delete(logoutUrl, { withCredentials: true });
      if (res.status === 200) {
        console.log("Logout Successfull");
        console.log("Logout Response: ", res);
        // Update the global user state upon successful logout
        setUserDetails(fakeGuest);
      }
    } catch (error) {
      console.log("Logout Error: ", error);
    }
  };

  // ----- Handles the case whenever the user image is a url
  //   const handleUserImg = () => {
  //     let imgUrl = "";
  //     if (typeof userDetails.userImage === "object") {
  //       imgUrl = returnUrlFromImageFile(userDetails.userImage);
  //     }
  //     return imgUrl;
  //   };

  return (
    <div id="ndzn-header">
      <div className="container">
        <div className="header__left">
          <Logo />
          <div className="header__left__text">
            <h1>Learn A Skill</h1>
            <span>Uniting teachers and learners</span>
          </div>
        </div>
        <div className="header__right">
          {/* IN BOTH CASES */}
          <a
            className="btn btn--header btn--bookedLessons"
            href={userDetails.isLoggedIn ? "/favorites" : "/login?action=login"}
          >
            <BookedDateIcon />
            <span className="btn__text">Booked Lessons</span>
          </a>

          <i></i>

          <a
            className="btn btn--header btn--favorites"
            href={userDetails.isLoggedIn ? "/favorites" : "/login?action=login"}
          >
            <HeartIcon />
            <span className="btn__text">Favorites</span>
          </a>

          <i></i>

          {/* WHEN THE USER IS NOT LOGGED IN */}
          {!userDetails.isLoggedIn && (
            <>
              <a
                className="btn btn--header btn--login"
                href="/login?action=login"
              >
                <LoginIcon />
                <span className="btn__text">Login</span>
              </a>
            </>
          )}

          {/* WHEN THE USER IS LOGGED IN */}
          {userDetails.isLoggedIn && (
            <>
              <a href="/profile" className="btn btn--header btn--profile">
                {/* In the case where the user has set an image and type is string */}
                {typeof userDetails.userImage === "string" && (
                  <img
                    className="btn--profile__img"
                    src={userDetails.userImage}
                  />
                )}
                {/* In the case where the user has not set an image or the string is empty */}
                {(userDetails.userImage === "" ||
                  userDetails.userImage === null) && (
                  <div className="btn--profile__img-container">
                    <svg
                      className="svg svg--account"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <title>account</title>
                      <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                    </svg>
                  </div>
                )}
                <span className="btn__text">{userDetails.name}</span>
              </a>
              <i></i>
              <Button
                onClick={handleLogout}
                type="button"
                className="btn btn--header btn--settings"
              >
                <LogoutIcon />
                <span className="btn__text">Logout</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
