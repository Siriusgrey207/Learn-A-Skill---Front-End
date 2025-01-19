import { useState, useEffect } from "react";
import classNames from "classnames";

import Button from "./Button";

type ToggleButtonTypes = {
    disabled?: boolean;
    isToggled?: boolean;
    className?:
        | "btn--toggle--neutral"
        | "btn--toggle--orange"
        | "btn--toggle--green";
    onClick: (isToggled: boolean) => void;
};

export default function ToggleButton(props: ToggleButtonTypes) {
    const {
        disabled = false,
        isToggled = false,
        className = "btn--toggle--neutral",
        onClick,
    } = props;

    const [toggle, setToggle] = useState(isToggled);
    const [loading, setLoading] = useState(false);

    // Synchronize internal state with external prop `isToggled`
    useEffect(() => {
        setToggle(isToggled);
    }, [isToggled]);

    // ----- Handles the toggling of the button. The loading is state is used to prevent spam.
    const handleToggleButtonClick = () => {
        setLoading(true);
        setToggle(!toggle);
        // ... Other stuff
        onClick(toggle);
        //
        setTimeout(() => {
            setLoading(false);
        }, 300);
    };

    return (
        <Button
            type="button"
            onClick={handleToggleButtonClick}
            className={classNames(
                "btn btn--toggle",
                className,
                (toggle || isToggled) && "btn--active"
            )}
            disabled={disabled || loading}
        >
            <div className="slider">
                <div className="slider-circle"></div>
            </div>
        </Button>
    );
}
