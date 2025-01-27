import classNames from "classnames";

import Panel from "../atoms/Panel";
import UserInfo from "../atoms/UserInfo";
import CheckIcon2 from "../icons/CheckIcon2";
import CloseIcon2 from "../icons/CloseIcon2";

import { SkillTypes } from "../constants/fakeData";

type propTypes = {
  skill: SkillTypes | null;
  loading: Boolean;
};

function GeneralLessonInfoPanel(props: propTypes) {
  // Props:
  const { skill, loading } = props;

  console.log(skill);

  return (
    <>
      {!loading && skill !== null && (
        <Panel>
          <UserInfo
            avatar={skill.userImage}
            name={skill.name}
            userIsInOrganization={skill.userIsInOrganization}
            skillRating={skill.skillRating}
            country={skill.country}
            city={skill.city}
          />
          <h3 className="page__title">{skill.skillName}</h3>
          <div className="grid-container">
            <div
              className={classNames(
                "grid__el status",
                skill.userIsPremium && "status--is-verified"
              )}
            >
              {skill.userIsPremium ? <CheckIcon2 /> : <CloseIcon2 />}
              <h6>Status:</h6>
              <span>{skill.userIsPremium ? "Verified" : "Not Verified"}</span>
            </div>
          </div>
        </Panel>
      )}
      {/* During loading, we want to set up a loading skeleton - TO DO */}
      {(loading || skill === null) && <span>Loading</span>}
    </>
  );
}

export default GeneralLessonInfoPanel;
