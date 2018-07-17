const express = require("express")
const multer = require("multer");
const fs = require("fs");
const path = require("path")

const publicPath = 'public/';
const uploadPath = './public/uploads';

const port = 3000;

const app = express();

const photoObject = {
    photoArray: [],
}

app.set('view engine', 'pug')
app.set("views", path.join(__dirname, "views"));

app.use(express.static(publicPath));
app.use(express.json())
const upload = multer({
    dest: uploadPath
});


app.post('/public/uploads', upload.single('myFile'), function (req, res, next) {
    res.render('uploads')
    if (!photoObject.photoArray.includes(req.file.filename)) {
        photoObject.photoArray.push(req.file.filename)
    }
})

app.post('/latest', (req, res) => {
    fs.readdir(uploadPath, (err, files) =>{
        const newPhotoArray = []
        let placeHolder = 0
        files.forEach(file => {
            const modifiedTime = fs.statSync(uploadPath + '/' + file).mtimeMs
            
            if (req.body.clientTimestamp < modifiedTime){
                newPhotoArray.push(file)
            }
            if (modifiedTime > placeHolder){
                placeHolder = modifiedTime
            }
            
        })
        res.send({
        images: newPhotoArray,
        timestamp: placeHolder,
        })
    
    })
})



app.get('/', (req, res) => {

    //read directory and check to see if photo already exists in array, if it does not exist, push it to array
    fs.readdir(uploadPath, (err, files) => {
        if (files.length) {
            files.forEach(file => {
                if (!photoObject.photoArray.includes(file)) {
                    photoObject.photoArray.push(file)
                }
            })
        }
        //render index.pug file while also passing photoArray to pug
        res.render('index', {
            items: photoObject.photoArray
        })
    })
})

app.listen(port)