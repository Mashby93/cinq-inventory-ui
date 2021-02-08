import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Form, FormGroup } from 'reactstrap';
import AppNavbar from '../../AppNavbar';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import LoadingScreen from '../../components/LoadingScreen';

import ProductService from '../../services/ProductService';

class ProductList extends Component {
  link = 'api/products/bulk?statusCodes=IN_COSMETIC';

  constructor(props) {
    super(props);
    this.state = {products: [], isLoading: true, modelFilter: "", serialFilter: ""};
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch(this.link)
      .then(response => response.json())
      .then(data => this.setState({products: data, isLoading: false, serialFilter: this.state.serialFilter, modelFilter: this.state.modelFilter }));
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

  async updateStatus(product) {
    await fetch(`/api/products`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    }).then(() => {
      let updatedProducts = [...this.state.products].filter(i => i.id !== product.id);
      ProductService.updateRouteStatus(product.id, 'READY_FOR_REPAIR');
      this.setState({products: updatedProducts});
    });
  }

  async handleChange(event, product) {
    console.log(event);

    await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product),
    });
    this.setState(this.state);
  }

  render() {
    const {products, isLoading} = this.state;

    if (isLoading) {
      return <LoadingScreen/>;
    }

    const data =
    [{
        id: '1',
        name: 'A'
      },
    {
          id: '2',
          name: 'B'
        },
        {
            id: '3',
            name: 'C'
          }]
    ;

    const options = data.map(d => ({
      "value" : d.id,
      "label" : d.name
    }));

    const serviceName = window.location.pathname.split("/")[1];
    const productList = products.map(product => {
      const modelDescription = `${product.model.color || ''} ${product.model.description || ''}`;
      const location = `${product.location || ''}`;
      const val = options.filter(o => o.label === product.metadata.cosmeticCode);

      return <tr key={product.id}>
        <td style={{whiteSpace: 'nowrap'}}>{product.supplier.name}</td>
        <td style={{whiteSpace: 'nowrap'}}>{product.model.brand.name}</td>
        <td style={{whiteSpace: 'nowrap'}}>{product.model.modelNumber}</td>
        <td style={{whiteSpace: 'nowrap'}}>{product.serialNumber}</td>
        <td style={{whiteSpace: 'nowrap'}}>{modelDescription}</td>
        <td style={{whiteSpace: 'nowrap'}}>
        <Form>
        <FormGroup>
          <Select key = {product.id} options={options} onChange={(event) => {product.metadata.cosmeticCode = event.label; this.handleChange(event, product);}} value = {val}/>
        </FormGroup>
        </Form>
        </td>
        <td style={{whiteSpace: 'nowrap'}}>{product.metadata.routeStatus}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="success" onClick={() => this.updateStatus(product)}>Ready For Repair</Button>
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
              <th width="10%">Description</th>
              <th width="10%">Cosmetic Code</th>
              <th width="10%">Status</th>
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

export default ProductList;
