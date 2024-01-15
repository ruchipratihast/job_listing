const express = require('express')
const app = express();
const dotenv = require('dotenv');
const port = process.env.PORT || 8000;
dotenv.config();


app.get('/',(req,res)=>{
    res.send("hello");
    console.log(port)
})

app.listen(port, () => {
    console.log(`App are listing on ${port}`)
  })