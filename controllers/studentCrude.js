const student = require("../models/studentModel")
const studentClassId = require("../models/studentClassModel")


exports.createStudent = async(req,res)=>{
    if(!(req.body.studentName || req.body.regNo || req.body.email || req.body.gender || req.body.studentClass || req.body.dob)) return res.status(400).send({error:"data not properly formatted"})

    const { studentName, regNo, email, gender, studentClass, dob } = req.body

    try {
        const studentExist = await student.exists({$or: [{regNo},{email}]})
        if(studentExist) return res.status(401).json("student already exist")
        const studentCreate = await student.create({
            studentName,
            regNo,
            email,
            gender,
            studentClass,
            dob
        })

        const updateStudentClass = await studentClassId.findById(studentClass)
        updateStudentClass.studentId.push(studentCreate._id)
        const updatedStudentClass = updateStudentClass.save()

        res.json(studentCreate)
        
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getStudent = async(req,res)=>{
    try {
        const getstudentin = await student.find().populate('studentClass')
        res.json(getstudentin)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getoneStudent = async(req,res)=>{
    const { studentId } = req.params 

    try {
        const oneStudentGet = await student.findById(studentId).populate('studentClass')
        res.json(oneStudentGet)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.updateStudent = async(req,res) =>{
    const { studentId } = req.params 

    const { studentName, regNo, email, gender, studentClass, dob } = req.body

    try {

       const fromexistingStudent = await student.findOne({_id: studentId})
       if(fromexistingStudent.studentClass !== studentClass){

        const removeStudentinClass = await studentClassId.findOneAndUpdate(
            {studentId},
            {$pull: {studentId}}
        )

        const pushStudentinClass = await studentClassId.findOneAndUpdate(
            {_id: studentClass},
            {$push: {studentId}}
        )
       }

       const studentupdate = await student.updateOne(
        {_id: studentId},
        {$set: {
            studentName,
            regNo,
            email,
            gender,
            studentClass,
            dob
        }}
       )

       res.json(studentupdate)
        
    } catch (error) {
        res.json({error:error.message})
    }

}

exports.delStudent = async(req,res)=>{
    const { studentId } = req.params

    try {
        const pullStudentfromClass = await studentClassId.findOneAndUpdate(
            {studentId},
            {$pull: {studentId}}
        )

        const studentdel = await student.deleteOne({_id: studentId})
        res.json(studentdel)
        
    } catch (error) {
        res.json({error:error.message})
    }
}