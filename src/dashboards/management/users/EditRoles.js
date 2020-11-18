import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Button, ButtonGroup, Container, Table } from 'reactstrap';

import AppNavbar from "../../../AppNavbar.js";
import UserService from '../../../services/UserService.js';
import ManagementService from "../../../services/ManagementService.js";

const roleOptions = [
        {id: 1, value: "ADMIN", isChecked: false},
        {id: 2, value: "RECEIVER", isChecked: false},
        {id: 3, value: "COSMETIC", isChecked: false},
        {id: 4, value: "TECHNICIAN", isChecked: false},
        {id: 5, value: "QA", isChecked: false},
        {id: 6, value: "SHIPPER", isChecked: false}
      ];

export default class UserRoles extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);

    this.state = {
      firstName: "",
      lastName: "",
      loading: false,
      roles: []
    };
  }

  componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      let promise = UserService.getUser(this.props.match.params.id);

      promise.then(user => {
        this.setState({
          id:user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          loading: false,
          roles: user.roles
        })
      })
    }
  }

  onChangeRole(e) {
    let val = e.target.value;
    let i = this.state.roles.indexOf(val);

    if (i === -1) {
        this.state.roles.push(val);
    } else {
      delete this.state.roles[i];
    }

    this.setState(this.state);
  }

  handleLogin(e) {
    e.preventDefault();

    ManagementService.editUserRoles(this.state.id, this.state.roles);
  }

  render() {

    const checkBoxItems = roleOptions.map(option => {
      return (
        <tr>
         <td>
       <input
        type="checkbox"
        id={option.id}
        name={option.value}
        value={option.value}
        checked={this.state.roles.includes(option.value)}
        onChange={(event) => this.onChangeRole(event)}
      />
      </td>
      <td>
      {option.value}
      </td>
      </tr>
    )
    })

    return (
      <div className="col-md-12">
        <AppNavbar/>
        <div className="card card-container">
        <h4>{this.state.lastName}, {this.state.firstName}</h4>
          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            {checkBoxItems}
            <Button color="success" type="submit">Save</Button>{' '}
          </Form>
        </div>
      </div>
    );
  }
}
