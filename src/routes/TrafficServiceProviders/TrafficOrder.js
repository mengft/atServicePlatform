import { connect } from 'dva';

import MainLayout from '../../components/MainLayout/MainLayout';
import InsuranceComponent from  '../../components/TrafficServiceProviders/TrafficOrder/TrafficOrder'

function trafficOrderInformation( obj ){
  return(
    <InsuranceComponent  {...obj} />
  )
}

function mapStateToProps(state) {
  return state.trafficOrderInformation;
}


export default connect(mapStateToProps)(trafficOrderInformation);
