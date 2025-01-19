import { useEffect, useState } from "react";
import classNames from "classnames";
import axios from "axios";

import Panel from "../atoms/Panel";
import LoadingComponent from "../quarks/LoadingComponent";
import Error from "../quarks/Error";
import LoginWarningPanel from "../quarks/LoginWarningPanel";
import SendEmail from "./SendEmail";
import SkillCard from "../atoms/SkillCard";
import LazyInfoLoading from "../atoms/LazyInfoLoading";
import Button from "../quarks/Button";

import AccountIcon from "../icons/AccountIcon";
import CheckIcon2 from "../icons/CheckIcon2";
import CloseIcon2 from "../icons/CloseIcon2";
import MailIcon from "../icons/MailIcon";
import PhoneIcon from "../icons/PhoneIcon";
import DiscordIcon from "../icons/DiscordIcon";
import SkypeIcon from "../icons/SkypeIcon";
import TeachIcon from "../icons/TeachIcon";
import HeartIcon2 from "../icons/HeartIcon2";
import { developmentMode } from "../constants/devTools";
import { getUserDataUrl, getFavoriteUserSkills } from "../constants/endpoints";
import { UserDetailsTypes, useUserContext } from "../hooks/useUserContext";

type AccountPanelProps = {
  userId?: string;
};

export default function AccountPanel(props: AccountPanelProps) {
  // Props
  const { userId = "" } = props;

  // Global Context
  const { userDetails } = useUserContext();

  // Local State
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentUserDetails, setCurrentUserDetails] =
    useState<UserDetailsTypes | null>(null);
  const [favoriteSkills, setFavoriteSkills] = useState<string[]>([]);
  const [displayedComponent, setDisplayedComponent] =
    useState<string>("taughtSkills");

  // ----- Get the skills that have been set to favorites
  const getFavoriteSkills = async () => {
    const res = await axios.post(getFavoriteUserSkills, {
      userId: userDetails.userId,
    });
    // favoriteSkills;
    if (developmentMode) setFavoriteSkills(["123", "456"]);
    if (!developmentMode) setFavoriteSkills(res.data);
  };

  // ----- Fetch the user details on change of the url params
  useEffect(() => {
    const fetchUserDetails = async () => {
      let url = developmentMode
        ? getUserDataUrl
        : getUserDataUrl + `/{${userId}}`;
      try {
        const res = await axios(url);
        const data = res.data;
        setCurrentUserDetails(developmentMode ? userDetails : data);
      } catch (error) {
        setError("Unable to obtain user information.");
      } finally {
        if (developmentMode) {
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        } else {
          setLoading(true);
        }
      }
    };

    fetchUserDetails();
    getFavoriteSkills();
  }, [userId]);

  return (
    <>
      {!userDetails.isLoggedIn && <LoginWarningPanel />}
      {userDetails.isLoggedIn && (
        <>
          <Panel className="panel--account">
            {!currentUserDetails ||
              (loading && <LoadingComponent size="large" color="#2D6E46" />)}
            {!loading && error !== "" && <Error errorMessage={error} />}
            {currentUserDetails && !loading && (
              <>
                <div className="account__main">
                  <div className="account__img-container">
                    {/* If the user doesn't have a profile picture */}
                    {!currentUserDetails.userImage && <AccountIcon />}
                    {/* If for some reason the profile picture is a url (for example in testing) */}
                    {typeof currentUserDetails.userImage === "string" &&
                      currentUserDetails.userImage !== "" && (
                        <img
                          className="account__img"
                          src={currentUserDetails.userImage}
                          alt="User"
                        />
                      )}
                    {/* If the profile picture is a file */}
                    {typeof currentUserDetails.userImage === "object" && (
                      <img
                        className="account__img"
                        src={URL.createObjectURL(currentUserDetails.userImage)}
                        alt="User"
                      />
                    )}
                  </div>
                  <div className="account__details">
                    <div
                      className={classNames(
                        "account__name",
                        currentUserDetails.isPremium &&
                          "account__name--verified"
                      )}
                    >
                      {currentUserDetails.isPremium && <CheckIcon2 />}
                      <h2>
                        {currentUserDetails.name} {currentUserDetails.surname}
                      </h2>
                    </div>
                    <div className="account__description">
                      {currentUserDetails.description}
                    </div>
                    <div className="account__further-details">
                      <small>
                        Member since {currentUserDetails.memberSince}
                      </small>
                      <i></i>
                      <small>
                        Teaching {currentUserDetails.numberOfSkillsTaught} skill
                        {currentUserDetails.numberOfSkillsTaught === 1 && "s"}
                      </small>
                    </div>
                  </div>
                </div>
                <div className="grid-container account__contact">
                  <div
                    className={classNames(
                      "grid__el status",
                      userDetails.isPremium && "status--is-verified"
                    )}
                  >
                    {userDetails.isPremium ? <CheckIcon2 /> : <CloseIcon2 />}
                    <h6>Status:</h6>
                    <span>
                      {userDetails.isPremium ? "Verified" : "Not Verified"}
                    </span>
                  </div>
                  {userDetails.email.length && (
                    <div className="grid__el email">
                      <MailIcon />
                      <h6>Email:</h6>
                      <span>{userDetails.email}</span>
                    </div>
                  )}
                  {userDetails.phone.length && (
                    <div className="grid__el phone">
                      <PhoneIcon />
                      <h6>Phone:</h6>
                      <LazyInfoLoading info={userDetails.phone} />
                      {/* <span>{userDetails.phone}</span> */}
                    </div>
                  )}
                  {userDetails.discord.length && (
                    <div className="grid__el discord">
                      <DiscordIcon />
                      <h6>Discord:</h6>
                      <span>{userDetails.discord}</span>
                    </div>
                  )}
                  {userDetails.skype.length && (
                    <div className="grid__el skype">
                      <SkypeIcon />
                      <h6>Skype:</h6>
                      <span>{userDetails.skype}</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </Panel>

          {userId && userId.toString() === userDetails.userId.toString() && (
            <div className="buttons-container buttons-container--2 buttons-container--account">
              <Button
                className={classNames(
                  "btn",
                  displayedComponent === "taughtSkills"
                    ? "btn--green"
                    : "btn--white-green"
                )}
                onClick={() => setDisplayedComponent("taughtSkills")}
              >
                <TeachIcon />
                <span className="btn__text">Skills Taught By You</span>
              </Button>
              <Button
                className={classNames(
                  "btn",
                  displayedComponent === "favoriteSkills"
                    ? "btn--green"
                    : "btn--white-green"
                )}
                onClick={() => setDisplayedComponent("favoriteSkills")}
              >
                <HeartIcon2 />
                <span className="btn__text">Favorite Skills</span>
              </Button>
            </div>
          )}

          {userDetails.isLoggedIn && userDetails.isPremium && <SendEmail />}
          {displayedComponent === "taughtSkills" && (
            <h1>Skills taught by you</h1>
          )}
          {displayedComponent === "favoriteSkills" && <h1>FavoriteSkills</h1>}
          {/* {userDetails.isLoggedIn &&
                        userDetails.skills.length &&
                        displayedComponent === "taughtSkills" &&
                        userDetails.skills.map((skill) => {
                            if (skill.skillIsUnderReview) return;
                            return (
                                <SkillCard
                                    key={skill.skillId}
                                    skillDetails={skill}
                                    favoriteSkills={favoriteSkills}
                                />
                            );
                        })}
                    {userDetails.isLoggedIn &&
                        userDetails.skills.length &&
                        displayedComponent === "favoriteSkills" && (
                            <Panel>
                                <span>Favorite Skills</span>
                            </Panel>
                        )}
                    {userDetails && !userDetails.skills.length && (
                        <span>You don't teach any skills.</span>
                    )} */}
        </>
      )}
    </>
  );
}
