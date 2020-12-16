import React, { Component, useState } from 'react';
import { Button, Container, Form, FormGroup, Input, Label, DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';
import AppNavbar from '../AppNavbar';
import { Link, withRouter } from 'react-router-dom';
import Select from 'react-select';

class PackOut extends Component {

  emptyItem = {
    createdAt: '',
    updatedAt: '',
    model: {},
    serialNumber: '',
    plot: {},
    supplier: {},
    metadata: {
      errorCode: {
        id: '',
        code: '',
        description: '',
        type: ''
      },
      checkList: {
        items: [{
          name: '',
          items:{}
        }]
      },
      newSerialNumber: ""
    }
  };

constructor(props) {
  super(props);

  this.state = {
    item: this.emptyItem,
    suppliers: [],
    models:[]
  };

  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleChangeSerial = this.handleChangeSerial.bind(this);
}

async componentDidMount() {
  var item = this.state.item;
  const id = this.props.match.params.id;

  if (id) {
    item = await (await fetch(`/api/products/${id}`)).json();
  }

  const suppliers = await (await fetch('/api/supplier/')).json();
  const models = await (await fetch('/api/models/')).json()
  this.setState({item: item, suppliers:suppliers.content, models:models.content});
}

async handleChangeSerial(event) {
  const target = event.target;
  const value = target.value;
  const name = target.name;
  let item = {...this.state.item};
  item.metadata.newSerialNumber = value;
  this.setState({item: item, suppliers: this.state.suppliers, models: this.state.models});
}

handleSubmit(event) {
  event.preventDefault();
  const {item} = this.state;
  item.metadata.routeStatus = 'PACK_OUT';
  console.log(item);
  fetch('/api/products', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item),
  });
  this.props.history.push('/pack-out');
}

render() {

  if (!(this.state || this.state.item || this.state.suppliers)) {
    return "Loading...";
  }
  const item = this.state.item;
  //console.log(this.state.suppliers);
  const data = this.state.suppliers;

  const options = data.map(d => ({
    "value" : d.id,
    "label" : d.name
  }));

  const val = options.filter(o => o.value === item.model.supplier.id);
  //const val = options.filter(o => o.value === item.supplier.id);

  return <div>

    <Container>
      <h2>Pack Out Product</h2>
      <tr>
        <td style={{textAlign:"left"}}>
          <h4> Technician: {item.metadata.technician || "Uknown"} </h4>
          <h4> Model Number: {item.model.modelNumber} </h4>
          <h4> Serial Number: {item.serialNumber} </h4>
          <h4> Error Code: {item.metadata.errorCode ? item.metadata.errorCode.code + " - " + item.metadata.errorCode.description : ""} </h4>
      </td>
      </tr>
      <tr>
      <td style={{textAlign:"left"}}>
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="newSerialNumber">New Serial Number</Label>
          <Input type="text" name="newSerialNumber" id="newSerialNumber" value={item.metadata.newSerialNumber} onChange={(event) => this.handleChangeSerial(event)}/>
        </FormGroup>
        <FormGroup>
          <Button color="primary" type="submit">Save</Button>
          <Button color="secondary" tag={Link} to="/receivables">Cancel</Button>
        </FormGroup>
      </Form>
      </td>
      </tr>
    </Container>
  </div>;
}
}

export default withRouter(PackOut);
