import React, { useState } from "react";
import { reset } from "../api/api"; // updated import

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await reset(email);
    setMsg(res.message || "Request processed");
  };

  return (
    <main className="container auth-card small">
      <h2>Reset password</h2>
      {msg && <div className="alert">{msg}</div>}
      <form onSubmit={submit} className="form">
        <input required type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <button className="btn">Request reset</button>
      </form>
    </main>
  );
}
