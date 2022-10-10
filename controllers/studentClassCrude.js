const studentClass = require("../models/studentClassModel")


exports.registerStudentClass = async(req,res)=>{
    if(!(req.body.className || req.body.classGrade)) return res.status(400).send({error:"data not properly formatted"})

    const { className, classGrade } = req.body

    try {
        const checkExistingClass = await studentClass.exists({$or: [{className},{classGrade}]})
        if(checkExistingClass) return res.status(401).send("class already exist")
        const createStudentClass = await studentClass.create({
            className,
            classGrade,
        })
        res.json(createStudentClass)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getstudentClass = async(req,res)=>{
    try {
        const getallClasses = await studentClass.find()
        res.json(getallClasses)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getOnestudentClass = async(req,res)=>{
    const { classId } = req.params 

    try {
        const getoneClass = await studentClass.findById(classId)
        res.json(getoneClass)
        
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.updateOneClass = async(req,res)=>{
    const { classId } = req.params

    const className = req.body.className !== ''? req.body.className : studentClass.className
    const classGrade = req.body.classGrade !== ''? req.body.classGrade : studentClass.classGrade

    try {

        const updateclassforOne = await studentClass.updateOne(
            {_id: classId},
            {$set: {className,classGrade}}
        )

        res.json(updateclassforOne)        
        
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.delclass = async(req,res)=>{
    const { classId } = req.params

    try {
        const delstudentclass = await studentClass.deleteOne(
            {_id: classId}
        )
        res.json(delstudentclass)
    } catch (error) {
        res.json({error:error.message})
    }
}