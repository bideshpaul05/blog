import React, { useContext } from 'react'
import './Topbar.css'
import {Link} from "react-router-dom"
import { Context } from '../../context/Context'
export default function Topbar() {
  const pf = "http://localhost:8800/images/"

  const {user,dispatch} = useContext(Context)
  const handlelogout = ()=>{
    dispatch({type:"logout"})
  }
  return (
    <div className='top'>
        <div className="topleft">
          <i className="topicon fa-brands fa-square-facebook"></i>
        <i className="topicon fa-brands fa-square-twitter"></i>
        <i className="topicon fa-brands fa-square-pinterest"></i>
        <i className="topicon fa-brands fa-square-instagram"></i>
        </div>
        <div className="topcenter">
            <ul className='toplist'>
                <li className='toplistitem'>
                   
                  <Link to='/'style={{textDecoration:"none",color:"inherit"}}>HOME</Link> 
                  </li>
                <li className='toplistitem'> <Link to='/about' style={{textDecoration:"none",color:"inherit"}}>ABOUT</Link> </li>
                <li className='toplistitem'> <Link to='/contact' style={{textDecoration:"none",color:"inherit"}}>CONTACT</Link> </li>
                <li className='toplistitem'> <Link to='/write' style={{textDecoration:"none",color:"inherit"}}>WRITE</Link> </li>
                <li className='toplistitem' onClick={handlelogout}> {user&&"LOGOUT"} </li>
            </ul>
        </div>
        <div className="topright">
          {
            user?(
              <Link to="/settings">
            <img src={pf+user.profilepic} className="topimage"alt="" />
              </Link>
            ):(
           <ul className="toplist">
            <li className='toplistitem'>

           <Link to='/login' style={{textDecoration:"none",color:"inherit"}}>Login</Link>
            </li>
            <li className='toplistitem'>

            <Link to='/register' style={{textDecoration:"none",color:"inherit"}}>Register</Link> 
            </li>
           </ul>
            )
          }
            <i className="fa-solid fa-magnifying-glass topsearchicon"></i>

        </div>

    </div>
  )
}
