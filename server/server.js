
const express = require('express')
const dotenv = require("dotenv")
const connecToDB = require('./db/db')
const userRouter = require('./routes/user.route')
const roomRouter = require('./routes/room.route')
const cookieParser = require('cookie-parser')

dotenv.config();
const app = express()
connecToDB();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())


const PORT = process.env.PORT || 5000


app.get('/', (req, res) => {
    res.send("hello from the server")
})

app.use('/api/users', userRouter);
app.use('/api/rooms', roomRouter);

app.listen(PORT, () => {
    console.log('server is running at PORT ', PORT)
})