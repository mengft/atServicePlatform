import React from 'react';
import User from './components/User'


function BasicInformationUI( {dispatch, query: { user , addModal, changeObject, region } } ) {
  return (
    <div>
      <User dispatch={ dispatch } {...user} addModal={ addModal }  changeObject={ changeObject } region={ region } />
    </div>
  )
}

export default BasicInformationUI;







































