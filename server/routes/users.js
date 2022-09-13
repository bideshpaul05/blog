import { Router } from "express";
import bcrypt from "bcrypt"
import User from '../models/User.js'
import Post from '../models/Post.js'
const router = Router();


router.put('/:id',async (req,res)=>{
    if(req.body.userId === req.params.id){
        if(req.body.password)
        {
            const salt = bcrypt.genSaltSync(10);
            req.body.password = bcrypt.hashSync(req.body.password,salt)
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,
             {  $set:req.body}
            ,{new:true})

            
            res.status(200).json(updatedUser)
        }
        catch(err){
            console.log(req)
            console.log("error hocche")
            console.log( err)
            res.status(500).json(err)
        }
    }
    else{
        res.status(401).json("You can update only your account")
    }
 
})
router.delete('/:id',async (req,res)=>{
    if(req.body.userId===req.params.id)
    {
        try{
            const user= await User.findById(req.params.id)
            try{
            await Post.deleteMany({username:user.username})
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Account deleted successfully")
            }
            catch(err){
                res.status(500).json(err)
            }

        }
        catch(err){
            res.status(404).send("user not found")
        }
    }
    else res.status(401).json("Action can not be performed")
})
router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });
export default router