import fetch from 'dva/fetch';
import { hashHistory, routerRedux } from 'dva/router';

//这边这两个方法页面用到.  用的是  request方法 .这边可以研究一下.

/**检查 status
 * */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
}

/**检查 错误信息
 * */
function parseErrorMessage({ data }) {
  const { status, message } = data;
  if (status === 'error') {
    throw new Error(message);
  }
  return {data};
}

/**
 * Requests a URL, returning a promise.
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  let response = await fetch(url, options);
  if (response.status == 401) {
    hashHistory.push('/login');
    return await {};
  } else {
    return await response.json();
  }

/*  try {
    if (response.status == 401) {
      hashHistory.push('/login');
      return await {};
    } else {
      return await response.json();
    }
  }
  catch (err) {
    hashHistory.push('/login');
    console.log('出错了');
  }*/

}
