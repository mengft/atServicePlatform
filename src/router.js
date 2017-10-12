import React from 'react';
import { Router, Route, IndexRoute, Redirect } from 'dva/router';
import Index from './routes/Index';

import Login from './routes/Account/Login';
import Register from './routes/Account/Register';
import Retrieve from './routes/Account/Retrieve';


import Home from './routes/Home';
import BasicInformation from './routes/Center/BasicInformation';

import ShippingCompanyInformation from './routes/Center/ShippingCompanyInformation';

import ConcreteDeliver from './routes/ShipperServiceProvider/ConcreteTransportation/Deliver';
import ConcreteCarSource from './routes/ShipperServiceProvider/ConcreteTransportation/CarSource';
import ConcreteOrder from './routes/ShipperServiceProvider/ConcreteTransportation/Order';

import SpecialLineDeliver from './routes/ShipperServiceProvider/SpecialLineTransportation/Deliver';
import SpecialLineCarSource from './routes/ShipperServiceProvider/SpecialLineTransportation/CarSource';
import SpecialLineOrder from './routes/ShipperServiceProvider/SpecialLineTransportation/Order';

import VehicleManagement from './routes/AffiliatedServiceProviders/VehicleManagement';


import DealersInformation from './routes/CarDealers/DealersInformation';
import DealersCarSource from './routes/CarDealers/DealersCarSource';
import Inquiry from './routes/CarDealers/Inquiry';

import InsuranceProduct from './routes/InsuranceServiceProviders/InsuranceProduct';
import InsuranceCustomer from './routes/InsuranceServiceProviders/InsuranceCustomer';
import InsuranceAffiliate from './routes/InsuranceServiceProviders/InsuranceAffiliate';

import TrafficProduct from './routes/TrafficServiceProviders/TrafficProduct';
import TrafficAffiliate from './routes/TrafficServiceProviders/TrafficAffiliate';
import TrafficCustomer from './routes/TrafficServiceProviders/TrafficCustomer';
import trafficOrder from './routes/TrafficServiceProviders/TrafficOrder';

import DriverFinPro from './routes/FinanceServiceProviders/DriverFinProduct';
import DriverFinCustomer from './routes/FinanceServiceProviders/DriverFinCustomer';
import DriverFinOrder from './routes/FinanceServiceProviders/DriverFinOrder';

import ShipperFinPro from './routes/FinanceServiceProviders/ShipperFinProduct';
import ShipperFinCustomer from './routes/FinanceServiceProviders/ShipperFinCustomer';
import ShipperFinOrder from './routes/FinanceServiceProviders/ShipperFinOrder';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Redirect from="/" to="/login" />
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/retrieve" component={ Retrieve } />
      <Route path="/index" component={ Index } >
        <IndexRoute component={Home}/>
        <Route path="/basicInfo" component={ BasicInformation } />
        <Route path="/shipInfo" component={ ShippingCompanyInformation } />
        <Route path="/concrete">
          <Route path="/concrete_deliver" component={ ConcreteDeliver } />
          <Route path="/concrete_car_source" component={ ConcreteCarSource } />
          <Route path="/concrete_order" component={ ConcreteOrder } />
        </Route>
        <Route path="/special_line">
          <Route path="/special_line_deliver" component={ ConcreteDeliver } />
          <Route path="/special_line_car_source" component={ ConcreteCarSource } />
          <Route path="/special_line_order" component={ ConcreteOrder } />
        </Route>
        <Route path="/vehicleMg" component={ VehicleManagement } />
        <Route path="/dealersInfo" component={ DealersInformation } />
        <Route path="/dealersCarSource" component={ DealersCarSource } />
        <Route path="/inquiry" component={ Inquiry } />
        <Route path="/insurance">
          <Route path="/insurance_product" component={ InsuranceProduct } />
          <Route path="/insurance_customer" component={ InsuranceCustomer } />
          <Route path="/insurance_affiliate" component={ InsuranceAffiliate } />
        </Route>
        <Route path="/traffic">
          <Route path="/traffic_product" component={ TrafficProduct } />
          <Route path="/traffic_affiliate" component={ TrafficAffiliate } />
          <Route path="/traffic_customer" component={ TrafficCustomer } />
          <Route path="/traffic_order" component={ trafficOrder } />
        </Route>
        <Route path="/driverFinancialManage">
            <Route path="/driverFinPro" component={ DriverFinPro } />
            <Route path="/driverFinOrder" component={ DriverFinOrder } /> 
            <Route path="/driverFinCustomer" component={ DriverFinCustomer } />
        </Route>
        <Route path="/shipperFinancialManage">
            <Route path="/shipperFinPro" component={ ShipperFinPro } />
            <Route path="/shipperFinOrder" component={ ShipperFinOrder } />
            <Route path="/shipperFinCustomer" component={ ShipperFinCustomer } />
        </Route>
      </Route>
    </Router>
  );
}

export default RouterConfig;
