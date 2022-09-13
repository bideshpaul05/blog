import React from 'react'
import Header from '../../components/header/Header'
import './home.css'
import Sidebar from '../../components/sidebar/Sidebar'
import Posts from '../../components/post/Posts'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
export default function Home() {
  const [posts,setposts]= React.useState([])
  const {search} = useLocation()
  // console.log(location)
  React.useEffect(()=>{
   const fetchposts=  async ()=>{
    const res = await axios.get('/posts' + search)
    setposts(res.data)
    console.log(res.data)
   }
   fetchposts()
  },[])
  return (
    <>
        <Header/>
    <div className='home'>
      <Posts posts={posts}/>
      <Sidebar/>
    </div>
    </>
  )
}
