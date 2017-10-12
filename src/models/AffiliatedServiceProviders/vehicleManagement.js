import * as vehicleServices from '../../services/AffiliatedServiceProviders/servicesVehicle'
import { PAGE_SIZE } from '../../constants'
import { success, error } from '../../utils/noticeTips'
import { routerRedux } from 'dva/router';

export default {

  namespace: 'vehicleManagement',

  state: {
    data: [],
    pagination: {
      pageSize: PAGE_SIZE,
    },
    showModal: false,
    companyList: [],
    carTypeValueLabel: '车辆长度',
    truckLength: [],
    changeObject: {},
    loading: false,
  },

  reducers: {
    loading(state, {payload}){
      return {...state, loading: !state.loading}
    },
    updateData(state, { payload: { data }}){
      return { ...state, data:data }
    },
    updatePagination(state, {payload: { total }}){
      let tmpPagination = {
        pageSize: PAGE_SIZE,
        total: total,
      };
      return {...state, pagination: tmpPagination };
    },
    updateCompanyList(state, { payload: { data }} ){
      return { ...state, companyList: data}
    },
    updateTruckLength(state, { payload: { data }}){
      return { ...state, truckLength: data }
    },
    triggerModal(state){
      return {...state, showModal: !state.showModal }
    },
    changeCarTypeLabel(state, {payload: { value }}){
      return {...state, carTypeValueLabel: value }
    },

    updateChangeObject(state, {payload: { record } }){
      const tmp = Object.assign({}, record);
      return {...state, changeObject: tmp}
    },


  },

  effects: {
    *fetchVehicleList({ payload: { current, sord, sidx } }, { call, put }) {
      put({type: 'loading'});
      const data = yield call( vehicleServices.fetchVehicleList, { current,  sord, sidx  } );
      if (data.code == 'SUCCESS') {
        yield put({
          type: 'updateData',
          payload: { data: data.message.rows, },
        });
        yield put({
          type: 'updatePagination',
          payload: { total: data.message.records, },
        })
        put({type: 'loading'});
      }  else {
        if (data.error == 'invalid_token') {
          error('权限过期,请重新登录!');
          yield put(routerRedux.push('/login'));
        }
      }
    },
    *fetchCompanyList({}, { call, put }) {
      const data = yield call( vehicleServices.fetchCompanyList );
      if (data.code == 'SUCCESS') {
        yield put({
          type: 'updateCompanyList',
          payload: { data: data.message, },
        });
      } else {
        if (data.error == 'invalid_token') {
          error('权限过期,请重新登录!');
          yield put(routerRedux.push('/login'));
        }
      }
    },
    *fetchTruckLengthDic({}, { call, put }) {
      const data = yield call( vehicleServices.fetchTruckLengthDic );
      if (data.code == 'SUCCESS') {
        yield put({
          type: 'updateTruckLength',
          payload: { data: data.message, },
        });
      } else {
        if (data.error == 'invalid_token') {
          error('权限过期,请重新登录!');
          yield put(routerRedux.push('/login'));
        }
      }
    },
    *addTruck({payload: obj }, {call, put}) {
      console.log(obj);
      const data = yield call( vehicleServices.addTruck, {payload: obj} );
      if (data.code == 'SUCCESS') {
        success(data.message);
      } else {
        if (data.error == 'invalid_token') {
          error('权限过期,请重新登录!');
          yield put(routerRedux.push('/login'));
        }
      }
    },
    *deleteTruck({ payload: {id} }, {call, put}) {
      const data = yield call( vehicleServices.deleteTruck, {payload: {id}} );
      if (data.code == 'SUCCESS') {
        success(data.message);
      } else {
        if (data.error == 'invalid_token') {
          error('权限过期,请重新登录!');
          yield put(routerRedux.push('/login'));
        }
      }
    },
    *editTruck({payload: obj }, {call, put}) {
      console.log(obj);
      const data = yield call( vehicleServices.editTruck, {payload: obj} );
      if (data.code == 'SUCCESS') {
        success(data.message);
      } else {
        if (data.error == 'invalid_token') {
          error('权限过期,请重新登录!');
          yield put(routerRedux.push('/login'));
        }
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        if (pathname == "/vehicleMg" ) {
          dispatch({
            type: 'fetchVehicleList',
            payload: {
              current: 1
            }
          });
          dispatch({
            type: 'fetchCompanyList',
          });
          dispatch({
            type: 'fetchTruckLengthDic',
          });
        }
      });
    },
  },

};
