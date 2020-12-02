import React, { Component } from 'react';
import AppNavbar from './AppNavbar.js';
import Footer from './Footer.js';

class Home extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
      <AppNavbar/>
        <span>Welcome to Cinq Fortune</span>
      <Footer/>
      </div>
    );
  }

}

export default Home;
