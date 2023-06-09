const express = require('express')
const app = express()
require('dotenv').config()
const session = require('express-session')
var morgan = require('morgan')
const cors = require('cors');
const passport = require('./src/middleware/googleAuth')

const student = require('./src/api/student')
const teacher = require('./src/api/teacher')
const admin = require('./src/api/admin')
const contact = require('./src/api/general')

const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use(morgan('tiny'))

app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(passport.initialize())
app.use(passport.session());

app.use(student)
app.use(teacher)
app.use(admin)
app.use(contact)


app.listen(port, () => {
    console.log(`Node App listening: http://localhost:${port}`)
})