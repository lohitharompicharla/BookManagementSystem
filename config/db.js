const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URI)
        console.log("DB Connected")
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB