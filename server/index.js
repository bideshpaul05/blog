import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authroute from './routes/auth.js'
import userRoute from './routes/users.js' 
import postRoutes from './routes/post.js' 
import categoryRoutes from './routes/categories.js' 
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
const app = express()

dotenv.config()
app.use(express.json())
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use("/images",express.static(path.join(__dirname,"/images")))

mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true, 
// useFindAndModify:true,
useUnifiedTopology: true 



})
.then(console.log("connected to mongo"))
.catch(err=> console.log(err))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null,req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });
app.use('/api/auth', authroute)
app.use('/api/users', userRoute)
app.use('/api/posts',postRoutes)
app.use('/api/categories',categoryRoutes)

app.listen(process.env.PORT,()=>{
    console.log("server is listening on port 8800")
})