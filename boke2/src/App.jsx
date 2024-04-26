import React, { memo } from "react";
import { useRoutes, useLocation } from "react-router-dom";
import AppFooter from "./components/app-footer";
import AppHeader from "./components/app-header";
import { SearchProvider } from "./SearchContext";
import routes from "./router";
const App = memo(() => {
  const location = useLocation();
  return (
    <div className="app">
      <SearchProvider>
        {location.pathname !== "/login" &&
          location.pathname !== "/register" && <AppHeader />}
        <div className="page">{useRoutes(routes)}</div>
        {location.pathname == "/login" &&
          location.pathname == "/register" && <AppFooter />}
      </SearchProvider>
    </div>
  );
});

export default App;
