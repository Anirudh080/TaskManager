
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todos',{
useNewUrlParser:true
}).then(()=>{
    console.log("connection sucess")
}).catch((err)=>{
    console.log(err);
});

const db = mongoose.connection;


module.exports = db;