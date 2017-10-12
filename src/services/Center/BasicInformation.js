import request from '../../utils/request';
import newHeaers from '../../utils/headers'

/*查询运输公司信息  在服务中心 菜单里面 */
export function fetchBasicInfo() {
  return request(`/api/shipper/me`, {headers: newHeaers()});
}

//更新  个人信息
export function updateUserInfo({ payload: {userid,username,email,gender,province_id,city_id,zone_id,shipper_company_name,shipper_company_address,age }}) {
  console.log(userid,username,email,gender,province_id,city_id,zone_id,shipper_company_name,shipper_company_address,age);
  let emailstr = encodeURIComponent(email);
  return request(`/api/shipper/me/edit?userid=${userid}&username=${username}&email=${emailstr}&gender=${gender}&age=${age}&province_id=${province_id}&city_id=${city_id}&zone_id=${zone_id}&shipper_company_name=${shipper_company_name}&shipper_company_address=${shipper_company_address}`, {method: 'POST', headers: newHeaers()});
}
