import { useState } from "react";
import classNames from "classnames";

import currencies from "../constants/currencies";

import Dropdown from "./Dropdown";
import Button from "../quarks/Button";
import ChevronIcon from "../icons/ChevronIcon";

export type currencyTypes = {
    code: string;
    symbol: string;
};

type DropdownCurrencyTypes = {
    handleCurrencyChange: (newCurrency: currencyTypes) => void;
};

export default function DropdownCurrency(props: DropdownCurrencyTypes) {
    const { handleCurrencyChange } = props;

    // Local State
    const [isToggled, setIsToggled] = useState<boolean>(false);
    const [selectedCurrency, setSelectedCurrency] = useState<currencyTypes>(
        currencies[0]
    );

    return (
        <div className="dropdown-container-currency">
            <Button
                onClick={() => setIsToggled(!isToggled)}
                type="button"
                className={classNames(
                    "btn btn--gray btn--currency-dd",
                    isToggled && "btn--currency-dd--toggled"
                )}
            >
                <span className="btn__text">{selectedCurrency.code}</span>
                <ChevronIcon />
            </Button>
            <Dropdown isToggled={isToggled}>
                <div className="dropdown-inner">
                    {currencies.map((currency, index) => (
                        <Button
                            onClick={() => {
                                setSelectedCurrency(currency);
                                handleCurrencyChange(currency);
                                setIsToggled(false);
                            }}
                            className={classNames(
                                "btn btn--currency",
                                selectedCurrency.code === currency.code &&
                                    "btn--currency--selected"
                            )}
                            key={index}
                            type="button"
                        >
                            <span className="btn__text">{currency.code}</span>
                        </Button>
                    ))}
                </div>
            </Dropdown>
        </div>
    );
}
