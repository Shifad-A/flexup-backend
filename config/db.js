const mongoose = require('mongoose')

mongoose.connect(process.env.connectionString).then(res=>{
    console.log("mongodb connection success!");
})
.catch(err=>{
    console.log( "mongodb connection error");
})