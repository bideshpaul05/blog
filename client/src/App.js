import logo from './logo.svg';
import './App.css';
import Topbar from './components/topbar/Topbar';
import Home from './pages/home/Home';
import Single from './pages/home/single/Single';
import Write from './pages/home/write/Write';
import Settings from './pages/home/settings/Settings';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from 'react';
import { Context } from './context/Context';
function App() {
 
 const {user} = useContext(Context)
  return (
    <>
    <Router>

   <Topbar/>
   <Routes>
   <Route path="/" element={<Home />}/>
   <Route path="/register" element={user?<Home/>:<Register />}/>
   <Route path="/login" element={<Login />}/>
   <Route path="/settings" element={user?<Settings />:<Home/>}/>
   <Route path="/write" element={user?<Write />:<Home/>}/>
   <Route path="/post/:id" element={<Single />}/>
     </Routes>
     </Router>
    </>
  );
}

export default App;
