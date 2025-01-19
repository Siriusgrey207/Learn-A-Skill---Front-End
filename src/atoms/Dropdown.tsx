import React from "react";

import classNames from "classnames";

type DropdownProps = {
    isToggled: boolean;
    children: React.ReactNode;
    className?: string;
};

export default function Dropdown(props: DropdownProps) {
    const { isToggled, children, className } = props;

    return (
        <div
            className={classNames(
                "dropdown",
                isToggled && "dropdown--toggled",
                className
            )}
        >
            {children}
        </div>
    );
}
