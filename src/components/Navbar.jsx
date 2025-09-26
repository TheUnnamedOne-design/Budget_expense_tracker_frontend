import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const handleLogout = () => { logout(); nav("/login"); };
  return (
    <header className="nav">
      <div className="container nav-inner">
        <div className="brand"><Link to="/">ExpenseTracker</Link></div>
        <nav className="links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/expenses">Expenses</Link>
          <Link to="/budgets">Budgets</Link>
          <Link to="/reports">Reports</Link>
          <Link to="/profile">Profile</Link>
          {user ? <button onClick={handleLogout} className="btn small">Logout</button> : <Link to="/login" className="btn small">Login</Link>}
        </nav>
      </div>
    </header>
  );
}
