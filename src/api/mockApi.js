// src/api/mockApi.js
const STORAGE_KEY = "et_data_v1";
function readStore() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const init = { users: [], sessions: {}, expenses: [], budgets: [] };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(init));
    return init;
  }
  return JSON.parse(raw);
}
function writeStore(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
function id() { return Math.random().toString(36).slice(2, 9); }

/* Auth */
export async function signup({ name, email, password }) {
  const s = readStore();
  if (s.users.find(u => u.email === email)) return { ok: false, message: "Email already exists" };
  const user = { id: id(), name, email, password };
  s.users.push(user);
  writeStore(s);
  return { ok: true, user: { id: user.id, name: user.name, email: user.email } };
}
export async function login({ email, password }) {
  const s = readStore();
  const user = s.users.find(u => u.email === email && u.password === password);
  if (!user) return { ok: false, message: "Invalid credentials" };
  const token = id();
  s.sessions[token] = { userId: user.id };
  writeStore(s);
  return { ok: true, token, user: { id: user.id, name: user.name, email: user.email } };
}
export async function reset({ email }) {
  const s = readStore();
  const user = s.users.find(u => u.email === email);
  if (!user) return { ok: false, message: "No such email" };
  return { ok: true, message: "Reset link (demo) sent" };
}

/* Expenses */
export async function listExpenses() { const s = readStore(); return s.expenses; }
export async function createExpense(exp) { const s = readStore(); const e = { ...exp, id: id() }; s.expenses.push(e); writeStore(s); return e; }
export async function updateExpense(id_, data) { const s = readStore(); const idx = s.expenses.findIndex(x => x.id === id_); if (idx === -1) return null; s.expenses[idx] = { ...s.expenses[idx], ...data }; writeStore(s); return s.expenses[idx]; }
export async function deleteExpense(id_) { const s = readStore(); s.expenses = s.expenses.filter(x => x.id !== id_); writeStore(s); return true; }

/* Budgets */
export async function listBudgets() { const s = readStore(); return s.budgets; }
export async function createBudget(b) { const s = readStore(); const nb = { ...b, id: id() }; s.budgets.push(nb); writeStore(s); return nb; }
export async function updateBudget(id_, data) { const s = readStore(); const idx = s.budgets.findIndex(x => x.id === id_); if (idx === -1) return null; s.budgets[idx] = { ...s.budgets[idx], ...data }; writeStore(s); return s.budgets[idx]; }
export async function deleteBudget(id_) { const s = readStore(); s.budgets = s.budgets.filter(x => x.id !== id_); writeStore(s); return true; }

/* Profile */
export async function getProfile() { const s = readStore(); return s.users[0] || null; }
export async function updateProfile(data) { const s = readStore(); if (!s.users[0]) return null; s.users[0] = { ...s.users[0], ...data }; writeStore(s); return s.users[0]; }

/* Reports */
export async function summary() {
  const s = readStore();
  const income = s.expenses.filter(e => e.type === "income").reduce((a, b) => a + Number(b.amount), 0);
  const expense = s.expenses.filter(e => e.type === "expense").reduce((a, b) => a + Number(b.amount), 0);
  const balance = income - expense;
  return { income, expense, balance };
}
