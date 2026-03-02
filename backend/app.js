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

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("running on" + PORT);
})