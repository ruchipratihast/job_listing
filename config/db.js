const mongoose = require('mongoose');

const db = mongoose.connect('mongodb+srv://admin:admin@cluster0.j1qkn.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
  console.log("sucessfully connect to the db");
})
.catch((err)=>{
    console.log(err)
})

module.exports = db;