import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './models/ProductList';
import ProductReceivables from './routes/listings/ProductReceivables';
import ReceiveProduct from './routes/ReceiveProduct';
import ProductEdit from './models/ProductEdit';
import ModelEdit from './models/ModelEdit';
import Login from './Login';
import CosmeticReceivable from './routes/listings/CosmeticReceivable.js';
import RepairProductList from './routes/listings/RepairProductList.js';
import RepairProduct from './routes/RepairProduct.js'
import QAList from './routes/listings/QAList.js';
import QaProduct from './routes/QaProduct.js';
import PackOutList from './routes/listings/PackOutList.js';
import PackOut from './routes/PackOut.js';
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
          <Route path='/pack-out/:id/details' exact={true} component={PackOut}/>
          <Route path='/reports' exact={true} component={Reports}/>
          <Route path='/models/new' exact={true} component={ModelEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
