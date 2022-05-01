import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/hooks/PrivateRoute";
import {
  Feed,
  ForgotPassword,
  Login,
  Register,
  Success,
  VerifyUser,
} from "./pages";
import PublicRoute from "./components/hooks/PublicRoute";
import { Toaster } from "react-hot-toast";
import { setUser } from "./store/slice/authSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("onquity_user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      dispatch(setUser(foundUser));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/create-account"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/verify"
            element={
              <PrivateRoute>
                <VerifyUser />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/congratulations"
            element={
              <PrivateRoute>
                <Success />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/feed"
            element={
              <PrivateRoute>
                <Feed />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
