import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./sidebar.css";

export default function Sidebar() {
  const [cat,setcat]= useState([])
  useEffect(()=>{
    const getcat = async ()=>{
      const res = await axios.get('/categories')
      setcat(res.data)
    }
    getcat()
  },[])
  const pf = "http://localhost:8800/images/"

  const {user} = useContext(Context)
  return (
    <div className="sidebar">
      <div className="sidebaritem">
        <span className="sidebartitle">ABOUT ME</span>
        <img
          src={user?pf+user.profilepic :""}
          alt=""
          srcSet=""
       className="profileimg" />
        <p className="sidebardesc">
        {user?user.description:""}
        </p>
      </div>
      <div className="sidebaritem">
        <span className="sidebartitle">CATEGORIES</span>
        <ul className="sidebarlist">
          {
            cat.map(c=>(
              <Link to = {`/?cat=${c.name}`}  style={{textDecoration:"none",color:"inherit"}}>
                
              <li className="sidebarlistitem">{c.name}</li>
              </Link>
            ))
           
          }
        </ul>
        
      </div>
      <div className="sidebaritem">
        <span className="sidebartitle">FOLLOW US</span>
        <div className="sidebarsocial">
        <i className="sidebaricon fa-brands fa-square-facebook"></i>
        <i className="sidebaricon fa-brands fa-square-twitter"></i>
        <i className="sidebaricon fa-brands fa-square-pinterest"></i>
        <i className="sidebaricon fa-brands fa-square-instagram"></i>
        </div>
        
        
      </div>
    </div>
  );
}
