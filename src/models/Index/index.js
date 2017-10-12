import { routerRedux } from 'dva/router';
import * as accountService from '../../services/Account/accountService';
import { success, warning } from '../../utils/noticeTips'

export default {
  namespace: 'index',

  state: {
    loading: false,
  },

  reducers: {
    loading(state) {
      return {...state, loading: !state.loading};
    },


  },

  effects: {
    *logout({payload: { dispatch, access_token} }, { call, put }){
      yield put({type: 'loading'});
      const access_token_str = 'Bearer ' + access_token;
      const data = yield call(accountService.logout, { access_token_str });
      if (data.code === 'SUCCESS') {
        success('退出成功!');
        yield put({type: 'loading'});
        localStorage.setItem('login_status', false);
        dispatch(routerRedux.push('/login'));
      } else {
        warning('长时间未登录,请重新登录!');
        dispatch(routerRedux.push('/login'));
        yield put({type: 'loading'});
      }
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname !== '/register' && pathname !== '/login' && pathname !== '/retrieve') {
          const loginStatus = localStorage.getItem('login_status');
          if (loginStatus == 'false' || loginStatus == undefined) {
            dispatch(routerRedux.push('/login'));
          }
        }
      });
    },
  },
};















