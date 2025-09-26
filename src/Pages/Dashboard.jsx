import React, { useEffect, useState } from "react";
import { summary as getSummary, listBudgets, listExpenses } from "../api/api"; // updated imports
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
  const [alerts, setAlerts] = useState([]);
  const { user } = useAuth();

  async function load() {
    if (!user?.id) return;
    const s = await getSummary(user.id);
    setSummary(s);

    const budgets = await listBudgets(user.id);
    const expenses = await listExpenses(user.id);

    const alertsLocal = [];
    budgets.forEach(b => {
      const spent = expenses
        .filter(e => e.category === b.category && e.type === "expense")
        .reduce((a, c) => a + Number(c.amount), 0);
      const progress = Math.round((spent / b.amount) * 100);
      if (progress >= 100) alertsLocal.push({ type: "over", text: `Budget "${b.name}" overshot (${progress}%)` });
      else if (progress >= 80) alertsLocal.push({ type: "warn", text: `Budget "${b.name}" near limit (${progress}%)` });
    });

    setAlerts(alertsLocal);
  }

  useEffect(() => {
    load();
  }, [user]);

  return (
    <main className="container">
      <div className="dash-hero">
        <div>
          <h2>Welcome back</h2>
          <p>Here's a quick summary of your finances.</p>
        </div>
        <div className="actions">
          <Link to="/expenses/new" className="btn">Add Expense</Link>
          <Link to="/expenses/new?type=income" className="btn outline">Add Income</Link>
        </div>
      </div>

      <div className="cards">
        <div className="card"><div className="card-title">Total Income</div><div className="card-value income">₹{summary.income}</div></div>
        <div className="card"><div className="card-title">Total Expense</div><div className="card-value expense">₹{summary.expense}</div></div>
        <div className="card"><div className="card-title">Balance</div><div className="card-value">₹{summary.balance}</div></div>
      </div>

      <div className="alerts">
        {alerts.length === 0 ? <div className="muted">No alerts</div> : alerts.map((a, i) => <div key={i} className={"alert " + (a.type === "over" ? "danger" : "warn")}>{a.text}</div>)}
      </div>
    </main>
  );
}
