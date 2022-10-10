const combo = require("../models/stdsubcomboModel")
const studentModel = require("../models/studentModel")
const subjectModel = require("../models/subjectModel")


exports.createStdSubCombo = async(req,res) => {
    
    const { studentId, subjectId } = req.body

    try {
        const studentExist = await studentModel.findById(studentId)
        if(studentExist.subjectId.includes(subjectId)){
            return res.status(400).json({error:"combo already exist"})
        }

        const createCombo = await combo.create({
            studentId,
            subjectId
        })

        const pushSubjectinStudent = await studentModel.findOneAndUpdate(
            {_id: studentId},
            {$push: {subjectId: subjectId}}
        )

        const pushStudentinSubject = await subjectModel.findOneAndUpdate(
            {_id: subjectId},
            {$push: {studentId: studentId}}
        )

        

        res.json(createCombo)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getCombo = async(req,res) =>{
    try {
        const comboget = await combo.find()
        .populate({
            path: 'studentId',
            populate:{
                path: 'studentClass'
            }
        }).populate('subjectId')

        res.json(comboget)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getOneCombo = async(req,res)=>{

    const { comboId } = req.params 

    try {
        const oneComboGet = await combo.findById(comboId)
        .populate({
            path: 'studentId',
            populate:{
                path: 'studentClass'
            }
        }).populate('subjectId')
        res.json(oneComboGet)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.toggolecomboStatus = async(req,res) =>{
    const { comboId } = req.params

    try {
        const SelectStatus = await combo.findById(comboId).select('status')
        let realStatus = SelectStatus.status

        realStatus === true ? realStatus = false : realStatus = true

        const updateStatus = await combo.updateOne(
            {_id: comboId},
            {$set: {status: realStatus}}
        )

        res.json(updateStatus)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.deleteCombo = async(req,res) =>{
    const { comboId, studentId, subjectId } = req.params

    try {
        const deleteStudentinSubject = await subjectModel.findOneAndUpdate(
            {_id: subjectId},
            {$pull: {studentId}}
        )
        const deleteSubjectinStudent = await studentModel.findOneAndUpdate(
            {_id: studentId},
            {$pull: {subjectId}}
        )

        const delCombo = await combo.deleteOne({_id: comboId})
        res.json(delCombo)
        
    } catch (error) {
        res.json({error:error.message})
        
    }
}