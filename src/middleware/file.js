import multer from 'multer';

export const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'files/uploads')
    },
    filename(req, file, cb) {
        cb(null, `${file.originalname}`)
    }
})

export const fileMulter = multer({storage})
