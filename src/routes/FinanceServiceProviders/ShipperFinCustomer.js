import { connect } from 'dva';

import MainLayout from '../../components/MainLayout/MainLayout';
import DriverFinCustomer from  '../../components/FinanceServiceProviders/ShipperFinCustomer/ShipperFinCustomer'

function shipperFinCustomerInformation( obj ){
  return(
    <DriverFinCustomer  {...obj} />
  )
}

function mapStateToProps(state) {
  return state.shipperFinCustomerInformation;
}


export default connect(mapStateToProps)(shipperFinCustomerInformation);
