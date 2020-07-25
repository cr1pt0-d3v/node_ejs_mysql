const express = require("express");
const router = express.Router();

const adminCtrl = require("../controller/adminCtrl");

//login
router.get("/login", adminCtrl.displayLogin);
router.post("/dashboard", adminCtrl.handleLogin);
//register
router.get("/register", adminCtrl.displayRegister);
router.post("/register", adminCtrl.handleRegister);

//article
router.post("/articles", adminCtrl.addPost);

module.exports = router;
