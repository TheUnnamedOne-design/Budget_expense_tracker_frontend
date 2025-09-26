import React, { useEffect, useState } from "react";
import { listBudgets, updateBudget, createBudget } from "../api/api"; // Updated import to new api.js
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Assuming you have auth context for user info

export default function BudgetForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("monthly");
  const [editingId, setEditingId] = useState(null);
  const [qs] = useSearchParams();
  const nav = useNavigate();
  const { user } = useAuth(); // Get logged-in user info

  useEffect(() => {
    const id = qs.get("id");
    if (id && user?.id) {
      (async () => {
        const list = await listBudgets(user.id);
        const b = list.find(x => x.id === parseInt(id));
        if (b) {
          setEditingId(id);
          setName(b.name);
          setCategory(b.category);
          setAmount(b.amount);
          setPeriod(b.period || "monthly");
        }
      })();
    }
  }, [qs, user]);

  const save = async (e) => {
    e?.preventDefault();
    if (!user?.id) return alert("User not logged in");
    const budgetData = {
      name,
      category,
      amount: Number(amount),
      period,
      userId: user.id,
    };

    if (editingId) {
      await updateBudget(editingId, budgetData);
    } else {
      await createBudget(budgetData);
    }
    nav("/budgets");
  };

  return (
    <main className="container">
      <h2>{editingId ? "Edit" : "Create"} Budget</h2>
      <form className="form" onSubmit={save}>
        <input required placeholder="Budget name" value={name} onChange={e => setName(e.target.value)} />
        <input required placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
        <input required type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
        <select value={period} onChange={e => setPeriod(e.target.value)}>
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
        </select>
        <div className="form-actions">
          <button className="btn">Save</button>
          <button type="button" className="btn outline" onClick={() => nav("/budgets")}>Cancel</button>
        </div>
      </form>
    </main>
  );
}
