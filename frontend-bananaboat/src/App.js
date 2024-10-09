import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home.js";
import Login from "./components/login.js";
import ResourceSearch from "./components/resource-search.js";
import ModerationForm from "./components/moderation.js";
import NewPassword from "./components/new-password.js";
import RateResource from "./components/rate-resource.js";
import Register from "./components/register.js";
import PasswordReset from "./components/reset-password.js";
import ResourceReport from "./components/resource-report.js";
import UpdateUserRole from "./components/update-user-role.js";
import UploadTaggingResource from "./components/file-upload-tagging.js";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login-page" element={<Login />} />
            <Route path="/resource-search-page" element={<ResourceSearch />} />
            <Route path="/moderate-page" element={<ModerationForm />} />
            <Route path="/new-password-page" element={<NewPassword />} />
            <Route path="/rate-resource-page" element={<RateResource />} />
            <Route path="/register-page" element={<Register />} />
            <Route path="/reset-password-page" element={<PasswordReset />} />
            <Route path="/resource-report-page" element={<ResourceReport />} />
            <Route path="/update-role-page" element={<UpdateUserRole />} />
            <Route
              path="/file-upload-page"
              element={<UploadTaggingResource />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
