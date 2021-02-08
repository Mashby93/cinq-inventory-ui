import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../AppNavbar';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import CategoryService from '../services/CategoryService';
import BrandService from '../services/BrandService';
import ChecklistService from '../services/ChecklistService';
import ModelService from '../services/ModelService';

class ModelEdit extends Component {

  model = {
    modelNumber: '',
    color: '',
    description: '',
    category: {
      id: null,
      name: ""
    },
    brand: {
      id:"",
      name: ""
    },
    metaData: {
      checkList:{
        id: null
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {item: this.model , brands: [], types:[], checklists:[], isLoading: true, error:""};
    this.handleChangeBrand = this.handleChangeBrand.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeModel = this.handleChangeModel.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeCheckList = this.handleChangeCheckList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  async componentDidMount() {
    const id = this.props.match.params.id;

    if (id) {
      const group = await (await fetch(`/api/models/${id}`)).json();
      this.setState({item: group});
    }

    BrandService.getAllBulk().then(s => {
      this.setState({brands: s});
    })
    CategoryService.getAllBulk().then(t => {
      this.setState({types: t});
      });
    ChecklistService.getAllBulk().then(c => {
      this.setState({checklists: c});
    })
  }

  handleChangeBrand(event) {
    let item = {...this.state.item};
    let supplier = this.state.brands.filter(s => s.id == event.value);

    if (supplier.length > 0) {
      item["brand"] = supplier[0];
      this.setState({item: item});
    }
  }

  handleChangeType(event) {
    let item = this.state.item;
    let type = this.state.types.filter(t => t.id == event.value);

    if (type.length > 0) {
      item["category"] = type[0];
      this.setState({item: item});
    }
  }

  handleChangeCheckList(event) {
    let item = this.state.item;
    let checklist = this.state.checklists.filter(t => t.id == event.value);

    if (checklist.length > 0) {
      item.metaData["checkList"] = checklist[0];
      this.setState({item: item});
    }

    console.log(this.state.item);

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
    ModelService.save(item)
    .then(() => {
      this.props.history.push("/management/models");
      window.location.reload();
    }, error => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      this.setState({
        error: resMessage
      });
    });
  }

  render() {

    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Model' : 'Create Model'}</h2>;

    const data = this.state.brands;

    const options = data.map(d => ({
      "value" : d.id,
      "label" : d.name
    }));

    const val = options.filter(o => item.brand === undefined || item.brand === null ? false : o.value === item.brand.id);

    const types = this.state.types.map(t => ({
      "value" : t.id,
      "label" : t.name
    }));

    const type = types.filter(t => item.category === undefined || item.category === null ? false : t.value === item.category.id);

    const checklists = this.state.checklists.map(t => ({
      "value" : t.id,
      "label" : t.id
    }));

    const cl = checklists.filter(t => item.metaData.checkList === undefined || item.metaData.checkList === null ? false : t.value === item.metaData.checkList.id);

      return <div>

        <Container>
          {title}
          {this.state.error}
          <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="supplier">Brand</Label>
            <Select options={options} onChange={this.handleChangeBrand} value={val} required="true"/>
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
              <Input type="text" name="modelNumber" id="modelNumber" value={item.modelNumber}
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

      </div>

      ;
  }

}

export default ModelEdit;
