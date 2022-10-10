/* -------------------------------------------------------- IMPORT EXPRESS MODULE ------------------------------------------------------- */
const express = require("express")
const server = express()
const cors = require("cors")
const corsOption = require("./config/corsOption")
const credential = require("./middleWares/credential")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const path = require('path')
const connectDB = require("./config/db")
require("dotenv").config({path: path.resolve(__dirname,'./.env')})

connectDB()
server.use(credential)
server.use(cors(corsOption))

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

/* --------------------------------------------------------- result router crude -------------------------------------------------------- */
const ResultRouter = require("./router/resultRouter")
server.use('/result',ResultRouter)

const verifyAuthentication = require("./middleWares/Authmiddlewares")
server.use(verifyAuthentication)

/* ----------------------------------------------------- Student Class router crude ----------------------------------------------------- */
const StudentClassRouter = require("./router/studentClassRouter")
server.use('/class',StudentClassRouter)

/* -------------------------------------------------------- student router crude -------------------------------------------------------- */
const studentRouter = require("./router/studentRouter")
server.use('/student',studentRouter)


/* -------------------------------------------------------- subject router crude -------------------------------------------------------- */
const subjectRouter = require("./router/subjectRouter")
server.use('/subject',subjectRouter)

/* ---------------------------------------------- student subject combination router crude ---------------------------------------------- */
const comboRouter = require("./router/stdSubComboRouter")
server.use('/combo',comboRouter)



/* ------------------------------------------------------ total count router crude ------------------------------------------------------ */
const totalCountRouter = require("./router/totalCountRouter")
server.use('/total',totalCountRouter)




server.listen(port,()=>{
    console.log("this yaaya server is running")
})