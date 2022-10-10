const express = require("express")
const { createSubject, getSubject, getOneSubject, updateSubject, delSubject } = require("../controllers/subjectCrude")
const router = express.Router()




/* -------------------------------------------------- this is the create subject router ------------------------------------------------- */
router.post('/',createSubject)

/* --------------------------------------------------- this is the get subject router --------------------------------------------------- */
router.get('/',getSubject)

/* ------------------------------------------------- this is the get one subject router ------------------------------------------------- */
router.get('/:subjectId',getOneSubject)

/* -------------------------------------------------- this is the update subject router ------------------------------------------------- */
router.patch('/:subjectId',updateSubject)

/* -------------------------------------------------- this is the delete subject router ------------------------------------------------- */
router.delete("/:subjectId",delSubject)

module.exports = router