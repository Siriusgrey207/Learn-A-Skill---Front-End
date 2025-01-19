import React from "react";

type ButtonProps = {
    type?: "button" | "submit";
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
};

export default function Button(props: ButtonProps) {
    const {
        type = "button",
        className = "btn",
        disabled = false,
        onClick,
        children,
    } = props;

    return (
        <button
            onClick={onClick}
            type={type}
            className={className}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
