import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Logo from "../img/logo.png";
import { Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import LogoutIcon from "@mui/icons-material/Logout";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function Navbar() {
  const Navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  let location = useLocation();
  React.useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    Navigate("/login");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton color="inherit">
          <HomeIcon sx={{ fontSize: 30 }} />
        </IconButton>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          Home
        </Link>
      </MenuItem>

      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle sx={{ fontSize: 30 }} />
        </IconButton>
        <Link to="/about" style={{ textDecoration: "none", color: "black" }}>
          About
        </Link>
      </MenuItem>
      <MenuItem>
        <IconButton color="inherit">
          <LogoutIcon sx={{ fontSize: 30 }} />
        </IconButton>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          Logout
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid
            container
            item
            style={{ height: "80px", width: "400px", margin: "5px 0" }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{
                height: "100%",
                width: "100%",
                objectFit: "contain",
              }}
            />
          </Grid>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            NoteBook
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          {localStorage.getItem("token") ? (
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton color="inherit">
                <HomeIcon sx={{ fontSize: 30 }} />
                <Link
                  to="/"
                  style={
                    location.pathname === "/"
                      ? { textDecoration: "none", color: "black" }
                      : { textDecoration: "none", color: "white" }
                  }
                >
                  Home
                </Link>
              </IconButton>

              <IconButton
                //   size="large"
                //   edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                //   onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle sx={{ fontSize: 30 }} />
                <Link
                  to="/about"
                  style={
                    location.pathname === "/about"
                      ? { textDecoration: "none", color: "black" }
                      : { textDecoration: "none", color: "white" }
                  }
                >
                  About
                </Link>
              </IconButton>
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon sx={{ fontSize: 30 }} />
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  Logout
                </Link>
              </IconButton>
            </Box>
          ) : location.pathname === "/login" ? (
            <IconButton color="inherit">
              <LockOpenIcon sx={{ fontSize: 30 }} />
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "white" }}
              >
                Signup
              </Link>
            </IconButton>
          ) : (
            <IconButton color="inherit">
              <LockOpenIcon sx={{ fontSize: 30 }} />
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "white" }}
              >
                Login
              </Link>
            </IconButton>
          )}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
export default Navbar;
