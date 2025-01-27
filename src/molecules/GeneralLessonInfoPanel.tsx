// import classNames from "classnames";
import { useUserContext } from "../hooks/useUserContext";

import Panel from "../atoms/Panel";
import Table from "../atoms/Table";
import UserInfo from "../atoms/UserInfo";
import Button from "../quarks/Button";
import BookIcon from "../icons/BookIcon";

import { SkillTypes } from "../constants/fakeData";
import SendEmail from "./SendEmail";

type propTypes = {
  skill: SkillTypes | null;
  loading: Boolean;
};

function GeneralLessonInfoPanel(props: propTypes) {
  // Props:
  const { skill, loading } = props;

  // Global context:
  const { userDetails } = useUserContext();

  return (
    <>
      {!loading && skill !== null && (
        <>
          <Panel className="panel--skill-info">
            <UserInfo
              avatar={skill.userImage}
              name={skill.name}
              userIsInOrganization={skill.userIsInOrganization}
              skillRating={skill.skillRating}
              country={skill.country}
              city={skill.city}
            />
            <h3>{skill.skillName}</h3>
            <Table
              className="grid-container--flex"
              tableData={{
                "Status:": skill.userIsPremium ? "Verified" : "Not Verified",
                "Price:": `${skill.skillCurrencySymbol}${skill.skillPrice}/lesson`,
                "Lesson Duration:": `${skill.lessonDuration} minutes`,
                "Relevant Experience:": `${skill.skillRelevantExperience}`,
              }}
            />
            <div className="panel__body">
              <p>{skill.skillDescription}</p>
              <div className="buttons-container">
                <Button type="button" className="btn btn--green">
                  <BookIcon />
                  <span className="btn__text">Book A Lesson</span>
                </Button>
              </div>
            </div>
          </Panel>
          {true && <SendEmail />}
        </>
      )}
      {/* During loading, we want to set up a loading skeleton - TO DO */}
      {(loading || skill === null) && <span>Loading</span>}
    </>
  );
}

export default GeneralLessonInfoPanel;
