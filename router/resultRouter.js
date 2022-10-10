const express = require("express")
const { createResult, getResult, getResultOne, checkResult, updateresult, deleteResult } = require("../controllers/resultCrude")
const verifyAuthentication = require("../middleWares/Authmiddlewares")
const router = express.Router()



/* -------------------------------------------------- this is for result router create -------------------------------------------------- */
router.post('/',verifyAuthentication, createResult)

/* ---------------------------------------------------- this is for result get router --------------------------------------------------- */
router.get('/', verifyAuthentication, getResult)

/* -------------------------------------------------- this is for result get one router ------------------------------------------------- */
router.get('/:resultId', verifyAuthentication, getResultOne)

/* --------------------------------------------------- this is the check result router -------------------------------------------------- */
router.get('/:email/:regNo', checkResult)

/* -------------------------------------------------- this is the update result router -------------------------------------------------- */
router.patch('/:resultId', verifyAuthentication, updateresult)

/* -------------------------------------------------- this is the delete result router -------------------------------------------------- */
router.delete('/:studentId/:subjectId/:resultId', verifyAuthentication, deleteResult)



module.exports = router