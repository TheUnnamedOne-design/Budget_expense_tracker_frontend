import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/api"; // updated import
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [msg, setMsg] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      if (!user?.id) return;
      const p = await getProfile(user.id);
      if (p) setProfile({ name: p.name, email: p.email });
    })();
  }, [user]);

  const save = async (e) => {
    e?.preventDefault();
    if (!user?.id) {
      alert("User not logged in");
      return;
    }
    const p = await updateProfile(user.id, profile);
    if (p) {
      setMsg("Saved");
      setTimeout(() => setMsg(""), 2000);
    }
  };

  return (
    <main className="container">
      <h2>Profile</h2>
      {msg && <div className="alert">{msg}</div>}
      <form className="form" onSubmit={save}>
        <input value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} placeholder="Name" />
        <input value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} placeholder="Email" />
        <button className="btn">Save</button>
      </form>
    </main>
  );
}
