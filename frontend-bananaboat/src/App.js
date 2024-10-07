import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home.js";
import Login from "./components/login.js";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/home-page" element={<Home />} />
            <Route path="/login-page" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
