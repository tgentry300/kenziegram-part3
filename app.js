const express = require("express")
const multer = require("multer");
const fs = require("fs");
const path = require("path")

const publicPath = 'public/';
const uploadPath = './public/uploads';

const port = 3000;

const app = express();

const photoObject = {
    photoArray: []
}

app.set('view engine', 'pug')
app.set("views", path.join(__dirname, "views"));

app.use(express.static(publicPath));
const upload = multer({ dest: uploadPath });


app.post('/public/uploads', upload.single('myFile'), function (req, res, next) {
    res.render('uploads')
})

app.get("/", (req, res) => {
    fs.readdir(uploadPath, (err, items) => {
        items.forEach(image => {
            photoObject.photoArray.push(image)
        });
    })
    res.render('index', {items: photoObject.photoArray})
})


app.listen(port)