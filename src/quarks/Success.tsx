import classNames from "classnames";

import SuccessIcon from "../icons/SuccessIcon";

type SuccessProps = {
  className?: string;
  successMessage: string;
};

export default function Success(props: SuccessProps) {
  const { className, successMessage } = props;

  return (
    <div
      className={classNames("success-message", className !== "" && className)}
    >
      <SuccessIcon />
      <span>{successMessage}</span>
    </div>
  );
}
