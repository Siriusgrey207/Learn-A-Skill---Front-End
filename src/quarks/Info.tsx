import classNames from "classnames";

import InfoIcon from "../icons/InfoIcon";

type InfoTypes = {
  infoMessage?: string;
  infoMessageElement?: React.ReactNode;
  className?: string;
};

// If the infoMessageElement prop is defined, it will always prioritise it.
export default function Info(props: InfoTypes) {
  const { infoMessage, infoMessageElement = null, className } = props;

  return (
    <div className={classNames("infoContainer", className)}>
      <InfoIcon />
      {infoMessageElement ? infoMessageElement : <span>{infoMessage}</span>}
    </div>
  );
}
