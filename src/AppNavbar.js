import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import AuthService from "./AuthService";
import IdleService from "./services/IdleService";

const roles = ["RECEIVER",
    "COSMETIC",
    "TECHNICIAN",
    "QA",
    "SHIPPER"];

export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      user:AuthService.getCurrentUser()
    };
    this.toggle = this.toggle.bind(this);
    this.canSee = this.canSee.bind(this);
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

  canSee(value) {
    if (!this.state.user) {
      return false;
    }

    if (this.state.user["roles"].includes("ADMIN")) {
      return true;
    }

    return this.state.user["roles"].includes(value);
  }

  render() {
    const user = this.state.user;

    console.log(user);
    var navItems = [];

    if (this.canSee("RECEIVER")) {
         navItems.push(<NavItem>
          <NavLink
            href="/receivables">Receivables</NavLink>
        </NavItem>);
      }

    if (this.canSee("COSMETIC")) {
        navItems.push(<NavItem>
          <NavLink href="/cosmetics">Cosmetics</NavLink>
        </NavItem>);
      }

    if (this.canSee("TECHNICIAN")) {
        navItems.push(<NavItem>
          <NavLink href="/repair">Repair</NavLink>
        </NavItem>);
      }
    if (this.canSee("QA")) {
        navItems.push(<NavItem>
          <NavLink href="/qa">QA</NavLink>
        </NavItem>);
      }

    if (this.canSee("SHIPPER")) {
        navItems.push(<NavItem>
          <NavLink href="/pack-out">Pack Out</NavLink>
        </NavItem>);
      }

    if (this.canSee("ADMIN")) {
      navItems.push(<NavItem>
      <UncontrolledDropdown setActiveFromChild>
        <DropdownToggle tag="a" className="nav-link" caret>
          Management
          </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem tag="a" href="/management/reports">Manage Reports</DropdownItem>
          <DropdownItem tag="a" href="/management/users">Manage Users</DropdownItem>
          <DropdownItem tag="a" href="/management/errors">Manage Error Codes</DropdownItem>
          <DropdownItem tag="a" href="/management/types">Manage Model Categories</DropdownItem>
          <DropdownItem tag="a" href="/management/checklists">Manage Checklists</DropdownItem>
          <DropdownItem tag="a" href="/management/supplier">Create Supplier</DropdownItem>
          <DropdownItem tag="a" href="/management/model">Create Model</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      </NavItem>);
    }

    console.log("navItems: " + navItems);

    return <Navbar color="dark" dark expand="md" sticky="top">
      <NavbarBrand tag={Link} to="/"><a href="#" class="pull-left"><img src={process.env.PUBLIC_URL + '/cinq-logo.png'} height="50" width="50"></img></a> </NavbarBrand>
      <NavbarToggler onClick={this.toggle}/>
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="mr-auto" navbar>
          {navItems}
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
