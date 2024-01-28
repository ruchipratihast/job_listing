const express = require('express')
const app = express();
const dotenv = require('dotenv');
const port = process.env.PORT || 8000;
const authRoute = require('./routes/authRoute');
const jobRoute = require('./routes/jobRoute');
var cors = require('cors');

dotenv.config();

app.use(express.json());
const db = require('./config/db');

app.use(cors());

//health api
app.get("/health", (req, res) => {
    res.json({
        service: "job listing server",
        status: "Active",
        time: new Date(),
    });
});

//auth route
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/job',jobRoute);

app.listen(port, () => {
    console.log(`App are listing on ${port}`)
  })