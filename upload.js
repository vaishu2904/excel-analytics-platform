const ExcelData = require("../models/excelData");
const xlsx = require("xlsx");

async function uploadExcelForUser(filePath, userId) {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    const excelData = new ExcelData({ user: userId, data });
    await excelData.save();
    return excelData;
}

module.exports = { uploadExcelForUser };
