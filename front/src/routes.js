import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Confirmation from "./components/Confirmation";
import Authenfication from "./components/Authenfication";
import Home from "./components/Home";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import AuthGuard from "./components/AuthGuard";
import ProtectedCompo from "./components/ProtectedCompo";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
             <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Header />
              <Authenfication />
            </>
          }
        />
        <Route
          path="/confirmation/:userId"
          element={
            <>
              <Header />
              <Confirmation />
            </>
          }
        />

        {/* Utilisez un <Route> pour envelopper AuthGuard */}
        <Route
          path="/Dashboard/*"
          element={
            <>
              <AuthGuard />
              <Header />
              <ProtectedCompo />
            </>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;