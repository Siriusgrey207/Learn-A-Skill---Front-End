import classNames from "classnames";
import ChevronIcon from "../icons/ChevronIcon";

type SelectProps = {
  name: string;
  id: string;
  optionsList: string[];
  defaultOption: string;
  className?: string;
  disabled?: boolean;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select: React.FC<SelectProps> = ({
  name,
  id,
  optionsList,
  defaultOption = "",
  className,
  disabled,
  value,
  onChange,
}) => {
  return (
    <div className="selectContainer">
      <ChevronIcon />
      <select
        name={name}
        id={id}
        value={value}
        className={classNames(
          "select",
          disabled && "select--disabled",
          className
        )}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="" disabled hidden>
          {defaultOption || "Select an option"}
        </option>
        {optionsList.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
