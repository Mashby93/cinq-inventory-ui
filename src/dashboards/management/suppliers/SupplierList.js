import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../../../AppNavbar';
import Footer from '../../../Footer';
import { Link } from 'react-router-dom';
import LoadingScreen from '../../../components/LoadingScreen';
import SupplierService from '../../../services/SupplierService';

class SupplierList extends Component {

  constructor(props) {
    super(props);
    this.state = {suppliers: [], isLoading: true};
  }

  componentDidMount() {
    SupplierService.getAllBulk()
    .then(data => {
      this.setState({suppliers: data});
    })
    this.setState({isLoading: false});
  }

  render() {
    const {suppliers, isLoading} = this.state;

    if (isLoading) {
      return <LoadingScreen/>;
    }

    const reportList = suppliers.map(supplier => {
      return <tr key={supplier.id}>
        <td style={{whiteSpace: 'nowrap'}}>{supplier.name}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/management/suppliers/" + supplier.id + "/details"}>View/Edit</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>

        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/management/suppliers/new">Create New Supplier</Button>
          </div>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="10%">Supplier</th>
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

export default SupplierList;
