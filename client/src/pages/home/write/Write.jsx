import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Context } from "../../../context/Context";
import "./Write.css";
export default function Write() {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [file, setfile] = useState(null);
  const { user } = useContext(Context);
  const handlesubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="write">
      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt=""
          srcSet=""
          className="writeimage"
        />
      )}
      <form action="" className="writeform" onSubmit={handlesubmit}>
        <div className="writeformgroup">
          <label htmlFor="fileinput">
            <i className=" writeicon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileinput"
            style={{ display: "none" }}
            onChange={(e) => setfile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="title"
            className="writeinput"
            autoFocus={true}
            onChange={e=>settitle(e.target.value)}
          />
        </div>
        <div className="writeformgroup">
          <textarea
            className="writeinput writetext"
            placeholder="tell your story"
            id=""
            onChange={e=>setdesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writesubmit" type="submit" >
          Publish
        </button>
      </form>
    </div>
  );
}
