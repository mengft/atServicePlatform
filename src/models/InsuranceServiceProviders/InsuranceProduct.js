import * as InsuranceProvidersInformationServices from '../../services/InsuranceServiceProviders/InsuranceProduct'
import * as RegionsServices from '../../services/regions'
import { PAGE_SIZE } from '../../constants'
import { routerRedux } from 'dva/router';
import { warning, success, error } from '../../utils/noticeTips'

export default {
  namespace: 'insuranceProductInformation',

  state: {
    showModal: false,
    showEditModal: false,
    data: [],
    changeObject: {
      key:null,
      insurance_company:null, 
      agent:null,
      contact_tel:null, 
      car_type:null, 
      onnage:null, 
      rebate:null, 
      remark:null,
      province_id:null,
      city_id:null
    },
    pagination: {
      pageSize: PAGE_SIZE,
    },
    cascaderOptions: [],
    currentCity: '',
    currentCarType: '',
    currentProvince: '',
    currentPage:'',
    currentCompany:'',
    provinces:[],
    cities:[]
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
    handleEdit(state, {payload: { insuranceProduct, cityOptions }}){
      return {...state, showEditModal: !state.showEditModal, changeObject: insuranceProduct,cities:cityOptions};
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
    },
 

    //更新省份
    updateProvinces(state, {payload: {  provinceOptions }}){
      return {...state, provinces: provinceOptions}
    },

    //更新城市
    updateCities(state, {payload: {  cityOptions }}){
      return {...state, cities: cityOptions}
    },

    //更新当前城市
    updateCurrentCity(state, { payload: { currentCity } }){
      return {...state, currentCity: currentCity};
    },
    //更新当前省份
    updateCurrentProvince(state, { payload: { currentProvince } }){
      return {...state, currentProvince: currentProvince};
    },
    //更新当前车辆类型
    updateCurrentCarType(state, { payload: { currentCarType } }){
      return {...state, currentCarType: currentCarType};
    },
     //更新当前城市
    updateCurrentCompany(state, { payload: { currentCompany } }){
      return {...state, currentCompany: currentCompany};
    },
    //更新当前页码
    updateCurrentPage(state, { payload: { currentPage } }){
      return {...state, currentPage: currentPage};
    },
  },

  effects: {
    *fetch( { payload: { current,car_type,province_id,city_id,insurance_company,isInsurance } }, {call, put}){
      if(isInsurance != 0 || isInsurance != "0" ){
        isInsurance=1;
      }
      const data = yield call(InsuranceProvidersInformationServices.fetchInsuranceInformation, { current:current,car_type:car_type,province_id:province_id,city_id:city_id,insurance_company:insurance_company,isInsurance:isInsurance });
      if (data.code == 'SUCCESS') {
        data.message.rows.map((val, index) => {
          return val.key = val.id;
        });
        yield put({type: 'update', payload:{ data: data.message.rows, }});
        //更新 组件中的 pagination对象的 total参数.
        yield put({type: 'updatePagination', payload: {total: data.message.records}});

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
          let provinceOptions = [];
          for (let item of cascader.message) {
            provinceOptions.push({
              key: item.id,
              value: item.name,
            })
          }
          yield put({type: 'updateCascaderOptions', payload: {cascaderOptions: cascaderOptions,}})
          yield put({type: 'updateProvinces', payload: {provinceOptions: provinceOptions,}})
        }
      } else {
        if (data.error == 'invalid_token') {
          error('权限过期,请重新登录!');
          yield put(routerRedux.push('/login'));
        }
      }
    },
    *handleInsuranceProductInformation( { payload: object }, {call, put}) {
      if(object.type == 'add' || object.type === 'edit'){
         const data = yield call(InsuranceProvidersInformationServices.addInsuranceProduct, object);
         if (data.code == 'SUCCESS') {
            if (object.type == 'add') {
              success('数据添加成功!');
              yield put({type: 'triggerModal'});
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
      }else if(object.type === 'fb'){
        const data = yield call(InsuranceProvidersInformationServices.publishInsuranceProduct, object);
        if (data.code == 'SUCCESS') {
            success('发布成功!');
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
      }else{
        const data = yield call(InsuranceProvidersInformationServices.delInsuranceProduct, object);
        if (data.code == 'SUCCESS') {
            success('数据删除成功!');
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
    *changeCityOptions({ payload: value}, { call, put }) {
      const cascaderSecondaryMenu = yield call(RegionsServices.getCitiesByProvince, {province_id:value});
      if (cascaderSecondaryMenu.code == 'SUCCESS') {
        const childrenOption = cascaderSecondaryMenu.message;
        let cityOptions = [];
        for (let item of childrenOption) {
          cityOptions.push({
            key: item.id,
            value: item.name,
          })
        }
        yield put({type: 'updateCities', payload: {cityOptions: cityOptions,}})
      } else {
        if (data.error == 'invalid_token') {
          error('权限过期,请重新登录!');
          yield put(routerRedux.push('/login'));
        }
      }
      
    },
    *handleInsuranceEdit({payload: insuranceProduct}, { call, put }){
      const cascaderSecondaryMenu = yield call(RegionsServices.getCitiesByProvince, {province_id:insuranceProduct.province_id});
      if (cascaderSecondaryMenu.code == 'SUCCESS') {
        const childrenOption = cascaderSecondaryMenu.message;
        let cityOptions = [];
        for (let item of childrenOption) {
          cityOptions.push({
            key: item.id,
            value: item.name,
          })
        }
        yield put({type: 'handleEdit', payload: {insuranceProduct: insuranceProduct,cityOptions: cityOptions}})
      } else {
        if (data.error == 'invalid_token') {
          error('权限过期,请重新登录!');
          yield put(routerRedux.push('/login'));
        }
      }
    },
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({ pathname }) => {
        if (pathname == '/insurance_product') {
          dispatch({
            type: 'fetch',
            payload: {
              current: 1
            }
          });
        }
        if (pathname == '/insurance_affiliate') {
          dispatch({
            type: 'fetch',
            payload: {
              current: 1,
              isInsurance:0
            }
          });
        }
      });
    },
  },

};




