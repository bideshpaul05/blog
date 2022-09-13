import mongoose from "mongoose";
const PostSchema = mongoose.Schema({
  title:{
    type:String,
    required:true,

  }
  ,
  desc:{
    type:String,
    required:true
  },
  photo:{
    type:String,

  },
  username:{
    type:String,
    required:true
  },
  categories:{
    type:Array,
    required:false
  }

},{timestamps:true})
export default mongoose.model("Post",PostSchema)