import request from '../../utils/request';
import newHeaers from '../../utils/headers'


/*登录方法*/
export function login({username, password}) {
  return request(`/api/login?username=${username}&password=${password}`,{method: 'post'});
}

/*查询登录用户信息*/
export function getUserInformation() {
  return request(`/api/me?`,{headers: newHeaers()});
}

/*获取角色*/
export function findAllRoles() {
  return request(`/api/findAllRoles`)
}


/*退出方法*/
export function logout({access_token_str}) {
  return request(`/api/quit?`,{headers:  newHeaers()});
}

//http://121.43.96.234:80/common/sms/sendCode?mobile=13814200670
/*获取验证码*/
export function getCaptcha({mobile}) {
  return request(`http://121.43.96.234:80/common/sms/sendCode?mobile=${mobile}`);
}

/*注册*/
export function register({mobile, password, code, roleid}) {
  return request(`/api/register?mobile=${mobile}&password=${password}&code=${code}&roleid=${roleid}`,{method: 'post'});
}

//http://121.43.96.234:80/common/sms/sendCode?mobile=13814200670
/*获取验证码*/
export function getCaptcha2({mobile}) {
  return request(`http://api.xctruck.com:80/common/sms/sendCode?mobile=${mobile}`);
}

/*重置密码*/
export function resetPass({mobile, password, code}) {
  return request(`/api/updatePassword?mobile=${mobile}&password=${password}&code=${code}`,{method: 'post'});
}
