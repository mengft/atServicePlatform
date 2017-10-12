import request from '../../utils/request';
import newHeaers from '../../utils/headers'
import { PAGE_SIZE } from '../../constants'

/*查询订单列表信息 */
export function fetchInformation({current,car_type,province_id,city_id,status}) {
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
  return request(`/api/finance/order/list?`+search, {headers: newHeaers()});
}

/*删除订单信息
 *
 * */

export function delOrder({ id}) {
	return request(`/api/finance/order/delete?productId=${id}`, {headers: newHeaers()});
	
}

/*发布订单信息
 *
 * */

export function handleOrder({ id}) {
	return request(`/api/finance/order/handle?productId=${id}`, {headers: newHeaers()});
	
}

