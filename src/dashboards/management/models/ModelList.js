import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../../../AppNavbar';
import Footer from '../../../Footer';
import { Link } from 'react-router-dom';
import LoadingScreen from '../../../components/LoadingScreen';
import ModelService from '../../../services/ModelService';

class ModelList extends Component {

  constructor(props) {
    super(props);
    this.state = {models: [], isLoading: true};
  }

  componentDidMount() {
    ModelService.getAllBulk()
    .then(data => {
      this.setState({models: data});
    })
    this.setState({isLoading: false});
  }

  render() {
    const {models, isLoading} = this.state;

    if (isLoading) {
      return <LoadingScreen/>;
    }

    const reportList = models.map(model => {
      return <tr key={model.id}>
        <td style={{whiteSpace: 'nowrap'}}>{model.supplier.name}</td>
        <td style={{whiteSpace: 'nowrap'}}>{model.category ? model.category.name : ""}</td>
        <td style={{whiteSpace: 'nowrap'}}>{model.modelNumber}</td>
        <td style={{whiteSpace: 'nowrap'}}>{model.description}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/management/models/" + model.id + "/details"}>View/Edit</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>

        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/management/models/new">Create New Model</Button>
          </div>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="10%">Supplier</th>
              <th width="10%">Category</th>
              <th width="20%">Model Number</th>
              <th width="20%">Description</th>
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

export default ModelList;
