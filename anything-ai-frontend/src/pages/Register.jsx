import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      console.log(username, email, password, API.defaults.baseURL)
      const res = await API.post("/auth/register", { username, email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log(err.message)
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{
      backgroundColor: 'cyan',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: "column",
      alignItems:"center",
      textAlign:'center',
      paddingTop: '180px'
    }} >
      <h2>Register</h2>
      <form style={{
        border: '1px solid black',
        padding: '30px',
        display:'flex',
        flexDirection: 'column',
        gap: '8px'
      }} onSubmit={handleRegister}>
        <input style={{
          padding: '8px',
          margin: '4px',
          border: 'none'
        }} placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
        <input style={{
          padding: '8px',
          margin: '4px',
          border: 'none'
        }} placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input style={{
          padding: '8px',
          margin: '4px',
          border: 'none'
        }} placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button style={{
          padding: '10px 30px 10px 30px',
          backgroundColor: 'blue'
        }} type="submit">Register</button>
      </form>
      {error && <p style={{color:"red"}}>{error}</p>}
    </div>
  );
}
