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
      const res = await axios.get(`${getSkills}?${searchParams.toString()}`);
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
    console.log(location.search);
    getSkillsList();
  }, [searchParams]); // ✅ Re-run when `location.search` changes

  return (
    <div className="skills-list">
      {/* Loading component */}
      {loading && <LoadingComponent size="large" color="#2D6E46" />}

      {/* Error component */}
      {error && !loading && <Error errorMessage={error} />}

      {/* Not Found */}
      {!error && !loading && skillsList.length === 0 && <NotFound />}

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
  );
}

// {loading && <LoadingComponent size="large" color="#2D6E46" />}

//       {error && <Error errorMessage={error} />}

//       {skillsList.filter((skillDetails) => skillDetails.userIsPremium).length >
//         0 &&
//         !loading && (
//           <div className="skills-list-container skills-list-container--featured">
//             <h1>Featured</h1>
//             {skillsList.map((skillDetails) => {
//               if (!skillDetails.userIsPremium) return;
//               return (
//                 <SkillCard
//                   key={skillDetails._id}
//                   skillDetails={skillDetails}
//                   favoriteSkills={favoriteSkills}
//                 />
//               );
//             })}
//           </div>
//         )}

//       {!loading &&
//         skillsList.filter((skillDetails) => skillDetails.userIsPremium).length >
//           0 && <i></i>}
