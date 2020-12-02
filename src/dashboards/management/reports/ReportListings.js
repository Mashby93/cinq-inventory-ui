import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../../../AppNavbar';
import Footer from '../../../Footer';
import { Link } from 'react-router-dom';
import LoadingScreen from '../../../components/LoadingScreen';

class ReportListings extends Component {

  constructor(props) {
    super(props);
    this.state = {reports: [], isLoading: true};
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('/api/reports')
      .then(response => response.json())
      .then(data => this.setState({reports: [], isLoading: false}));
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
            <Button size="sm" color="primary" tag={Link} to={"/receivables/" + report.id + "/receive"}>Download</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/receivables/receive">Generate Report</Button>
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
