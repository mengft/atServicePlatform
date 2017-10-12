import { connect } from 'dva';

import MainLayout from '../../../components/MainLayout/MainLayout';
import ConcreteCarSource from '../../../components/ShipperServiceProvider/ConcreteTransportation/CarSource'

function ConcreteCarSourceComponent(obj){
  return(
    <ConcreteCarSource {...obj}/>
  )
}

function mapStateToProps(state) {
  return state['concrete']
}

export default connect(mapStateToProps)(ConcreteCarSourceComponent);
