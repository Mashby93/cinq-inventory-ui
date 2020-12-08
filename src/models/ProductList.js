import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../AppNavbar';
import { Link } from 'react-router-dom';

class ProductList extends Component {

  constructor(props) {
    super(props);
    this.state = {products: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/products/bulk')
      .then(response => response.json())
      .then(data => this.setState({products: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedProducts = [...this.state.products].filter(i => i.id !== id);
      this.setState({products: updatedProducts});
    });
  }

  render() {
    const {products, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const serviceName = window.location.pathname.split("/")[1];
    const productList = products.map(product => {
      const modelDescription = `${product.model.color || ''} ${product.model.description || ''}`;
      return <tr key={product.id}>
        <td style={{whiteSpace: 'nowrap'}}>{product.supplier.name}</td>
        <td style={{whiteSpace: 'nowrap'}}>{product.model.modelNumber}</td>
        <td style={{whiteSpace: 'nowrap'}}>{product.serialNumber}</td>
        <td style={{whiteSpace: 'nowrap'}}>{modelDescription}</td>
        <td style={{whiteSpace: 'nowrap'}}></td>
        <td style={{whiteSpace: 'nowrap'}}>{product.metadata.routeStatus}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/products/" + product.id + "/details"}>View Details</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/products/new">Add Product</Button>
          </div>
          <h3>{serviceName}</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="10%">Supplier</th>
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

export default ProductList;
