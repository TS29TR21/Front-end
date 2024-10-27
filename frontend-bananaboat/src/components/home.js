import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Login from "./login.js";
import ResourceSearch from "./resource-search.js";
import ModerationForm from "./moderation.js";
import RateResource from "./rate-resource.js";
import Register from "./register.js";
import ResourceReport from "./resource-report.js";
import UpdateUserRole from "./update-user-role.js";
import UploadTaggingResource from "./file-upload-tagging.js";
import SubjectView from "./subject-view.js";
import FAQ from "./faq.js";
import AboutUs from "./about-us.js"; // Import AboutUs component
import Analytics from "./analytics.js";
import "./style.css"; // Importing style.css

const Home = () => {
  const storedUsername = localStorage.getItem("username");
  const storedUserRole = localStorage.getItem("userRole");

  const [activeSection, setActiveSection] = useState("/");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    console.log(userData);
    setUser(userData); // Set user data after login
    setActiveSection("/");
  };

  const handleLogout = () => {
    setUser(null); // Clear the user data
    setActiveSection("/");
  };

  // Define role-based sidebar menus
  const menus = {
    openUser: [
      { text: "Home", section: "/" },
      { text: "FAQ", section: "faq" },
      { text: "Search Resources", section: "resource-search" },
      { text: "Subject View", section: "subject-view" },
      { text: "Resource Report", section: "resource-report" },
      { text: "Rate Resources", section: "rate-resource" },
    ],
    educatorUser: [
      { text: "Home", section: "/" },
      { text: "FAQ", section: "faq" },
      { text: "Search Resources", section: "resource-search" },
      { text: "Subject View", section: "subject-view" },
      { text: "Resource Report", section: "resource-report" },
      { text: "Rate Resources", section: "rate-resource" },
      { text: "Contribute", section: "file-upload" },
    ],
    moderatorUser: [
      { text: "Home", section: "/" },
      { text: "FAQ", section: "faq" },
      { text: "Search Resources", section: "resource-search" },
      { text: "Subject View", section: "subject-view" },
      { text: "Resource Report", section: "resource-report" },
      { text: "Rate Resources", section: "rate-resource" },
      { text: "Contribute", section: "file-upload" },
      { text: "Moderate Resources", section: "moderate" },
    ],
    adminUser: [
      { text: "Home", section: "/" },
      { text: "FAQ", section: "faq" },
      { text: "Search Resources", section: "resource-search" },
      { text: "Subject View", section: "subject-view" },
      { text: "Resource Report", section: "resource-report" },
      { text: "Rate Resources", section: "rate-resource" },
      { text: "Contribute", section: "file-upload" },
      { text: "Moderate Resources", section: "moderate" },
      { text: "Update User Role", section: "update-user-role" },
      { text: "Analytics", section: "analytics" },
    ],
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Get the appropriate menu based on user role
  const selectedMenu = user ? menus[user.userRole] : menus.openUser;

  const renderSectionContent = () => {
    switch (activeSection) {
      case "/":
        return <Typography variant="h5">Welcome to Share2Teach</Typography>;
      case "subject-view":
        return <SubjectView />;
      case "resource-search":
        return <ResourceSearch />;
      case "file-upload":
        return <UploadTaggingResource />;
      case "faq":
        return <FAQ />;
      case "resource-report":
        return <ResourceReport />;
      case "rate-resource":
        return <RateResource />;
      case "moderate":
        return <ModerationForm />;
      case "analytics":
        return <Analytics />;
      case "update-user-role":
        return <UpdateUserRole />;
      case "about-us": // Added About Us case
        return <AboutUs />;
      case "login":
        return <Login onLogin={handleLogin} />;
      case "register":
        return <Register />; // Render the Register component
      default:
        return <Typography variant="h5">Welcome to Share2Teach</Typography>;
    }
  };

  // Mapping user roles to display labels
  const roleLabels = {
    openUser: "Open User",
    educatorUser: "Educator",
    moderatorUser: "Moderator",
    adminUser: "Admin",
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        bgcolor: "#e8f5e9",
      }}
    >
      {/* Sidebar as a Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={sidebarOpen}
        onClose={toggleSidebar}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
            bgcolor: "#2c7b2f",
            color: "white",
          },
        }}
      >
        <IconButton onClick={toggleSidebar} sx={{ marginLeft: "auto" }}>
          <CloseIcon style={{ color: "white" }} />
        </IconButton>
        <List>
          {(selectedMenu || []).map(({ text, section }) => (
            <ListItem
              button
              key={text}
              onClick={() => {
                setActiveSection(section);
                setSidebarOpen(false);
              }}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppBar position="static" sx={{ bgcolor: "#4caf50" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleSidebar}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Share2Teach
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {user ? (
                <>
                  <Typography sx={{ marginRight: 2 }}>
                    User: {storedUsername}
                    <br />Role: {roleLabels[storedUserRole] || storedUserRole}
                  </Typography>
                  <button className="auth-button" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="auth-button"
                    onClick={() => setActiveSection("login")}
                  >
                    Login
                  </button>
                  <button
                    className="auth-button"
                    onClick={() => setActiveSection("register")} // Set active section to register
                  >
                    Sign Up
                  </button>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>

        <Container sx={{ padding: 2, overflowY: "auto", flexGrow: 1 }}>
          <Box sx={{ padding: 2, bgcolor: "#ffffff", borderRadius: 2 }}>
            {renderSectionContent()}
          </Box>
        </Container>

        {/* Footer */}
        <Box
          sx={{
            bgcolor: "#2c7b2f",
            color: "white",
            padding: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="body2">
            <button
              className="footer-link"
              onClick={() => setActiveSection("about-us")} // Set active section to about-us
            >
              About Us
            </button>
            {" | "}
            <button
              className="footer-link"
              onClick={() => setActiveSection("faq")}
            >
              FAQ
            </button>
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            &copy; {new Date().getFullYear()} NexTech. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
