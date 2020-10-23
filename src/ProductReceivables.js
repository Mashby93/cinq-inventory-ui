import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';

class ProductReceivables extends Component {

  constructor(props) {
    super(props);
    this.state = {products: [], isLoading: true};
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/products/bulk?statusCodes=RECEIVED')
      .then(response => response.json())
      .then(data => this.setState({products: data, isLoading: false}));
  }

  async updateStatus(product) {
    console.log(product);

    product.metadata.routeStatus='IN_COSMETIC';
        console.log(JSON.stringify(product));
    await fetch(`/api/products`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    }).then(() => {
      let updatedProducts = [...this.state.products].filter(i => i.id !== product.id);
      this.setState({products: updatedProducts});
    });
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
        <td style={{whiteSpace: 'nowrap'}}>{product.model.modelNumber}</td>
        <td style={{whiteSpace: 'nowrap'}}>{product.serialNumber}</td>
        <td style={{whiteSpace: 'nowrap'}}>{modelDescription}</td>
        <td style={{whiteSpace: 'nowrap'}}>{product.metadata.routeStatus}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/receivables/" + product.id + "/receive"}>Edit</Button>
            <Button size="sm" color="success" onClick={() => this.updateStatus(product)}>Send To Cosmetic</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/receivables/receive">Receive Product</Button>
          </div>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="10%">Supplier</th>
              <th width="10%">Model</th>
              <th width="10%">Serial</th>
              <th width="30%">Description</th>
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

export default ProductReceivables;
