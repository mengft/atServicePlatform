import dva from 'dva';
import createLoading from 'dva-loading';
import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';
import './index.css';

import * as region from './utils/region'

// 1. Initialize
const app = dva({
  history: useRouterHistory(createHashHistory)({ queryKey: false }),
});

// 2. Plugins
app.use( createLoading() );

// 3. Model
app.model(require('./models/Account/account'));
app.model(require('./models/Index/index'));

app.model(require('./models/Center/ShippingCompanyInformation'));
app.model(require('./models/Center/BasicInformation'));

app.model(require('./models/ShipperService/concrete'));
app.model(require('./models/ShipperService/concreteDeliver'));
app.model(require('./models/ShipperService/concreteOrder'));

app.model(require('./models/AffiliatedServiceProviders/vehicleManagement'));

app.model(require('./models/CarDealers/modelsDealersInfo'));
app.model(require('./models/CarDealers/modelsDealersCarSource'));
app.model(require('./models/CarDealers/modelsInquiry'));

app.model(require('./models/InsuranceServiceProviders/InsuranceProduct'));
app.model(require('./models/InsuranceServiceProviders/InsuranceCustomer'));

app.model(require('./models/TrafficServiceProviders/TrafficProduct'));
app.model(require('./models/TrafficServiceProviders/TrafficCustomer'));
app.model(require('./models/TrafficServiceProviders/TrafficOrder'));

app.model(require('./models/FinanceServiceProviders/DriverFinProduct'));
app.model(require('./models/FinanceServiceProviders/DriverFinOrder'));
app.model(require('./models/FinanceServiceProviders/DriverFinCustomer'));

app.model(require('./models/FinanceServiceProviders/ShipperFinProduct'));
app.model(require('./models/FinanceServiceProviders/ShipperFinCustomer'));
app.model(require('./models/FinanceServiceProviders/ShipperFinOrder'));
// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

