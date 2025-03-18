const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = file.mimetype.split('/')[1]
        cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`) // (⁠⁠)
    }
});

const fileFilter = (req, file, cb) => {
    // Allows Images and Documents
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new Error('Invalid file format: Image Only'))
    }
};

const limits = { limits: 1024 * 1024 * 2 };

const upload = multer({
    storage,
    fileFilter,
    limits
})

module.exports = upload;