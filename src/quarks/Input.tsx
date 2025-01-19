import React from "react";

import CheckIcon from "../icons/CheckIcon";

import classNames from "classnames";

type InputProps = {
    type: "text" | "number" | "password" | "email" | "checkbox";
    name: string;
    value?: string | number;
    disabled?: boolean;
    checked?: boolean;
    placeholder?: string;
    className?: string; // Made className optional in case you don't always pass it
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = (props: InputProps) => {
    const {
        type,
        name,
        value,
        disabled,
        checked,
        placeholder,
        className = "",
        onChange,
        onFocus,
        onBlur,
    } = props;

    return (
        <div className={`input-container ${className}`}>
            <input
                type={type}
                name={name}
                value={value}
                disabled={disabled}
                checked={checked}
                placeholder={placeholder}
                className={classNames(
                    "input",
                    `input--${type}`,
                    className !== "" && className
                )}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            {type === "checkbox" && <CheckIcon />}
        </div>
    );
};

export default Input;
