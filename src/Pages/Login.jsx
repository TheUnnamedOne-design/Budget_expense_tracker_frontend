import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    const res = await login(email, pass);
    if (res.ok) nav("/dashboard");
    else setErr(res.message || "Login failed");
  };

  return (
    <main className="container auth-card">
      <div className="auth-left">
        <h1>Welcome back</h1>
        <p>Manage your finances, track expenses and plan budgets effortlessly.</p>
      </div>
      <div className="auth-right">
        <h2>Login</h2>
        {err && <div className="alert">{err}</div>}
        <form onSubmit={submit} className="form">
          <input required type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input required type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} />
          <button className="btn">Login</button>
        </form>
        <p className="muted">Don't have an account? <Link to="/signup">Sign up</Link></p>
        <p className="muted"><Link to="/reset">Forgot password?</Link></p>
      </div>
    </main>
  );
}
