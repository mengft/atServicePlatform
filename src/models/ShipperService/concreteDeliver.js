import * as ConcreteServices from '../../services/ShipperService/concrete'
import * as RegionsServices from '../../services/regions'
import { PAGE_SIZE } from '../../constants'
import request from '../../utils/request';
import newHeaers from '../../utils/headers'
import { routerRedux } from 'dva/router';
import { warning, success, error } from '../../utils/noticeTips'

let nowPage = 'concrete_deliver';

export default {

  namespace: 'concreteDeliver',

  state: {
    data: [],
    showAddModal: false,
    showEditModal: false,
    pagination: {
      pageSize: PAGE_SIZE,
      current: 1,
    },
    cascaderOptions: [],
    currentCity: '',
    currentObject: {},
  },

  reducers: {

    updateData(state, {payload: { data}}){
      return {...state, data: data}
    },
    //切换 showAddModal的状态,控制开关
    triggerModal(state){
      return {...state, showAddModal: !state.showAddModal}
    },

    toggleEditModal(state){
      return {...state, showEditModal: !state.showEditModal}
    },

    updatePagination(state, { payload: {total} }) {
      let tmp = Object.assign(state.pagination, {total});
      return {...state, pagination: tmp};
    },

    updatePaginationCurrent(state, { payload: {current} }) {
      let tmp = Object.assign(state.pagination, {current});
      return {...state, pagination: tmp};
    },

    //跟新三级 联动菜单
    updateCascaderOptions(state, {payload: {  cascaderOptions }}){
      return {...state, cascaderOptions: cascaderOptions}
    },

    //更新二级菜单.
    updateCascaderSecondOptions(state, {payload: {cascaderSecondOptions, targetOption}}){
      let tmpCascaderOptions = Object.assign([], state.cascaderOptions);      //拷贝一个新对象出来,存放到 tmpCascaderOptions对象里面.
      for (var item of tmpCascaderOptions) {
        if (item === targetOption) {
          item.children = cascaderSecondOptions
        }
      }
      return {...state, cascaderOptions: tmpCascaderOptions};
    },

    //更新三级菜单
    updateCascaderThirdOptions(state, {payload: {cascaderThirdOptions, targetOption, firstMenu}}){
      let tmpCascaderOptions = Object.assign([], state.cascaderOptions);      //拷贝一个新对象出来,存放到 tmpCascaderOptions对象里面.
      for (let item of tmpCascaderOptions) {
        if (item === firstMenu) {
          for (let inner of item.children) {
            if (inner === targetOption) {
              inner.children = cascaderThirdOptions;
            }
          }
        }
      }
      return {...state, cascaderOptions: tmpCascaderOptions};
    },

    //更新当前城市
    updateCurrentCity(state, { payload: { currentCity } }){
      return {...state, currentCity: currentCity};
    },
    updateCurrentObject(state, { payload: { obj }}) {
      return {...state, currentObject: obj}
    },
  },

  effects: {
    *fetch({ payload: { current, sord, sidx } }, { call, put }) {
      current = current || 1;
      // Table数据的获取和  paginantion ;
      let needApi;
      if (nowPage == 'concrete_deliver') {
        needApi = ConcreteServices.fetchConcreteDeliverList;
      }
      if (nowPage == 'special_line_deliver') {
        needApi = ConcreteServices.fetchSpecialLineDeliverList;
      }
      const data = yield call(needApi, {current, sord, sidx } );
      if (data.code === 'SUCCESS') {
        //更新 组件中的 pagination对象的 total参数.
        yield put({type: 'updatePagination', payload: {total: data.message.records}});
        yield put({type: 'updatePaginationCurrent', payload: {current: current}});
        yield put({type: 'updateData', payload: {data: data.message.rows,}});
      } else {
        if (data.error == 'invalid_token') {
          error('权限过期,请重新登录!');
          yield put(routerRedux.push('/login'));
        }
      }

      const cascader = yield call(RegionsServices.firstlyMenu, {});
      if (cascader.code === 'SUCCESS') {
        let cascaderOptions = [];
        for (let item of cascader.message) {
          cascaderOptions.push({
            value: item.id,
            label: item.name,
            type: 'province',
            isLeaf: false,
          })
        }
        yield put({type: 'updateCascaderOptions', payload: {cascaderOptions: cascaderOptions,}})
      } else {
        if (data.error == 'invalid_token') {
          error('权限过期,请重新登录!');
          yield put(routerRedux.push('/login'));
        }
      }
    },
    //把 当前的城市存在, state.里面 然后再用  select 来取
    *saveCities({ payload: { province_id, city_id }}, { call, put }) {
      const citiesData = yield call(RegionsServices.secondaryMenu, {province_id});
      if (citiesData.code == 'SUCCESS') {
        const cities = citiesData.message;
        let currentCity;
        for (let item of cities) {
          if (item.id === city_id) {
            currentCity = item.name;
          }
        }
        yield put({
          type: 'updateCurrentCity',
          payload: { currentCity }
        });
      } else {
        if (data.error == 'invalid_token') {
          error('权限过期,请重新登录!');
          yield put(routerRedux.push('/login'));
        }
      }
    },
    *changeCascaderOptions({ payload: selectedOptions}, { call, put }) {
      if (selectedOptions.length == 1) {
        //更新二级菜单
        console.log('更新二级菜单');
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        const cascaderSecondaryMenu = yield call(RegionsServices.secondaryMenu, {targetOption});
        targetOption.loading = false;
        if (cascaderSecondaryMenu.code == 'SUCCESS') {
          const childrenOption = cascaderSecondaryMenu.message;
          let cascaderSecondOptions = [];
          for (let item of childrenOption) {
            cascaderSecondOptions.push({
              value: item.id,
              label: item.name,
              type: 'city',
              isLeaf: false,
            })
          }
          yield put({
            type: 'updateCascaderSecondOptions',
            payload: {cascaderSecondOptions: cascaderSecondOptions, targetOption: targetOption}
          });
        } else {
          if (data.error == 'invalid_token') {
            error('权限过期,请重新登录!');
            yield put(routerRedux.push('/login'));
          }
        }
      } else if (selectedOptions.length == 2) {
        //更新三级菜单
        console.log('更新三级菜单');
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        const cascaderThirdMenu = yield call(RegionsServices.thirdMenu, {targetOption});
        targetOption.loading = false;
        if (cascaderThirdMenu.code == 'SUCCESS') {
          const childrenOption = cascaderThirdMenu.message;
          let cascaderThirdOptions = [];
          for (let item of childrenOption) {
            cascaderThirdOptions.push({
              value: item.id,
              label: item.name,
              type: 'zone',
            })
          }
          yield put({
            type: 'updateCascaderThirdOptions',
            payload: {cascaderThirdOptions: cascaderThirdOptions, targetOption: targetOption, firstMenu: selectedOptions[0] }
          });
        } else {
          if (data.error == 'invalid_token') {
            error('权限过期,请重新登录!');
            yield put(routerRedux.push('/login'));
          }
        }
      }
    },

    //删除 的 这个 api 有问题  /shipment/betoninfo/del
    *deleteDeliver({ payload: { id } },{call, put}) {
      console.dir(id);
    }
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({ pathname }) => {
        if (pathname == "/concrete_deliver" || pathname == "/special_line_deliver") {
          if (pathname == "/concrete_deliver") {
            nowPage = 'concrete_deliver';
          }
          if (pathname == "/special_line_deliver") {
            nowPage = 'special_line_deliver';
          }
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
















































