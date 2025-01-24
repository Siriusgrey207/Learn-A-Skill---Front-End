import classNames from "classnames";

import Panel from "./Panel";
import Button from "../quarks/Button";
import UserInfo from "./UserInfo";
import ReportDropdown from "./DropdownReport";
import FavoriteButton from "../quarks/FavoriteButton";
import BookIcon from "../icons/BookIcon";
// import Dropdown from "./Dropdown";
// import Select from "../quarks/Select";

// import GrayHeartIcon from "../icons/GrayHeartIcon";
import LightningIcon from "../icons/LightningIcon";

import { SkillTypes } from "../constants/fakeData";
// import OctagramIcon from "../icons/OctagramIcon";
// import reportUserOrSkill from "../helperFunctions/reportUserOrSkill";

function SkillCard({
  skillDetails,
  favoriteSkills,
}: {
  skillDetails: SkillTypes;
  favoriteSkills: string[];
}) {
  const {
    name,
    country,
    city,
    userIsPremium,
    userIsInOrganization,
    userImage,
    _id: skillId,
    skillName,
    skillImg,
    skillRating,
    skillDescription,
    skillTags,
    skillIsNew,
    skillIsHighlighted,
    skillPrice,
    skillCurrencySymbol,
  } = skillDetails;

  return (
    <Panel
      key={skillId}
      className={classNames(
        "skill-card",
        skillIsNew && "skill-card--new",
        skillIsHighlighted && "skill-card--highlighted",
        userIsPremium && "skill-card--userIsPremium"
      )}
    >
      <div
        className={classNames(
          "skill-card__img",
          skillImg ? "skill-card__img--has-image" : "skill-card__img--no-image"
        )}
      >
        {skillImg ? <img src={skillImg} alt="Lesson image" /> : <BookIcon />}
      </div>
      <div className="skill-card__details">
        <div className="details__price">
          <span>
            {skillPrice} {skillCurrencySymbol}
          </span>
        </div>
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
          <div className="details__actions">
            <FavoriteButton
              userId={skillDetails.userId}
              skillId={skillDetails._id}
              favoriteSkills={favoriteSkills}
            />
            <ReportDropdown skillDetails={skillDetails} />
            <Button
              type="button"
              className="btn btn--green btn--see-more"
              onClick={() => console.log("Send the user to the skill page")}
            >
              <span className="btn__text">See More</span>
            </Button>
          </div>
        </div>
      </div>
    </Panel>
  );
}

export default SkillCard;
