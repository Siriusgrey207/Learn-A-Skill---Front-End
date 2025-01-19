import Stars from "../icons/Stars";

import classNames from "classnames";

import AccountIcon from "../icons/AccountIcon";

type UserInfoTypes = {
  avatar: string | null;
  name: string;
  userIsInOrganization: boolean;
  skillRating: number | undefined;
  country: string | undefined;
  city: string | undefined;
};

export default function UserInfo(props: UserInfoTypes) {
  const { avatar, name, userIsInOrganization, skillRating, country, city } =
    props;

  const handleLocation = () => {
    let locationString: string = "";

    if (country && city) {
      locationString = `${city}, ${country}`;
    } else if (country) {
      locationString = `${country}`;
    } else if (city) {
      locationString = `${city}`;
    }

    return locationString;
  };

  return (
    <div className="user-info">
      <div className="user-info__avatar-and-username">
        <div
          className={classNames(
            "user-info__avatar",
            !avatar && "user-info__avatar--no-avatar"
          )}
        >
          {avatar && <img src={avatar} className="avatar" alt="User Avatar" />}
          {!avatar && <AccountIcon />}
        </div>
        <span>{name}</span>
      </div>
      <i></i>
      <div className="user-info__location">
        <span>{handleLocation()}</span>
      </div>
      <i></i>
      <div
        className={classNames(
          "user-info__user-type",
          userIsInOrganization && "user-info__user-type--inOrganization"
        )}
      >
        <span>
          {userIsInOrganization ? "Organization" : "Independent Teacher"}
        </span>
      </div>
      {skillRating && (
        <>
          <i></i>
          <div className="user-info__rating">
            <span>{skillRating}</span>
            <Stars />
          </div>
        </>
      )}
    </div>
  );
}
