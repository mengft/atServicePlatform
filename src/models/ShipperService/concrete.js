import * as ConcreteServices from '../../services/ShipperService/concrete'
import { PAGE_SIZE } from '../../constants'


export default {

  namespace: 'concrete',

  state: {
    data: [],
    pagination: {
      pageSize: PAGE_SIZE,
    },
    loading: false,
    cascaderOptions: [],
    inputValue: '',
  },

  reducers: {
    updateData(state, {payload: { data}}){
      return {...state, data: data}
    },
    updateCascaderOptions(state, {payload: {  cascaderOptions }}){
      return {...state, cascaderOptions: cascaderOptions}
    },
    loading(state){
      return {...state, loading: !state.loading}
    },
    updatePagination(state, {payload: { total }}){
      let paginationObj = {
        total: total,
        pageSize: PAGE_SIZE,

      };
      return {...state, pagination: paginationObj};
    },

    updateCascaderSecondOptions(state, {payload: {cascaderSecondOptions, targetOption}}){
      let tmpCascaderOptions = Object.assign([], state.cascaderOptions);      //拷贝一个新对象出来,存放到 tmpCascaderOptions对象里面.
      for (var item of tmpCascaderOptions) {
        if (item === targetOption) {
          item.children = cascaderSecondOptions
        }
      }
      return {...state, cascaderOptions: tmpCascaderOptions};
    },
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
  },


  effects: {
    *fetch({ payload: { current }}, { call, put }) {
      put({type: 'loading'});
      const data = yield call(ConcreteServices.fetchConcreteList, {current});
      if (data.code === 'SUCCESS') {
        data.message.rows.map((val, index) => {
          return val.timekey = (new Date().getTime()) + 3 * index;
        });
        yield put({type: 'updateData', payload: {data: data.message.rows,}});
        //更新 组件中的 pagination对象的 total参数.
        yield put({type: 'updatePagination', payload: {total: data.message.records}});
        put({type: 'loading'});
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
        put({type: 'loading'});
      } else {
        if (data.error == 'invalid_token') {
          error('权限过期,请重新登录!');
          yield put(routerRedux.push('/login'));
        }
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
        }
      }
    },
    *searchOrigin({ payload: {current,value}}, { call, put }) {
      const origin_province_id = value[0];
      const origin_city_id = value[1];
      const origin_zone_id = value[2];
      const data = yield call(ConcreteServices.fetchOriginConcreteList, {current, origin_province_id,origin_city_id,origin_zone_id});
      if (data.code == 'SUCCESS') {
        data.message.rows.map((val, index) => {
          return val.timekey = (new Date().getTime()) + 3 * index;
        });
        yield put({type: 'updateData', payload: {data: data.message.rows,}});
        yield put({type: 'updatePagination', payload: {total: data.message.records}});
      }
    },
    *searchDestination({ payload: {value ,current }}, { call, put }) {
      const dest_province_id = value[0];
      const dest_city_id = value[1];
      const dest_zone_id = value[2];
      const data = yield call(ConcreteServices.fetchDestinationConcreteList, {current, dest_province_id,dest_city_id,dest_zone_id});
      if (data.code == 'SUCCESS') {
        data.message.rows.map((val, index) => {
          return val.timekey = (new Date().getTime()) + 3 * index;
        });
        yield put({type: 'updateData', payload: {data: data.message.rows,}});
        yield put({type: 'updatePagination', payload: {total: data.message.records}});
      }
    }

  },


  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({ pathname }) => {
        if (pathname == "/concrete_car_source" || pathname == "/special_line_car_source" ) {
          localStorage.originChange = '';
          localStorage.detinationChange = '';
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
