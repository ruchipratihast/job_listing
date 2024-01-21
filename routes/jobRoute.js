const express = require("express");
const router = express.Router();
const jwtVerify = require("../middlewares/authMiddleware");
const {createJob,editJob,jobDescription} = require('../controllers/jobController')

router.post("/create", jwtVerify,createJob);

router.put("/edit/:jobId", jwtVerify,editJob);

router.get("/job-description/:jobId",jobDescription);

module.exports = router;