import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Login from "./components/Login";
import AuthGuard from "./components/AuthGuard";
import { ROUTES } from "./constants";
import ErrorBoundary from "./ErrorBoundary";
import PageLoader from "./components/PageLoader";

const Registration = lazy(() => import("./components/Registration"));
const Home = lazy(() => import("./components/Home"));
const SearchHistory = lazy(() => import("./components/SearchHistory"));

const AppRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <ErrorBoundary {...location}>
      <Routes>
        <Route element={<AuthGuard />}>
          <Route
            path={ROUTES.HOME}
            element={
              <Suspense fallback={<PageLoader />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.SEARCH_HISTORY}
            element={
              <Suspense fallback={<PageLoader />}>
                <SearchHistory />
              </Suspense>
            }
          />
        </Route>

        <Route
          path={ROUTES.REGISTRATION}
          element={
            <Suspense fallback={<PageLoader />}>
              <Registration />
            </Suspense>
          }
        />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default AppRoutes;
