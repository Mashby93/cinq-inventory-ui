import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../../AppNavbar';
import { Link } from 'react-router-dom';
import LoadingScreen from '../../components/LoadingScreen';

class QAList extends Component {
  link = 'api/products/bulk?statusCodes=READY_FOR_QA&statusCodes=QA';

  constructor(props) {
    super(props);
    this.state = {products: [], isLoading: true, modelFilter: "", serialFilter: ""};
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch(this.link)
      .then(response => response.json())
      .then(data => this.setState({products: data, isLoading: false}));
  }

  async handleModelSearch() {

    fetch(this.link)
      .then(response => response.json())
      .then(data => data.filter(product => {
        var valid = true;

        if (this.state.modelFilter) {
          valid = product.model.modelNumber.includes(this.state.modelFilter);
        }

        if (valid && this.state.serialFilter) {
          valid = product.serialNumber.includes(this.state.serialFilter);
        }
        console.log(product);
        return valid;
      }))
      .then(data => this.setState({products: data, isLoading: false, serialFilter: this.state.serialFilter, modelFilter: this.state.modelFilter }));
  }

  async setModelFilter(event) {
    this.state.modelFilter = event.target.value;
    this.handleModelSearch();
  }

  async setSerialFilter(event) {
    this.state.serialFilter = event.target.value;
    this.handleModelSearch();
  }


  render() {
    const {products, isLoading} = this.state;

    if (isLoading) {
      return <LoadingScreen/>;
    }

    const serviceName = window.location.pathname.split("/")[1];
    const productList = products.map(product => {
      const modelDescription = `${product.model.color || ''} ${product.model.description || ''}`;
      return <tr key={product.id}>
        <td style={{whiteSpace: 'nowrap'}}>{product.supplier.name}</td>
        <td style={{whiteSpace: 'nowrap'}}>{product.model.brand.name}</td>
        <td style={{whiteSpace: 'nowrap'}}>{product.model.modelNumber}</td>
        <td style={{whiteSpace: 'nowrap'}}>{product.serialNumber}</td>
        <td style={{whiteSpace: 'nowrap'}}>{modelDescription}</td>
        <td style={{whiteSpace: 'nowrap'}}>{product.metadata.cosmeticCode}</td>
        <td style={{whiteSpace: 'nowrap'}}>{product.metadata.routeStatus}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/qa/" + product.id + "/details"}>QA Item</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>

        <Container fluid>
        <h6> Filters </h6>
        <input
        type="text"
        placeholder="Model Number"
        onChange={(event) => this.setModelFilter(event)}
        />
        &nbsp;
        <input
        type="text"
        placeholder="Serial Number"
        onChange={(event) => this.setSerialFilter(event)}
        />
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="10%">Supplier</th>
              <th width="10%">Brand</th>
              <th width="10%">Model</th>
              <th width="10%">Serial</th>
              <th width="30%">Description</th>
              <th width="10%">Cosmetic Code</th>
              <th width="30%">Status</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {productList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default QAList;
