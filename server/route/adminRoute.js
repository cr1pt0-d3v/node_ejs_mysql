const express = require("express");
const router = express.Router();

const adminCtrl = require("../controller/adminCtrl");

router.get("/login", adminCtrl.displayLogin);
router.post("/dashboard", adminCtrl.handleLogin);
//register
router.get("/register", adminCtrl.displayRegister);
router.post("/register", adminCtrl.handleRegister);

module.exports = router;
