import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const { signup } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await signup(name, email, pass);
    if (res.ok) {
      setMsg("Signup successful. Please login.");
      setTimeout(() => nav("/login"), 1000);
    } else setMsg(res.message || "Signup failed");
  };

  return (
    <main className="container auth-card small">
      <h2>Create account</h2>
      {msg && <div className="alert">{msg}</div>}
      <form onSubmit={submit} className="form">
        <input required type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
        <input required type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input required type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} />
        <button className="btn">Sign up</button>
      </form>
    </main>
  );
}
