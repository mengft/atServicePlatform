import { connect } from 'dva';

import MainLayout from '../../components/MainLayout/MainLayout';
import ShippingCompanyInformationComponent from  '../../components/Center/ShippingCompanyInformation'



function ShippingCompanyInformation( { dispatch, ...Query} ){
  return(
    <ShippingCompanyInformationComponent dispatch={ dispatch } query={ Query } />
  )
}

function mapStateToProps(state){
  return state.shippingCompanyInformation;
}

export default connect(mapStateToProps)(ShippingCompanyInformation);
