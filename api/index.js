import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cors from 'cors'
dotenv.config();



const app = express()
app.use(express.json());
app.use(cors())

//Database connection with MongoDB
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Connected to MongoDB!')
}).catch((err)=>{
    console.log(err)
})



//schema creating for user model

const Users = mongoose.model('Users',{
    username:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
},

);

const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
  };



app.post('/api/signup', async (req,res) =>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        return res.status(400).json({ error: 'Usernmae, email and password are required'});
    }

    const hashedPassword = await bcrypt.hashSync(password, 10);
    const newUser = new Users({ username, email, password:hashedPassword });
    try {
        await newUser.save();
        res.status(201).json('User created successfully!');
    } catch (error){
        console.log(error.message)
    }
})




//signin
app.post('/api/', async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await Users.findOne({ email });
      if (!validUser) return next(errorHandler(404, 'User not found!'));
      const validPassword = bcrypt.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
      const token = jwt.sign({ email: Users.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      const { password: pass, ...rest } = validUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
  });


// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })

app.listen(8000, () => console.log('Server running on port 8000'));



//middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });
  