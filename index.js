const con = require('./dbconnect')
const express = require('express');
const dotenv = require('dotenv').config();
const app = express()
const cors = require('cors')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');



app.use(express.static(__dirname + '/public/images'));


const { errorHandler } = require('./helpers/errorHandler');
const { protect } = require('./helpers/checkToken');

app.use(express.json())

app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/api/users', require('./routes/userRoute'))
app.use('/api/contents', require('./routes/contentRoute'))
app.use('/api/settings', require('./routes/settingRoute'))
app.use('/api/socials', require('./routes/socialRoute'))
app.use('/api/mail', require('./routes/emailRoute'))
app.use('/api/gallery', require('./routes/galleryRoute'))
app.use('/api/menu', require('./routes/menuRoute'))
app.use('/api/airdrop', require('./routes/airdropRoute'))

app.use(errorHandler);


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/')
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + file.originalname)
    },
})

const upload = multer({ storage: storage })


app.post('/api/image', upload.single('file'), protect, function (req, res) {
    const fileName = req.file;
    res.json({ data: fileName })
})


process.on('uncaughtException', (err, origin) => {
    console.log(err.message);
});

app.listen(5000, () => {
    console.log('Server is running at port 5000');
});