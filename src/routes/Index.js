import React, { Component } from 'react';
import { Spin } from 'antd';
import { connect } from 'dva';
import MainLayout from  '../components/MainLayout/MainLayout'

import { success, error } from '../utils/noticeTips'

function Index({ children, dispatch,loading }) {

  function exit() {
    const access_token = localStorage.access_token || '';
    dispatch({
      type: 'index/logout',
      payload: {
        access_token,
        dispatch,
        success,
        error
      },
    });
  }

  return (
    <Spin spinning={ loading } tip="请等待...">
      <MainLayout exit={ exit }>
        { children ||  '欢迎使用壹卡车服务商平台'  }
      </MainLayout>
    </Spin>
  )
}

function mapStateToProps(state) {
  return state['index'];
}

export default connect(mapStateToProps)(Index);
