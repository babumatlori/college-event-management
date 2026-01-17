import React from 'react'
import './Auth.css'
import { useState ,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from './AuthContextPage'
const RegisterPage = () => {

  const[name, setName]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');

  const[role,setRole]=useState('USER');

  const {register}= useContext(AuthContext);
  const Navigate= useNavigate();

  const handleResg= async(e)=>{
    e.preventDefault();
    try{
      await register({name,email,password,role});
      alert("Register succes");
      Navigate('/login');
    }catch(err){
      alert(err.message)
    }

  }

  return (
    <div className='auth-container'>
      <h2>Register</h2>
      <form onSubmit={handleResg}>
        <input type="text"
          placeholder='full Name'
          value={name}
          onChange={(e)=>setName(e.target.value)} required />

         <input type="email"
          placeholder='Email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)} required />

         <input type="password"
          placeholder='password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)} required />

          <select value={role} onChange={(e)=>setRole(e.target.value)}>
            <option value="USER">Std</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button className="auth-btn" type='submit'>Register</button>
      </form>



    </div>
  )
}

export default RegisterPage
