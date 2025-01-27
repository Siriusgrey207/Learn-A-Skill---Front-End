import classNames from "classnames";

import CheckIcon2 from "../icons/CheckIcon2";
import CloseIcon2 from "../icons/CloseIcon2";
import DiscordIcon from "../icons/DiscordIcon";
import MailIcon from "../icons/MailIcon";
import PhoneIcon from "../icons/PhoneIcon";
import SkypeIcon from "../icons/SkypeIcon";
import DollarIcon from "../icons/DollarIcon";
import MortarboardIcon from "../icons/MortarboardIcon";
import ClockIcon from "../icons/ClockIcon";

type TableProps = {
  tableData: { [key: string]: boolean | string };
  className?: String;
};

export default function Table(props: TableProps) {
  // Props:
  const { tableData, className } = props;

  const handleIcon = (key: string, value: string | boolean) => {
    if (key === "Status:") return value ? <CheckIcon2 /> : <CloseIcon2 />;
    if (key === "Discord:") return <DiscordIcon />;
    if (key === "Email:") return <MailIcon />;
    if (key === "Phone:") return <PhoneIcon />;
    if (key === "Skype:") return <SkypeIcon />;
    if (key === "Price:") return <DollarIcon />;
    if (key === "Relevant Experience:") return <MortarboardIcon />;
    if (key === "Lesson Duration:") return <ClockIcon />;
    return null;
  };

  return (
    <div className={classNames("grid-container", className)}>
      {Object.entries(tableData).map(([key, value], index) => {
        return (
          <div key={index} className="grid__el">
            {handleIcon(key, value)}
            <h6>{key}</h6>
            <span>{value}</span>
          </div>
        );
      })}
    </div>
  );
}
