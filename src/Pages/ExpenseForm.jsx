import React, { useEffect, useState } from "react";
import { listExpenses, updateExpense, createExpense } from "../api/api"; // updated import
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ExpenseForm() {
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState("");
  const [editingId, setEditingId] = useState(null);
  const nav = useNavigate();
  const [qs] = useSearchParams();
  const { user } = useAuth();

  useEffect(() => {
    const id = qs.get("id");
    const typeq = qs.get("type");
    if (typeq) setType(typeq);
    if (id && user?.id) {
      (async () => {
        const list = await listExpenses(user.id);
        const it = list.find(x => x.id === parseInt(id));
        if (it) {
          setEditingId(id);
          setType(it.type);
          setCategory(it.category);
          setAmount(it.amount);
          setDate(it.date);
          setNote(it.note);
        }
      })();
    }
  }, [qs, user]);

  const save = async (e) => {
    e?.preventDefault();
    if (!category || !amount) {
      alert("Category and amount required");
      return;
    }
    if (!user?.id) {
      alert("User not logged in");
      return;
    }

    const expenseData = {
      type,
      category,
      amount: Number(amount),
      date,
      note,
      userId: user.id,
    };

    if (editingId) {
      await updateExpense(editingId, expenseData);
    } else {
      await createExpense(expenseData);
    }
    nav("/expenses");
  };

  return (
    <main className="container">
      <h2>{editingId ? "Edit" : "Add"} Transaction</h2>
      <form className="form" onSubmit={save}>
        <label>Type</label>
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
        <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <input type="text" placeholder="Note" value={note} onChange={e => setNote(e.target.value)} />
        <div className="form-actions">
          <button className="btn" type="submit">Save</button>
          <button className="btn outline" type="button" onClick={() => nav("/expenses")}>Cancel</button>
        </div>
      </form>
    </main>
  );
}
