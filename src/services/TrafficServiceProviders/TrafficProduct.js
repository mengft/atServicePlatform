import request from '../../utils/request';
import newHeaers from '../../utils/headers'
import { PAGE_SIZE } from '../../constants'

/*查询保险产品列表信息 */
export function fetchTrafficInformation({current,car_type,province_id,city_id,service_company,isTraffic}) {
  current = current || 1;
  let search=`page=${ current }&rows=${ PAGE_SIZE }&sidx=id&sord=desc&isTraffic=${isTraffic}`;
  if(car_type != undefined && car_type != ''){
  	search += `&car_type=${car_type}`;
  }
  if(province_id != undefined && province_id != ''){
  	search +=`&province_id=${province_id}`;
  }
  if(city_id != undefined && city_id != ''){
  	search += `&city_id=${city_id}`;
  }
  if(service_company != undefined && service_company != ''){
  	search += `&service_company=${service_company}`;
  }
  return request(`/api/traffic/product/list?`+search, {headers: newHeaers()});
}

/*查询保险产品类型列表信息 */
export function fetchTrafficTypeInformation() {
  
  return request(`/api/traffic/product/type`, {headers: newHeaers()});
}


/*新增/修改保险产品信息
 *
 * */

export function addTrafficProduct({ id,product_name, trafficType, car_type, province_id, city_id, service_charge, service_company, contact_name, contact_tel, remark}) {
	if(id != null && id != ''){
		return request(`/api/traffic/product/edit?productId=${id}&car_type=${ car_type }&product_name=${ product_name }&traffic_type=${ trafficType }&province_id=${province_id}&city_id=${city_id}&service_charge=${ service_charge }&service_company=${ service_company }&contact_name=${contact_name}&contact_tel=${contact_tel}&remark=${remark}`, {method: 'POST',headers: newHeaers()});
	}else{
    if(remark == undefined || remark == ""){
      return request(`/api/traffic/product/add?car_type=${ car_type }&product_name=${ product_name }&traffic_type=${ trafficType }&province_id=${province_id}&city_id=${city_id}&service_charge=${ service_charge }&service_company=${ service_company }&contact_name=${contact_name}&contact_tel=${contact_tel}`, {method: 'POST',headers: newHeaers()});
    }else{
      return request(`/api/traffic/product/add?car_type=${ car_type }&product_name=${ product_name }&traffic_type=${ trafficType }&province_id=${province_id}&city_id=${city_id}&service_charge=${ service_charge }&service_company=${ service_company }&contact_name=${contact_name}&contact_tel=${contact_tel}&remark=${remark}`, {method: 'POST',headers: newHeaers()});
    }
	}
  
}

/*删除保险产品信息
 *
 * */

export function delTrafficProduct({ id,insurance_company, agent, contact_tel, car_type, onnage, rebate, remark, province_id, city_id}) {
	return request(`/api/traffic/product/delete?productId=${id}`, {headers: newHeaers()});
	
}

/*发布保险产品信息
 *
 * */

export function publishTrafficProduct({ id,insurance_company, agent, contact_tel, car_type, onnage, rebate, remark, province_id, city_id}) {
	return request(`/api/traffic/product/publish?productId=${id}`, {headers: newHeaers()});
	
}

