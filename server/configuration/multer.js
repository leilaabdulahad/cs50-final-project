import multer from "multer"

export default multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "public/assets")
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        },
    }),
})