import React from "react"
import AppNavbar from './AppNavbar';
import Footer from "./Footer"

export default class MainLayout extends React.Component{
  render() {
      return(
         <div>
            <AppNavbar />
              <div className="appLayout">
                { this.props.children }
              </div>
            <Footer />
         </div>
      );
  }
}
