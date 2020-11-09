import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.js';
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
import UserList from './dashboards/management/users/UserList.js';
import UserEdit from './models/UserEdit.js';

class App extends Component {
  render() {

    return (
      <Router>
        <Switch>
          <Route path='/login' exact={true} component={Login}/>
          <PrivateRoute path='/products' exact={true} component={ProductList}/>
          <PrivateRoute path='/products/:id/details' exact={true} component={ProductEdit}/>
          <PrivateRoute path='/receivables' exact={true} component={ProductReceivables}/>
          <PrivateRoute path='/receivables/receive' exact={true} component={ReceiveProduct}/>
          <PrivateRoute path='/receivables/:id/receive' exact={true} component={ReceiveProduct}/>
          <PrivateRoute path='/cosmetics' exact={true} component={CosmeticReceivable}/>
          <PrivateRoute path='/repair' exact={true} component={RepairProductList}/>
          <PrivateRoute path='/repair/:id/details' exact={true} component={RepairProduct}/>
          <PrivateRoute path='/qa' exact={true} component={QAList}/>
          <PrivateRoute path='/qa/:id/details' exact={true} component={QaProduct}/>
          <PrivateRoute path='/pack-out' exact={true} component={PackOutList}/>
          <PrivateRoute path='/pack-out/:id/details' exact={true} component={PackOut}/>
          <PrivateRoute path='/reports' exact={true} component={Reports}/>
          <PrivateRoute path='/models/new' exact={true} component={ModelEdit}/>
          <PrivateRoute path='/management/users' exact={true} component={UserList}/>
          <PrivateRoute path='/management/users/:id/edit' exact={true} component={UserEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
