import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../../../AppNavbar';
import Footer from '../../../Footer';
import { Link } from 'react-router-dom';
import LoadingScreen from '../../../components/LoadingScreen';
import JobCodeService from '../../../services/JobCodeService';

class JobCodeListings extends Component {

  constructor(props) {
    super(props);
    this.state = {jobCodes: [], isLoading: true};
  }

  componentDidMount() {
    JobCodeService.getAllBulk()
    .then(data => {
      this.setState({jobCodes: data});
    })
    this.setState({isLoading: false});
  }

  render() {
    const {jobCodes, isLoading} = this.state;

    if (isLoading) {
      return <LoadingScreen/>;
    }

    const reportList = jobCodes.map(jobCode => {
      return <tr key={jobCode.id}>
        <td style={{whiteSpace: 'nowrap'}}>{jobCode.code}</td>
        <td style={{whiteSpace: 'nowrap'}}>{jobCode.description}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/management/jobcodes/" + jobCode.id  + "/details"}>View/Edit</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>

        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/management/jobcodes/new">Create Job Code</Button>
          </div>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="10%">Code</th>
              <th width="10%">Description</th>
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

export default JobCodeListings;
