import React, { Component, useState } from 'react';
import { Button, Container, Form, FormGroup, Input, Label, DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';
import AppNavbar from '../../../AppNavbar';
import { Link, withRouter } from 'react-router-dom';
import Select from 'react-select';
import CategoryService from '../../../services/CategoryService';

class EditCategory extends Component {

constructor(props) {
  super(props);

  this.state = {
    item: CategoryService.getEmptyItem()
  };

  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleChangeName = this.handleChangeName.bind(this);
}

async handleChangeName(event) {
  let item = {...this.state.item};
  item.name = event.target.value;
  this.setState({item: item});
}

componentDidMount() {
  const id = this.props.match.params.id;

  if (id) {
    let item = CategoryService.getById(id)
    .then(item => {
      this.setState({item: item});
    });
  }
}

handleSubmit(event) {
  event.preventDefault();
  const {item} = this.state;
  CategoryService.save(item);
}

render() {

  if (!(this.state || this.state.item)) {
    return "Loading...";
  }

  const item = this.state.item;

  return <div>
    <Container>
      <h2>Manage Category</h2>
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="modelNumber">Category Name</Label>
          <Input type="text" name="supplierName" id="supplierName" value={item.name} onChange={(event) => this.handleChangeName(event)}/>
        </FormGroup>
        <FormGroup>
          <Button color="primary" type="submit">Save</Button>
          <Button color="secondary" tag={Link} to="management/types">Cancel</Button>
        </FormGroup>
      </Form>
    </Container>
  </div>;
}
}

export default withRouter(EditCategory);
