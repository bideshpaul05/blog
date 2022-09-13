import React from "react";
import { useState } from "react";
import "./register.css";
import axios from "axios";
// import res from "express/lib/response";
import { Link } from "react-router-dom";
export default function Register() {
  
  const [ username, setusername ] = useState("");
  const [ password, setpassword ] = useState("");
  const [ email, setemail ] = useState("");
  const [ error, seterror ] = useState(false);
  const handlesubmit= async (e)=>{
    e.preventDefault()
    try{
    const res = await axios.post('auth/register',{
      username,
      email,
      password
    })
    res.data && window.location.replace('/login')
  }
  catch(err){
    console.log(err)
    seterror(true)
  }
  }
  return (
    <div className="register">
      <span className="registertitle">Register</span>
      <form className="registerform" onSubmit={handlesubmit}>
        <label>Username</label>
        <input
          className="registerinput"
          type="text"
          placeholder="Enter your username..."
          onChange={e=>setusername(e.target.value)}
        />
        <label>Email</label>
        <input
          className="registerinput"
          type="text"
          placeholder="Enter your email..."
          onChange={e=>setemail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="registerinput"
          type="password"
          placeholder="Enter your password..."
          onChange={e=>setpassword(e.target.value)}
        />
        <button className="registerbutton" type="submit">Register</button>
      </form>
      <button className="registerloginbutton">  <Link to="/login"style={{textDecoration:"none",color:"inherit"}}>
        Login
        </Link></button>
      {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong</span>}
    </div>
  );
}
