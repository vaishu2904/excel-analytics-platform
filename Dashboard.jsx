import React, { useState } from 'react'
import { Container, Row, Table, Card, Spinner, Alert, Button } from 'react-bootstrap';
import FileUpload from "../component/Fileupload";
import ChartDisplay from "./ChartDisplay";

const Dashboard = () => {
  const [users] = useState([]); // Remove user fetch logic
  const [excelData, setExcelData] = useState(null);
  const [chartLabels, setChartLabels] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [showChart, setShowChart] = useState(false);

  // Called by FileUpload after successful Excel parse
  const handleExcelData = (data) => {
    setExcelData(data);
    setShowChart(false);
    setChartLabels(null);
    setChartData(null);
  };

  // Extract first two columns for chart
  const handleGenerateChart = () => {
    if (!excelData || excelData.length === 0) return;
    const firstRow = excelData[0];
    const keys = Object.keys(firstRow);
    if (keys.length < 2) return;
    setChartLabels(excelData.map(row => row[keys[0]]));
    setChartData(excelData.map(row => row[keys[1]]));
    setShowChart(true);
  };

  return (
    <Container className='mt-5'>
      <Row>
        <div className='top-form'>
          <h1 className='text-center mb-4'>Excel Analytics Dashboard</h1>
          <FileUpload onExcelData={handleExcelData} />
          <Card className="mt-4 shadow-sm">
            <Card.Body>
              <h4 className="mb-3">Excel Chart Visualization</h4>
              <Button variant="primary" className="mb-3" onClick={handleGenerateChart} disabled={!excelData}>
                Generate Chart
              </Button>
              {!showChart && <div className="text-center text-muted">Chart visualization will appear here. Upload a file and click "Generate Chart" to see your data.</div>}
              {showChart && <ChartDisplay chartLabels={chartLabels} chartData={chartData} />}
            </Card.Body>
          </Card>
        </div>
      </Row>
    </Container>
  )
}

export default Dashboard;