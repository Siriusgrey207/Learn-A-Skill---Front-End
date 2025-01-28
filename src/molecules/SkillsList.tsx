import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import { fakeListOfSkills, SkillTypes } from "../constants/fakeData";
import { getSkills } from "../constants/endpoints";
import { useUserContext } from "../hooks/useUserContext";
import orderSkills from "../helperFunctions/orderSkills";
import LoadingComponent from "../quarks/LoadingComponent";

import Panel from "../atoms/Panel";
import Button from "../quarks/Button";
import Input from "../quarks/Input";
import SkillCard from "../atoms/SkillCard";
import Error from "../quarks/Error";
// import ToggleButton from "../quarks/ToggleButton";

import SearchIcon from "../icons/SearchIcon";
import CloseIcon from "../icons/CloseIcon";

export default function SkillsList() {
  // Global State
  const { userDetails } = useUserContext();

  // Local State
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [tags, setTags] = useState<string[]>([]);
  const [skillsList, setSkillsList] = useState<SkillTypes[]>([]);
  const [favoriteSkills, setFavoriteSkills] = useState<string[]>([]);

  // Get the params from the url:
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // URL Params
  const country = searchParams.get("country");
  const city = searchParams.get("city");
  const teacherType = searchParams.get("teacherType");
  const rating = searchParams.get("rating");
  const sortBy = searchParams.get("sortBy");

  // const [filters, setFilters] = useState<filterTypes>({
  //     verifiedUsers: false,
  //     newOffers: false,
  //     independantTeachers: true,
  //     organizations: true,
  // });

  // ----- Fetch skills list whenever tags change
  useEffect(() => {
    getSkillsList();
  }, [tags]);

  // ----- Get skills list from the back end based on the tags that have been added.
  const getSkillsList = async () => {
    setLoading(true);

    // By default, we want to send the newest skills to the user.
    const baseReqUrl = `${getSkills}?${[
      country ? `country=${country}` : "",
      city ? `city=${city}` : "",
      teacherType ? `teacherType=${teacherType}` : "",
      rating ? `rating=${rating}` : "",
      sortBy ? `sortBy=${sortBy}` : "",
    ]
      .filter(Boolean) // Remove empty or falsy values
      .join("&")}`;

    try {
      const res = await axios.get(baseReqUrl);
      const skillsList = res.data?.skills;
      // If the request is successfull, but for some reason the skills list doesn't exist, we throw an error.
      if (!skillsList) {
        setError(
          "An unexpected error occurred, and we couldn't fetch the skills. Please try again later."
        );
        setSkillsList([]);
        return;
      }
      // If the skillsList is an empty array.
      if (skillsList.length === 0) {
        setError("No skills found.");
        setSkillsList([]);
        return;
      }
      // If everything goes well, we set the list of skills.
      setSkillsList(skillsList);
    } catch (error) {
      setError(
        "An unexpected error occurred, and we couldn't fetch the skills. Please try again later."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ----- Go through the skills and check if there are any featured ones.
  let featuredSkillsPresent = false;
  skillsList.forEach((skillDetails) => {
    if (skillDetails.skillIsHighlighted) featuredSkillsPresent = true;
  });

  return (
    <div className="skills-list">
      {loading && <LoadingComponent size="large" color="#2D6E46" />}

      {error && <Error errorMessage={error} />}

      {skillsList.filter((skillDetails) => skillDetails.userIsPremium).length >
        0 &&
        !loading && (
          <div className="skills-list-container skills-list-container--featured">
            <h1>Featured</h1>
            {skillsList.map((skillDetails) => {
              if (!skillDetails.userIsPremium) return;
              return (
                <SkillCard
                  key={skillDetails._id}
                  skillDetails={skillDetails}
                  favoriteSkills={favoriteSkills}
                />
              );
            })}
          </div>
        )}

      {!loading &&
        skillsList.filter((skillDetails) => skillDetails.userIsPremium).length >
          0 && <i></i>}

      {skillsList.length > 0 && !loading && (
        <div className="skills-list-container skills-list-container--basic">
          {skillsList.map((skillDetails) => {
            if (skillDetails.skillIsHighlighted) return;
            return (
              <SkillCard
                key={skillDetails._id}
                skillDetails={skillDetails}
                favoriteSkills={favoriteSkills}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
