const express = require("express");
const router = express.Router();
const Controller = require("../controllers/Leave.controller");
const protect = require("../middlewares/UserAuthentication");
const protectApi = require("../middlewares/apiKeyMiddleware");

router.post("/create", protectApi, Controller.create);
router.patch("/update", protectApi, Controller.updateLeave);
router.get("/get-all-data", protectApi, Controller.getAllData);
router.delete("/deletes", protectApi, Controller.deleteLeaves);

router.get("/search", protectApi, Controller.searchData);

module.exports = router;
