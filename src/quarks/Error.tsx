import classNames from "classnames";

import AlertIcon from "../icons/AlertIcon";

type ErrorProps = {
    className?: string;
    errorMessage: string;
};

export default function Error(props: ErrorProps) {
    const { className, errorMessage } = props;

    return (
        <div
            className={classNames(
                "error-message",
                className !== "" && className
            )}
        >
            <AlertIcon />
            <span>{errorMessage}</span>
        </div>
    );
}
