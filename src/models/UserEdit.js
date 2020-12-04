import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import UserService from "../services/UserService";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      firstName: "",
      lastName: "",
      loading: false,
      emailAddress: "",
      password: ""
    };
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      let promise = UserService.getUser(this.props.match.params.id);

      promise.then(user => {
        this.setState({
          id:user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          loading: false,
          emailAddress: user.userName,
          password: ""
        })
      })
    }
  }

  onChangeFirstname(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      UserService.editUser(
        this.state.id,
        this.state.firstName,
        this.state.lastName,
        this.state.emailAddress,
        this.state.password
      )
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >

          <tr>
            <td>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.onChangeFirstname}
                  validations={[required]}
                  />
              </div>
            </td>
            <td>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.onChangeLastName}
                  validations={[required]}
                  />
              </div>
            </td>
          </tr>
            <div className="form-group">
              <label htmlFor="emailAddress">Email</label>
              <Input
                type="text"
                className="form-control"
                name="emailAddress"
                value={this.state.emailAddress}
                onChange={this.onChangeEmail}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Save</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
