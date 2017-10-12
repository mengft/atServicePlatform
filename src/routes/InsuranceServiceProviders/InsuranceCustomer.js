import { connect } from 'dva';

import MainLayout from '../../components/MainLayout/MainLayout';
import InsuranceComponent from  '../../components/InsuranceServiceProviders/InsuranceCustomer/InsuranceCustomer'

function insuranceCustomerInformation( obj ){
  return(
    <InsuranceComponent  {...obj} />
  )
}

function mapStateToProps(state) {
  return state.insuranceCustomerInformation;
}


export default connect(mapStateToProps)(insuranceCustomerInformation);
