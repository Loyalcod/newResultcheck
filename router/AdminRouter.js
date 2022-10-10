const express = require("express")
const { registerAdmin, loginAdmin, refreshLoginAdmin, logoutAdmin } = require("../controllers/AdminCrude")
const router = express.Router()




/* -------------------------------------------------- this is the register admin router ------------------------------------------------- */
router.post("/",registerAdmin)

/* --------------------------------------------------- this is the login admin router --------------------------------------------------- */
router.post('/login',loginAdmin)

/* ----------------------------------------------- this is the refresh login admin router ----------------------------------------------- */
router.get('/refresh',refreshLoginAdmin)

/* --------------------------------------------------- this is the logout admin router -------------------------------------------------- */
router.get('/logout',logoutAdmin)

module.exports = router