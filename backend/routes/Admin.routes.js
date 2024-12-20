const express = require("express");
const router = express.Router();
const Controller = require("../controllers/Admin.controller");
const protectApi = require("../middlewares/apiKeyMiddleware");

router.post("/create", protectApi, Controller.create);
router.post("/admin-login", Controller.login);

module.exports = router;
