import request from '../../utils/request';
import newHeaers from '../../utils/headers'
import { PAGE_SIZE } from '../../constants'

/*查询保险产品列表信息 */
export function fetchTrafficInformation({current,car_type,province_id,city_id,status}) {
  current = current || 1;
  let search=`page=${ current }&rows=${ PAGE_SIZE }&sidx=id&sord=desc`;
  if(car_type != undefined && car_type != ''){
  	search += `&car_type=${car_type}`;
  }
  if(province_id != undefined && province_id != ''){
  	search +=`&province_id=${province_id}`;
  }
  if(city_id != undefined && city_id != ''){
  	search += `&city_id=${city_id}`;
  }
  if(status != undefined && status != ''){
  	search += `&status=${status}`;
  }
  return request(`/api/traffic/order/list?`+search, {headers: newHeaers()});
}

/*删除保险产品信息
 *
 * */

export function delTrafficOrder({ id}) {
	return request(`/api/traffic/order/delete?orderId=${id}`, {headers: newHeaers()});
	
}

/*发布保险产品信息
 *
 * */

export function handleTrafficOrder({ id}) {
	return request(`/api/traffic/order/handle?orderId=${id}`, {headers: newHeaers()});
	
}

