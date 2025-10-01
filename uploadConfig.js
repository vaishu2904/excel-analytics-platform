const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.mimetype === "application/vnd.ms-excel"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Only Excel files are allowed!"), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;