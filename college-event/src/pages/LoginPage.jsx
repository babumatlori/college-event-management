import React, { useContext, useState } from 'react'
import './Auth.css'
import AuthContext from './AuthContextPage';
import {Link, useNavigate } from "react-router-dom";

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  // const location = useLocation();

  const handleLogon = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ email, password });
      alert(`Welcome back, ${user.name}!`);
      navigate("/");
    } catch (err) {
      alert(err.message);
      navigate('/register')
    }
  };

  return (
    <div className='auth-container'>
      <h2>Login</h2>
      <form onSubmit={handleLogon}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        <button className="auth-btn" type="submit">Login</button>
      </form>
    <Link to={"/register"} className='registe-btn' ><p>Register</p></Link>
    </div>
  )
}

export default LoginPage
