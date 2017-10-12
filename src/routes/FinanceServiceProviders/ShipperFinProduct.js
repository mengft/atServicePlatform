import { connect } from 'dva';

import MainLayout from '../../components/MainLayout/MainLayout';
import DriverFinProductComponent from  '../../components/FinanceServiceProviders/ShipperFinProduct/ShipperFinProduct'

function shipperFinProductInformation( obj ){
  return(
    <DriverFinProductComponent  {...obj} />
  )
}

function mapStateToProps(state) {
  return state.shipperFinProductInformation;
}


export default connect(mapStateToProps)(shipperFinProductInformation);
