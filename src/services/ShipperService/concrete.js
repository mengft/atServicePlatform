import request from '../../utils/request';
import { PAGE_SIZE } from '../../constants'
import newHeaers from '../../utils/headers'


/*获取混凝土运输线的数据
* GET /shipment/betoninfo/list 查询混凝土运输列表
 */
export function fetchConcreteList({ current }) {
  current = current || 1;
  return request(`/api/trucker/info/list?page=${ current }&rows=${ PAGE_SIZE }&sidx=id&sord=desc`, {headers: newHeaers()});
}

/*出发地 搜索
 * GET /shipment/betoninfo/list 查询混凝土运输列表
 */
export function fetchOriginConcreteList({ current,origin_province_id,origin_city_id,origin_zone_id }) {
  current = current || 1;
  origin_province_id = origin_province_id || '';
  origin_city_id = origin_city_id || '';
  origin_zone_id = origin_zone_id || '';
  return request(`/api/trucker/info/list?page=${ current }&rows=${ PAGE_SIZE }&sidx=id&sord=desc&origin_province_id=${ origin_province_id }&origin_city_id=${ origin_city_id }&origin_zone_id=${ origin_zone_id }`, {headers: newHeaers()});
}
/*目的地 搜索
 * GET /shipment/betoninfo/list 查询混凝土运输列表
 */
export function fetchDestinationConcreteList({ current, dest_province_id,dest_city_id,dest_zone_id }) {
  current = current || 1;
  dest_province_id = dest_province_id || '';
  dest_city_id = dest_city_id || '';
  dest_zone_id = dest_zone_id || '';
  return request(`/api/trucker/info/list?page=${ current }&rows=${ PAGE_SIZE }&sidx=id&sord=desc&dest_province_id=${ dest_province_id }&dest_city_id=${ dest_city_id }&dest_zone_id=${ dest_zone_id }`, {headers: newHeaers()});
}





/*混领土 运输专线  */

/*获取 混凝土列表*/
export function fetchConcreteDeliverList({ current, sord, sidx }) {
  current = current || 1;
  sidx = sidx || 'id';
  if (sord == null || sord === 'descend') {
    sord = 'desc';
  } else if ( sord === 'ascend') {
    sord = 'asc';
  }
  return request(`/api/shipment/betoninfo/list?page=${ current }&rows=${ PAGE_SIZE }&sidx=${sidx}&sord=${sord}`, {headers: newHeaers()});
}


/*删除  混凝土列表 */
export function deleteConcreteDeliverList({ current }) {
  current = current || 1;
  return request(`/api/shipment/betoninfo/del`, {headers: newHeaers()});
}


/*混领土 运输专线  */

/*获取 混凝土列表*/
export function fetchSpecialLineDeliverList({ current, sord, sidx }) {
  current = current || 1;
  sidx = sidx || 'id';
  if (sord == null || sord === 'descend') {
    sord = 'desc';
  } else if ( sord === 'ascend') {
    sord = 'asc';
  }
  return request(`/api/shipment/info/list?page=${ current }&rows=${ PAGE_SIZE }&sidx=${sidx}&sord=${sord}`, {headers: newHeaers()});
}


/*删除  混凝土列表 */
export function deleteSpecialLineDeliverList({ current }) {
  current = current || 1;
  return request(`/api/shipment/info/del`, {headers: newHeaers()});
}


/* 获得运输订单的管理 */
//http://121.43.96.234:9102/order/info/list?page=1&rows=20&sidx=id&sord=desc
export function fetchOrderList({ current, sord }) {
  current = current || 1;
  if (sord == null || sord === 'descend') {
    sord = 'desc';
  } else if ( sord === 'ascend') {
    sord = 'asc';
  }
  return request(`/api/order/info/list?page=${ current }&rows=${ PAGE_SIZE }&sidx=id&sord=${ sord }`, {headers: newHeaers()});
}
















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


