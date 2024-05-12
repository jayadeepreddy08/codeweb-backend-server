require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors'); 

app.use(cors({
    origin: 'https://codeweb-front-client.onrender.com/'// Allow requests only from this origin
    
  }));

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("connected to Database"))

app.use(express.json())


const blogRouter = require('./routes/blog')
app.use('/blog', blogRouter)

const leetRouter = require('./routes/leetSolutions')
app.use('/leet',leetRouter)

app.listen(5000, () => console.log("Server started"))