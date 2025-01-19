import { SkillTypes } from "../constants/fakeData";

// Order skills so that the skills of the verified users are first.
export default function orderSkills(skillsList: SkillTypes[]) {
  // Separate verified and unverified skills
  const verifiedSkills = skillsList.filter((skill) => skill.userIsPremium);
  const unverifiedSkills = skillsList.filter((skill) => !skill.userIsPremium);

  // Concatenate verified skills first.
  return [...verifiedSkills, ...unverifiedSkills];
}
