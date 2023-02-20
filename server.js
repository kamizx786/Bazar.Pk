import express from "express"
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")
const bodyparser = require("body-parser")
const fs = require("fs")
require('dotenv').config() 

const app = express()

//db
mongoose.connect(process.env.DATABASE_URL , {})
.then(()=>console.log("Database Connected"))
.catch((error)=>console.log("Coneection Error",error))
//API request
app.use(morgan("dev"))
//resolve Frontend and Backend
app.use(cors({
    origin:"http://localhost:3000"
}))
//Request Limit
app.use(bodyparser.json({limit:"5mb"}))
//Routes
fs.readdirSync("./routes").map((r)=>app.use("/api", require(`./routes/${r}`)));

const port= process.env.PORT||8000;

app.listen(port, console.log(`SERVER IS RUNNING ON ${port}`));