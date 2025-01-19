import React, { useState, useEffect } from "react";
import axios from "axios";

import { fakeListOfSkills, SkillTypes } from "../constants/fakeData";
import { developmentMode } from "../constants/devTools";
import { getRandomSkills, getFavoriteUserSkills } from "../constants/endpoints";
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

  const [value, setValue] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [skillsList, setSkillsList] = useState<SkillTypes[]>([]);
  const [skillsFound, setSkillsFound] = useState<boolean>(true);
  const [favoriteSkills, setFavoriteSkills] = useState<string[]>([]);

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

  // ----- Get the skills that have been set to favorites
  const getFavoriteSkills = async () => {
    const res = await axios.post(getFavoriteUserSkills, {
      userId: userDetails.userId,
    });
    // favoriteSkills;
    setFavoriteSkills(developmentMode ? ["123", "456"] : res.data);
  };

  // ----- Get skills list from the back end based on the tags that have been added.
  const getSkillsList = async () => {
    setLoading(true);
    try {
      const res = await axios.post(getRandomSkills, {
        tags: tags,
        // filters: filters,
      });
      const data = res.data;

      // Use fake data in development mode for testing
      filterSkillsList(developmentMode ? fakeListOfSkills : data);
    } catch (error) {
      setError("Something went wrong, please try again later.");
      console.log(error);
    } finally {
      setLoading(false);
      getFavoriteSkills();
    }
  };

  // ----- Filtration function for the list of skills - mostly working
  const filterSkillsList = (skillsList: SkillTypes[]) => {
    if (tags.length === 0) {
      setSkillsList(orderSkills(skillsList));
      setSkillsFound(true);
      return;
    }

    // Filter by location (country or city)
    const filterByLocation = (skills: SkillTypes[]) => {
      return skills.filter(
        (skill) =>
          tags.some((tag) =>
            skill.country?.toLowerCase().includes(tag.toLowerCase())
          ) ||
          tags.some((tag) =>
            skill.city?.toLowerCase().includes(tag.toLowerCase())
          )
      );
    };

    // Filter by category (skillTags)
    const filterByCategory = (skills: SkillTypes[]) => {
      return skills.filter((skill) =>
        tags.some((tag) => skill.skillTags.includes(tag))
      );
    };

    // Filter by skill name
    const filterBySkillName = (skills: SkillTypes[]) => {
      return skills.filter((skill) =>
        tags.some((tag) =>
          skill.skillName.toLowerCase().includes(tag.toLowerCase())
        )
      );
    };

    // Filter by user name
    const filterByUserName = (skills: SkillTypes[]) => {
      return skills.filter((skill) =>
        tags.some((tag) => skill.name.toLowerCase().includes(tag.toLowerCase()))
      );
    };

    // Filter by additional parameters (Verified Users, New, Organizations, Independent Teachers)
    const filterByAdditionalFlags = (skills: SkillTypes[]) => {
      return skills.filter((skill) =>
        tags.some(
          (tag) =>
            (tag === "Verified Users" && skill.userIsPremium) ||
            (tag === "New" && skill.skillIsNew) ||
            (tag === "Organizations" && skill.userIsInOrganization) ||
            (tag === "Independant Teachers" && !skill.userIsInOrganization)
        )
      );
    };

    // Apply each filter in sequence based on the existing list
    let filteredSkills = skillsList;

    // Stage 1: Filter by location
    const locationFilteredSkills = filterByLocation(filteredSkills);
    filteredSkills =
      locationFilteredSkills.length > 0
        ? locationFilteredSkills
        : filteredSkills;

    // Stage 2: Filter by category
    const categoryFilteredSkills = filterByCategory(filteredSkills);
    filteredSkills =
      categoryFilteredSkills.length > 0
        ? categoryFilteredSkills
        : filteredSkills;

    // Stage 3: Filter by skill name
    const skillNameFilteredSkills = filterBySkillName(filteredSkills);
    filteredSkills =
      skillNameFilteredSkills.length > 0
        ? skillNameFilteredSkills
        : filteredSkills;

    // Stage 4: Filter by user name
    const userNameFilteredSkills = filterByUserName(filteredSkills);
    filteredSkills =
      userNameFilteredSkills.length > 0
        ? userNameFilteredSkills
        : filteredSkills;

    // Stage 5: Filter by additional flags
    const additionalFlagsFilteredSkills =
      filterByAdditionalFlags(filteredSkills);
    filteredSkills =
      additionalFlagsFilteredSkills.length > 0
        ? additionalFlagsFilteredSkills
        : filteredSkills;

    // If no skills are found after all filtering stages, fall back to the whole list
    setSkillsFound(filteredSkills.length > 0);
    setSkillsList(
      filteredSkills.length > 0
        ? orderSkills(filteredSkills)
        : orderSkills(skillsList)
    );
  };

  // ----- Get skills based on the tags that have been added.
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addTag();
  };

  // ----- Add a tag to the list of filtering tags
  const addTag = () => {
    if (value) {
      setTags([...tags, value]);
      setValue("");
    }
  };

  // ----- Remove a tag from the list of filtering tags.
  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  // // ----- Handles the toggle filtration system
  // const handleToggleFilters = (filter: string, isToggled: boolean) => {
  //     // Create a copy of the tags
  //     let updatedTagsList = tags.slice();

  //     // If the button is toggled, add the filter to the filter list
  //     if (isToggled) {
  //         updatedTagsList.push(filter);
  //     } else {
  //         // Remove the filter from the list
  //         updatedTagsList = updatedTagsList.filter((tag) => tag !== filter);
  //     }

  //     // Update the tags list
  //     setTags(updatedTagsList);
  // };

  // ----- Go through the skills and check if there are any featured ones.
  let featuredSkillsPresent = false;
  skillsList.forEach((skillDetails) => {
    if (skillDetails.skillIsHighlighted) featuredSkillsPresent = true;
  });

  return (
    <div className="skills-list">
      <Panel className="panel--search">
        <h1>What skill are we learning today?</h1>
        <p>It takes time to master a skill. Choose wisely!</p>
        <form
          className="form form--search"
          name="search"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <Input
              type="text"
              value={value}
              name="skill"
              placeholder="Archery"
              onChange={(e) => setValue(e.target.value)}
            />
            <input type="submit" hidden />
            <Button
              disabled={!value}
              type="submit"
              className="btn btn--green btn--search"
            >
              <SearchIcon />
              <span className="btn__text">Search</span>
            </Button>
          </div>
        </form>
        {tags.length > 0 && (
          <div className="tags-container">
            {tags.map((tag, index) => (
              <Button
                onClick={() => removeTag(tag)}
                className="btn btn--green tag tag--green"
                key={index}
              >
                <CloseIcon />
                <span className="btn__text">{tag}</span>
              </Button>
            ))}
          </div>
        )}
      </Panel>

      {!skillsFound && !loading && (
        <div className="skills-not-found-container">
          <Panel className="panel--skills-not-found">
            <span>
              There are many skills out there, but we've never encountered
              anything quite like this.
            </span>
          </Panel>
        </div>
      )}

      {loading && <LoadingComponent size="large" color="#2D6E46" />}

      {error && <Error errorMessage={error} />}

      {skillsList.length > 0 && !loading && (
        <div className="skills-list-container skills-list-container--featured">
          {featuredSkillsPresent && <h1>Featured</h1>}
          {skillsList.map((skillDetails) => {
            if (!skillDetails.skillIsHighlighted) return;
            return (
              <SkillCard
                key={skillDetails.skillId}
                skillDetails={skillDetails}
                favoriteSkills={favoriteSkills}
              />
            );
          })}
        </div>
      )}

      {featuredSkillsPresent && !loading && <i></i>}

      {skillsList.length > 0 && !loading && (
        <div className="skills-list-container skills-list-container--basic">
          {skillsList.map((skillDetails) => {
            if (skillDetails.skillIsHighlighted) return;
            return (
              <SkillCard
                key={skillDetails.skillId}
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
