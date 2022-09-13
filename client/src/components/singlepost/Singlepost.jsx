import React from 'react'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './singlepost.css'
import axios from 'axios'
import { useState } from 'react'
import { useContext } from 'react'
import { Context } from '../../context/Context' 

export default function Singlepost() {
  const pf = "http://localhost:8800/images/"
  const location = useLocation()
  const path =location.pathname.split('/')[2]
  const [post,setpost] = useState([])
  const [title,settitle]=  useState("")
  const [desc,setdesc] = useState("")
  const [updatemode,setupdatemode] = useState("")
  useEffect(()=>{
    const getpost = async ()=>{
      const res = await axios.get('/posts/'+path);
      setpost(res.data)
      settitle(res.data.title)
      setdesc(res.data.desc)
      
    }
    getpost()
  },[path])
  console.log(path)
  const { user } = useContext(Context);
  const handledelete = async ()=>{
    try{
    await axios.delete(`/posts/${path}`,{
      data:{
      username:user.username
    }})
    window.location.replace('/')
  }
  catch(err){console.log(err)}
}
const handleupdate = async()=>{
  try{
    await axios.put(`/posts/${post._id}`,{
username:user.username,title,desc
    })
    window.location.replace(`/post/${post._id}`)
  }
  catch(err){}
}
  return (
    <div className='singlepost'>
        <div className="singlepostwrapper">
        {post.photo &&(
      <img src={pf+post.photo} alt="" className="postimg" />)}
            {updatemode? <input type="text" className='singleposttitleinput'  value={title} onChange={(e)=>settitle(e.target.value)}></input>:(

              <h1 className="singleposttitle">{post.title} 
            {post.username === user?.username &&(
              <div className="singlepostedit">
            
            <i className="singleposticon fa-solid fa-pen-to-square" onClick={()=>setupdatemode(true)}></i>
            <i className="singleposticon fa-solid fa-trash-can" onClick={handledelete}></i>
            </div>
            )}
            </h1>
              )}
            <div className="singlepostinfo">
                <span className='singlepostauthor'>Author: 
                <Link to={`/?user=${post.username}`}  style={{textDecoration:"none",color:"inherit"}}>
                <b>{post.username}</b>
                </Link>
                </span>
                
                <span className='singlepostdate'>{new Date(post.createdAt).toDateString()}</span>
            </div>
            {updatemode? <textarea className='singlepostdescinput' value={desc}  onChange={(e)=>setdesc(e.target.value)}></textarea>:(

              <p className="singlepostdesc">
                {post.desc}
            </p>
              )}
           { updatemode && <button className='singlepostbutton' onClick={handleupdate}>Update</button>}
        </div>
    </div>
  )
}
