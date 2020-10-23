import React, { Component, Spinner } from 'react';
import AppNavbar from '../AppNavbar';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';

export default class LoadingScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <AppNavbar/>
      </div>
    );
  }

}
