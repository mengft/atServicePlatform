import request from '../../utils/request';
import newHeaers from '../../utils/headers'
import { PAGE_SIZE } from '../../constants'

/*查询金融产品列表信息 */
export function fetchInformation({current,car_type,province_id,city_id,service_company}) {
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
  if(service_company != undefined && service_company != ''){
  	search += `&title=${service_company}`;
  }
  return request(`/api/finance/product/list?`+search, {headers: newHeaers()});
}


/*新增/修改保险产品信息
 *
 * */

export function addProduct({ id,title, type, car_type, province_id, city_id, term, repay_method, fin_company, agent, contact_tel, remark}) {
	if(id != null && id != ''){
    remark = remark+"";
		return request(`/api/finance/product/edit?productId=${id}&car_type=${ car_type }&title=${ title }&type=${ type }&province_id=${province_id}&city_id=${city_id}&term=${ term }&repay_method=${repay_method}&fin_company=${ fin_company }&agent=${agent}&contact_tel=${contact_tel}&remark=${remark}`, {method: 'POST',headers: newHeaers()});
	}else{
    if(remark == undefined || remark == ""){
      return request(`/api/finance/product/add?car_type=${ car_type }&title=${ title }&type=${ type }&province_id=${province_id}&city_id=${city_id}&term=${ term }&repay_method=${repay_method}&fin_company=${ fin_company }&agent=${agent}&contact_tel=${contact_tel}`, {method: 'POST',headers: newHeaers()});
    }else{
      return request(`/api/finance/product/add?car_type=${ car_type }&title=${ title }&type=${ type }&province_id=${province_id}&city_id=${city_id}&term=${ term }&repay_method=${repay_method}&fin_company=${ fin_company }&agent=${agent}&contact_tel=${contact_tel}&remark=${remark}`, {method: 'POST',headers: newHeaers()});
    }
	}
  
}

/*删除保险产品信息
 *
 * */

export function delProduct({ id}) {
	return request(`/api/finance/product/delete?productId=${id}`, {headers: newHeaers()});
	
}

/*发布保险产品信息
 *
 * */

export function publishProduct({ id}) {
	return request(`/api/finance/product/publish?productId=${id}`, {headers: newHeaers()});
	
}

