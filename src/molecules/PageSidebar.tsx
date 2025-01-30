import React from "react";
// import classNames from "classnames";

import Navigation from "./Navigation";
import Panel from "../atoms/Panel";
import FiltersPanel from "../atoms/FiltersPanel";

const PageSidebar: React.FC = () => {
  return (
    <div className="page-sidebar page-sidebar--left">
      {/* This particular panel should only be displated on the homepage */}
      {window.location.pathname === "/" && <FiltersPanel />}

      {/* This panel should be displayed on all pages */}
      <Panel className="panel--sidebar">
        <Navigation className="navigation-container--pageSidebar" />
      </Panel>
    </div>
  );
};

export default PageSidebar;
