const bcrypt = require("bcrypt")
const Admin = require('../models/AdminModel')
const jwt = require("jsonwebtoken")


exports.registerAdmin = async(req,res) =>{
    if(!(req.body.fullname || req.body.username || req.body.password)) return res.status(400).json({error:"data not properly formatted"})

    const {fullname,username,password} = req.body

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password,salt)
        const createAdmin = await Admin.create({
            fullname,
            username,
            password: hashedPass
        })

        res.json(createAdmin)
        
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.loginAdmin = async(req,res)=>{
    if(!(req.body.username || req.body.password)) return res.status(400).json({error:"data not formatted properly"})

    const {username,password} = req.body

    try {
        const admin = await Admin.findOne({username})
        if(admin){
            const validatePass = await bcrypt.compare(password,admin.password)
            if(!validatePass) return res.status(401).json("incorrect password please retry")
        }

        const accessToken = jwt.sign({_id:admin._id, username:admin.username}, process.env.ACCESS_JWT_SECRET,{expiresIn: "10m"})
        const refreshToken = jwt.sign({_id: admin._id, username: admin.username}, process.env.REFRESH_JWT_SECRET,{expiresIn: "24h"})

        const storeRefreshToken = await Admin.updateOne(
            {username},
            {$set: {refreshToken}}
        )

        const refreshCookie = res.cookie('jwt',refreshToken,{httpOnly: true, sameSite: "none", maxAge: 24*60*60*1000})
        console.log(refreshCookie)

        res.json({
            accessToken,
            refreshToken
        })

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.refreshLoginAdmin = async(req,res)=>{
    const cookie = req.cookies
    if(!cookie.jwt) return res.status(402).json({error:"no cookie with such id was found"})
    const refreshToken = cookie.jwt

    try {
        const cookieExist = await Admin.exists({refreshToken})
        if(!cookieExist) return res.status(403).json({error:"no refresh token was found"})

        // verify cookie
        let admin_details;
        jwt.verify(refreshToken,process.env.REFRESH_JWT_SECRET,(err,payload)=>{
            if(err) return res.status(403).json({error: "refresh token no present"})
            admin_details = payload
        })

        const newAccessToken = jwt.sign({admin_details},process.env.ACCESS_JWT_SECRET,{expiresIn:"10m"})

        res.json({newAccessToken})

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.logoutAdmin = async(req,res) =>{
    const cookie = req.cookies
    if(!cookie?.jwt) return res.sendStatus(204)
    const refreshCookie = cookie?.jwt

    try {
        const logoutadmin = await Admin.updateOne(
            {refreshToken:refreshCookie},
            {$set: {refreshToken:null}}
        )

        res.sendStatus(204)

    } catch (error) {
        res.json({error:error.message})
    }
}