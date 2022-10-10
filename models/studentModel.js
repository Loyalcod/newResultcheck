const mongoose = require("mongoose")


const studentSchema = mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    regNo: {
        type: Number,
        required: true,
        unique: true,
        dropDups: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
        lowercase: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Others"]
    },
    dob:{
        type: String,
        required: true
    },

    studentClass: {type: mongoose.Types.ObjectId, ref: 'classes'},

    subjectId: [{type: mongoose.Types.ObjectId, ref: 'subject'}],
    resultId: [{type: mongoose.Types.ObjectId, ref: 'result'}],
    
}, {timestamps: true})



module.exports = mongoose.model('student',studentSchema)