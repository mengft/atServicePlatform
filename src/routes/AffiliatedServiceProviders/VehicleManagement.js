import { connect } from 'dva';

import MainLayout from '../../components/MainLayout/MainLayout';
import VehicleManagementComponent from  '../../components/AffiliatedServiceProviders/VehicleManagement'

function VehicleManagement( { dispatch, ...Query} ){
  return(
    <VehicleManagementComponent  dispatch={ dispatch } query={ Query } />
  )
}

function mapStateToProps(state) {
  return state.vehicleManagement;
}


export default connect(mapStateToProps)(VehicleManagement);
