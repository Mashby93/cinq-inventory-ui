import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../../../AppNavbar';
import Footer from '../../../Footer';
import { Link } from 'react-router-dom';
import LoadingScreen from '../../../components/LoadingScreen';
import ReportService from '../../../services/ReportService';

import { WritableStream } from 'web-streams-polyfill/ponyfill';
import streamSaver from 'streamsaver';

class ReportListings extends Component {

  constructor(props) {
    super(props);
    this.state = {reports: [], isLoading: true};
    this.handleDownloadReport = this.handleDownloadReport.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    ReportService.getAll(1, 50)
      .then(data => this.setState({reports: data, isLoading: false}));
  }

  handleDownloadReport(reportId) {
    ReportService.download(reportId);
  }

  handleDownloadReportOld(reportId) {
    ReportService.download(reportId)
    .then(response => {

    let contentDisposition = response.headers.['content-disposition'];
    let fileName = contentDisposition.substring(contentDisposition.lastIndexOf('=') + 1);

    // These code section is adapted from an example of the StreamSaver.js
    // https://jimmywarting.github.io/StreamSaver.js/examples/fetch.html

    // If the WritableStream is not available (Firefox, Safari), take it from the ponyfill
    if (!window.WritableStream) {
        streamSaver.WritableStream = WritableStream;
        window.WritableStream = WritableStream;
    }

    const fileStream = streamSaver.createWriteStream(fileName);
    const readableStream = response.stream;

    console.log(readableStream);
    // More optimized
    if (readableStream.pipeTo) {
        return readableStream.pipeTo(fileStream);
    }

    window.writer = fileStream.getWriter();

    const reader = response.body.getReader();
    const pump = () => reader.read()
        .then(res => res.done
            ? window.writer.close()
            : window.writer.write(res.value).then(pump));

    pump();
});
  }

  render() {
    const {reports, isLoading} = this.state;

    if (isLoading) {
      return <LoadingScreen/>;
    }

    const reportList = reports.map(report => {
      return <tr key={report.id}>
        <td style={{whiteSpace: 'nowrap'}}>{report.name}</td>
        <td style={{whiteSpace: 'nowrap'}}>{report.reportStatus}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" onClick={this.handleDownloadReport(report.id)}>Download</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/reports/new">Generate Report</Button>
          </div>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="10%">Name</th>
              <th width="10%">Status</th>
            </tr>
            </thead>
            <tbody>
            {reportList}
            </tbody>
          </Table>
        </Container>
        <Footer/>
      </div>
    );
  }
}

export default ReportListings;
