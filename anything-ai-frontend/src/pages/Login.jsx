import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/login", { email, password });
      console.log("user logged in")
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
      <h2>Login</h2>
      <form style={{
        border: '1px solid black',
        padding: '30px'
      }} onSubmit={handleLogin}>
        <input style={{
          padding: '8px',
          margin: '4px',
          border: 'none'
        }} placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />

          <br />
          <br />

        <input style={{
          padding: '8px',
          margin: '4px',
          border: 'none'
        }} placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        
          <br />
          <br />

        <button style={{
          padding: '10px 30px 10px 30px',
          backgroundColor: 'blue'
        }} type="submit">Login</button>
      </form>
      {error && <p style={{color:"red"}}>{error}</p>}
    </div>
  );
}
