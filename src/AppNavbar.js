import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {

    return <Navbar color="dark" dark expand="md">
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
            <NavLink href="/management-dashboard">Management Dashboard</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <UncontrolledDropdown setActiveFromChild>
              <DropdownToggle tag="a" className="nav-link" caret>
                <img src={process.env.PUBLIC_URL + '/person-circle.svg'} height="50" width="50"></img>
                </DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag="a" href="/blah" active>Manage Account</DropdownItem>
                <DropdownItem tag="a" href="/blah" active>Log out</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>;
  }
}
