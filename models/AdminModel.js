const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        dropDups: [true,'username already exist']
    },
    password: {
        type: String,
        required: true
    },
    refreshToken:{
        type: String
    }
},{timestamps: true})



module.exports = mongoose.model('admin',adminSchema)