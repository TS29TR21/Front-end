import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Icon for the menu button
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
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false); // Initially closed

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
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
        return <Login />;
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

  const handleItemClick = (section) => {
    setActiveSection(section);
    setSidebarOpen(false); // Close sidebar when an item is clicked
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#e8f5e9" }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant="temporary" // Use 'temporary' for mobile view
        anchor="left"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)} // Close drawer when clicking outside
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
            bgcolor: "#2c7b2f", // Green background for sidebar
            color: "white",
          },
        }}
      >
        <List>
          {[
            { text: "Home", section: "/" },
            { text: "Subject View", section: "subject-view" },
            { text: "Search Resources", section: "resource-search" },
            { text: "Contribute", section: "file-upload" },
            { text: "Other Useful OERs", section: "oer" },
            { text: "Rate Resources", section: "rate-resource" },
            { text: "Moderate Resources", section: "moderate" },
            { text: "Contributors", section: "contributors" },
            { text: "Self-Directed Learning", section: "self-directed" },
            { text: "Login", section: "login" },
            { text: "Account Creation", section: "register" },
            { text: "Password Reset", section: "reset-password" },
            { text: "New Reset", section: "new-password" },
            { text: "Analytics", section: "analytics" },
            { text: "About Us", section: "about-us" },
            { text: "FAQ", section: "faq" },
            { text: "Resource Report", section: "resource-report" },
            { text: "Update User Role", section: "update-user-role" },
          ].map(({ text, section }) => (
            <ListItem
              button
              key={text}
              onClick={() => handleItemClick(section)}
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
          transition: "margin-left 0.3s",
          marginLeft: sidebarOpen ? "240px" : "0",
        }}
      >
        <AppBar position="static" sx={{ bgcolor: "#4caf50" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setSidebarOpen(true)} // Open sidebar on button click
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Share2Teach
            </Typography>
          </Toolbar>
        </AppBar>
        <Container sx={{ padding: 2, overflowY: "auto" }}>
          <Box sx={{ padding: 2, bgcolor: "#ffffff", borderRadius: 2 }}>
            {renderSectionContent()}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
