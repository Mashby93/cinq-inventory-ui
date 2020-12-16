import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../AppNavbar';
import ItemsList from '../components/ItemsList';
import Select from 'react-select';

import ProductService from '../services/ProductService';
import JobCodeService from '../services/JobCodeService';
import ErrorCodeService from '../services/ErrorCodeService';
import AuthService from '../AuthService';

class RepairProduct extends Component {

  emptyItem = {
    createdAt: '',
    updatedAt: '',
    model: {},
    serialNumber: '',
    plot: {},
    supplier: {},
    metadata: {
      partNumbers:[],
      jobCode: null,
      notes: [],
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
      errorCodes: [],
      jobCodes: [],
      note:"",
      partNumber:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeErrorCode = this.handleChangeErrorCode.bind(this);
    this.handleChangeJobCode = this.handleChangeJobCode.bind(this);
    this.handleAddNote = this.handleAddNote.bind(this);
    this.handleAddPartNumber = this.handleAddPartNumber.bind(this);
  }


  componentDidMount() {
    const id = this.props.match.params.id;

    if (id) {
      ProductService.getById(id)
      .then(data => {
        if (!data.metadata.partNumbers) {
          data.metadata["partNumbers"] = [];
        }
        this.setState({item: data}, function() {
          let item = this.state.item;

          console.log(item);
          if (item && item.model.category) {
            ErrorCodeService.getByTypeId(item.model.category.id)
              .then(data => {
                this.setState({errorCodes: data});
              });
          }
        });
      });
    }

    JobCodeService.getAllBulk()
      .then(data => {
        this.setState({jobCodes: data});
      });

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

  async handleChangeJobCode(event) {
    console.log(event);
    let item = this.state.item;
    const value = event.value;
    const codes = this.state.jobCodes.filter(code => code.id === value);

    if (codes.length > 0) {
      item.metadata.jobCode = codes[0];
    }

    this.setState({item: item});
  }

  async handleReject(item) {
    item.metadata.routeStatus = 'READY_FOR_QA';
    this.setTechnician(item);

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
    let {item} = this.state;
    this.setTechnician(item);

    await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
  }

  setTechnician(item) {
    item.metadata["techName"] = AuthService.getCurrentUser().id;
  }

  handleAddNote(event) {
    event.preventDefault();
    let {item} = this.state;
    let promise = ProductService.addNote(item.id, this.state.note);

    promise.then(data => {
      item.metadata.notes = data;
    });

    this.setState({item: item, errorCodes: this.state.errorCodes, note:""});
  }

  handleAddPartNumber(event) {
    event.preventDefault();
    let {item} = this.state;
    let promise = ProductService.addPartNumber(item.id, this.state.partNumber);

    promise.then(data => {
      item.metadata.partNumbers = data;
    });

    this.setState({item: item, partNumber:""});
  }

  handleChangeNote(event) {
    this.setState({note: event.target.value})
  }

  handleChangePartNumber(event) {
    this.setState({partNumber: event.target.value})
  }

  render() {
    const {item} = this.state;
    console.log(item);
    console.log(this.state.jobCodes);

    const notes = item.metadata.notes.map(n => {
      return <div> {n} </div>
    });

    const partNumbers = item.metadata.partNumbers.map(n => {
      return <div> {n} </div>
    });

    const checkList = item.metadata.checkList === undefined || item.metadata.checkList === null || item.metadata.checkList.items === undefined || item.metadata.checkList.items === null ? "" : item.metadata.checkList.items.map(i => {
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

    const jobs = this.state.jobCodes.map(d => ({
      "value" : d.id,
      "label" : d.code + " - " + d.description
    }));

    console.log(item);

    var val;
    if (item.metadata.errorCode) {
      val = options.filter(o => o.value === item.metadata.errorCode.id);
    }

    var jobCode;

    if (item.metadata.jobCode) {
      jobCode = jobs.filter(j => j.value === item.metadata.jobCode.id);
    }

    return <div>

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
        <h4> Failure Code:</h4><Select options={options} onChange={(event) => {this.handleChangeErrorCode(event)}} value = {val}/>
        <h4> Job Code:</h4><Select options={jobs} onChange={(event) => {this.handleChangeJobCode(event)}} value = {jobCode}/>
        <h4> Part Numbers: </h4>
        {partNumbers}
        <Form onSubmit={this.handleAddPartNumber}>
        <FormGroup>
          <Input type="text" name="note" id="note" onChange={(event) => this.handleChangePartNumber(event)}/>
          <Button color="primary" type="submit">Add</Button>
        </FormGroup>
        </Form>
        <h4> Notes:</h4>
        {notes}
        <Form onSubmit={this.handleAddNote}>
        <FormGroup>
          <Input type="text" name="note" id="note" onChange={(event) => this.handleChangeNote(event)}/>
          <Button color="primary" type="submit">Add</Button>
        </FormGroup>
        </Form>
        </td>
        </tr>
      </Container>
    </div>;
  }
}

export default withRouter(RepairProduct);
