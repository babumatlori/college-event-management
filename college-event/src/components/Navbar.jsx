import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../pages/AuthContextPage";
import ThemeContext from "../pages/ThemeContextPage";
import "./Navbar.css";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={`navbar ${theme ? "dark" : "light"}`}>
      <div className="navbar-logo">
        <Link to="/">Pranfesta</Link>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        {/* <li>
          <Link to="/myevents">MyEvents</Link>
        </li> */}


        {currentUser ? (
          <>
          { currentUser?.role === "USER" &&(
            <li>
              <Link to="/myevents">My Events</Link>
            </li>
          )}

            {currentUser?.role === "ADMIN" && (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )}


            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
        <li>
          <button className="theme-btn" onClick={toggleTheme}>
            {theme=="dark"?"☀️" : "🌙"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
