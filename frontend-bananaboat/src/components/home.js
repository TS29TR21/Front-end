import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container as MuiContainer,
  IconButton,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, Routes, Route } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { Card, Row, Col } from "react-bootstrap";
import Login from "./login.js";
import ResourceSearch from "./resource-search.js";
import ModerationForm from "./moderation.js";
import NewPassword from "./new-password.js";
import RateResource from "./rate-resource.js";
import Register from "./register.js";
import PasswordReset from "./reset-password.js";
import ResourceReport from "./resource-report.js";
import UpdateUserRole from "./update-user-role.js";
import UploadTaggingResource from "./file-upload-tagging.js";
import SubjectView from "./subject-view.js";
import FAQ from "./faq.js";
import AboutUs from "./about-us.js";
import OER from "./oer.js";
import Contributors from "./contributors.js";
import Self from "./sdl.js";
import Analytics from "./analytics.js";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  // Define your route paths and associated components
  const routes = [
    { name: "Home", path: "/", icon: "nc-icon nc-bank", component: Home },
    {
      name: "Subject View",
      path: "subject-view",
      icon: "nc-icon nc-book-bookmark",
      component: SubjectView,
    },
    {
      name: "Search Resources",
      path: "resource-search",
      icon: "nc-icon nc-zoom-split",
      component: ResourceSearch,
    },
    {
      name: "Contribute",
      path: "file-upload",
      icon: "nc-icon nc-cloud-upload-94",
      component: UploadTaggingResource,
    },

    {
      name: "Other Useful OERs",
      path: "oer",
      icon: "nc-icon nc-globe-2",
      component: OER,
    },
    {
      name: "Rate Resources",
      path: "rate-resource",
      icon: "nc-icon nc-check-2",
      component: RateResource,
    },
    {
      name: "Moderate Resources",
      path: "moderate",
      icon: "nc-icon nc-paper",
      component: ModerationForm,
    },
    {
      name: "Contributors",
      path: "contributors",
      icon: "nc-icon nc-user-run",
      component: Contributors,
    },
    {
      name: "Self-Directed Learning",
      path: "self-directed",
      icon: "nc-icon nc-hat-3",
      component: Self,
    },
    {
      name: "Login",
      path: "login",
      icon: "nc-icon nc-lock-circle-open",
      component: Login,
    },
    {
      name: "Account Creation",
      path: "register",
      icon: "nc-icon nc-single-02",
      component: Register,
    },
    {
      name: "Password Reset",
      path: "reset-password",
      icon: "nc-icon nc-refresh-69",
      component: PasswordReset,
    },
    {
      name: "New Reset",
      path: "new-password",
      icon: "nc-icon nc-key-25",
      component: NewPassword,
    },
    {
      name: "Analytics",
      path: "analytics",
      icon: "nc-icon nc-chart-pie-36",
      component: Analytics,
    },
    {
      name: "About Us",
      path: "about-us",
      icon: "nc-icon nc-badge",
      component: AboutUs,
    },
    { name: "FAQ", path: "faq", icon: "nc-icon nc-support-17", component: FAQ },
    {
      name: "Resource Report",
      path: "resource-report",
      icon: "nc-icon nc-bullet-list-67",
      component: ResourceReport,
    },
    {
      name: "Update User Role",
      path: "update-user-role",
      icon: "nc-icon nc-settings-gear-65",
      component: UpdateUserRole,
    },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#E3F2FD" }}>
      {/* AppBar with Menu Icon */}
      <AppBar position="static" sx={{ bgcolor: "#4caf50" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuToggle} // Toggle Nav visibility
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Share2Teach
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer to display Nav when menu icon is clicked */}
      <Drawer anchor="left" open={menuOpen} onClose={handleMenuToggle}>
        <Nav
          className="flex-column"
          style={{ width: "240px", backgroundColor: "#2c7b2f" }}
        >
          {routes.map((prop, key) => (
            <li className={prop.upgrade ? "active active-pro" : ""} key={key}>
              <NavLink
                to={prop.path}
                className="nav-link"
                activeClassName="active"
                style={{ color: "white", padding: "10px" }}
              >
                <i className={prop.icon} />
                <p>{prop.name}</p>
              </NavLink>
            </li>
          ))}
        </Nav>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, padding: 2, overflowY: "auto" }}>
        <MuiContainer sx={{ padding: 2, overflowY: "auto" }}>
          <div className="text-center mb-4">
            <img
              src="https://services.nwu.ac.za/sites/services.nwu.ac.za/files/files/designs-branding/NWU-Stacked-Logo-Black-Digital.png"
              alt="Share2Teach"
              className="img-fluid"
              width={50}
            />
          </div>

          {/* React Router Routes */}
          <Routes>
            {routes.map((route, key) => (
              <Route
                key={key}
                path={route.path}
                element={<route.component />}
              />
            ))}
            {/* Redirect to Dashboard/Home if path is "/" */}
            <Route path="/" />
          </Routes>
        </MuiContainer>
      </Box>
    </Box>
  );
};

export default Home;
