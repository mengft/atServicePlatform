import * as DealersInfo from '../../services/CarDealers/ServiceDealersInfo';
import { routerRedux } from 'dva/router';
import { warning, success, error } from '../../utils/noticeTips'

import { PAGE_SIZE } from '../../constants'

export default {

  namespace: 'dealersCarSource',

  state: {
    data: [],
    pagination: {
      pageSize: PAGE_SIZE,
      current:1,
    },
    loading: false,
    showStatusModal: false,
    showPriceModal: false,
    currentCar: {},
  },

  reducers: {
    loading(state, { payload: {} }){
      return {...state, loading: !state.loading}
    },
    updateData(state, { payload: { data } }) {
      return { ...state,  data: data };
    },

    updatePagination(state, { payload: {total} }) {
      let tmp = Object.assign(state.pagination, {total});
      return {...state, pagination: tmp};
    },
    updatePaginationCurrent(state, { payload: {current} }) {
      let tmp = Object.assign(state.pagination, {current});
      return {...state, pagination: tmp};
    },

    //切换 StatusModal
    triggerStatusModal( state , { }){
      return { ...state, showStatusModal: !state.showStatusModal}
    },

    //切换 showPriceModal
    triggerPriceModal( state , { }){
      return { ...state, showPriceModal: !state.showPriceModal}
    },

    updateCurrentCar(state, {payload: {currentCar} }){
      console.log(currentCar);
      let tmpCurrentCar = Object.assign({},currentCar );
      console.log(tmpCurrentCar === state.currentCar);
      return {...state, currentCar: tmpCurrentCar}
    }


  },

  effects: {
    //获取 车源列表
    //需要获取  获取 dealerid  是为了 使用fetchCarList 这个接口
    *fetchCarList({payload: { current }},{call, put}) {
      //yield put({type: 'loading', payload:{}});
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
        const dataMyInfo = yield call(DealersInfo.fetchBasicInfo, { userid });
        if (dataMyInfo.code == 'SUCCESS') {
          dealerid = dataMyInfo.message.id;
          localStorage.dealerid = dealerid;
        } else {
          if (dataMyInfo.error == 'invalid_token') {
            error('权限过期,请重新登录!');
            yield put(routerRedux.push('/login'));
          }
        }
      }

      const dataCarList = yield call(DealersInfo.fetchCarList, { dealerid });
      if (dataCarList.code == "SUCCESS") {
        const dataList = dataCarList.message.rows;
        let total = dataCarList.message.records;
        yield put({type: 'updatePagination', payload: {total: total}});
        yield put({type: 'updatePaginationCurrent', payload: {current: current}});
        yield put({
          type: "updateData",
          payload: {
            data: dataList,
          }
        });
        //yield put({type: 'loading', payload:{}});
      } else {
        if (dataCarList.error == 'invalid_token') {
          error('权限过期,请重新登录!');
          yield put(routerRedux.push('/login'));
        }
      }
    },

    *changeCarStatus({payload: { status, id }},{call, put}) {

      const data = yield call(DealersInfo.changeCarStatus, {status, id});
      if ( data.code == 'SUCCESS' ) {
        success(data.message);
      } else {
        if (data.error == 'invalid_token') {
          error('权限过期,请重新登录!');
          yield put(routerRedux.push('/login'));
        }
      }

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
        const dataMyInfo = yield call(DealersInfo.fetchBasicInfo, { userid });
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
      const dataCarList = yield call(DealersInfo.fetchCarList, { dealerid });
      if (dataCarList.code == "SUCCESS") {
        const dataList = dataCarList.message.rows;
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

    *changeCarPrice({payload: { price, id }},{call, put}) {
      const data = yield call(DealersInfo.changeCarPrice, {price, id});
      if ( data.code == 'SUCCESS' ) {
        success(data.message);
      } else {
        if (data.error == 'invalid_token') {
          error('权限过期,请重新登录!');
          yield put(routerRedux.push('/login'));
        }
      }

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
        const dataMyInfo = yield call(DealersInfo.fetchBasicInfo, { userid });
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
      const dataCarList = yield call(DealersInfo.fetchCarList, { dealerid });
      if (dataCarList.code == "SUCCESS") {
        const dataList = dataCarList.message.rows;
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
    }

  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen( ({ pathname }) => {
        if (pathname == '/dealersCarSource') {
          dispatch({
            type: 'fetchCarList',
            payload:{
              current:1,
            },
          });
        }
      });
    },
  },

};
