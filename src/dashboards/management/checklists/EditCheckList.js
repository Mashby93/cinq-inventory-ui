import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../../../AppNavbar';
import Footer from '../../../Footer';
import { Link } from 'react-router-dom';
import Select from 'react-select';

class EditCheckList extends Component {

  item = {
    id: "",
    items: [
    {
      items: {
      },
      name: ""
    }
  ]
};

  constructor(props) {
    super(props);
    this.state = {item: this.item , category: "", newItem: "", categoryToChange: "", isLoading: true};
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleSetItemToAdd = this.handleSetItemToAdd.bind(this);
    this.handleSetCategoryToChange = this.handleSetCategoryToChange.bind(this);
    this.handleSetCategoryToRemove = this.handleSetCategoryToRemove.bind(this);
    this.handleTypeCategory = this.handleTypeCategory.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.handleRemoveCategory = this.handleRemoveCategory.bind(this);
  }


  async componentDidMount() {
    var item = this.state.item;
    const id = this.props.match.params.id;

    if (id) {
      item = await (await fetch(`/api/routes/reciece/${id}`)).json();
    }

    const suppliers = await (await fetch('/api/supplier/')).json();
    this.setState({item: item, suppliers:suppliers.content});
  }

  handleChangeName(event) {
    var item = this.state.item;

    item.id = event.target.value;
    this.setState({item: item});
  }

  handleTypeCategory(event) {
    console.log(event.target);
    this.setState({category: event.target.value})
  }

  handleRemoveItem(index, category) {
    var item = this.state.item;
    var c = item.items.filter(cat => cat.name == category);
    delete c[0].items[index];
    this.setState({item: item});
  }

  handleAddItem(event) {
    var item = this.state.item;
    var category = item.items.filter(cat => this.state.categoryToChange == cat.name);
    category[0].items[this.state.newItem] = "false";
    this.setState({item: item, newItem: ""});
  }

  handleSetItemToAdd(event) {
    this.setState({newItem: event.target.value})
  }

  handleSetCategoryToChange(event) {
    this.setState({categoryToChange: event.value})
  }

  handleSetCategoryToRemove(event) {
    this.setState({categoryToRemove: event.value})
  }

  handleAddCategory(event) {
    var item = this.state.item;

    var cat = {
      name: this.state.category,
      items: {}
    }
    item.items.push(cat);
    this.setState({item: item, category: ""});
  }

  handleRemoveCategory(event) {
    var item = this.state.item;
    var categories = item.items;

    for( var i = 0; i < categories.length; i++){

        if ( categories[i].name == this.state.categoryToRemove) {

            categories.splice(i, 1);
        }

    }

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
    const title = <h2>{this.props.match.params.id ? 'Edit Checklist' : 'Create Checklist'}</h2>;
    const options = item.items.map(d => ({
      "value" : d.name,
      "label" : d.name
    }));
    const data = item.items.map(i => {
      const values = Object.keys(i.items).map((k, t) => {
        return <tr>
        <td>
        {k}
        </td>
        <td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="danger" onClick={() => this.handleRemoveItem(k,i.name)}>Remove</Button>
          </ButtonGroup>
        </td>
        </td>
        </tr>
      }
    );
      return <div>
      <h2>{i.name}</h2>
      {values}
       </div>;
    });

      return <div>
        <AppNavbar/>
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
          <tr>
            <td>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input onChange={this.handleChangeName} value={item.id}/>
          </FormGroup>
          <FormGroup>
          <Label for="name">Add Category</Label>
          <Input onChange={this.handleTypeCategory} value={this.state.category}/>
            <Button color="primary" onClick={this.handleAddCategory}>Add</Button>{' '}
          </FormGroup>
          <FormGroup>
            <Label for="name">Remove Category</Label>
            <Select options={options} onChange={this.handleSetCategoryToRemove}/>
            <Button color="danger" onClick={this.handleRemoveCategory}>Remove</Button>{' '}
          </FormGroup>
          <FormGroup>
            <Label for="name">Add Item to Category</Label>
            <Select options={options} onChange={this.handleSetCategoryToChange}/>
            <Input onChange={this.handleSetItemToAdd} value={this.state.newItem}/>
            <Button color="primary" onClick={this.handleAddItem}>Add</Button>{' '}
          </FormGroup>
            </td>
            <td>
            {data}
            </td>
          </tr>
          </Form>
        </Container>
        <Footer/>
      </div>

      ;
  }

}

export default EditCheckList;
