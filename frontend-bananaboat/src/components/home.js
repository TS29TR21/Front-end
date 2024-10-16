import React, { useState } from "react";
import { Container, Navbar, Nav, Row, Col } from "react-bootstrap";
import { NavLink, Routes, Route } from "react-router-dom";
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
import "./assets/css/light-bootstrap-dashboard-react.css";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Define your route paths and associated components
  const routes = [
    { name: "Home", path: "/", component: Home },
    { name: "Subject View", path: "subject-view", component: SubjectView },
    {
      name: "Search Resources",
      path: "resource-search",
      component: ResourceSearch,
    },
    {
      name: "Contribute",
      path: "file-upload",
      component: UploadTaggingResource,
    },

    { name: "Other Useful OERs", path: "oer", component: OER },
    { name: "Rate Resources", path: "rate-resource", component: RateResource },
    { name: "Moderate Resources", path: "moderate", component: ModerationForm },
    { name: "Contributors", path: "contributors", component: Contributors },
    { name: "Self-Directed Learning", path: "self-directed", component: Self },
    { name: "Login", path: "login", component: Login },
    { name: "Account Creation", path: "register", component: Register },
    {
      name: "Password Reset",
      path: "reset-password",
      component: PasswordReset,
    },
    { name: "New Reset", path: "new-password", component: NewPassword },
    { name: "Analytics", path: "analytics", component: Analytics },
    { name: "About Us", path: "about-us", component: AboutUs },
    { name: "FAQ", path: "faq", component: FAQ },
    {
      name: "Resource Report",
      path: "resource-report",
      component: ResourceReport,
    },
    {
      name: "Update User Role",
      path: "update-user-role",
      component: UpdateUserRole,
    },
  ];

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="success" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="/">
            <img
              src="https://services.nwu.ac.za/sites/services.nwu.ac.za/files/files/designs-branding/NWU-Stacked-Logo-Black-Digital.png"
              alt="Share2Teach"
              width="40"
            />{" "}
            Share2Teach
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {routes.map((route, key) => (
                <Nav.Link
                  as={NavLink}
                  to={route.path}
                  key={key}
                  className="nav-link"
                  activeClassName="active"
                  exact
                >
                  {route.name}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="mt-4">
        <Row>
          <Col>
            <Routes>
              {routes.map((route, key) => (
                <Route
                  key={key}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
              {/* Default Route */}
              <Route path="/" element={<Home />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
