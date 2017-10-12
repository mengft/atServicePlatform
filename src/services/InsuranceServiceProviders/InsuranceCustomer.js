import request from '../../utils/request';
import newHeaers from '../../utils/headers'
import { PAGE_SIZE } from '../../constants'

/*查询保险客户列表信息 */
export function fetchInsuranceInformation({current}) {
  current = current || 1;
  return request(`/api/insurance/customer/list?page=${ current }&rows=${ PAGE_SIZE }&sidx=id&sord=desc&isInsurance=1`, {headers: newHeaers()});
}

/*新增/修改保险产品信息
 *
 * */

export function addInsuranceCustomer({ id,company, contact_name, contact_tel, car_num, remark}) {
	if(id != null && id != ''){
		return request(`/api/insurance/customer/edit?customerId=${id}&company=${ company }&contact_name=${ contact_name }&contact_tel=${ contact_tel }&car_num=${ car_num }&remark=${ remark }`, {method: 'POST',headers: newHeaers()});
	}else{
		if(remark == undefined || remark == ""){
			return request(`/api/insurance/customer/add?company=${ company }&contact_name=${ contact_name }&contact_tel=${ contact_tel }&car_num=${ car_num }`, {method: 'POST',headers: newHeaers()});
		}else{
			return request(`/api/insurance/customer/add?company=${ company }&contact_name=${ contact_name }&contact_tel=${ contact_tel }&car_num=${ car_num }&remark=${ remark }`, {method: 'POST',headers: newHeaers()});
		}
	}
  
}

/*删除保险产品信息
 *
 * */

export function delInsuranceCustomer({ id,company, contact_name, contact_tel, car_num, remark}) {
	return request(`/api/insurance/customer/delete?customerId=${id}`, {headers: newHeaers()});
	
}


