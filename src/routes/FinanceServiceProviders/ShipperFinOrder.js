import { connect } from 'dva';

import MainLayout from '../../components/MainLayout/MainLayout';
import DriverFinOrder from  '../../components/FinanceServiceProviders/ShipperFinOrder/ShipperFinOrder'

function finShipperOrderInformation( obj ){
  return(
    <DriverFinOrder  {...obj} />
  )
}

function mapStateToProps(state) {
  return state.finShipperOrderInformation;
}


export default connect(mapStateToProps)(finShipperOrderInformation);
