import express from "express"
import cloudinary from "cloudinary"
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")
const bodyparser = require("body-parser")
const fs = require("fs")
require('dotenv').config() 

const app = express()

cloudinary.config({
    cloud_name:process.env.Cloud_name,
    api_key:process.env.Cloud_key,
    api_secret:process.env.Cloud_Secret,
})
//db
mongoose.connect(process.env.DATABASE_URL , {})
.then(()=>console.log("Database Connected"))
.catch((error)=>console.log("Connection",error))
//API request
app.use(morgan("dev"))
//resolve Frontend and Backend
app.use(cors({
    origin: "*"
}));
//Request Limit
app.use(bodyparser.json({limit:"5mb"}))
//Routes
fs.readdirSync("./routes").map((r)=>app.use("/api", require(`./routes/${r}`)));

const port= process.env.PORT||8000;

app.listen(port, console.log(`SERVER IS RUNNING ON ${port}`));