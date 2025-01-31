import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchCountries, fetchCities } from "../services";

import Panel from "./Panel";
import Select from "../quarks/Select";
import RatingFilter from "../quarks/RatingFilter";
import Error from "../quarks/Error";

type sidebarFiltersType = {
  country: string;
  city: string;
  teacherType: string;
  sortBy: string;
  minRating: number;
};

export default function FiltersPanel() {
  const [searchParams, setSearchParams] = useSearchParams();
  // --- State ---

  // Main State
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [filters, setFilters] = useState<sidebarFiltersType>({
    country: "",
    city: "",
    teacherType: "",
    sortBy: "",
    minRating: 0,
  });

  // Countries and Cities
  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  // --- Effects ---
  // Fetch all of the countries so the user can choose from them for the filer.
  useEffect(() => {
    setLoading(true);
    const handleCountries = async () => {
      const fetchedCountries = await fetchCountries();
      if (fetchedCountries) {
        setCountries(fetchedCountries);
      } else {
        setError(
          "Couldn't retrieve the list of countries. Please try again later."
        );
      }
    };
    handleCountries();
    // Delay on purpose for testing.
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  // Fetch all of the cities in the selected country.
  useEffect(() => {
    // We ensure that the country is selected first.
    if (filters.country) {
      setLoading(true);
      // Once the country has been changed, we want to clear the selected city.
      setFilters({ ...filters, city: "" });
      const handleCities = async () => {
        const cities = await fetchCities(filters.country);
        if (cities) setCities(cities);
      };
      handleCities();
      setLoading(false);
    }
  }, [filters.country]);

  // Change the query string upon filter change
  useEffect(() => {
    const params = new URLSearchParams(searchParams); // Preserve existing params

    if (filters.country) params.set("country", filters.country);
    else params.delete("country");

    if (filters.city) params.set("city", filters.city);
    else params.delete("city");

    if (filters.teacherType) params.set("teacherType", filters.teacherType);
    else params.delete("teacherType");

    if (filters.sortBy) params.set("sortBy", filters.sortBy);
    else params.delete("sortBy");

    if (filters.minRating > 0)
      params.set("rating", filters.minRating.toString());
    else params.delete("rating");

    setSearchParams(params);
  }, [filters]);

  // --- Methods ---

  // Adds a filter to the list of filters
  const addFilter = (filter: string, filterType: string) => {
    setFilters({
      ...filters,
      [filterType]: filter,
    });
  };

  // Function that handles the selection of the minimum rating
  const onRatingSelect = (newMinRating: number) => {
    setFilters({ ...filters, minRating: newMinRating });
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
    <Panel className="panel--sidebar panel--sidebarFilters">
      {error !== "" && (
        <section className="section-error">
          <Error errorMessage={error} />
        </section>
      )}

      <>
        {/* Handle the list of country options */}
        <section className="section-filters">
          <div className="sectionHeading">
            <h6>Country</h6>
          </div>
          <Select
            name="country"
            id="country-select"
            optionsList={countries}
            defaultOption="Select country"
            className="select--country"
            value={filters.country}
            disabled={loading}
            onChange={(e) => addFilter(e.target.value, "country")}
          />
        </section>
        {/* Handle the list of country options */}
        <section className="section-filters">
          <div className="sectionHeading">
            <h6>City</h6>
          </div>
          <Select
            name="city"
            id="city-select"
            optionsList={cities}
            defaultOption="Select city"
            className="select--city"
            value={filters.city}
            disabled={loading}
            onChange={(e) => addFilter(e.target.value, "city")}
          />
        </section>

        {/* Type of teacher selection */}
        <section className="section-filters">
          <div className="sectionHeading">
            <h6>Type of teacher</h6>
          </div>
          <Select
            name="teacherType"
            id="teacher-type-select"
            optionsList={["All", "Independent", "Organization"]}
            defaultOption="All"
            className="select--teacherType"
            disabled={loading}
            onChange={(e) => addFilter(e.target.value, "teacherType")}
          />
        </section>
        {/* Sorting */}
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
              "Expensive",
            ]}
            defaultOption="Our recommended"
            className="select--ourRecommended"
            disabled={loading}
            onChange={(e) => addFilter(e.target.value, "sortBy")}
          />
        </section>
        {/* Minimum rating filtration */}
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
              <span className="btn__text">Remove Filters</span>
            </button>
          </div>
        </section>
      </>
    </Panel>
  );
}
