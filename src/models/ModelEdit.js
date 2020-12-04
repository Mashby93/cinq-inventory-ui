import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../AppNavbar';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import Select from 'react-select';

class ModelEdit extends Component {

  model = {
    modelNumber: '',
    color: '',
    description: '',
    type: {
      id: "",
      name: ""
    },
    supplier: {
      id:"",
      name: ""
    },
    metadata: {
      checkList:{
        id:""
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {item: this.model , suppliers: [], types:[], checklists:[], isLoading: true};
    this.handleChangeSupplier = this.handleChangeSupplier.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeModel = this.handleChangeModel.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeCheckList = this.handleChangeCheckList.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async componentDidMount() {
    var item = this.state.item;
    const suppliers = await (await fetch('/api/supplier/')).json();
    this.setState({item: item, suppliers:suppliers.content});
  }

  handleChangeSupplier(event) {
    let item = {...this.state.item};
    let supplier = this.state.suppliers.filter(s => s.id == event.value);

    if (supplier.length > 0) {
      item["supplier"] = supplier[0];
      this.setState({item: item});
    }
  }

  handleChangeType(event) {
    let item = this.state.item;
    let type = this.state.types.filter(t => t.id == event.value);

    if (type.length > 0) {
      item["type"] = type[0];
      this.setState({item: item});
    }
  }

  handleChangeCheckList(event) {
    let item = this.state.item;
    let checklist = this.state.checklists.filter(t => t.id == event.value);

    if (checklist.length > 0) {
      item.metadata["checkList"] = checklist[0];
      this.setState({item: item});
    }

  }

  handleChangeColor(event) {
    let item = this.state.item;
    item["color"] = event.target.value;
    this.setState({item: item});
  }

  handleChangeModel(event) {
    let item = this.state.item;
    item["modelNumber"] = event.target.value;
    this.setState({item: item});
  }

  handleChangeDescription(event) {
    let item = this.state.item;
    item["description"] = event.target.value;
    this.setState({item: item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/api/models', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/groups');
  }

  render() {

    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Model' : 'Create Model'}</h2>;

    const data = this.state.suppliers;

    const options = data.map(d => ({
      "value" : d.id,
      "label" : d.name
    }));

    const val = options.filter(o => o.value === item.supplier.id);

    const types = this.state.types.map(t => ({
      "value" : t.id,
      "label" : t.name
    }));

    const type = types.filter(t => t.value === item.type.id);

    const checklists = this.state.checklists.map(t => ({
      "value" : t.id,
      "label" : t.name
    }));

    const cl = checklists.filter(t => t.value === item.metadata.checkList.id);

      return <div>
        <AppNavbar/>
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="supplier">Supplier</Label>
            <Select options={options} onChange={this.handleChangeSupplier} value={val}/>
          </FormGroup>
          <FormGroup>
            <Label for="type">Type</Label>
            <Select options={types} onChange={this.handleChangeType} value={type}/>
          </FormGroup>
          <FormGroup>
            <Label for="checklist">Checklist</Label>
            <Select options={checklists} onChange={this.handleChangeCheckList} value={cl}/>
          </FormGroup>
            <FormGroup>
              <Label for="modelNumber">Model Number</Label>
              <Input type="text" name="modelNumber" id="modelNumber" value={item.name}
                     onChange={this.handleChangeModel} autoComplete="address-level1"/>
            </FormGroup>
            <FormGroup>
              <Label for="color">Color</Label>
              <Input type="text" name="color" id="color" value={item.color}
                     onChange={this.handleChangeColor} autoComplete="address-level1"/>
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input type="text" name="description" id="description" value={item.description}
                     onChange={this.handleChangeDescription} autoComplete="address-level1"/>
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">Save</Button>{' '}
              <Button color="secondary" tag={Link} to="/receivables">Cancel</Button>
            </FormGroup>
          </Form>
        </Container>
        <Footer/>
      </div>

      ;
  }

}

export default ModelEdit;
