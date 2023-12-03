import "./App.css";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/User/Login/login";
import Signup from "./Components/User/Signup/signup";
import Bewerylist from "./Components/User/Home/Bewery";
import Profile from "./Components/User/Profile/profile";
import BeweryDetail from "./Components/User/Home/Bewerydetail";

function App() {
  return (
    <Box>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/home" element={<Bewerylist />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/bewerydetail" element={<BeweryDetail />} />
      </Routes>
    </Box>
  );
}

export default App;
