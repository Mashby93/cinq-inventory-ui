import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './ProductList';
import ProductReceivables from './ProductReceivables';
import ReceiveProduct from './ReceiveProduct';
import ProductEdit from './ProductEdit';
import ModelEdit from './ModelEdit';
import Login from './Login';
import CosmeticReceivable from './CosmeticReceivable.js';
import RepairProductList from './RepairProductList.js';
import RepairProduct from './RepairProduct.js'
import QAList from './QAList.js';
import QaProduct from './QaProduct.js';
import PackOutList from './PackOutList.js';
import Reports from './Reports.js';

class App extends Component {
  render() {

    return (
      <Router>
        <Switch>
          <Route path='/login' exact={true} component={Login}/>
          <Route path='/products' exact={true} component={ProductList}/>
          <Route path='/products/:id/details' exact={true} component={ProductEdit}/>
          <Route path='/receivables' exact={true} component={ProductReceivables}/>
          <Route path='/receivables/receive' exact={true} component={ReceiveProduct}/>
          <Route path='/receivables/:id/receive' exact={true} component={ReceiveProduct}/>
          <Route path='/cosmetics' exact={true} component={CosmeticReceivable}/>
          <Route path='/repair' exact={true} component={RepairProductList}/>
          <Route path='/repair/:id/details' exact={true} component={RepairProduct}/>
          <Route path='/qa' exact={true} component={QAList}/>
          <Route path='/qa/:id/details' exact={true} component={QaProduct}/>
          <Route path='/pack-out' exact={true} component={PackOutList}/>
          <Route path='/reports' exact={true} component={Reports}/>
          <Route path='/models/new' exact={true} component={ModelEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
