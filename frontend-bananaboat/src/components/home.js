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
import CloseIcon from "@mui/icons-material/Close"; // Optional for closing the sidebar
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
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("/");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    console.log(userData);
    setUser(userData); // Set user role after login
    setActiveSection("/");
  };

  const handleLogout = () => {
    setUser(null); // Clear the user data
    setActiveSection("/"); // Optionally redirect to home or another section
  };

  // Define role-based sidebar menus
  const menus = {
    openUser: [
      { text: "Home", section: "/" },
      { text: "Subject View", section: "subject-view" },
      { text: "Search Resources", section: "resource-search" },
      { text: "Other Useful OERs", section: "oer" },
      { text: "Rate Resources", section: "rate-resource" },
      { text: "Contributors", section: "contributors" },
      { text: "Self-Directed Learning", section: "self-directed" },
      { text: "Resource Report", section: "resource-report" },
    ],
    educator: [
      { text: "Home", section: "/" },
      { text: "Subject View", section: "subject-view" },
      { text: "Search Resources", section: "resource-search" },
      { text: "Contribute", section: "file-upload" },
      { text: "Other Useful OERs", section: "oer" },
      { text: "Rate Resources", section: "rate-resource" },
      { text: "Contributors", section: "contributors" },
      { text: "Self-Directed Learning", section: "self-directed" },
      { text: "Resource Report", section: "resource-report" },
    ],
    moderator: [
      { text: "Home", section: "/" },
      { text: "Subject View", section: "subject-view" },
      { text: "Search Resources", section: "resource-search" },
      { text: "Contribute", section: "file-upload" },
      { text: "Other Useful OERs", section: "oer" },
      { text: "Rate Resources", section: "rate-resource" },
      { text: "Moderate Resources", section: "moderate" },
      { text: "Contributors", section: "contributors" },
      { text: "Self-Directed Learning", section: "self-directed" },
      { text: "Resource Report", section: "resource-report" },
    ],
    administrator: [
      { text: "Home", section: "/" },
      { text: "Subject View", section: "subject-view" },
      { text: "Search Resources", section: "resource-search" },
      { text: "Contribute", section: "file-upload" },
      { text: "Other Useful OERs", section: "oer" },
      { text: "Rate Resources", section: "rate-resource" },
      { text: "Moderate Resources", section: "moderate" },
      { text: "Contributors", section: "contributors" },
      { text: "Self-Directed Learning", section: "self-directed" },
      { text: "Analytics", section: "analytics" },
      { text: "Resource Report", section: "resource-report" },
      { text: "Update User Role", section: "update-user-role" },
    ],
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Get the appropriate menu based on user role
  const selectedMenu = user ? menus[user.role] : menus.openUser;

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
      case "oer":
        return <OER />;
      case "contributors":
        return <Contributors />;
      case "self-directed":
        return <Self />;
      case "register":
        return <Register />;
      case "reset-password":
        return <PasswordReset />;
      case "new-password":
        return <NewPassword />;
      case "about-us":
        return <AboutUs />;
      case "faq":
        return <FAQ />;
      case "login":
        return <Login onLogin={handleLogin} />;
      case "analytics":
        return <Analytics />;
      case "moderate":
        return <ModerationForm />;
      case "rate-resource":
        return <RateResource />;
      case "resource-report":
        return <ResourceReport />;
      case "update-user-role":
        return <UpdateUserRole />;
      default:
        return <Typography variant="h5">Welcome to Share2Teach</Typography>;
    }
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
          {selectedMenu.map(({ text, section }) => (
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
            <Box>
              {user ? (
                <>
                  <Typography>Welcome, {user.username}!</Typography>
                  <button
                    style={styles.authButton}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    style={styles.authButton}
                    onClick={() => setActiveSection("login")}
                  >
                    Login
                  </button>
                  <button
                    style={styles.authButton}
                    onClick={() => setActiveSection("register")}
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
              style={styles.footerLink}
              onClick={() => setActiveSection("about-us")}
            >
              About Us
            </button>
            {" | "}
            <button
              style={styles.footerLink}
              onClick={() => setActiveSection("faq")}
            >
              FAQ
            </button>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  authButton: {
    margin: "0 5px",
    padding: "10px 15px",
    backgroundColor: "#4caf50",
    border: "none",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
  },
  footerLink: {
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
};

export default Home;
