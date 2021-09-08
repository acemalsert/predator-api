const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const helmet = require('helmet')
const dotenv = require('dotenv')

const authRouter = require('./routes/auth')
const usersRouter = require('./routes/user')
const forumRouter = require('./routes/forum')
const newsRouter = require('./routes/news')

const app = express()

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('Connected to the database')
})

//req->middleware->res
app.use(express.json())
app.use(helmet())
app.use(morgan("dev"))
app.use(express.static('uploads'))
app.use('/api/auth',authRouter)
app.use('/api/users',usersRouter)
app.use('/api/forums',forumRouter)
app.use('/api/news',newsRouter)
let port = process.env.PORT

app.listen(port,()=>{
    console.log('Server is runnig on port 5000...')
})