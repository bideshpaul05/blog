import React, { useContext, useRef } from 'react'
import { Context } from '../../context/Context'
import './login.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default function Login() {
  const userRef = useRef()
  const passwordRef = useRef()
  const {dispatch, isFetching}  = useContext(Context) 
  const handlesubmit = async (e)=>{
    e.preventDefault()
    dispatch({type:"loginstart"})
    try{
      const res  =  await axios.post("/auth/login",{
        username: userRef.current.value,
        password: passwordRef.current.value
      })
      dispatch({type:"loginsuccess",payload:res.data})
      window.location.replace("/")

    } 
    catch(err)
    {
      dispatch({type:"loginfailure"})
    } 
  }

  return (
    <div className="login">
    <span className="logintitle">Login</span>
    <form className="loginform" onSubmit={handlesubmit}>
      <label>Username</label>
      <input className="logininput" type="text" placeholder="Enter your username..." ref={userRef} />
      <label>Password</label>
      <input className="logininput" type="password" placeholder="Enter your password..." ref={passwordRef}/>
      <button className="loginbutton" type="submit" disabled={isFetching}>Login</button>
    </form>
      <button className="loginregisterbutton">
        <Link to="/register"style={{textDecoration:"none",color:"inherit"}}>
        Register
        </Link>
        
        </button>
  </div>
  )
}
