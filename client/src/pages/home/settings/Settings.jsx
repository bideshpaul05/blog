import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./settings.css";

import { Context } from "../../../context/Context";
export default function Settings() {
  const [file, setfile] = useState(null);
  const [username, setusername] = useState('');
  const [desc, setdesc] = useState('');

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [success, setsuccess] = useState(false);
  const pf = "http://localhost:8800/images/"

  const {user,dispatch} = useContext(Context)

  const handlesubmit = async (e) => {
  e.preventDefault()
  dispatch({type:"updatestart"})
    const updatedUser = {
      userId: user._id,
    }
    if(username!=='')
    {
      updatedUser.username = username
    }
    if(email!=='')
    {
      updatedUser.email = email
    }
    if(password!=='')
    {
      updatedUser.password = password
    }
    if(desc!=='')
    {
      updatedUser.description = desc
    }
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilepic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
       
      }
    }
    try {
      const res = await axios.put("/users/"+user._id, updatedUser);
      // alert("data updated successfully")
      setsuccess(true);
      dispatch({type:"updatesuccess",payload:res.data})

    } catch (err) {
      console.log(err);
      dispatch({type:"updatefailure"})
    }
  };
  return (
    <div className="settings">
      <div className="settingswrapper">
        <div className="settingstitle">
          <div className="settingsupdatetitle">Update your account</div>
          <div className="settingsupdatetitle" style={{ cursor: "pointer" }}>
            Delete Account
          </div>
        </div>
        <form action="" className="settingsform"  onSubmit={handlesubmit}>
          <label htmlFor="">Profile Picture</label>
          <div className="settingsprofilepicture">
            <img src={file ? URL.createObjectURL(file) : pf+user.profilepic} alt="" />
            <label htmlFor="fileinput">
              <i className="settingsprofilepictureicon fa-solid fa-user"></i>
            </label>
            <input type="file" id="fileinput" style={{ display: "none" }} onChange={(e) => setfile(e.target.files[0])} />
          </div>
          <label htmlFor="">Username</label>
          <input type="text" placeholder= {user.username} onChange={e=>setusername(e.target.value)} />
          <label htmlFor="">Email</label>
          <input type="email" placeholder={user.email} onChange={e=>setemail(e.target.value)}/>
          <label htmlFor="">Password</label>
          <input type="password" placeholder="password" onChange={e=>setpassword(e.target.value)}/>
          <label htmlFor="">About Me</label>
          <input type="text" placeholder= {user.description} onChange={e=>setdesc(e.target.value)} />
          <button className="settingssubmit" type="submit">
            Update
          </button>
          {success && <span style={{color:"green",textAlign:"center",marginTop:"20px"}}>Profile has been updated</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
