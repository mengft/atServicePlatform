import { connect } from 'dva';

import MainLayout from '../../components/MainLayout/MainLayout';
import DriverFinCustomer from  '../../components/FinanceServiceProviders/DriverFinCustomer/DriverFinCustomer'

function driverFinCustomerInformation( obj ){
  return(
    <DriverFinCustomer  {...obj} />
  )
}

function mapStateToProps(state) {
  return state.driverFinCustomerInformation;
}


export default connect(mapStateToProps)(driverFinCustomerInformation);
