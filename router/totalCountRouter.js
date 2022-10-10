const express = require("express")
const { totalCountcreate } = require("../controllers/totalCountCrude")
const router = express.Router()



/* ------------------------------------------------- this is for the total count router ------------------------------------------------- */
router.get('/',totalCountcreate)


module.exports = router;