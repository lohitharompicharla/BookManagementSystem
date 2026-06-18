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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}`)
})
