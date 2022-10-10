const resultModel = require("../models/resultModel");
const studentClassModel = require("../models/studentClassModel");
const studentModel = require("../models/studentModel");
const subjectModel = require("../models/subjectModel");



exports.totalCountcreate = async(req,res)=>{
    try {

        const totalStudentModel = await studentModel.count()
        const totalStudentClassModel = await studentClassModel.count()
        const totalSubjectModel = await subjectModel.count()
        const totalResult = await resultModel.count()

        res.json({
            totalStudentModel,
            totalStudentClassModel,
            totalSubjectModel,
            totalResult
        })
        
    } catch (error) {
        res.json({error:error.message})
    }
}