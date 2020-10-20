import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class ModelEdit extends Component {

  model = {
    modelNumber: '',
    color: '',
    description: '',
    metaData: {
      checkList: {
        items: []
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {item: this.model , isLoading: true};
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
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

      return <div>
        <AppNavbar/>
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="modelNumber">Model Number</Label>
              <Input type="text" name="modelNumber" id="modelNumber" value={item.name || ''}
                     onChange={this.handleChange} autoComplete="address-level1"/>
            </FormGroup>
            <FormGroup>
              <Label for="color">Color</Label>
              <Input type="text" name="color" id="color" value={item.color || ''}
                     onChange={this.handleChange} autoComplete="address-level1"/>
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input type="text" name="description" id="description" value={item.description || ''}
                     onChange={this.handleChange} autoComplete="address-level1"/>
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
