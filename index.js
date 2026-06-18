const express = require("express")
const app = express()

require("dotenv").config({ override: true })

const connectDB =
require("./config/db")

const authRoute =
require("./router/authRouter")

const bookRoute =
require("./router/bookRoute")

app.use(express.json())

connectDB()

app.use("/auth",authRoute)
app.use("/api/v1",bookRoute)

app.get("/",(req,res)=>{
    res.send("Book API Working")
})
app.listen(3000,()=>{
    console.log("Server Started")
    console.log("http://localhost:3000")
})
