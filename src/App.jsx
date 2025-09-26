import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Protected from "./components/Protected";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ResetPassword from "./Pages/ResetPassword";
import Dashboard from "./Pages/Dashboard";
import Expenses from "./Pages/Expenses";
import ExpenseForm from "./Pages/ExpenseForm";
import Budgets from "./Pages/Budgets";
import BudgetForm from "./Pages/BudgetForm";
import Reports from "./Pages/Reports";
import Profile from "./Pages/Profile";
import NotFound from "./Pages/NotFound";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset" element={<ResetPassword />} />

          <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
          <Route path="/expenses" element={<Protected><Expenses /></Protected>} />
          <Route path="/expenses/new" element={<Protected><ExpenseForm /></Protected>} />
          <Route path="/budgets" element={<Protected><Budgets /></Protected>} />
          <Route path="/budgets/new" element={<Protected><BudgetForm /></Protected>} />
          <Route path="/reports" element={<Protected><Reports /></Protected>} />
          <Route path="/profile" element={<Protected><Profile /></Protected>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}
