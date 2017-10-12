import { PAGE_SIZE } from '../../constants'
import * as ConcreteServices from '../../services/ShipperService/concrete'
import { routerRedux } from 'dva/router';
import { warning, success, error } from '../../utils/noticeTips'

export default {

  namespace: 'concreteOrder',

  state: {
    data: [],
    pagination: {
      pageSize: PAGE_SIZE,
    }
  },

  reducers: {
    updateData(state, {payload: {data}}){
      return {...state, data: data}
    },
    updatePagination(state, {payload: {total}}){
      let tmp = Object.assign({}, state.pagination);
      tmp.total = total;
      return {...state,pagination:tmp}
    },
  },

  effects: {
    *fetchOrderList({ payload: {current, sord} }, { call, put }) {
      const data = yield call(ConcreteServices.fetchOrderList, { current, sord});
      if (data.code === 'SUCCESS') {
        yield put({type:'updatePagination', payload:{total: data.message.records}});
        yield put({type:'updateData', payload:{data: data.message.rows}});
      } else {
        if (data.error == 'invalid_token') {
          error('权限过期,请重新登录!');
          yield put(routerRedux.push('/login'));
        }
      }


    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({pathname}) => {
        if (pathname == '/concrete_order' || pathname == '/special_line_order') {
          dispatch({
            type: 'fetchOrderList',
            payload: {
              current: 1,
            }
          })
        }
      });
    },
  },

};
