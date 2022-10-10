const express = require("express")
const { createStudent, getStudent, getoneStudent, updateStudent, delStudent } = require("../controllers/studentCrude")
const router = express.Router()



/* -------------------------------------------------- this is the create student router ------------------------------------------------- */
router.post('/',createStudent)

/* --------------------------------------------------- this is the get student router --------------------------------------------------- */
router.get('/',getStudent)

/* ------------------------------------------------- this is the get one student router ------------------------------------------------- */
router.get('/:studentId',getoneStudent)

/* -------------------------------------------------- this is the update student router ------------------------------------------------- */
router.patch('/:studentId',updateStudent)

/* -------------------------------------------------- this is the delete student router ------------------------------------------------- */
router.delete('/:studentId',delStudent)

module.exports = router