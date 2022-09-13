import React from 'react'
import './post.css'
import {Link} from 'react-router-dom'
export default function Post({post}) {
  const pf = "http://localhost:8800/images/"
  return (
    <div className='Post'>
      {post.photo &&(
      <img src={pf+post.photo} alt="" className="postimg" />)}
      <div className="postinfo">
          <div className="postcats">
            {/* 
            <span className="postcat">Life</span> */}
            {
              post.categories.map(c=>(
<span className="postcat">{c.name}</span>
              ))
            }
          </div>
          <Link to={`/post/${post._id}`} style={{textDecoration:"none",color:"inherit"}}>

      <span className="posttitle">
       {post.title}
      </span>
          </Link>
      <hr />
      <span className="postdate">{new Date(post.createdAt).toDateString()}</span>

      </div>
      <div className="postdesc">
        {post.desc}
      </div>
    </div>
  )
}
