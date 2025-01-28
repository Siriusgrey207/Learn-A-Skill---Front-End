import { useState, useEffect } from "react";
import { api } from "../services/api";
import classNames from "classnames";
import {
  addSkillToFavoritesUrl,
  removeSkillFromFavoritesUrl,
} from "../constants/endpoints";
import { useUserContext } from "../hooks/useUserContext";
import { useNotificationContext } from "../hooks/useNotificationContext";

import Button from "./Button";
import GreyHeartIcon from "../icons/GrayHeartIcon";
import HeartIcon2 from "../icons/HeartIcon2";
import LoadingComponent from "./LoadingComponent";

type FavoriteButtonTypes = {
  userId: number | string;
  skillId: string;
  favoriteSkills: string[];
};

export default function FavoriteButton(props: FavoriteButtonTypes) {
  // Props
  const { skillId } = props;

  // Global context - This is where we get the favorite skills of the user from.
  const { userDetails } = useUserContext();
  const { favoriteSkills } = userDetails;
  const { setNotification } = useNotificationContext();

  // Local State
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (favoriteSkills.includes(skillId)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favoriteSkills]);

  // Handles the addition of a skill from the favorites for a given user.
  const addSkillToFavorites = async () => {
    // If the user is not logged in, redirect them to the login page.
    if (!userDetails.isLoggedIn) window.location.href = "/login";
    // Ensure the skill id is present.
    if (!skillId) {
      console.error("Please provide a skill id.");
      return;
    }
    // Attempt to add the skill id to the favorites of the user.
    setLoading(true);
    try {
      const res = await api.post(addSkillToFavoritesUrl, {
        newFavoriteSkillId: skillId,
      });
      if (res.status === 201) setIsFavorite(true);
    } catch (error) {
      console.log(error);
    }
    setNotification({
      show: true,
      type: "success",
      message: "Skill added from favorites!",
      displayDuration: 3500,
    });
    // Slightly delay this in order to prevent the user from spamming the button.
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  };

  // Handles the removal of the skill from favorites for a given user.
  const removeSkillFromFavorites = async () => {
    // If the user is not logged in, redirect them to the login page.
    if (!userDetails.isLoggedIn) window.location.href = "/login";
    // Ensure the skill id is present.
    if (!skillId) {
      console.error("Please provide a skill id.");
      return;
    }
    // Attempt to remove the skill from favorites.
    setLoading(true);
    try {
      const res = await api.delete(removeSkillFromFavoritesUrl + `/${skillId}`);
      if (res.status === 200) setIsFavorite(false);
    } catch (error) {
      console.error(error);
    }
    // Announce the removal of the skill from the favorites.
    setNotification({
      show: true,
      type: "danger",
      message: "Skill removed from favorites!",
      displayDuration: 3500,
    });
    // Slightly delay this in order to prevent the user from spamming the button.
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  };

  return (
    <Button
      className={classNames(
        "btn btn--add-to-favorites",
        loading && "pointer-events-none select-none opacity-80"
      )}
      type="button"
      onClick={
        isFavorite
          ? () => removeSkillFromFavorites()
          : () => addSkillToFavorites()
      }
    >
      {!loading && !isFavorite && <GreyHeartIcon />}
      {!loading && isFavorite && <HeartIcon2 />}
      {loading && <LoadingComponent size="small" color="#2d6e46" />}
    </Button>
  );
}
