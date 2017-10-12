import * as DealersInfo from '../../services/CarDealers/ServiceDealersInfo';
import * as ConcreteServices from '../../services/ShipperService/concrete'
import { routerRedux } from 'dva/router';
import { warning, success, error } from '../../utils/noticeTips'



export default {
  namespace: 'dealersInfo',

  state: {
    myInfo: {},
    showModal: false,
    truckBrandList: [],
    cascaderOptions: [],
  },

  reducers: {
    updateMyInfo(state, {payload: {myInfo}}){
      return {...state, myInfo: myInfo}
    },
    triggerModal(state){
      return {...state, showModal: !state.showModal}
    },
    updateTruckBrandList(state, {payload: {truckBrandDataList}}){
      return {...state, truckBrandList: truckBrandDataList}
    },
    updateCascaderOptions(state, {payload: {  cascaderOptions }}){
      return {...state, cascaderOptions: cascaderOptions}
    },

    //更新二级目录.这个模块好像只要更新二级目录
    updateCascaderSecondOptions(state, {payload: {cascaderSecondOptions, targetOption}}){
      let tmpCascaderOptions = Object.assign([], state.cascaderOptions);      //拷贝一个新对象出来,存放到 tmpCascaderOptions对象里面.
      for (var item of tmpCascaderOptions) {
        if (item === targetOption) {
          item.children = cascaderSecondOptions
        }
      }
      return {...state, cascaderOptions: tmpCascaderOptions};
    },
  },

  effects: {
    *fetchMyInfo({},{call, put}) {
      let userid;
      if (localStorage.userid == undefined) {
        const useridData = yield call(DealersInfo.fetchUserid);
        if (useridData.code == 'SUCCESS') {
          userid = useridData.message.userid;
        } else {
          if (data.error == 'invalid_token') {
            error('权限过期,请重新登录!');
            yield put(routerRedux.push('/login'));
          }
        }
      } else {
        userid = localStorage.userid;
      }
      const myInfoData = yield call(DealersInfo.fetchBasicInfo, { userid });
      if (myInfoData.code == 'SUCCESS') {
        let myInfo = myInfoData.message;
        localStorage.dealerid = myInfo.id;
        yield put({
          type: 'updateMyInfo',
          payload: {
            myInfo,
          }
        });
      } else {
        if (data.error == 'invalid_token') {
          error('权限过期,请重新登录!');
          yield put(routerRedux.push('/login'));
        }
      }

      //获取 三级联动 一级菜单
      const cascader = yield call(ConcreteServices.firstlyMenu, {});
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
    *fetchTruckBrand({},{call, put}) {
      const truckBrandData = yield call(DealersInfo.fetchTruckBrand);
      if (truckBrandData.code == 'SUCCESS') {
        const truckBrandDataList = truckBrandData.message;
        yield put({
          type: 'updateTruckBrandList',
          payload: {
            truckBrandDataList,
          }
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
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        const cascaderSecondaryMenu = yield call(ConcreteServices.secondaryMenu, {targetOption});
        targetOption.loading = false;
        const childrenOption = cascaderSecondaryMenu.message;
        let cascaderSecondOptions = [];
        for (let item of childrenOption) {
          cascaderSecondOptions.push({
            value: item.id,
            label: item.name,
            type: 'city',
          })
        }
        yield put({
          type: 'updateCascaderSecondOptions',
          payload: {cascaderSecondOptions: cascaderSecondOptions, targetOption: targetOption}
        });
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname == '/dealersInfo') {
          dispatch({
            type: 'fetchMyInfo',
          });
          dispatch({
            type: 'fetchTruckBrand'
          })
        }
      });
    },
  },
};















