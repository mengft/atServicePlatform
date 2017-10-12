import { connect } from 'dva';

import MainLayout from '../../components/MainLayout/MainLayout';
import InsuranceComponent from  '../../components/InsuranceServiceProviders/InsuranceProduct/InsuranceProduct'

function insuranceProductInformation( obj ){
  return(
    <InsuranceComponent  {...obj} />
  )
}

function mapStateToProps(state) {
  return state.insuranceProductInformation;
}


export default connect(mapStateToProps)(insuranceProductInformation);
