import React, { useEffect, useState } from "react";

import classNames from "classnames";
import { useUserContext } from "../hooks/useUserContext";

import Header from "../molecules/Header";
import PageSidebar from "../molecules/PageSidebar";
import Footer from "../molecules/Footer";
import Button from "../quarks/Button";
import ScheduleALesson from "../atoms/ScheduleALesson";
import EditTaughtSkills from "../molecules/EditTaughtSkills";
import TeachNewSkill from "../molecules/TeachNewSkill";
import Notification from "../quarks/Notification";
import LoginWarningPanel from "../quarks/LoginWarningPanel";

import CalendarIcon from "../icons/CalendarIcon";
import TeachIcon from "../icons/TeachIcon";
import PlusIcon from "../icons/PlusIcon";

const TeachASkill: React.FC = () => {
  // Global Context
  const { userDetails } = useUserContext();

  // Local State
  const [component, setComponent] = useState<string>("");
  const [taughtSkillTags, setTaughtSkillTags] = useState<string[]>([]);

  // ----- Set the correct displayed component based on the query params
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const component = queryParams.get("component");
    if (component) {
      setComponent(component);
    } else {
      handleComponentChange("scheduledLessons");
    }
  }, [userDetails]);
  //

  // ----- Extract the tags that the user appears in
  useEffect(() => {
    if (userDetails.isLoggedIn) {
      const tags = handleTaughtSkillsTags();
      setTaughtSkillTags(tags);
    }
  }, [userDetails]);

  // ----- Change the displayed component and update the query params
  const handleComponentChange = (newComponent: string) => {
    setComponent(newComponent);
    const newUrl = `${window.location.protocol}//${window.location.host}${
      window.location.pathname
    }?component=${encodeURIComponent(newComponent)}`;
    // To update the URL without reloading the page
    window.history.pushState({ path: newUrl }, "", newUrl);
  };
  //

  // ----- Returns the tags that the user appears in
  const handleTaughtSkillsTags = () => {
    if (!userDetails.skills) return [];

    // Use flatMap to flatten the array of skill tags and store them in a Set to remove duplicates
    // console.log(userDetails.skills, "userDetails.skills");

    // Filter out skills that are under review first
    const taughtSkillTags = new Set(
      userDetails.skills
        .filter((skill) => !skill.skillIsUnderReview) // Filter skills under review
        .flatMap((skill) => skill.skillTags) // Flatten the tags
    );

    return Array.from(taughtSkillTags);
  };

  return (
    <div id="ndzn-app">
      <Header />
      <div className="page-main">
        <div className="container">
          <PageSidebar />
          <div className="page-content">
            <div className="panel panel--teachASkill">
              <h1>Teach A Skill</h1>
              <p>
                On this page, you can add, remove, and schedule lessons with
                your students. Additionally, you can add, edit, and remove the
                lessons currently available to students.
              </p>
              <h4>Current categories you appear in:</h4>
              <div className="tags-container">
                {taughtSkillTags.length > 0 ? (
                  taughtSkillTags.map((tag, index) => (
                    <div className="tag" key={index}>
                      <span>{tag}</span>
                    </div>
                  ))
                ) : (
                  <p>No categories found.</p>
                )}
              </div>
            </div>
            <div className="feature-buttons">
              <Button
                type="button"
                onClick={() => handleComponentChange("scheduledLessons")}
                className={classNames(
                  "btn",
                  component === "scheduledLessons" && "btn--green",
                  component !== "scheduledLessons" && "btn--white-green"
                )}
              >
                <CalendarIcon />
                <span className="btn__text">Scheduled Lessons</span>
              </Button>
              <Button
                type="button"
                onClick={() => handleComponentChange("editTaughtSkills")}
                className={classNames(
                  "btn",
                  component === "editTaughtSkills" && "btn--green",
                  component !== "editTaughtSkills" && "btn--white-green"
                )}
              >
                <TeachIcon />
                <span className="btn__text">Skills That You Teach</span>
              </Button>
              <Button
                type="button"
                onClick={() => handleComponentChange("teachANewSkill")}
                className={classNames(
                  "btn",
                  component === "teachANewSkill" && "btn--green",
                  component !== "teachANewSkill" && "btn--white-green"
                )}
              >
                <PlusIcon />
                <span className="btn__text">Teach A New Skill</span>
              </Button>
            </div>
            {!userDetails.isLoggedIn && <LoginWarningPanel />}
            {component === "scheduledLessons" && userDetails.isLoggedIn && (
              <ScheduleALesson />
            )}
            {component === "editTaughtSkills" && userDetails.isLoggedIn && (
              <EditTaughtSkills />
            )}
            {component === "teachANewSkill" && userDetails.isLoggedIn && (
              <TeachNewSkill setComponent={setComponent} />
            )}
          </div>
        </div>
      </div>
      <Footer />
      <Notification />
    </div>
  );
};

export default TeachASkill;
