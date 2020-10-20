import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import ItemsList from './components/ItemsList';
import Select from 'react-select';

class RepairProduct extends Component {

  emptyItem = {
    createdAt: '',
    updatedAt: '',
    model: {},
    serialNumber: '',
    plot: {},
    supplier: {},
    metadata: {
      checkList: {
        items: [{
          name: '',
          items:{}
        }],
        errorCode:{
          id: '',
          code: '',
          description: '',
          type: ''
        }
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
      errorCodes: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeErrorCode = this.handleChangeErrorCode.bind(this);
  }


  async componentDidMount() {
    var item = this.state.item;
    const id = this.props.match.params.id;

    if (id) {
      item = await (await fetch(`/api/products/${this.props.match.params.id}`)).json();
    }

    const errorCodes = await (await fetch('/api/errors/')).json();

    this.setState({item: item, errorCodes: errorCodes.content});
  }

  async handleChange(event) {
    event.persist();
    console.log(event);
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item.metadata.checkList.items.map(i => {
        if (name in i.items) {
            i.items[name] = i.items[name] == true ? false : true;
        }
    });
    this.setState({item: item, errorCodes: this.state.errorCodes});
  }

  async handleChangeErrorCode(event) {
    console.log(event);
    let item = this.state.item;
    const value = event.value;
    const codes = this.state.errorCodes.filter(code => code.id === value);

    if (codes.length > 0) {
      item.metadata.errorCode = codes[0];
    }

    this.setState({item: item, errorCodes: this.state.errorCodes});
  }

  async handleReject(item) {
    item.metadata.routeStatus = 'READY_FOR_QA';

    await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
  }

  render() {
    const {item} = this.state;

    const checkList = item.metadata.checkList.items.map(i => {
      let data = Object.keys(i.items).map((k, t) => {
        return <tr>
        <td>
        <input type="checkbox" id = {k} name = {k} checked={i.items[k]} value= {i.items[k]} onChange={this.handleChange}/>
        </td>
        <td>
        &nbsp;
        </td>
        <td>
          {k}
        </td>
        </tr>
      }
    );

      return <div>
       <h2> {i.name}</h2>
          {data}
            </div>
    });

    const data = this.state.errorCodes;

    const options = data.map(d => ({
      "value" : d.id,
      "label" : d.code + " - " + d.description
    }));

    console.log(item);
    var val;
    if (item.metadata.errorCode) {
      val = options.filter(o => o.value === item.metadata.errorCode.id);
    } 

    return <div>
      <AppNavbar/>
      <Container>
        <h2> Repair Route </h2>
        <tr>
        <td style={{textAlign:"left"}}>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
          {checkList}
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="success" onClick={() => this.handleReject(item)}>Ready For QA</Button>
          </FormGroup>
        </Form>
        </td>
          <td style={{textAlign:"right"}}>
        <h4> Technician: {item.metadata.technician || "Demo User"} </h4>
        <h4> Model Number: {item.model.modelNumber} </h4>
        <h4> Serial Number: {item.serialNumber} </h4>
        <Form onSubmit={this.handleSubmit}>
        <Select options={options} onChange={(event) => {this.handleChangeErrorCode(event)}} value = {val}/>
        </Form>
        </td>
        </tr>
      </Container>
    </div>;
  }
}

export default withRouter(RepairProduct);
