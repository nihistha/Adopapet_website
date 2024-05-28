//imported according to the process
const express = require('express'); 
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const connectDB = require('./database/database');
const cors = require("cors");
const fileUpload = require('express-fileupload')

//creating an express app
const app = express();

//Json config
app.use(express.json());

app.use(fileUpload());

const corsOptions = {
    origin: true,
    credentials : true,
    optionSuccessStatus : 200
} 
app.use(cors(corsOptions));

dotenv.config();

//connecting to the database
connectDB();

//defining a port
const PORT = process.env.PORT

//creating a test route or endpoint
app.get('/test',(req,res)=>{
    res.end("Test Api is working")
})

//CREATE USER API
app.use('/api/user',require('./routes/user_routes'))

//creating the server
app.listen(PORT,()=>{
    console.log(`Server is running on port server ${PORT}`  )
})