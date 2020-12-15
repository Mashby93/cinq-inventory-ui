import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../../../AppNavbar';
import Footer from '../../../Footer';
import { Link } from 'react-router-dom';
import LoadingScreen from '../../../components/LoadingScreen';
import ErrorCodeService from '../../../services/ErrorCodeService';

class ErrorCodeListings extends Component {

  constructor(props) {
    super(props);
    this.state = {errorCodes: [], isLoading: true};
  }

  componentDidMount() {
    ErrorCodeService.getAllBulk()
    .then(data => {
      this.setState({errorCodes: data});
    })
    this.setState({isLoading: false});
  }

  render() {
    const {errorCodes, isLoading} = this.state;

    if (isLoading) {
      return <LoadingScreen/>;
    }

    const reportList = errorCodes.map(errorCode => {
      return <tr key={errorCode.id}>
        <td style={{whiteSpace: 'nowrap'}}>{errorCode.type.name}</td>
        <td style={{whiteSpace: 'nowrap'}}>{errorCode.code}</td>
        <td style={{whiteSpace: 'nowrap'}}>{errorCode.description}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/management/errors/" + errorCode.id  + "/details"}>View/Edit</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>

        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/management/errors/new">Create Error Code</Button>
          </div>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="10%">Category</th>
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

export default ErrorCodeListings;
