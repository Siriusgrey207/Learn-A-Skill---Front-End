import profilePicture from "../assets/profilePicture.png";

export type SkillTypes = {
  userId: string; // The id of the user
  name: string; // The name of the user
  country: string | undefined; // The country of origin of the user
  city: string | undefined; // The city of origin of the user
  userIsPremium: boolean; // Whether or not the user is verified
  userIsInOrganization: boolean; // Whether or not the user is associated with an organization
  userImage: string | null; // The profile picture of the user
  _id: string; // The id of the skill offer that the user is teaching
  skillName: string; // The name/title of the skill that the user is offering
  skillRelevantExperience: string | undefined; // The relevant experience of the user
  skillImg: string; // An image depicting the skill being taught
  skillRating: number | undefined; // Rating of the provided skill
  skillDescription: string; // A short description of the provided skill
  skillTags: string[]; // Tags of the skill
  skillIsNew: boolean; // Whether the skill being taught has been put as an offer over the past 7 days
  skillIsHighlighted: boolean; // Whether the user has paid for the promotion of the skill
  skillIsUnderReview: boolean; // Whether the skill offer has been reviewed
  skillPrice: number; // The price per lesson
  skillCurrencyCode: string; // The currency code
  skillCurrencySymbol: string; // The currency symbol
  lessonDuration: number; // The duration of the lesson in minutes
};

// An example data format of a logged in user.
export const fakeUser = {
  isLoggedIn: true,
  userIsPremium: false,
  userId: "123",
  country: "Bulgaria",
  city: "Varna",
  userIsInOrganization: false,
  email: "chrisdim207@gmail.com",
  name: "Kristian",
  surname: "Dimitrov",
  userImage: profilePicture, //https://i.imgur.com/W2FeyJP.png
  description:
    "Hi, my name is Kristian and I like doing archery, calisthenics and gym. This is just an example short description that I came up with.", // Fixed 'calistenics' to 'calisthenics'
  memberSince: "14.9.2024",
  discord: "fasnqta",
  phone: "07588848272",
  skype: "exampleSkypeName",
  rating: 4.4,
  numberOfSkillsTaught: 3,
  skills: [
    {
      userId: "123",
      name: "Kristian",
      country: "",
      city: "Varna",
      userIsPremium: false,
      userIsInOrganization: false,
      userImage: "https://i.imgur.com/W2FeyJP.png",
      skillId: "456",
      skillName: "Hunting Lessons (Basic)",
      skillRelevantExperience: undefined,
      skillImg: "https://i.imgur.com/ccr3d5a.jpeg",
      skillRating: 4.2,
      skillDescription:
        "Hi, my name is Kristian and I like doing archery, calisthenics and gym. This is just an example short description that I came up with.",
      skillTags: ["Archery", "Hunting", "Survival"],
      skillIsNew: true,
      skillIsHighlighted: false,
      skillIsUnderReview: false,
      skillPrice: 19,
      skillCurrencyCode: "USD",
      skillCurrencySymbol: "$",
    },
    {
      userId: "123",
      name: "Kristian",
      country: "Bulgaria",
      city: "",
      userIsPremium: true,
      userIsInOrganization: false,
      userImage: "https://i.imgur.com/W2FeyJP.png",
      skillId: "789",
      skillName: "Hunting Lessons (Advanced)",
      skillRelevantExperience: undefined,
      skillImg: "https://i.imgur.com/ccr3d5a.jpeg",
      skillRating: 3,
      skillDescription:
        "Hi, my name is Kristian and I like doing archery, calisthenics and gym. This is just an example short description that I came up with.",
      skillTags: ["Archery", "Hunting", "Chess"],
      skillIsNew: false,
      skillIsHighlighted: false,
      skillIsUnderReview: true,
      skillPrice: 27,
      skillCurrencyCode: "CAD",
      skillCurrencySymbol: "$",
    },
    {
      userId: "nifnasfoa",
      name: "Kristian",
      country: "Bulgaria",
      city: "",
      userIsPremium: true,
      userIsInOrganization: true,
      userImage: "https://i.imgur.com/W2FeyJP.png",
      skillId: "fsdgsdgsdgsdgs",
      skillName: "Hunting Lessons (Advanced)",
      skillRelevantExperience: undefined,
      skillImg: "https://i.imgur.com/ccr3d5a.jpeg",
      skillRating: 3,
      skillDescription:
        "Hi, my name is Kristian and I like doing archery, calisthenics and gym. This is just an example short description that I came up with.",
      skillTags: ["Archery", "Hunting", "Range weapons"],
      skillIsNew: true,
      skillIsHighlighted: true,
      skillIsUnderReview: false,
      skillPrice: 19,
      skillCurrencyCode: "GBP",
      skillCurrencySymbol: "£",
    },
  ],
};

// An example data format of a guest
export const fakeGuest = {
  userId: "",
  country: "",
  city: "",
  isLoggedIn: false,
  userIsPremium: false,
  userIsInOrganization: false,
  email: "",
  name: "",
  surname: "",
  userImage: "",
  description: "",
  memberSince: "",
  isVerified: false,
  discord: "",
  phone: "",
  skype: "",
  rating: 0,
  numberOfSkillsTaught: 0, // Fixed 'numberOfskillsTaught' to 'numberOfSkillsTaught'
  role: "user",
  favoriteSkills: [],
};

// A list of skills that the user can choose from
export const fakeListOfSkills = [
  {
    userId: "123",
    name: "Harry",
    country: "Bulgaria",
    city: "",
    userIsPremium: true,
    userIsInOrganization: false,
    userImage: "https://i.imgur.com/W2FeyJP.png",
    skillId: "123",
    skillName: "Hunting Lessons (Basic)",
    skillImg: "https://i.imgur.com/ccr3d5a.jpeg",
    skillRating: 4.2,
    skillDescription:
      "Passionate and experienced bowhunter offering comprehensive lessons in the art of hunting with a bow. Learn essential skills such as proper bow handling, shooting techniques, and tracking wildlife. Whether you're a beginner or looking to refine your skills, these lessons will equip you with the knowledge and confidence needed for a successful and ethical hunting experience.",
    skillTags: ["Archery", "Hunting"],
    skillIsNew: true,
    skillIsHighlighted: true,
    skillIsUnderReview: false,
    skillPrice: 19,
    skillCurrencyCode: "GBP",
    skillCurrencySymbol: "£",
  },
  {
    userId: "asfasfsdgsdgsd",
    name: "Fasnqtaaaaa",
    country: "India",
    city: "",
    userIsPremium: true,
    userIsInOrganization: true,
    userImage: "",
    skillId: "asgnsdjgdsoklgs",
    skillName: "Bowling lessons",
    skillImg: "https://i.imgur.com/2mSeC3T.png",
    skillRating: 4.6,
    skillDescription:
      "Passionate and experienced bowhunter offering comprehensive lessons in the art of hunting with a bow. Learn essential skills such as proper bow handling, shooting techniques, and tracking wildlife. Whether you're a beginner or looking to refine your skills, these lessons will equip you with the knowledge and confidence needed for a successful and ethical hunting experience.",
    skillTags: ["Bowling"],
    skillIsNew: true,
    skillIsHighlighted: true,
    skillIsUnderReview: false,
    skillPrice: 13,
    skillCurrencyCode: "USD",
    skillCurrencySymbol: "$",
  },
  {
    userId: "asdasdawdas",
    name: "Velislav",
    country: "Australia",
    city: "",
    userIsPremium: true,
    userIsInOrganization: false,
    userImage: "",
    skillId: "asdasgsdgdfgdfhjfd",
    skillName: "Boxing lessons",
    skillImg: "https://i.imgur.com/mRt8rpF.png",
    skillRating: 5.0,
    skillDescription: "I do boxing, learn with me.",
    skillTags: ["Boxing", "MMA"],
    skillIsNew: true,
    skillIsHighlighted: false,
    skillIsUnderReview: false,
    skillPrice: 10,
    skillCurrencyCode: "CAD",
    skillCurrencySymbol: "$",
  },
  {
    userId: "456",
    name: "Kristian",
    country: "",
    city: "Varna",
    userIsPremium: false,
    userIsInOrganization: true,
    userImage: "https://i.imgur.com/W2FeyJP.png",
    skillId: "12asdasdasdas",
    skillName: "Chess Lessons",
    skillImg: "https://i.imgur.com/OYk0jQC.png",
    skillRating: 4.2,
    skillDescription:
      "Skilled chess player offering engaging lessons for all levels, from beginners to advanced. Learn key strategies, tactics, and game theory to improve your chess skills and boost your confidence at the board. Whether you're looking to master the basics or refine your competitive edge, these lessons are tailored to help you think critically and excel in the game.",
    skillTags: ["Chess"],
    skillIsNew: false,
    skillIsHighlighted: false,
    skillIsUnderReview: false,
    skillPrice: 100,
    skillCurrencyCode: "GBP",
    skillCurrencySymbol: "£",
  },
  {
    userId: "789",
    name: "Kristian",
    country: "Bulgaria",
    city: "Varna",
    userIsPremium: false,
    userIsInOrganization: true,
    userImage: "https://i.imgur.com/W2FeyJP.png",
    skillId: "12asdaasda",
    skillName: "Advanced Python Concepts",
    skillImg: "https://i.imgur.com/dAM1lm0.png",
    skillRating: 4.8,
    skillDescription:
      "Experienced Python developer offering in-depth lessons on advanced Python concepts, including object-oriented programming (OOP), data structures, algorithms, and more. Perfect for those looking to deepen their understanding of Python and enhance their problem-solving skills.",
    skillTags: ["Python", "Coding"],
    skillIsNew: false,
    skillIsHighlighted: false,
    skillIsUnderReview: false,
    skillPrice: 39,
    skillCurrencyCode: "USD",
    skillCurrencySymbol: "$",
  },
];

// Scheduled lessons of a user
export type ScheduledLessonTypes = {
  userId: string; // The id of the user who scheduled the lesson
  lessonId: string; // The id of the lesson
  subject: string; // The subject of the scheduled lesson
  learners: string; // The people who will be attending the lesson
  date: string; // The date of the lesson
  time: string; // The time of the lesson
  additionalInfo: string | undefined; // Optional additional information about the lesson
};

// An example list of scheduled lessons
export const fakeScheduledLessons: ScheduledLessonTypes[] = [
  {
    userId: "fuskaneMuskane",
    lessonId: "1",
    subject: "Hunting Lessons",
    learners: "Kristian Dimitrov, Velislav",
    date: "19.04.2024",
    time: "20:00 PM",
    additionalInfo:
      "Here you can add additional details about the lesson as a reminder.",
  },
  {
    userId: "fuskaneMuskane",
    lessonId: "2",
    subject: "Chess Lessons",
    learners: "Kristian Dimitrov",
    date: "19.04.2024",
    time: "21:00 PM",
    additionalInfo:
      "Here you can add additional details about the lesson as a reminder.",
  },
];

// Skill report reasons
export const reportReasons: string[] = [
  "Inappropriate or offensive content",
  "Skill is fraudulent or misleading",
  "Skill violates platform guidelines",
  "Teacher lacks qualifications to teach the skill",
  "Skill is spam or irrelevant to the platform",
  "False advertising or deceptive skill description",
  "Violates copyright or intellectual property",
  "Skill encourages harmful or illegal activities",
  "Skill contains discriminatory or hateful content",
  "Skill is a duplicate or redundant listing",
];
