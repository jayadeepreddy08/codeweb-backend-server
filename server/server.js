require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors'); 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://codeweb-front-client.onrender.com/");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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