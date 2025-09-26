import React, { useEffect, useState } from "react";
import { listExpenses, deleteExpense } from "../api/api"; // updated import
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Expenses() {
  const [list, setList] = useState([]);
  const nav = useNavigate();
  const { user } = useAuth();

  async function load() {
    if (!user?.id) return;
    const l = await listExpenses(user.id);
    setList(l);
  }

  useEffect(() => {
    load();
  }, [user]);

  const remove = async (id) => {
    if (!confirm("Delete this expense?")) return;
    await deleteExpense(id);
    load();
  };

  return (
    <main className="container">
      <div className="list-header">
        <h2>Expenses</h2>
        <div><button className="btn" onClick={() => nav("/expenses/new")}>+ Add</button></div>
      </div>
      {list.length === 0 ? <div className="muted">No transactions yet</div> : (
        <ul className="list">
          {list.map(item => (
            <li key={item.id} className="list-item">
              <div>
                <div className="li-main">{item.category} — ₹{item.amount} <span className="muted small">({item.type})</span></div>
                <div className="muted small">{item.date} — {item.note}</div>
              </div>
              <div className="li-actions">
                <button className="btn small" onClick={() => nav("/expenses/new?id=" + item.id)}>Edit</button>
                <button className="btn small danger" onClick={() => remove(item.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
