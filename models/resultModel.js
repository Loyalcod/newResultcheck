const mongoose = require("mongoose")


const resultSchema = mongoose.Schema({
    studentId: {type: mongoose.Types.ObjectId, ref: 'student'},
    subjectId: {type: mongoose.Types.ObjectId, ref: 'subject'},
    classId: {type: mongoose.Types.ObjectId, ref: 'classes'},

    mark: {
        type: Number,
        required: true
    }
},{timestamps: true})



module.exports = mongoose.model('result',resultSchema)