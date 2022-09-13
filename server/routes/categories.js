import { Router } from "express";
import bcrypt from "bcrypt"
import User from '../models/User.js'
import Post from '../models/Post.js'
import Cat from '../models/Category.js'

const router = Router();


router.post('/',async (req,res)=>{
  const newcat = new Cat(req.body)
  try{
    const savedcat = await  newcat.save()
    res.status(200).json(savedcat)
  }
  catch(err)
  {
    res.send(500).json(err)
  }
 
})
router.get('/',async (req,res)=>{
    // const cat =  Cat.df(req.body)
    try{
      const cat = await Cat.find()
      res.status(200).json(cat)
    }
    catch(err)
    {
      res.send(500).json(err)
    }
   
  })

export default router