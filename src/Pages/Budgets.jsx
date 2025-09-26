import React, { useEffect, useState } from "react";
import { listBudgets, deleteBudget } from "../api/api"; // updated import
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // to get logged-in user

export default function Budgets() {
  const [list, setList] = useState([]);
  const nav = useNavigate();
  const { user } = useAuth();

  async function load() {
    if (!user?.id) return;
    const l = await listBudgets(user.id);
    setList(l);
  }

  useEffect(() => {
    load();
  }, [user]);

  const remove = async (id) => {
    if (!confirm("Delete budget?")) return;
    await deleteBudget(id);
    load();
  };

  return (
    <main className="container">
      <div className="list-header">
        <h2>Budgets</h2>
        <div><button className="btn" onClick={() => nav("/budgets/new")}>+ Create Budget</button></div>
      </div>
      {list.length === 0 ? <div className="muted">No budgets yet</div> : (
        <ul className="list">
          {list.map(b => (
            <li key={b.id} className="list-item">
              <div>
                <div className="li-main">{b.name} — Limit: ₹{b.amount} <span className="muted small">({b.period})</span></div>
                <div className="muted small">Category: {b.category}</div>
              </div>
              <div className="li-actions">
                <button className="btn small" onClick={() => nav("/budgets/new?id=" + b.id)}>Edit</button>
                <button className="btn small danger" onClick={() => remove(b.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
