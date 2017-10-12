import * as DealersInfo from '../../services/CarDealers/ServiceDealersInfo';
import { routerRedux } from 'dva/router';
import { warning, success, error } from '../../utils/noticeTips'

import { PAGE_SIZE } from '../../constants'

export default {

  namespace: 'dealersInquiry',

  state: {
    data: [],
    pagination: {
      pageSize: PAGE_SIZE,
      total: null,
    },

  },

  reducers: {
    updateData(state, { payload: { data } }) {
      return {...state, data: data};
    },

    updatePaginationCurrent(state, { payload: { current } }){
      let tmp = Object.assign(state.pagination , {current});
      return {...state, pagination: tmp}
    },
    updatePaginationTotal(state, { payload: { total } }){
      let tmp = Object.assign(state.pagination , {total});
      return {...state, pagination: tmp}
    },
  },

  effects: {

    *fetchInquiryList({payload: { current }}, {call, put}) {
      let userid = localStorage.userid;
      if (userid == undefined) {
        const data = yield call(DealersInfo.fetchUserid);
        if (data.code == "SUCCESS") {
          userid = data.message.userid;
        } else {
          if (data.error == 'invalid_token') {
            error('权限过期,请重新登录!');
            yield put(routerRedux.push('/login'));
          }
        }
      }

      let dealerid = localStorage.dealerid;
      if (dealerid == undefined) {
        const dataMyInfo = yield call(DealersInfo.fetchBasicInfo, {userid});
        if (dataMyInfo.code == 'SUCCESS') {
          dealerid = dataMyInfo.message.id;
          localStorage.dealerid = dealerid;
        } else {
          if (data.error == 'invalid_token') {
            error('权限过期,请重新登录!');
            yield put(routerRedux.push('/login'));
          }
        }
      }

      const dataCarList = yield call(DealersInfo.fetchInquiryList, {dealerid, current});
      if (dataCarList.code == "SUCCESS") {
        const dataList = dataCarList.message.rows;
        //需要把 total 更新的情况放在前面.
        yield put({
          type:'updatePaginationTotal',
          payload:{
            total: dataCarList.message.records,
          }
        });

        yield put({
          type: "updateData",
          payload: {
            data: dataList,
          }
        });

      } else {
        if (data.error == 'invalid_token') {
          error('权限过期,请重新登录!');
          yield put(routerRedux.push('/login'));
        }
      }
    },
    *deleteInquiry({payload:{id}}, {call, put}) {
      const data = yield call(DealersInfo.deleteInquiry, {id});
      if (data.code == "SUCCESS") {
        success('删除成功!');
      } else {
        if (data.error == 'invalid_token') {
          error('权限过期,请重新登录!');
          yield put(routerRedux.push('/login'));
        }
      }
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname == '/inquiry') {
          dispatch({
            type: 'fetchInquiryList',
            payload: {
              current:1,
            }
          });

        }
      });
    },
  },

};
