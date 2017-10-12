import * as ShippingCompanyInformationServices from '../../services/Center/ShippingCompanyInformationServices'
import { PAGE_SIZE } from '../../constants'
import { routerRedux } from 'dva/router';
import { warning, success, error } from '../../utils/noticeTips'

export default {
  namespace: 'shippingCompanyInformation',

  state: {
    showModal: false,
    showEditModal: false,
    data: [],
    changeObject: {
      key: null,
      name: null,
      boss_name: null,
      address: null,
      business_num: null,
    },
    pagination: {
      pageSize: PAGE_SIZE,
    }
  },

  reducers: {
    update(state, {payload: { data }}){
      return {...state, data: data};
    },
    updatePagination(state, {payload: { total }}){
      let paginationObj = {
        total: total,
        pageSize: PAGE_SIZE,
      };
      return {...state, pagination: paginationObj};
    },
    handleEdit(state, {payload: { companyInfo, index }}){
      return {...state, showEditModal: !state.showEditModal, changeObject: companyInfo};
    },
    handleEditCancel(state){
      return {...state, showEditModal: !state.showEditModal};
    },
    triggerModal(state){
      return {...state, showModal: !state.showModal}
    },
    handleOk(state){
      return state;
    },
    isAllFun(state){
      let result = false;
      if (state.addItemObject.name !== null && state.addItemObject.name !== null) {
        result = true;
      }
      return {...state, isAll: result};
    }

  },

  effects: {
    *fetch( { payload: { current } }, {call, put}){
      const data = yield call(ShippingCompanyInformationServices.fetchCompanyInformation, { current });
      if (data.code == 'SUCCESS') {
        data.message.rows.map((val, index) => {
          return val.key = val.id;
        });
        yield put({type: 'update', payload:{ data: data.message.rows, }});
        //更新 组件中的 pagination对象的 total参数.
        yield put({type: 'updatePagination', payload: {total: data.message.records}});
      } else {
        if (data.error == 'invalid_token') {
          error('权限过期,请重新登录!');
          yield put(routerRedux.push('/login'));
        }
      }
    },
    *handleCompanyInformation( { payload: object }, {call, put}) {
      const data = yield call(ShippingCompanyInformationServices.handleCompanyInformation, object);
      if (data.code == 'SUCCESS') {
        if (object.type == 'add') {
          success('数据添加成功!');
          yield put({type: 'triggerModal'});
        } else if (object.type == 'del') {
          success('数据删除成功!');
        } else if (object.type === 'edit') {
          success('修改数据!');
          yield put({type: 'handleEditCancel'});
        }
        yield put({
          type: 'fetch',
          payload: {
            current: 1
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
    setup({dispatch, history}) {
      history.listen(({ pathname }) => {
        if (pathname == '/shipInfo') {
          dispatch({
            type: 'fetch',
            payload: {
              current: 1
            }
          });
        }
      });
    },
  },

};




