const subject = require("../models/subjectModel")


exports.createSubject = async(req,res)=>{
    if(!(req.body.subjectName || req.body.subjectCode)) return res.status(400).send({error:"data not properly formatted"})

    const { subjectName, subjectCode } = req.body

    try {
        const subjectExist = await subject.exists({$or: [{subName:subjectName},{subCode:subjectCode}]})
        if(subjectExist) return res.status(401).json("data already exist")

        const newSubject = new subject({
            subName:subjectName,
            subCode:subjectCode
        })

        const saveSubject = newSubject.save()
        res.json(newSubject)


    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getSubject = async(req,res)=>{
    try {
        const subjectget = await subject.find()
        res.json(subjectget)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getOneSubject = async(req,res)=>{
    const { subjectId } = req.params 

    try {
        const subjectGetOne = await subject.findById(subjectId)
        res.json(subjectGetOne)

    } catch (error) {
        res.json({error:error.message})
        
    }
}

exports.updateSubject = async(req,res)=>{
    const { subjectId } = req.params 

    const subjectName = req.body.subjectName !== ''? req.body.subjectName : subject.subName
    const subjectCode = req.body.subjectCode !== ""? req.body.subjectCode : subject.subCode

    try {
        const subupdate = await subject.updateOne(
            {_id: subjectId},
            {$set: {subName: subjectName, subCode: subjectCode}}
        )
        res.json(subupdate)
        
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.delSubject = async(req,res)=>{
    const { subjectId } = req.params

    try {
        const subjectDelete = await subject.deleteOne({_id: subjectId})
        res.json(subjectDelete)
        
    } catch (error) {
        res.json({error:error.message})
    }
}