import { Router } from "express";
import bcrypt from "bcrypt"
import User from '../models/User.js'
import Post from '../models/Post.js'
const router = Router();


router.post('/',async (req,res)=>{
  const newpost = new Post(req.body)
  try{
    const savedpost = await  newpost.save()
    res.status(200).json(savedpost)
  }
  catch(err)
  {
    res.send(500).json(err)
  }
 
})
router.put("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
router.delete('/:id',async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
          try {
            await post.delete()
            res.status(200).json("Post deleted successfully");
          } catch (err) {
            res.status(500).json(err);
          }
        } else {
          res.status(401).json("You can delete only your post!");
        }
      } catch (err) {
        res.status(500).json(err);
      }
})
router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
    
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });
router.get('/', async (req, res) => {
    const username = req.query.user;
    const category = req.query.cat;

    try {
      let posts;
      if(username)
      {
        posts = await Post.find({username})

      }
      else if(category)
      {
        posts = await Post.find({categories:{
            $in:[category]
        }})
      }
      else{
        posts = await Post.find()
      }
    
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });
export default router