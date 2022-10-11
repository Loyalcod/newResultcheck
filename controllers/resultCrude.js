const Result = require("../models/resultModel")
const Student = require("../models/studentModel")
const Subject = require("../models/subjectModel")



exports.createResult = async(req,res)=>{
    if(!(req.body.studentId || req.body.subjectId || req.body.classId || req.body.mark )) return res.status(400).json({error:"data not properly formatted"})

    const { studentId, subjectId, classId, mark } = req.body

    try {
        const resultExist = await Result.exists({studentId,subjectId,classId})
        if(resultExist) return res.status(401).json("result have been declared already")

        const resultCreate = await Result.create({
            studentId,
            subjectId,
            classId,
            mark
        })

        const pushResultinStudent = await Student.findOneAndUpdate(
            {_id: studentId},
            {$push: {resultId: resultCreate._id}}
        )

        const pushResultinSubject = await Subject.findOneAndUpdate(
            {_id: subjectId},
            {$push: {resultId: resultCreate._id}}
        )

        res.json(resultCreate)

    } catch (error) {
        res.json({error:error.message})
    }

}

exports.getResult = async(req,res)=>{
    try {
        const resultget = await Result.find()
        .populate("studentId").populate("subjectId")
        res.json(resultget)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getResultOne = async(req,res)=>{
    const { resultId } = req.params 

    try {
        const getOneResult = await Result.findById(resultId)
        .populate("studentId").populate("subjectId")
        res.json(getOneResult)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.checkResult = async(req,res)=>{
    const { email, regNo } = req.params

    try {

        const resultExist = await Student.exists({email, regNo})
        if(!resultExist) return res.status(401).json("result don't exist")

        const checkmyresult = await Student.find({email,regNo})
        .populate('studentClass')
        .populate({
            path: 'resultId',
            populate:{
                path: 'subjectId'
            }
        })

        
        res.json(checkmyresult)
        
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.updateresult = async(req,res)=>{
    const { resultId } = req.params 

    const mark = req.body.mark !=''? req.body.mark : Result.mark

    try {

        const updateResult = await Result.updateOne(
            {_id: resultId},
            {$set: {mark}}
        )
        
        res.json(updateResult)

    } catch (error) {
        res.json({error:error.message})
    }
}


exports.deleteResult = async(req,res)=>{
    const { studentId, subjectId, resultId } = req.params 

    try {

        const removeResultinStudent = await Student.findOneAndUpdate(
            {_id: studentId},
            {$pull: {resultId: resultId}}
        )

        const removeResultinSubject = await Subject.findOneAndUpdate(
            {_id: subjectId},
            {$pull: {resultId: resultId}}
        )

        const delResult = await Result.deleteOne({_id: resultId})
        res.json(delResult)
        
    } catch (error) {
        res.json({error:error.message})
    }
}