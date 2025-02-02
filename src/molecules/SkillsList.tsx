import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
import { SkillTypes } from "../constants/fakeData";
import { getSkills } from "../constants/endpoints";
import { useUserContext } from "../hooks/useUserContext";

import LoadingComponent from "../quarks/LoadingComponent";
import SkillCard from "../atoms/SkillCard";
import Error from "../quarks/Error";
import NotFound from "../quarks/NotFound";
import Pagination from "../atoms/Pagination";

import shuffleArray from "../helperFunctions/shuffleArray";

export default function SkillsList() {
  const { userDetails } = useUserContext();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [skillsList, setSkillsList] = useState<SkillTypes[]>([]);
  const [favoriteSkills, setFavoriteSkills] = useState<string[]>([]);

  // Function to fetch skills
  const getSkillsList = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${getSkills}?${searchParams.toString()}&limit=3`
      );
      const skills = res.data?.skills || [];
      setSkillsList(skills);
    } catch (error) {
      setError(
        "Unable to load skills. Please check your internet connection and try again later."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 🚀 Run getSkillsList when the URL query parameters change
  useEffect(() => {
    getSkillsList();
  }, [searchParams]); // Re-run when `location.search` changes

  const premiumSkills = skillsList.filter((skill) => skill.userIsPremium);
  const shuffledPremiumSkills = shuffleArray(premiumSkills);

  return (
    <div className="items-container">
      <div className="skills-list">
        {/* Loading component */}
        {loading && <LoadingComponent size="large" color="#2D6E46" />}

        {/* Error component */}
        {error && !loading && <Error errorMessage={error} />}

        {/* Not Found */}
        {!error && !loading && skillsList.length === 0 && <NotFound />}

        {/* The premium skills at the top */}
        {skillsList.filter((skillDetails) => skillDetails.userIsPremium)
          .length > 0 &&
          !loading && (
            <div className="skills-list-container skills-list-container--featured">
              <h1>Featured</h1>
              {shuffledPremiumSkills.map((skillDetails) => (
                <SkillCard
                  key={skillDetails._id}
                  skillDetails={skillDetails}
                  favoriteSkills={favoriteSkills}
                />
              ))}
            </div>
          )}

        {/* The line separating the premium skills and the regular skills */}
        {!loading && shuffledPremiumSkills.length > 0 && <i></i>}

        {/* The list of regular skills */}
        {skillsList.length > 0 && (
          <div className="skills-list-container skills-list-container--basic">
            {skillsList.map((skill) => (
              <SkillCard
                key={skill._id}
                skillDetails={skill}
                favoriteSkills={favoriteSkills}
              />
            ))}
          </div>
        )}
      </div>
      <Pagination />
    </div>
  );
}
