import { connect } from 'dva';

import MainLayout from '../../components/MainLayout/MainLayout';
import InsuranceComponent from  '../../components/TrafficServiceProviders/TrafficCustomer/TrafficCustomer'

function trafficCustomerInformation( obj ){
  return(
    <InsuranceComponent  {...obj} />
  )
}

function mapStateToProps(state) {
  return state.trafficCustomerInformation;
}


export default connect(mapStateToProps)(trafficCustomerInformation);
