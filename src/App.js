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
import EditSupplier from './models/EditSupplier.js';
import ReportListings from './dashboards/management/reports/ReportListings.js';
import CheckListListings from './dashboards/management/checklists/ListCheckLists.js';
import ListCategories from './dashboards/management/category/ListCategories.js';
import EditCategory from './dashboards/management/category/EditCategory.js';
import ErrorCodeListings from './dashboards/management/errors/ErrorCodeListing.js';
import EditErrorCode from './dashboards/management/errors/EditErrorCodes.js';
import EditCheckList from './dashboards/management/checklists/EditCheckList.js';
import GenerateReport from './dashboards/management/reports/GenerateReport.js';
import Home from './Home.js';

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
          <PrivateRoute path='/reports/new' exact={true} component={GenerateReport}/>
          <PrivateRoute path='/management/users' exact={true} component={UserList}/>
          <PrivateRoute path='/management/users/new' exact={true} component={UserEdit}/>
          <PrivateRoute path='/management/users/:id/edit' exact={true} component={UserEdit}/>
          <PrivateRoute path='/management/users/:id/roles' exact={true} component={EditRoles}/>
          <PrivateRoute path='/management/supplier' exact={true} component={EditSupplier}/>
          <PrivateRoute path='/management/model' exact={true} component={ModelEdit}/>
          <PrivateRoute path='/management/reports' exact={true} component={ReportListings}/>
          <PrivateRoute path='/management/checklists' exact={true} component={CheckListListings}/>
          <PrivateRoute path='/management/checklists/new' exact={true} component={EditCheckList}/>
          <PrivateRoute path='/management/types' exact={true} component={ListCategories}/>
          <PrivateRoute path='/management/types/new' exact={true} component={EditCategory}/>
          <PrivateRoute path='/management/errors' exact={true} component={ErrorCodeListings}/>
          <PrivateRoute path='/management/errors/new' exact={true} component={EditErrorCode}/>
          <PrivateRoute path='/management/errors/:id' exact={true} component={EditErrorCode}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
