const expres = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require("dotenv").config()
const connectDB = require('./db/connect')
const port = process.env.PORT || 8800
connectDB()
//routes


//express instance
const app = expres()

//middlewares

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))


//routes
app.use('/api/user', require('./routes/userRoutes'))

//listening to server

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})

