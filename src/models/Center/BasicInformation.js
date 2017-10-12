import * as basicInfoServices from '../../services/Center/BasicInformation';
import * as ConcreteServices from '../../services/ShipperService/concrete';
import { success, error } from '../../utils/noticeTips'
import { routerRedux } from 'dva/router';

export default {

  namespace: 'basicInformation',

  state: {
    user: {
      avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
    },
    addModal: false,
    changeObject: {
      cascaderOptions: [],
    },
    region: {
      province: '',
      city: '',
      zone: '',
    },
  },

  reducers: {
    updateUser(state, { payload: { user } }){
      return { ...state, user: user};
    },
    updateChangeObject(state, { payload: { user } }){
      return { ...state, changeObject: user};
    },
    triggerModal(state, {}) {
      return {...state, addModal: !state.addModal,}
    },
    //更新一级界面
    updateCascaderOptions(state, {payload: {  cascaderOptions }}){
      let tmpChangeObject = Object.assign({}, state.changeObject);
      tmpChangeObject.cascaderOptions = cascaderOptions;
      return {...state, changeObject: tmpChangeObject}
    },
    //更新二级页面  .
    updateCascaderSecondOptions(state, {payload: {cascaderSecondOptions, targetOption}}){
      let tmpCascaderOptions = Object.assign([], state.changeObject.cascaderOptions);      //拷贝一个新对象出来,存放到 tmpCascaderOptions对象里面.
      for (var item of tmpCascaderOptions) {
        if (item === targetOption) {
          item.children = cascaderSecondOptions
        }
      }
      let tmpChangeObject = Object.assign({}, state.changeObject);
      tmpChangeObject.cascaderOptions = tmpCascaderOptions;
      return {...state, changeObject: tmpChangeObject};
    },

    //更新三级页面
    updateCascaderThirdOptions(state, {payload: {cascaderThirdOptions, targetOption, firstMenu}}){
      let tmpCascaderOptions = Object.assign([], state.changeObject.cascaderOptions);      //拷贝一个新对象出来,存放到 tmpCascaderOptions对象里面.
      for (let item of tmpCascaderOptions) {
        if (item === firstMenu) {
          for (let inner of item.children) {
            if (inner === targetOption) {
              inner.children = cascaderThirdOptions;
            }
          }
        }
      }
      let tmpChangeObject = Object.assign({}, state.changeObject);
      tmpChangeObject.cascaderOptions = tmpCascaderOptions;
      return {...state, changeObject: tmpChangeObject};
    },

    //更新 region: {}
    updateRegion(state, {payload: { province, city, zone }}){
      const tmpRegion = Object.assign({}, state.region);
      tmpRegion.province = province;
      tmpRegion.city = city;
      tmpRegion.zone = zone;
      return {...state, region: tmpRegion }
    },
  },

  effects: {
    *fetchBasicInfo({ payload }, { call, put, select }) {
      const data = yield call(basicInfoServices.fetchBasicInfo);
      if (data.code == 'SUCCESS') {
        const user = data.message;
        localStorage.userid = data.message.userid;
        yield put({
          type: 'updateUser',
          payload:{
            user
          }
        });
        yield put({
          type: 'updateChangeObject',
          payload:{
            user,
            cascaderOptions: [],
          }
        });
      } /*else {
        if (data.error == 'invalid_token') {
          error('权限过期,请重新登录!');
          yield put(routerRedux.push('/login'));
        }
      }*/
    },
    *fetchFirstOption({ payload }, { call, put, select }){
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
        const basicInfo = yield select(state => state.basicInformation);
        let province;
        let city;
        let zone;
        for (let item of basicInfo.changeObject.cascaderOptions) {
          if (item.value === basicInfo.user.province_id) {
            province = item.label;
          }
        }
        let province_id = basicInfo.user.province_id;
        const citiesData = yield call(ConcreteServices.secondaryMenu, { province_id });
        if (citiesData.code == 'SUCCESS') {
          const getCities = citiesData.message;
          for (let item of getCities) {
            if (item.id == basicInfo.user.city_id) {
              city = item.name;
            }
          }
        }
        let city_id =  basicInfo.user.city_id;
        const zonesData = yield call(ConcreteServices.thirdMenu, { city_id });
        if (zonesData.code == 'SUCCESS') {
          const getZones = zonesData.message;
          for (let item of getZones) {
            if (item.id == basicInfo.user.zone_id) {
              zone = item.name;
            }
          }
        } else {
          if (data.error == 'invalid_token') {
            error('权限过期,请重新登录!');
            yield put(routerRedux.push('/login'));
          }
        }
       // yield put({type: 'updateRegion', payload: {province, city, zone }});
      }
    },
    //更新 二级菜单和 三级菜单的数据.
    *changeCascaderOptions({ payload: selectedOptions}, { call, put }) {
      if (selectedOptions.length == 1) {
        //更新二级菜单
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        const cascaderSecondaryMenu = yield call(ConcreteServices.secondaryMenu, {targetOption});
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
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        const cascaderThirdMenu = yield call(ConcreteServices.thirdMenu, {targetOption});
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
    //更新个人 基本信息
    *updateUserInfo({ payload }, {call, put}) {
      const data = yield call(basicInfoServices.updateUserInfo, { payload });
      console.log(data);
      if (data.code == 'SUCCESS') {
        success('修改成功!');
        yield put({
          type: 'fetchBasicInfo',
          payload: {}
        });
        yield put({
          type: 'triggerModal',
          payload: {}
        });
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
      history.listen(({ pathname }) => {
        if (pathname == '/basicInfo') {
          dispatch({
            type: 'fetchBasicInfo',
            payload: {}
          });
          //三级联动的一级界面
          dispatch({
            type: 'fetchFirstOption',
            payload: {}
          });
        }
      });
    },
  },

};
