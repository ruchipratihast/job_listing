const express = require("express");
const router = express.Router();
const jwtVerify = require("../middlewares/authMiddleware");
const {createJob,editJob,jobDescription,allJob,deleteJob} = require('../controllers/jobController')

router.post("/create", jwtVerify,createJob);

router.get("/job-description/:jobId",jobDescription);
router.get("/all",allJob);

router.put("/edit/:jobId", jwtVerify,editJob);

router.delete("/delete/:jobId" ,deleteJob);

module.exports = router;