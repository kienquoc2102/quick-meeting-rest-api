const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/v1/auth", authRoute)
app.use("/v1/user", userRoute)

const mongoDBurl = process.env.MONGODB_URL
mongoose.connect(mongoDBurl)
    .then(()=>console.log("Connect to MongoDB"))
    .catch((error)=>console.log("Could not connect to MongoDB", error))

const PORT = 8080
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
module.exports = app
