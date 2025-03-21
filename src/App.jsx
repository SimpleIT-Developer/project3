import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import BranchesPage from "./pages/BranchesPage";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/branches"
        element={isAuthenticated ? <BranchesPage /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;