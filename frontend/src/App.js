import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import NavBar from "./Components/NavBar/NavBar";
import Start from "./Pages/Start/Start";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Profile from "./Pages/Profile/Profile";
import theme from "./Theme";
import { useState } from "react";
import UserContext from "./Context/UserContext";
import ProtectedRoutes from "./Auth/ProtectedRoutes/ProtectedRoutes";
import Friends from "./Pages/Friends/Friends";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <div>
        <UserContext.Provider
          value={{ accessToken, setAccessToken, refreshToken, setRefreshToken }}
        >
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="home" element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="friends" element={<Friends />} />
            </Route>
          </Routes>
        </UserContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
