import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Panel from "../atoms/Panel";
import CategoriesDropdown from "../atoms/CategoriesDropdown";

export default function SelectTagsPanel() {
  // --- Search Params ---
  const [searchParams, setSearchParams] = useSearchParams();

  // --- State ---
  const [queryTags, setQueryTags] = useState<string[]>([]);

  // --- Effects ---
  useEffect(() => {
    updateQueryParams(queryTags);
  }, [queryTags]);

  // --- Methods ---
  // Updates the query params, but also preserve the current params.
  const updateQueryParams = (queryTags: string[]) => {
    const params = new URLSearchParams(searchParams); // Preserve existing params.
    if (queryTags.length > 0) {
      params.set("skillTags", queryTags.join(","));
    } else {
      params.delete("skillTags");
    }
    setSearchParams(params);
  };

  // Extracts the search tags from the child component and sets the state of the parent component.
  const getSearchTags = (tagsList: string[]) => {
    setQueryTags(tagsList);
  };

  return (
    <Panel className="panel--select-search-tags">
      <h1>Search</h1>
      <div className="panel__body">
        <p>
          Here you can select the tags for the type of lesson you are looking
          for.
        </p>
        <CategoriesDropdown mode="search" updateSkillTags={getSearchTags} />
      </div>
    </Panel>
  );
}
