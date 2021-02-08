import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../../../AppNavbar';
import Footer from '../../../Footer';
import { Link } from 'react-router-dom';
import LoadingScreen from '../../../components/LoadingScreen';
import ReportService from '../../../services/ReportService';

const FileDownload = require('js-file-download');

class ReportListings extends Component {

  constructor(props) {
    super(props);
    this.state = {reports: [], isLoading: true, nameFilter:""};
    this.handleDownloadReport = this.handleDownloadReport.bind(this);
    this.handleDeleteReport = this.handleDeleteReport.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    ReportService.getAll(1, 50)
      .then(data => this.setState({reports: data, isLoading: false}));
  }

  handleDownloadReport(reportId) {
    ReportService.download(reportId)
    .then(response => {
      let contentDisposition = response.headers['content-disposition'];
      let fileName = contentDisposition.substring(contentDisposition.lastIndexOf('=') + 1).replace(/['"]+/g, '');

      FileDownload(response.data, fileName);
    });
  }

  handleDeleteReport(id) {
    ReportService.delete(id);
    window.location.reload();
  }

  async handleModelSearch() {
    ReportService.getAll(1, 50)
      .then(data => data.filter(report => {
        if (this.state.nameFilter && this.state.nameFilter !== "") {
          return report.name.includes(this.state.nameFilter);
        }
        return true;
      }))
      .then(data => this.setState({reports: data, isLoading: false}));
  }

  async setModelFilter(event) {
    this.state.nameFilter = event.target.value;
    this.handleModelSearch();
  }

  render() {
    const {reports, isLoading} = this.state;

    if (isLoading) {
      return <LoadingScreen/>;
    }

    const reportList = reports.map(report => {
      return <tr key={report.id}>
        <td style={{whiteSpace: 'nowrap'}}>{new Date(report.createdAt).toLocaleString('en-GB', { timeZone: 'UTC' })}</td>
        <td style={{whiteSpace: 'nowrap'}}>{report.name}</td>
        <td style={{whiteSpace: 'nowrap'}}>{report.reportStatus}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" onClick={() => this.handleDownloadReport(report.id)}>Download</Button>
            <Button size="sm" color="danger" onClick={() => this.handleDeleteReport(report.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>

        <Container fluid>
        <Table>
        <tr>
        <td>
        <h6> Search </h6>
        <input
        type="text"
        placeholder="Name"
        onChange={(event) => this.setModelFilter(event)}
        />
        </td>
        <td>
        <div className="float-right">
          <Button color="success" tag={Link} to="/reports/new">Generate Report</Button>
        </div>
        </td>
        </tr>
        </Table>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="10%">Generated Time</th>
              <th width="10%">Name</th>
              <th width="10%">Status</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {reportList}
            </tbody>
          </Table>
        </Container>

      </div>
    );
  }
}

export default ReportListings;
