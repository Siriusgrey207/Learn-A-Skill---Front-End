import React from "react";
import classNames from "classnames";

type TextareaProps = {
    name: string;
    disabled?: boolean;
    value?: string;
    placeholder?: string;
    className?: string; // Optional className
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // Type annotation for the event
};

const Textarea: React.FC<TextareaProps> = (props: TextareaProps) => {
    const {
        name,
        disabled,
        value = "", // Default value as empty string
        placeholder,
        className = "", // Optional className
        onChange,
    } = props;

    return (
        <div className={`textarea-container ${className}`}>
            <textarea
                name={name}
                disabled={disabled}
                value={value}
                placeholder={placeholder}
                className={classNames(
                    "textarea",
                    className !== "" && className
                )}
                onChange={onChange}
            />
        </div>
    );
};

export default Textarea;
