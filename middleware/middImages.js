const multer = require('multer');
const path = require('path');
const { v4:uuidv4 } = require('uuid');

const almacenamiento = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})

const upload = multer({ 
    storage: almacenamiento,
    dest: 'uploads',
    fileFilter: (req, file, callback) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if(mimetype && extname){
            return callback(null, true);
        } else {
            callback(new Error ('Tipo de archivo no valido, debe ser una imagen'));
        }
    }
}).single('myFile');

module.exports = upload;