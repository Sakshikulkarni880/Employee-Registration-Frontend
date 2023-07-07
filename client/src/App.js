import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Home from "./Pages/Home";
import UserDetails from "./Pages/UserDetails";

function App() {
  return (
    <Router>
      <div className="register-inner">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/home" element={<Home />} />
          <Route path="/userDetails" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
