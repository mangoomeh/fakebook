import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Profile from "./Pages/Profile/Profile";
import theme from "./Theme";
import { useState } from "react";
import UserContext from "./Context/UserContext";
import ProtectedRoutes from "./Auth/ProtectedRoutes";
import Friends from "./Pages/Friends/Friends";
import People from "./Pages/People/People";
import OpenRoutes from "./Auth/OpenRoutes";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider
        value={{ accessToken, setAccessToken, refreshToken, setRefreshToken }}
      >
        <NavBar />
          <Routes>
            <Route element={<OpenRoutes />}>
              <Route path="/" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
            </Route>
            <Route element={<ProtectedRoutes />}>
              <Route path="home" element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="friends" element={<Friends />} />
              <Route path="people" element={<People />} />
            </Route>
          </Routes>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
