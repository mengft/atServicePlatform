import request from '../utils/request';
import { PAGE_SIZE } from '../constants'
import newHeaers from '../utils/headers'


/*获取 三级联动菜单中的 一级菜单内容
 * /common/findProvince
 * */
export function firstlyMenu() {
  return request(`/api/common/findProvince?`, {headers: newHeaers()});
}

/*获取 三级联动菜单中的 二级菜单内容*/
export function secondaryMenu( { targetOption , province_id}  ) {
  let c_province_id;
  if (targetOption == undefined ) {
    c_province_id = province_id;
  } else {
    c_province_id = targetOption.value;
  }
  if (c_province_id == undefined) {
    c_province_id = '1';
  }
  return request(`/api/common/findCities?province_id=${ c_province_id }`, {headers: newHeaers()});
}




/*获取 三级联动菜单中的 三级菜单内容*/
export function thirdMenu( { targetOption, city_id }  ) {
  let c_city_id;
  if (targetOption == undefined ) {
    c_city_id = city_id;
  } else {
    c_city_id = targetOption.value;
  }
  if (c_city_id  == undefined) {
    c_city_id = '1';
  }
  return request(`/api/common/findZones?city_id=${ c_city_id }`, {headers: newHeaers()});
}


/*根据省份获取城市内容*/
export function getCitiesByProvince( { province_id}  ) {
  return request(`/api/common/findCities?province_id=${ province_id }`, {headers: newHeaers()});
}






























