/* -------------------------------------------------------- IMPORT EXPRESS MODULE ------------------------------------------------------- */
const express = require("express")
const server = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const path = require('path')
const connectDB = require("./config/db")
require("dotenv").config({path: path.resolve(__dirname,'./.env')})

connectDB()

const port = process.env.port
server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())
server.use(cookieParser())



server.get('/',(req,res)=>{
    res.send("this is the server side")
})

/* --------------------------------------------------------- Admin router crude --------------------------------------------------------- */
const AdminRouter = require("./router/AdminRouter")
server.use('/admin',AdminRouter)

/* ----------------------------------------------------- Student Class router crude ----------------------------------------------------- */
const StudentClassRouter = require("./router/studentClassRouter")
server.use('/class',StudentClassRouter)

/* -------------------------------------------------------- student router crude -------------------------------------------------------- */
const studentRouter = require("./router/studentRouter")
server.use('/student',studentRouter)


/* -------------------------------------------------------- subject router crude -------------------------------------------------------- */
const subjectRouter = require("./router/subjectRouter")
server.use('/subject',subjectRouter)

server.listen(port,()=>{
    console.log("this yaaya server is running")
})