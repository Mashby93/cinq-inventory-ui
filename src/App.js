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
import EditRoles from './dashboards/management/users/EditRoles.js';
import ReportListings from './dashboards/management/reports/ReportListings.js';
import CheckListListings from './dashboards/management/checklists/ListCheckLists.js';
import ModelTypesListings from './dashboards/management/types/ListModelTypes.js';
import ErrorCodeListings from './dashboards/management/errors/ErrorCodeListing.js';
import Home from './Home.js';
import CreateSupplier from './models/CreateSupplier';

class App extends Component {
  render() {

    return (
      <Router>
        <Switch>
          <Route path='/login' exact={true} component={Login}/>
          <PrivateRoute path='/' exact={true} component={Home}/>
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
          <PrivateRoute path='/management/users' exact={true} component={UserList}/>
          <PrivateRoute path='/management/users/:id/edit' exact={true} component={UserEdit}/>
          <PrivateRoute path='/management/users/:id/roles' exact={true} component={EditRoles}/>
          <PrivateRoute path='/management/supplier' exact={true} component={CreateSupplier}/>
          <PrivateRoute path='/management/model' exact={true} component={ModelEdit}/>
          <PrivateRoute path='/management/reports' exact={true} component={ReportListings}/>
          <PrivateRoute path='/management/checklists' exact={true} component={CheckListListings}/>
          <PrivateRoute path='/management/types' exact={true} component={ModelTypesListings}/>
          <PrivateRoute path='/management/errors' exact={true} component={ErrorCodeListings}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
