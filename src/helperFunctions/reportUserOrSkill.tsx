import { reportUserUrl, reportSkillUrl } from "../constants/endpoints";
import axios from "axios";

async function reportUserOrSkill(type: string, id: string | number) {
    console.log("[reportUserOrSkill]");

    let url;
    if (type === "skill") url = reportSkillUrl;
    if (type === "user") url = reportUserUrl;

    // If the type is not recognized, return false
    if (!url) return false;

    const data = {
        type: type,
        id: id,
    };

    try {
        await axios.post(url, data);
        return true; // If the reporting succeeds, return true
    } catch (error) {
        console.error("Error reporting:", error);
        return false; // If the reporting fails, return false
    }
}

export default reportUserOrSkill;
