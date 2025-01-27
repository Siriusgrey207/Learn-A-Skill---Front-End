import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import PageSidebar from "../molecules/PageSidebar";
import GeneralLessonInfoPanel from "../molecules/GeneralLessonInfoPanel";

// import { developmentMode } from "../constants/devTools";
import { getSingleSkill } from "../constants/endpoints";

import { SkillTypes } from "../constants/fakeData";

const SkillPage: React.FC = () => {
  // State
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [skill, setSkill] = useState<SkillTypes | null>(null);

  // Params
  const { skillId } = useParams();

  useEffect(() => {
    async function getSingleSkillData() {
      if (!skillId) return;
      try {
        const url = getSingleSkill + "/" + skillId;
        const res = await axios.get(url);
        const skill = res.data.skill;
        setSkill(skill);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.msg ||
              "An unexpected error occurred, please try again later."
          );
        } else {
          setError("An unexpected error occurred, please try again later.");
        }
      }
    }
    getSingleSkillData();
    setLoading(false);
  }, []);

  return (
    <div id="ndzn-app">
      <Header />
      <div className="page-main page-main--skill">
        <div className="container">
          <PageSidebar />
          <div className="page-content page-content--skill">
            <GeneralLessonInfoPanel skill={skill} loading={loading} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SkillPage;
