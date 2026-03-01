const express = require('express');
const cors = require('cors');
const { dbConnect } = require('./db');
const router = require('./Router/albumRouter');

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use("/",router)

dbConnect()

app.listen(5000,()=>{
    console.log("running");
})