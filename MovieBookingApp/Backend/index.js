const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const bodyparser = require("body-parser")
const cors = require("cors")

const authRoutes = require('./Routes/Auth')
const adminRoutes = require('./Routes/Admin.js')
const movieRoutes = require('./Routes/Movie.js')
const imageuploadRoutes = require('./Routes/ImageUploadRoutes.js')
const PORT = 8000
require("dotenv").config()
require("./db")

app.use(bodyparser.json())
const allowedOrigins = ['http://localhost:3000','http://localhost:3001']; // Add more origins as needed
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true, // Allow credentials
    })
);

app.get('/',(req,res) => {
    res.json({message:"The API is working"})
})

app.use(cookieParser())

app.use('/auth',authRoutes)
app.use('/admin',adminRoutes)
app.use('/movie',movieRoutes)
app.use('/image', imageuploadRoutes);

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})