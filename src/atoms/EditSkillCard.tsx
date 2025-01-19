import { useEffect, useState } from "react";
import classNames from "classnames";
import axios from "axios";

import Panel from "./Panel";
import UserInfo from "./UserInfo";
import Button from "../quarks/Button";
import Dropdown from "./Dropdown";
import LoadingComponent from "../quarks/LoadingComponent";
import LightningIcon from "../icons/LightningIcon";
import PenIcon from "../icons/PenIcon";
import CloseIcon from "../icons/CloseIcon";

import { SkillTypes } from "../constants/fakeData";
import { removeTaughtSkillUrl } from "../constants/endpoints";

import { useNotificationContext } from "../hooks/useNotificationContext";
import { useUserContext } from "../hooks/useUserContext";
import { developmentMode } from "../constants/devTools";

type EditSkillCardTypes = {
  skillDetails: SkillTypes;
  updateListOfSkills: (skillId: string) => void;
};

export default function EditSkillCard(props: EditSkillCardTypes) {
  const {
    userId,
    name,
    country,
    city,
    userIsPremium,
    userIsInOrganization,
    userImage,
    skillId,
    skillName,
    skillImg,
    skillRating,
    skillDescription,
    skillTags,
    skillIsNew,
    skillIsHighlighted,
    skillIsUnderReview,
  } = props.skillDetails;

  const updateListOfSkills = props.updateListOfSkills;

  // Global Context
  const { setNotification } = useNotificationContext();
  const { userDetails } = useUserContext();

  // Local State
  const [loading, setLoading] = useState<boolean>(false);
  const [toggleRemoveDD, setToggleRemoveDD] = useState<boolean>(false);
  const [togglePromoteDD, setTogglePromoteDD] = useState<boolean>(false);

  useEffect(() => {
    if (toggleRemoveDD) {
      setTogglePromoteDD(false);
    } else if (togglePromoteDD) {
      setToggleRemoveDD(false);
    }
  }, [toggleRemoveDD, togglePromoteDD]);

  // ----- Removes the skill from the list of taught skills of the user.
  const removeTaughtSkill = async () => {
    console.log("[removeTaughtSkill]");

    setLoading(true);

    // Double check that the user is logged in (arguably not necessary but it doesn't hurt)
    if (!userDetails.isLoggedIn) {
      setNotification({
        show: true,
        type: "danger",
        message: "Please login to perform this aciton",
        displayDuration: 5000, // in ms
      });
      setLoading(false);
      return;
    }

    const skillData = {
      userId: userId,
      skillId: skillId,
      action: "remove skill",
    };

    try {
      await axios.post(removeTaughtSkillUrl, skillData);
      setNotification({
        show: true,
        type: "success",
        message:
          "You have successfully removed this skill from the list of taught skills",
        displayDuration: 5000, // in ms
      });
      // Update the list of taught skills locally as well
      updateListOfSkills(skillId);
      // Upon success, reload the page so that the list is updated.
      // window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      if (developmentMode) {
        setTimeout(() => {
          setLoading(false);
          setToggleRemoveDD(false);
        }, 2000);
      } else {
        setLoading(false);
        setToggleRemoveDD(false);
      }
    }
  };

  return (
    <Panel
      key={skillId}
      className={classNames(
        "skill-card skill-card--editVariant",
        skillIsNew && "skill-card--new",
        skillIsHighlighted && "skill-card--highlighted",
        userIsPremium && "skill-card--userIsPremium",
        skillIsUnderReview && "skill-card--underReview"
      )}
    >
      {skillIsUnderReview && (
        <div className="skill-card__under-review">
          <span>Under Review</span>
        </div>
      )}
      <div className="skill-card__img">
        <img src={skillImg} />
      </div>
      <div className="skill-card__details">
        <UserInfo
          avatar={userImage}
          name={name}
          userIsInOrganization={userIsInOrganization}
          skillRating={skillRating}
          country={country}
          city={city}
        />
        <h6 className="details__skill-title">{skillName}</h6>
        <span className="details__skill-description">{skillDescription}</span>
        <div className="details__skill-tags-and-actions">
          <div className="details__skill-tags">
            {skillIsNew && (
              <div className="skill-tag skill-tag--new">
                <LightningIcon />
                <small>New</small>
              </div>
            )}
            {skillTags.map((tag, index) => (
              <div className="skill-tag" key={index}>
                <small>{tag}</small>
              </div>
            ))}
          </div>
        </div>
        <div className="skill-card__actions">
          {!skillIsHighlighted && !skillIsUnderReview && (
            <div className="promote-skill-container">
              <Button
                type="button"
                className="btn btn--orange btn--promote"
                onClick={() => setTogglePromoteDD(!togglePromoteDD)}
              >
                <LightningIcon />
                <span className="btn__text">Promote</span>
              </Button>
              <Dropdown isToggled={togglePromoteDD}>
                <div className="dropdown__inner">
                  <p>
                    You can promote only this lesson, or you can go premium and
                    promote all of your lessons.
                  </p>
                  <div className="promote-skill-container__buttons">
                    <a
                      href="/promote"
                      className="btn btn--orange btn--promote-skill"
                    >
                      {loading && (
                        <LoadingComponent size="small" color="#FFF" />
                      )}
                      {!loading && (
                        <span className="btn__text">Go Premium</span>
                      )}
                    </a>
                    <a
                      href="/promote"
                      className="btn btn--white-orange btn--promote-all-skills"
                    >
                      {loading && (
                        <LoadingComponent size="small" color="#FFA42E" />
                      )}
                      {!loading && (
                        <span className="btn__text">Promote Skill</span>
                      )}
                    </a>
                  </div>
                </div>
              </Dropdown>
            </div>
          )}
          <Button
            onClick={() => console.log("edit")}
            className="btn btn--green btn--edit btn--edit--comingSoon"
            disabled={true}
          >
            <PenIcon />
            <span className="btn__text">Edit</span>
            <small>(Coming Soon)</small>
          </Button>
          <div className="remove-skill-container">
            <Button
              disabled={loading}
              onClick={() => setToggleRemoveDD(!toggleRemoveDD)}
              className="btn btn--red btn--remove"
            >
              {loading && <LoadingComponent size="small" color="#FFF" />}
              {!loading && (
                <>
                  <CloseIcon />
                  <span className="btn__text">Remove</span>
                </>
              )}
            </Button>
            <Dropdown isToggled={toggleRemoveDD}>
              <div className="dropdown__inner">
                <p>
                  Are you sure you want to remove this skill from the list of
                  taught skill?
                </p>
                <Button
                  disabled={loading}
                  onClick={removeTaughtSkill}
                  className="btn btn--white-red btn--confirm"
                >
                  {loading && <LoadingComponent size="small" color="#FF6868" />}
                  {!loading && <span className="btn__text">Confirm</span>}
                </Button>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </Panel>
  );
}
