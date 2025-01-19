import classNames from "classnames";

import ChevronIcon from "../icons/ChevronIcon";

type SelectProps = {
    name: string;
    id: string;
    optionsList: string[];
    defaultOption: string;
    className?: string;
    disabled?: boolean;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

// export default function Select(props: SelectProps)

const Select: React.FC<SelectProps> = (props: SelectProps) => {
    const {
        name,
        id,
        optionsList,
        defaultOption = "",
        className,
        disabled,
        onChange,
    } = props;

    return (
        <div className="selectContainer">
            <ChevronIcon />
            <select
                name={name}
                id={id}
                className={classNames("select", className)}
                onChange={onChange}
                disabled={disabled}
            >
                <option value={defaultOption}>{defaultOption}</option>
                {optionsList.map((option: string, index: number) => {
                    let lowerCaseOptions = option.toLowerCase();
                    return (
                        <option key={index} value={lowerCaseOptions}>
                            {option}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default Select;
