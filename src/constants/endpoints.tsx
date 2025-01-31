import { developmentMode } from "./devTools";

// --- TO DOs ---
// 1. Add the correct endpoints for the backend for production.

// --- Skill endpoints
export const getSkills = developmentMode
  ? "http://localhost:5000/api/v1/skills/get-skills"
  : "Production Skills Url";

export const getSingleSkill = developmentMode
  ? "http://localhost:5000/api/v1/skills/get-skills"
  : "Production Single Skill Url";

// --- Authentication endpoints
export const loginUrl = developmentMode
  ? "http://localhost:5000/api/v1/auth/login"
  : "Production Login Url";

export const registerUrl = developmentMode
  ? "http://localhost:5000/api/v1/auth/register"
  : "Production Registration Url";

export const verifyEmailUrl = developmentMode
  ? "http://localhost:5000/api/v1/auth/verify-email"
  : "Production Email Verification Url";

export const logoutUrl = developmentMode
  ? "http://localhost:5000/api/v1/auth/logout"
  : "Production Logout Url";

export const forgotPasswordUrl = developmentMode
  ? "http://localhost:5000/api/v1/auth/forgot-password"
  : "Production Forgot Password Url";

export const resetPasswordUrl = developmentMode
  ? "http://localhost:5000/api/v1/auth/reset-password"
  : "Production Reset Password Url";

// --- Scheduled Lessons
export const getScheduledLessonsUrl =
  "https://jsonplaceholder.typicode.com/posts";

// --- Report User Or Skill
export const reportUserUrl = "https://jsonplaceholder.typicode.com/posts";
export const reportSkillUrl = developmentMode
  ? "http://localhost:5000/api/v1/report/report-skill"
  : "https://jsonplaceholder.typicode.com/posts";

// --- Get the favorite skills of the user
export const getFavoriteUserSkills =
  "https://jsonplaceholder.typicode.com/posts";

// --- Should return a list of the skills taught by the user
export const getUserSkillsUrl = "https://jsonplaceholder.typicode.com/posts";

// --- Add Skill To Favorites
export const addSkillToFavoritesUrl = developmentMode
  ? "http://localhost:5000/api/v1/favorite-lessons/add-favorite-lesson"
  : "Production Url";

// --- Remove Skill From Favorites
export const removeSkillFromFavoritesUrl = developmentMode
  ? "http://localhost:5000/api/v1/favorite-lessons/remove-favorite-lesson"
  : "Production Url";

// --- Save upcoming lesson reminder
export const saveNewLessonUrl = "https://jsonplaceholder.typicode.com/posts";

// --- Removes a skill from the list of skill that the user teaches
export const removeTaughtSkillUrl = developmentMode
  ? "http://localhost:5000/api/v1/skills/new-skill"
  : "Production New Skill Url";
("https://jsonplaceholder.typicode.com/posts");

// --- Send new skill to the backend
export const createNewSkillUrl = "https://jsonplaceholder.typicode.com/posts";

// --- Get the possible purchasable options
export const getMembershipsUrl = "https://jsonplaceholder.typicode.com/posts";

// --- Get a particular user's data (the userId is added at the end of the url string)
export const getUserDataUrl = "https://jsonplaceholder.typicode.com/posts";

// --- Endpoint to which users send emails to
export const emailApiEndpointUrl = "https://jsonplaceholder.typicode.com/posts";
