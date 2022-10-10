const express = require("express")
const { createStdSubCombo, getCombo, getOneCombo, toggolecomboStatus, deleteCombo } = require("../controllers/stdsubComboCrude")
const router = express.Router()



/* ---------------------------------------- this is the student subject combination create router --------------------------------------- */
router.post('/',createStdSubCombo)

/* ----------------------------------------- this is the student subject combination get router ----------------------------------------- */
router.get('/',getCombo)

/* --------------------------------------- this is the student subject combination get one router --------------------------------------- */
router.get('/:comboId',getOneCombo)

/* ------------------------------------ this is the student subject combination toggole status router ----------------------------------- */
router.get('/status/:comboId',toggolecomboStatus)

/* ---------------------------------------- this is the student subject combination delete router --------------------------------------- */
router.delete('/:subjectId/:studentId/:comboId',deleteCombo)





module.exports = router