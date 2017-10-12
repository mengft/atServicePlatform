import * as accountService from '../../services/Account/accountService';
import { hashHistory, routerRedux } from 'dva/router';
import { success, error } from '../../utils/noticeTips'

export default {
  namespace: 'account',

  state: {
    loading: false,
    confirmDirty: false,
    current: 0,
    selectData: [],
    phoneNum:"", 
    verCode:"", 
    passWord:""
  },

  reducers: {
    loading(state) {
      return {...state, loading: !state.loading};
    },
    nextStep(state) {
      return {...state, current: state.current + 1};
    },
    prevStep(state) {
      return {...state, current: state.current - 1};
    },
    setConfirmDirty(state,{ payload: {value,callback} }){
      if (isNaN(value) || value.length < 6 || value.length > 11 ) {
        callback('密码长度为6-10位');
      }
      callback();

      return {...state, confirmDirty: value };
    },
    checkPassword(state,{ payload: {value,callback} }){
      if (value && (value !== state.confirmDirty)) {
        callback('两次密码输入不相同');
      } else {
        callback();
      }
      return state;
    },

    changeSelectData(state, { payload: {selectDataSource}}){
      return {...state, selectData: selectDataSource };
    },
    changePhoneNum(state, { payload: {phoneNum}}){
      return {...state, phoneNum: phoneNum };
    },
    changeVerCode(state, { payload: {verCode}}){
      return {...state, verCode: verCode };
    },
    changePassWord(state, { payload: {passWord}}){
      return {...state, passWord: passWord };
    },
  }

  ,

  effects: {
    *login({ payload: { success, error, username, password} }, { call, put }) {
      yield put({type: 'loading'});
      const data = yield call(accountService.login, {username, password});
      if (data.code === 'SUCCESS') {
        success('登录成功!');
        yield put({type: 'loading'});
        localStorage.setItem('access_token', data.message.access_token);
        localStorage.setItem('login_status', true);
        localStorage.setItem('refresh_token', data.message.refresh_token);
        localStorage.setItem('username', username);
        hashHistory.push('/index');
      } else {
        error('登录失败!');
        yield put({type: 'loading'});
      }
      const userInfo = yield call(accountService.getUserInformation);
      if (data.code === 'SUCCESS') {
        localStorage.setItem('userInfo', JSON.stringify(userInfo.message));
      } else {
        console.log('获取信息失败');
      }
    },
    *register({payload: {success, error, ...Query}}, {call, put}){
      yield put({type: 'loading'});
      const data = yield call(accountService.register, Query);
      if (data.code === 'SUCCESS') {
        success('注册成功!');
        yield put({type: 'loading'});
        hashHistory.push('/login');
      } else {
        error('注册失败!');
        yield put({type: 'loading'});
      }
    },
    *getCaptcha({payload: {success, error, mobile}}, {call, put}){
      const data = yield call(accountService.getCaptcha, {mobile});
      if (data.code === 'SUCCESS') {
        success('请查看手机验证码!');
      } else {
        error('获取验证码失败!');
      }
    },
    *findAllRoles({},{ call, put }) {
      let selectDataSource = [];
      const data = yield call(accountService.findAllRoles);
      if (data.code === 'SUCCESS') {
        selectDataSource = data.message;
        yield put({type: 'changeSelectData',payload: {selectDataSource}})
      };
    },
    *getVerCode({payload: {mobile}}, {call, put}){
      const data = yield call(accountService.getCaptcha2, {mobile});
      if (data.code === 'SUCCESS') {
        success('请查看手机验证码!');
      } else {
        error('获取验证码失败!');
      }
    },
    *resetPass({payload: {mobile, verCode, passWord}}, {call, put}){
      const data = yield call(accountService.resetPass, {mobile:mobile, password:passWord, code:verCode});
      if (data.code === 'SUCCESS') {
        success('重置密码成功!');
      } else {
        error('验证码验证失败!');
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }){
      history.listen(({ pathname }) => {
        if (pathname === '/register') {
          dispatch({ type: 'findAllRoles'});
        }
      })
    }
  },
};







