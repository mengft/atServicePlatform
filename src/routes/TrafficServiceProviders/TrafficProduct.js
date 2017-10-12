import { connect } from 'dva';

import MainLayout from '../../components/MainLayout/MainLayout';
import InsuranceComponent from  '../../components/TrafficServiceProviders/TrafficProduct/TrafficProduct'

function trafficProductInformation( obj ){
  return(
    <InsuranceComponent  {...obj} />
  )
}

function mapStateToProps(state) {
  return state.trafficProductInformation;
}


export default connect(mapStateToProps)(trafficProductInformation);
