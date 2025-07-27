const express = require('express')
const dotenv = require("dotenv")
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user")
dotenv.config();


const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json())

app.use("/admin", adminRouter)
app.use("/user", userRouter)


app.listen(PORT, ()=>{
    console.log("Server is running on PORT:3000")
})