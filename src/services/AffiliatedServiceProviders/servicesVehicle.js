import request from '../../utils/request';
import { PAGE_SIZE } from '../../constants'
import newHeaers from '../../utils/headers'

/*获取表单的数据*/
export function fetchVehicleList({ current, sord, sidx}) {
  current = current || 1;
  sidx = sidx || 'id';
  if (sord == null || sord === 'descend') {
    sord = 'desc';
  } else if ( sord === 'ascend') {
    sord = 'asc';
  }
  return request(`/api/companymgr/truck/list?page=${ current }&rows=${ PAGE_SIZE }&sidx=${sidx}&sord=${sord}`, {headers: newHeaers()});
}


/*获取 下拉选择框的  公司数据*/
export function fetchCompanyList() {
  return request(`/api/companymgr/listCompany`, {headers: newHeaers()});
}

/*获取 下拉选择框的  车辆长度*/
export function fetchTruckLengthDic() {
  return request(`/api/common/findTruckLengthDic`, {headers: newHeaers()});
}


/*增加一条 信息*/
export function addTruck({ payload: {car_num,car_num_type,company_id,checkin_date,frame_num,car_type,car_type_value,engine_num,insurance_date,c_username,c_id_num  }}) {
  return request(`/api/companymgr/truck/add?car_num=${ car_num }&car_num_type=${ car_num_type }&company_id=${ company_id }&checkin_date=${ checkin_date }&frame_num=${ frame_num }&car_type=${ car_type }&car_type_value=${ car_type_value }&engine_num=${ engine_num }&insurance_date=${ insurance_date }&c_username=${ c_username }&c_id_num=${ c_id_num }`, {method: 'POST',headers: newHeaers()});
}

/*删除一条 信息*/
export function deleteTruck({ payload: { id } }) {
  return request(`/api/companymgr/truck/del?id=${ id }`, {method: 'POST',headers: newHeaers()});
}

/*修改一条 信息*/
export function editTruck({ payload: {id,car_num,car_num_type,company_id,checkin_date,frame_num,car_type,car_type_value,engine_num,insurance_date,c_username,c_id_num  }}) {
  return request(`/api/companymgr/truck/mod?id=${ id }&car_num=${ car_num }&car_num_type=${ car_num_type }&company_id=${ company_id }&checkin_date=${ checkin_date }&frame_num=${ frame_num }&car_type=${ car_type }&car_type_value=${ car_type_value }&engine_num=${ engine_num }&insurance_date=${ insurance_date }&c_username=${ c_username }&c_id_num=${ c_id_num }`, {method: 'POST',headers: newHeaers()});
}
