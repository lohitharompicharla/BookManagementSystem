const mongoose = require("mongoose")

const BookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    price:{
        type:Number
    },
    description:{
        type:String
    },
    coverImage:{
        type:String
    }
})

module.exports = mongoose.model("Book",BookSchema)