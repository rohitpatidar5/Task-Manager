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


// schema  for tasks

const Task = mongoose.model('Task', {
    name: {
         type: String, 
         required: true 
        },
    completed: {
         type: Boolean, 
         default: false 
        },
});

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


  //logout

  app.get('/api/logout', async (req, res, next) => {
    try {
      res.clearCookie('access_token');
      res.status(200).json('User has been logged out!');
    } catch (error) {
      next(error);
    }
  });



// all the task manger ralted routes



// Get all tasks
app.get('/api/tasks', async (req, res) => {
    try {
      const tasks = await Task.find().sort({ completed: 1 });
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  });


// Add a new task
app.post('/api/tasks', async (req, res) => {
    try {
      const task = new Task({ name: req.body.name });
      await task.save();
      res.json(task);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create task' });
    }
  });


// Toggle task completion
app.put('/api/tasks/:id', async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      task.completed = !task.completed;
      await task.save();
      res.json(task);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update task' });
    }
  });


// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.json({ message: 'Task deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  });




  // Delete all tasks
app.delete('/api/tasks', async (req, res) => {
    try {
      await Task.deleteMany();
      res.json({ message: 'All tasks deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete tasks' });
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
  