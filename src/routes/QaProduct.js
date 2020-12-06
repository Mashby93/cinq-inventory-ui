import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../AppNavbar';

class QaProduct extends Component {

  emptyItem = {
    createdAt: '',
    updatedAt: '',
    model: {},
    serialNumber: '',
    plot: {},
    supplier: {},
    metadata: {
      notes: {},
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
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const group = await (await fetch(`/api/products/${this.props.match.params.id}`)).json();
      this.setState({item: group});
    }
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
    this.setState({item});
  }

  async handleReject(item) {

    item.metadata.routeStatus = 'IN_REPAIR';

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

    item.metadata.routeStatus = 'READY_FOR_PACK_OUT';

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


    return <div>
      <AppNavbar/>
      <Container>
        <h2> QA Route </h2>
        <tr>
        <td style={{textAlign:"left"}}>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
          {checkList}
          </FormGroup>
          <FormGroup>
            <Button color="success" type="submit">Pass QA</Button>{' '}
            <Button color="danger" onClick={() => this.handleReject(item)}>Fail QA</Button>
          </FormGroup>
        </Form>
        </td>
          <td style={{textAlign:"right"}}>
        <h4> Technician: {item.metadata.technician || "Uknown"} </h4>
        <h4> Model Number: {item.model.modelNumber} </h4>
        <h4> Serial Number: {item.serialNumber} </h4>
        <h4> Error Code: {item.metadata.errorCode ? item.metadata.errorCode.code + " - " + item.metadata.errorCode.description : ""} </h4>
        </td>
        </tr>
      </Container>
    </div>;
  }
}

export default withRouter(QaProduct);
