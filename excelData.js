const mongoose = require("../configuration/dbConfig");

const excelDataSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    data: { type: Array, required: true },
    uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ExcelData", excelDataSchema);
