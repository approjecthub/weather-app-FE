import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Registration from "./components/Registration";
import Login from "./components/Login";
import SearchHistory from "./components/SearchHistory";
import AuthGuard from "./components/AuthGuard";
import { ROUTES } from "./constants";
import ErrorBoundary from "./ErrorBoundary";

const AppRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <ErrorBoundary {...location}>
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={
            <AuthGuard>
              <Home />
            </AuthGuard>
          }
        />
        <Route path={ROUTES.REGISTRATION} element={<Registration />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route
          path={ROUTES.SEARCH_HISTORY}
          element={
            <AuthGuard>
              <SearchHistory />
            </AuthGuard>
          }
        />
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default AppRoutes;
