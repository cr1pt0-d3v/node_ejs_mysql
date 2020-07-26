const express = require("express");
const router = express.Router();

const userCtrl = require("../controller/userCtrl");
router.get("/", userCtrl.display);

router.get("/login", userCtrl.displayLogin);
router.post("/dashboard", userCtrl.handleLogin);

router.get("/register", userCtrl.displayRegister);
router.post("/register", userCtrl.handleRegister);

router.get("/delete/:id", userCtrl.deletePost);

module.exports = router;
