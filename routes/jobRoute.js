const express = require("express");
const router = express.Router();
const jwtVerify = require("../middlewares/authMiddleware");
const {createJob,editJob,jobDescription,deleteJob} = require('../controllers/jobController')

router.post("/create", jwtVerify,createJob);

router.put("/edit/:jobId", jwtVerify,editJob);

router.get("/job-description/:jobId",jobDescription);

router.delete("/delete/:jobId" ,deleteJob);

module.exports = router;