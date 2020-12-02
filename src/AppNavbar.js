import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import AuthService from "./AuthService";

export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      user:AuthService.getCurrentUser()
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
      user:this.state.user
    });
  }

  handleLogout() {
    AuthService.logout();
    window.location.reload();
  }

  render() {
    const user = this.state.user;

    return <Navbar color="dark" dark expand="md" sticky="top">
      <NavbarBrand tag={Link} to="/"><a href="#" class="pull-left"><img src={process.env.PUBLIC_URL + '/cinq-logo.png'} height="50" width="50"></img></a> </NavbarBrand>
      <NavbarToggler onClick={this.toggle}/>
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink
              href="/receivables">Receivables</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/cosmetics">Cosmetics</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/repair">Repair</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/qa">QA</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/pack-out">Pack Out</NavLink>
          </NavItem>
          <NavItem>
          <UncontrolledDropdown setActiveFromChild>
            <DropdownToggle tag="a" className="nav-link" caret>
              Management
              </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem tag="a" href="/management/reports">Manage Reports</DropdownItem>
              <DropdownItem tag="a" href="/management/users">Manage Users</DropdownItem>
              <DropdownItem tag="a" href="/management/errors">Manage Error Codes</DropdownItem>
              <DropdownItem tag="a" href="/management/types">Manage Model Types</DropdownItem>
              <DropdownItem tag="a" href="/management/checklists">Manage Checklists</DropdownItem>
              <DropdownItem tag="a" href="/management/supplier">Create Supplier</DropdownItem>
              <DropdownItem tag="a" href="/management/model">Create Model</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <UncontrolledDropdown setActiveFromChild>
              <DropdownToggle tag="a" className="nav-link" caret>
                <img src={process.env.PUBLIC_URL + '/person-circle.svg'} height="30" width="30"></img>
                </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag="a" href="/blah">Manage Account</DropdownItem>
                <DropdownItem onClick={() => this.handleLogout()}>Log out</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>;
  }
}
