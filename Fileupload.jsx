import React, { useState } from "react";
import { Form, Button, Card, Spinner, Alert } from "react-bootstrap";
import * as XLSX from "xlsx";
import "./Fileupload.css";

const FileUpload = ({ onExcelData }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setSuccess("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an Excel file to upload.");
      return;
    }
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setSuccess("File processed successfully!");
        setFile(null);
        if (onExcelData) onExcelData(jsonData);
      };
      reader.onerror = () => setError("Failed to read file");
      reader.readAsArrayBuffer(file);
    } catch (err) {
      setError("Error processing file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="file-upload-card p-4 mb-4 shadow-sm">
      <Card.Body>
        <h3 className="mb-3">Upload Excel File</h3>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Select Excel File (.xlsx, .xls)</Form.Label>
            <Form.Control
              type="file"
              accept=".xlsx,.xls"
              className="file-upload-input"
              onChange={handleChange}
              disabled={loading}
            />
          </Form.Group>
          <Button
            type="submit"
            className="file-upload-btn"
            disabled={loading}
            variant="primary"
          >
            {loading ? <Spinner size="sm" animation="border" /> : "Process Excel"}
          </Button>
        </Form>
        {success && <Alert variant="success" className="mt-3">{success}</Alert>}
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </Card.Body>
    </Card>
  );
};

export default FileUpload;