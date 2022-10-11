const AllowedOrign = require("../config/allowedOrigin");

const credential = async(req,res,next)=>{
    const origin = req.headers.origin
    if(AllowedOrign.includes(origin)){
        res.header('Access-Control-Allow-Credentials',true)
    }
    next()
}


module.exports = credential