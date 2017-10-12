import { connect } from 'dva';

import MainLayout from '../../../components/MainLayout/MainLayout';
import ConcreteDeliver from '../../../components/ShipperServiceProvider/ConcreteTransportation/Deliver'

function ConcreteDeliverComponent(obj){
  return(
    <ConcreteDeliver {...obj}/>
  )
}

function mapStateToProps(state) {
  return state['concreteDeliver']
}

export default connect(mapStateToProps)(ConcreteDeliverComponent);
