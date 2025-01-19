import BowIcon from "../icons/BowIcon";
import TeachIcon from "../icons/TeachIcon";
import LightningIcon from "../icons/LightningIcon";
import AccountIcon from "../icons/AccountIcon";
import HeartIcon from "../icons/HeartIcon";
import InfoIcon from "../icons/InfoIcon";
import LoginIcon from "../icons/LoginIcon";
import BoardIcon from "../icons/BoardIcon";

type TNavigation = {
  href: string;
  text: string;
  icon: JSX.Element;
  customClass: string;
  requiresAuth: boolean;
};

export const navigation: TNavigation[] = [
  {
    href: "/",
    text: "Learn A Skill",
    icon: <BowIcon />,
    customClass: "nav-link--learnASkill",
    requiresAuth: false,
  },
  {
    href: "/teachASkill",
    text: "Teach A Skill",
    icon: <TeachIcon />,
    customClass: "nav-link--teachASkill",
    requiresAuth: false,
  },
  {
    href: "/whiteboard",
    text: "Whiteboard",
    icon: <BoardIcon />,
    customClass: "nav-link--whiteboard",
    requiresAuth: false,
  },
  {
    href: "/promote",
    text: "Promote",
    icon: <LightningIcon />,
    customClass: "nav-link--promote",
    requiresAuth: true,
  },
  {
    href: `/account`,
    text: "Account",
    icon: <AccountIcon />,
    customClass: "nav-link--account",
    requiresAuth: true,
  },
  {
    href: "/donate",
    text: "Donate",
    icon: <HeartIcon />,
    customClass: "nav-link--donate",
    requiresAuth: false,
  },
  {
    href: "/about",
    text: "About Us",
    icon: <InfoIcon />,
    customClass: "nav-link--aboutUs",
    requiresAuth: false,
  },
  {
    href: "/login",
    text: "Login",
    icon: <LoginIcon />,
    customClass: "nav-link--login",
    requiresAuth: false,
  },
];
