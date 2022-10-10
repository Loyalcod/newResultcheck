const express = require("express")
const { registerStudentClass, getstudentClass, getOnestudentClass, updateOneClass, delclass } = require("../controllers/studentClassCrude")
const router = express.Router()




/* -------------------------------------------- this is the create student class grade router ------------------------------------------- */
router.post('/',registerStudentClass)

/* ------------------------------------------------ this is the get student class router ------------------------------------------------ */
router.get('/',getstudentClass)

/* ---------------------------------------------- this is the get one student class router ---------------------------------------------- */
router.get('/:classId',getOnestudentClass)

/* ------------------------------------------- this is the update student student class router ------------------------------------------ */
router.patch('/:classId',updateOneClass)

/* --------------------------------------------------- this is the delete class router -------------------------------------------------- */
router.delete("/:classId",delclass)





module.exports = router