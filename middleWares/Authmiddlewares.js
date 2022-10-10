const jwt = require("jsonwebtoken")


const verifyAuthentication = async(req,res,next)=>{
    if(!req?.cookies?.jwt) return res.status(409).json({error:"cookie not present"})
    const AuthHeaders = req.headers.authorization
    if(!AuthHeaders) return res.status(401).json({message: "authorization string not present"})
    const authToken = AuthHeaders.split(" ")[1]
    jwt.verify(authToken,process.env.ACCESS_JWT_SECRET,(err,payload)=>{
        if(err) return res.status(403).json({error:"auth token not present"})
    })
    next()
}

module.exports = verifyAuthentication