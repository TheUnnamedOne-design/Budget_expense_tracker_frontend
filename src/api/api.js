const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

console.log('🔗 Backend URL:', backendUrl);
/* AUTH */


export async function signup({ name, email, password }) {
  const res = await fetch(`${backendUrl}/apiauthsignup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return await res.json();
}

export async function login({ email, password }) {
  const res = await fetch(`${backendUrl}/apiauthlogin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return await res.json();
}

export async function reset(email) {
  const res = await fetch(`${backendUrl}/apiauthreset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return await res.json();
}

/* EXPENSES */

export async function listExpenses(userId) {
  const res = await fetch(`${backendUrl}/apiexpenses?userId=${userId}`);
  return await res.json();
}

export async function createExpense(data) {
  const res = await fetch(`${backendUrl}/apiexpenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function updateExpense(id, data) {
  const res = await fetch(`${backendUrl}/apiexpenses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function deleteExpense(id) {
  const res = await fetch(`${backendUrl}/apiexpenses/${id}`, {
    method: "DELETE",
  });
  return await res.json();
}

/* BUDGETS */

export async function listBudgets(userId) {
  const res = await fetch(`${backendUrl}/apibudgets?userId=${userId}`);
  return await res.json();
}

export async function createBudget(data) {
  const res = await fetch(`${backendUrl}/apibudgets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function updateBudget(id, data) {
  const res = await fetch(`${backendUrl}/apibudgets/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function deleteBudget(id) {
  const res = await fetch(`${backendUrl}/apibudgets/${id}`, {
    method: "DELETE",
  });
  return await res.json();
}

/* PROFILE */

export async function getProfile(userId) {
  const res = await fetch(`${backendUrl}/apiprofile?userId=${userId}`);
  return await res.json();
}

export async function updateProfile(id, data) {
  const res = await fetch(`${backendUrl}/apiprofile/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

/* REPORTS */

export async function summary(userId) {
  const res = await fetch(`${backendUrl}/apireports?userId=${userId}`);
  return await res.json();
}

export async function getReport(userId) {
  return summary(userId);
}