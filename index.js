//imported according to the process
const express = require('express'); 
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const connectDB = require('./database/database');

//creating an express app
const app = express();

//Json config
app.use(express.json());

dotenv.config();

//connecting to the database
connectDB();

//defining a port
const PORT = process.env.PORT

//CREATE USER API
app.use('/api/user',require('./routes/user_routes'))

//creating the server
app.listen(PORT,()=>{
    console.log(`Server is running on port server ${PORT}`  )
})