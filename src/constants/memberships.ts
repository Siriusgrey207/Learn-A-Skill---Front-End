export type membershipTypes = {
    id: string;
    tier: number;
    title: string;
    name: string;
    pricePerMonth: number;
    pricePerYear: number;
    currencyCode: string;
    currencySymbol: string;
    perksList: string[];
};

const memberships: membershipTypes[] = [
    {
        id: "1",
        tier: 1,
        title: "Become Verified",
        name: "verified",
        pricePerMonth: 3.99,
        pricePerYear: 42.99,
        currencyCode: "GBP",
        currencySymbol: "£",
        perksList: ["Checkmark icon for verified users", "Increased view rate"],
    },
    {
        id: "2",
        tier: 2,
        title: "Premium Membership",
        name: "premium",
        pricePerMonth: 8.99,
        pricePerYear: 92.99,
        currencyCode: "GBP",
        currencySymbol: "£",
        perksList: [
            "Checkmark icon and a “Recommended” label",
            "Further increased view rate - The skills you teach will appear at the top of the page for the users",
            "Analytics data (number of views and favorites)",
            "Users can contact you easier - Users are able to email you directly through the website.",
        ],
    },
    {
        id: "3",
        tier: 2,
        title: "Orginization Membership",
        name: "organization",
        pricePerMonth: 499,
        pricePerYear: 4999,
        currencyCode: "GBP",
        currencySymbol: "£",
        perksList: [
            "The membership is applied to every member of your organization.",
            "Checkmark icon and a “Recommended” label",
            "Further increased view rate - The skills you teach will appear at the top of the page for the users",
            "Analytics data (number of views and favorites)",
            "Users can contact you easier - Users are able to email you directly through the website.",
        ],
    },
];

export default memberships;
