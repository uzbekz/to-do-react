import express from 'express'
import User from './models/Users'
import Task from './models/Task.js'
import cors from 'cors'
import { authenticate } from './middleware/auth'
import User from './models/Users.js'
import bcypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SECRET = "my_super_secret_key";
const app = express()

app.use(cors())
app.use(express.json())

app.post('/login', async (req,res) => {
  try{
    const {email, password} = req.body

    const user = await User.findOne({
      where : {
        email
      }
    })

    if(!user){
      return res.status(404).json({message : "user not found"})
    }

    const valid = bcypt.compare(password, user.password_hash)
    if(!valid){
      return res.status(401).json({message : "invalid credentials"})
    }

    const token = jwt.sign({id : user.id, email: user.email}, SECRET, { expiresIn: '1h' })

    res.status(200).json({message : "login success", token})
  }catch(err){
    res.status(500).json({message : "error"})
  }
})





app.post('/register', async (req,res) => {
  try{
    const {email, password} = req.body
    const user = await User.findOne({
      where : {
        email
      }
    })

    if(user){
      return res.status(409).json({message : "user already exists"})
    }

    const hashedPassword = await bcypt.hash(password, 10)
    const obj = await User.create({
      email,
      password_hash : hashedPassword
    })
    res.status(201).json({message : "registered successfully"})
  }catch(err){
    res.status(500).json({message : "error"})
  }
})

app.get('/tasks' ,authenticate ,async (req, res) => {
  const user_id = req.user.id
  try{
    const tasks = await Task.findAll({ where : {user_id}})
    req.json(tasks)
  }catch(err){
    return res.status(500).json({message : "couldn't find the tasks"})
  }
})

app.delete('/tasks/:id' , authenticate , async (req, res) => {
  try{
    const id = Number(req.params.id)
    const user_id = req.user.id
    const deleted = await Task.destroy({where : {id,user_id}})

    if(!deleted){
      return res.status(404).json({message : "no task was found to delete"})
    }

    req.json({message : "deleted tasks"})
  }catch(err){
    return res.status(500).json({message : "couldn't delete the tasks"})
  }
})

app.put('/tasks/:id', authenticate, async (req,res) => {
  try{
    const id = Number(req.params.id)
    const {task, date} = req.body
    const [updated] = await Task.update({task, date}, {
      where : {
        id,
        user_id : req.user.id
      }
    })

    if (!updated) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.json({ message: 'Task updated' })
  }catch(err){
    res.status(500).json({message : "the sequelize method failed"})
  }
})

app.patch('/tasks/:id/completed', authenticate, async (req,res) => {
  try{
    const id = Number(req.params.id)
    const completed = req.body.completed
    const [updated] = await Task.update({completed : true}, {
      where : {
        id,
        user_id : req.user.id
      }
    })

    if(!updated){
      return res.status(404).json({message : "data not found"})
    } 

    res.json({message : "the task has been updated"})
  }catch(err){
    res.status(500).json({message : "the sequelize method failed"})
  }
})

app.get('/history', authenticate, async (req,res) => {
  try{
    const completedTask = await Task.findAll({completed  : true},{
      where : {
        user_id : req.user.id,
      }
    })

    if(!completedTask){
      return res.status(404).json({message : "user has no completed tasks"})
    }
  }catch(err){
    res.status(500).json({message : "the sequelize method failed"})
  }
})

app.listen(5000, () =>{
  console.log('server is listening on port 5000')
})