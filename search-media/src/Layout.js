import React from "react";
import Bar from "./Bar"
import Routes from "./Routes";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <>
      <Bar />
      <Routes />
    </>
  );
}

export default Layout;