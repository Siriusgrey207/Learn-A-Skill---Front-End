import { useState, useEffect } from "react";
import { useUserContext } from "../hooks/useUserContext";
import Info from "../quarks/Info";
import Dropdown from "./Dropdown";
import Input from "../quarks/Input";
import Button from "../quarks/Button";
import CloseIcon from "../icons/CloseIcon";

import classNames from "classnames";
import categories from "../constants/categories"; // Ensure this is an object with categories and subcategories

// Define the types for the component.
type CategoriesDropdownTypes = {
  updateSkillTags: (tagsList: string[]) => void;
  mode: "search" | "select"; // Search should be the default. Select is for forms (e.g. new skill submission.)
};
// If the mode is set to "select", we want to check if the user is premium or not.
//   If the user is not premium, limit to 2 selected categories.
//   If the user is premium, limit to 5 selected categories.

export default function CategoriesDropdown(props: CategoriesDropdownTypes) {
  // Props
  const { updateSkillTags, mode = "search" } = props;

  // Global context
  const { userDetails } = useUserContext();

  // Local State
  const [toggleDD, setToggleDD] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [filteredCategories, setFilteredCategories] = useState<{
    [key: string]: string[];
  }>({});
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Other
  const maximumTags = userDetails.userIsPremium ? 5 : 2;

  // Filter the categories based on the provided string;
  const filterCategories = (value: string) => {
    setFilter(value);
  };

  useEffect(() => {
    updateSkillTags(selectedCategories);
  }, [selectedCategories]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const lowercasedFilter = filter.toLowerCase();
      const newFilteredCategories = Object.entries(categories).reduce(
        (acc, [category, subcategories]) => {
          const filteredSubcategories = subcategories.filter((subcategory) =>
            subcategory.toLowerCase().includes(lowercasedFilter)
          );

          if (filteredSubcategories.length > 0) {
            acc[category] = filteredSubcategories;
          }

          return acc;
        },
        {} as { [key: string]: string[] }
      );

      setFilteredCategories(filter ? newFilteredCategories : categories);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [filter]);

  return (
    <div
      className={classNames(
        "categories-dropdown",
        maximumTags === selectedCategories.length &&
          mode === "select" &&
          "categories-dropdown--disabled"
      )}
    >
      <div className="categories-container">
        <Input
          type="text"
          name="categories"
          placeholder="Physics"
          disabled={
            maximumTags === selectedCategories.length && mode === "select"
          }
          value={filter}
          onChange={(e) => filterCategories(e.target.value)}
          onFocus={() => setToggleDD(true)}
          onBlur={() => setTimeout(() => setToggleDD(false), 100)}
        />
        {maximumTags === selectedCategories.length && mode === "select" && (
          <Info
            className="infoContainer--categories"
            infoMessageElement={
              userDetails.userIsPremium ? (
                <p>You have reached the maximum number of tags.</p>
              ) : (
                <p>
                  You have reached the maximum number of tags.{" "}
                  <a href="/promote" target="_blank">
                    Upgrade to premium
                  </a>{" "}
                  if you would like to add up to 5.
                </p>
              )
            }
          />
          //   <div>
          //     <span>You have reached the maximum number of tags.</span>
          //     {!userDetails.userIsPremium && (
          //       <span>Upgrade to premium if you would like to add up to 5.</span>
          //     )}
          //   </div>
        )}
        <Dropdown isToggled={toggleDD}>
          <div className="dropdown__inner">
            {Object.entries(filteredCategories).length > 0 ? (
              Object.entries(filteredCategories).map(
                ([category, subcategories]) => (
                  <div key={category} className="dropdown-category">
                    <h5>{category}</h5>
                    <div className="dropdown-subcategories">
                      {subcategories.map((subcategory, index) => (
                        <Button
                          key={index}
                          className="btn btn--white btn--subcategory"
                          disabled={
                            maximumTags === selectedCategories.length &&
                            mode === "select"
                          }
                          onClick={() => {
                            if (!selectedCategories.includes(subcategory)) {
                              setSelectedCategories((prev) => [
                                ...prev,
                                subcategory,
                              ]);
                            }
                            // setToggleDD(false); // Close dropdown after selection
                          }}
                        >
                          <span className="btn__text">{subcategory}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                )
              )
            ) : (
              <span>No categories found</span>
            )}
          </div>
        </Dropdown>
      </div>
      {selectedCategories.length > 0 ? (
        <div className="tags-container">
          {selectedCategories.map((category, index) => (
            <Button
              key={index}
              type="button"
              className="btn btn--selectedSubcategory tag"
              onClick={() => {
                setSelectedCategories((prev) =>
                  prev.filter((item) => item !== category)
                );
                console.log(`Removed category: ${category}`);
              }}
            >
              <CloseIcon />
              <span className="btn__text">{category}</span>
            </Button>
          ))}
        </div>
      ) : (
        <div className="tags-container tags-container--no-categories">
          <span>Please select at least 1 category</span>
        </div>
      )}
    </div>
  );
}
