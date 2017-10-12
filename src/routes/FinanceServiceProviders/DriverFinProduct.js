import { connect } from 'dva';

import MainLayout from '../../components/MainLayout/MainLayout';
import DriverFinProductComponent from  '../../components/FinanceServiceProviders/DriverFinProduct/DriverFinProduct'

function driverFinProductInformation( obj ){
  return(
    <DriverFinProductComponent  {...obj} />
  )
}

function mapStateToProps(state) {
  return state.driverFinProductInformation;
}


export default connect(mapStateToProps)(driverFinProductInformation);
