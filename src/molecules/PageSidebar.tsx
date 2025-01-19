import React, { useState } from "react";
// import classNames from "classnames";

import Navigation from "./Navigation";
import Panel from "../atoms/Panel";
import Select from "../quarks/Select";
import RatingFilter from "../quarks/RatingFilter";
import PlusIcon from "../icons/PlusIcon";

type sidebarFiltersType = {
  country: string;
  city: string;
  teacherType: string;
  sortBy: string;
  minRating: number;
};

const PageSidebar: React.FC = () => {
  // State for the filters
  const [filters, setFilters] = useState<sidebarFiltersType>({
    country: "",
    city: "",
    teacherType: "",
    sortBy: "",
    minRating: 0,
  });

  // Adds a filter to the list of filters
  const addFilter = (filter: string, filterType: string) => {
    setFilters({
      ...filters,
      [filterType]: filter,
    });
  };

  // Function that handles the selection of the minimum rating
  const onRatingSelect = (newRating: number) => {
    setFilters({ ...filters, minRating: newRating });
  };

  // Function that removes all filters
  const removeAllFilters = () => {
    setFilters({
      country: "",
      city: "",
      teacherType: "",
      sortBy: "",
      minRating: 0,
    });
  };

  return (
    <div className="page-sidebar page-sidebar--left">
      {/* This particular panel should only be displated on the homepage */}
      {window.location.pathname === "/" && (
        <Panel className="panel--sidebar panel--sidebarFilters">
          <section className="section-filters">
            <div className="sectionHeading">
              <h6>Country</h6>
            </div>
            <Select
              name="country"
              id="country-select"
              optionsList={[
                "Country Option 1",
                "Country Option 2",
                "Country Option 3",
              ]}
              defaultOption="Select country"
              className="select--country"
              onChange={(e) => addFilter(e.target.value, "country")}
            />
          </section>
          <section className="section-filters">
            <div className="sectionHeading">
              <h6>City</h6>
            </div>
            <Select
              name="city"
              id="city-select"
              optionsList={["City Option 1", "City Option 2", "City Option 3"]}
              defaultOption="Select city"
              className="select--city"
              onChange={(e) => addFilter(e.target.value, "city")}
            />
          </section>
          <section className="section-filters">
            <div className="sectionHeading">
              <h6>Type of teacher</h6>
            </div>
            <Select
              name="teacherType"
              id="teacher-type-select"
              optionsList={[
                "Teacher Option 1",
                "Teacher Option 2",
                "Teacher Option 3",
              ]}
              defaultOption="Select Teacher"
              className="select--teacherType"
              onChange={(e) => addFilter(e.target.value, "teacherType")}
            />
          </section>
          <section className="section-filters">
            <div className="sectionHeading">
              <h6>Sort by</h6>
            </div>
            <Select
              name="sortBy"
              id="teacher-sort-by"
              optionsList={[
                "Newest",
                "Oldest",
                "Most Highly Rated",
                "Cheapest",
                "Most Expensive",
              ]}
              defaultOption="Our recommended"
              className="select--ourRecommended"
              onChange={(e) => addFilter(e.target.value, "sortBy")}
            />
          </section>
          <section className="section-filters">
            <div className="sectionHeading">
              <h6>Filter by rating</h6>
              <RatingFilter onRatingSelect={onRatingSelect} />
            </div>
          </section>
          <section className="section-filters section-filters--remove-filters">
            <div className="sectionHeading">
              <h6>Remove filters</h6>
            </div>
            <div className="buttonsContainer">
              <button
                type="button"
                className="btn btn--red btn--remove-filters"
                onClick={removeAllFilters}
              >
                <span className="btn__text">Remove All Filters</span>
              </button>
            </div>
          </section>
        </Panel>
      )}

      {/* This panel should be displayed on all pages */}
      <Panel className="panel--sidebar">
        <Navigation className="navigation-container--pageSidebar" />
      </Panel>
    </div>
  );
};

export default PageSidebar;
