import request from '../../utils/request';
import newHeaers from '../../utils/headers'

import { PAGE_SIZE } from '../../constants'

//  shipper/me  通过这个 api获取  用户的 userid
export function fetchUserid() {
  return request(`/api/shipper/me`, {headers: newHeaers()});
}

/* 获取个人信息(关于卖车经销商的!)
 但是这个 api 需要调用  GET /shipper/me 我的个人信息
 获取 userid
 */
export function fetchBasicInfo({ userid }) {
  return request(`/api/dealer/info?userid=${ userid }`, {headers: newHeaers()});
}


//获取汽车品牌 用于下拉选择
export function fetchTruckBrand() {
  return request(`http://121.43.96.234:80/buycar/listAllBrands`);
}


//获取 在售车源列表
export function fetchCarList({ dealerid }) {

  return request(`/api/dealertruck/listSellTruck?dealerid=${ dealerid }`, {headers: newHeaers()});
}

//修改车辆的 状态
export function changeCarStatus({ status, id }) {
  return request(`/api/dealertruck/updateStatus?id=${ id }&status=${ status }`, {headers: newHeaers()});
}

//修改车辆的 报价
export function changeCarPrice({ price, id }) {
  ///dealertruck/updateprice?id=9&price=100
  return request(`/api/dealertruck/updateprice?id=${ id }&price=${ price }`, {headers: newHeaers()});
}


//获取 车辆 询价 列表
export function fetchInquiryList({ dealerid , current}) {
  //http://121.43.96.234:9102/dealertruck/listInquiry?page=1&rows=20&dealerid=1
  ///dealertruck/listInquiry?page=1&rows=20&dealerid=1
  let page = current || 1;
  return request(`/api/dealertruck/listInquiry?page=${ page }&rows=${ PAGE_SIZE }&dealerid=${ dealerid }`, {headers: newHeaers()});
}

//删除 车辆的询价 的信息
export function deleteInquiry({ id }) {
  //GET /dealertruck/delInquiry
  return request(`/api/dealertruck/delInquiry?id=${ id }`, {headers: newHeaers()});
}



