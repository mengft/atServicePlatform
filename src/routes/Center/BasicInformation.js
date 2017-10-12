import { connect } from 'dva'

import BasicInformationUI from  '../../components/Center/BasicInformation'


function BasicInformation( { dispatch, ...Query} ){
  return(
    <BasicInformationUI dispatch={ dispatch } query={ Query } />
  )
}

function mapStateToProp(state) {
  return state.basicInformation;
}


export default connect(mapStateToProp)(BasicInformation);
