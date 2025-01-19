import { useEffect, useState } from "react";
import classNames from "classnames";

import { membershipTypes } from "../constants/memberships";

import Panel from "./Panel";
import LightningIcon from "../icons/LightningIcon";
import CheckIcon2 from "../icons/CheckIcon2";

export default function Membership({
    membership,
    membershipDuration,
}: {
    membership: membershipTypes;
    membershipDuration: string;
}) {
    const {
        id,
        name,
        title,
        pricePerMonth,
        pricePerYear,
        currencySymbol,
        perksList,
    } = membership;

    const [classes, setClasses] = useState<string>("membership--loading");

    useEffect(() => {
        // handleSavePercentage();
        setTimeout(() => {
            setClasses("");
        }, 1000);
    }, []);

    const handleSavePercentage = () => {
        const pricePerMonthForYear = 12 * pricePerMonth;
        const savedAmount = Number(
            (pricePerMonthForYear - pricePerYear).toFixed(2)
        );
        const savedPercentage = Number(
            ((savedAmount / pricePerYear) * 100).toFixed(0)
        );
        return savedPercentage;
    };

    return (
        <Panel
            className={classNames("membership", `membership--${name}`, classes)}
            key={id}
        >
            <CheckIcon2 />
            <h1>{title}</h1>
            {membershipDuration === "month" && (
                <div className="panel--membership__price-per-month">
                    <span>
                        {pricePerMonth} {currencySymbol} / month
                    </span>
                </div>
            )}
            {membershipDuration === "year" && (
                <div className="panel--membership__price-per-year">
                    <span>
                        {pricePerYear} {currencySymbol} / year
                    </span>
                    {membershipDuration === "year" && (
                        <div className="membership__save">
                            <span>Save {handleSavePercentage()}%</span>
                        </div>
                    )}
                </div>
            )}
            <div className="panel--membership__perks-list">
                <ul>
                    {perksList.map((perk, index) => (
                        <li key={perk + index} className="perk">
                            <span>{perk}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="panel--membership__buttons">
                <a
                    href="/"
                    className={classNames(
                        "btn btn--enhance",
                        name === "verified" && "btn--white-green",
                        name === "premium" && "btn--white-orange",
                        name === "organization" && "btn--white-red"
                    )}
                >
                    <LightningIcon />
                    <span className="btn__text">Enhance</span>
                </a>
            </div>
        </Panel>
    );
}
