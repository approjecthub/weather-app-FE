import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Registration from "./components/Registration";
import Login from "./components/Login";
import SearchHistory from "./components/SearchHistory";
import AuthGuard from "./components/AuthGuard";
import { ROUTES } from "./constants";

const AppRoutes: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default AppRoutes;
