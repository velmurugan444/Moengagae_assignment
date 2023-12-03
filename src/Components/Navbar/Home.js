import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../Reducers/user";

const loginoptions = ["Home", "Profile", "Logout"];

function HomeappBar(props) {
  const [anchorElNav, setAnchorElNav] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const user = useSelector(state => state.user.value);
  const handleCloseNavMenu = menuname => {
    // setAnchorElNav(menuname);
    if (menuname == "Home") {
      navigate("/home");
    } else if (menuname == "Profile") {
      navigate("/profile");
    } else if (menuname == "Logout") {
      dispatch(
        getUserData({
          id: "",
          name: "",
          email: "",
          password: "",
          address: "",
          mobile: ""
        })
      );
      navigate("/");
    } else {
      navigate("/");
    }
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none"
              }}
            >
              MOENGAGE SYSTEM
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {user.email != ""
                ? loginoptions.map(page =>
                    <MenuItem
                      key={page}
                      onClick={() => handleCloseNavMenu(page)}
                    >
                      <Typography textAlign="center">
                        {page}
                      </Typography>
                    </MenuItem>
                  )
                : ""}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none"
            }}
          >
            MOENGAGE SYSTEM
          </Typography>
          <Box
            sx={{
              flexGrow: 0,
              display: {
                xs: "none",
                md: "flex",
                justifyContent: "space-between"
              }
            }}
          >
            {user.email != ""
              ? loginoptions.map(page =>
                  <Button
                    key={page}
                    onClick={() => handleCloseNavMenu(page)}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                )
              : ""}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HomeappBar;
