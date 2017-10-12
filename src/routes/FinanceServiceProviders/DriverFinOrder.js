import { connect } from 'dva';

import MainLayout from '../../components/MainLayout/MainLayout';
import DriverFinOrder from  '../../components/FinanceServiceProviders/DriverFinOrder/DriverFinOrder'

function financeOrderInformation( obj ){
  return(
    <DriverFinOrder  {...obj} />
  )
}

function mapStateToProps(state) {
  return state.financeOrderInformation;
}


export default connect(mapStateToProps)(financeOrderInformation);
