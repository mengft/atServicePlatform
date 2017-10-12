import request from '../../utils/request';
import newHeaers from '../../utils/headers'
import { PAGE_SIZE } from '../../constants'

/*查询运输公司信息  在服务中心 菜单里面 */
export function fetchCompanyInformation({current}) {
  current = current || 1;
  return request(`/api/cinfo/list?page=${ current }&rows=${ PAGE_SIZE }&sidx=id&sord=desc`, {headers: newHeaers()});
}

/*修改 和 增加 运输公司个人信息
 * 这个api屌屌的
 * 有个 type 可以处理各种事情
 *
 * */

export function handleCompanyInformation({ type, boss_name, business_num, address, name, id}) {
  if (id == undefined || id == null ) {
    id = new Date().getTime();
  }
  return request(`/api/cinfo/edit?oper=${ type }&boss_name=${ boss_name }&business_num=${ business_num }&address=${ address }&name=${ name }&id=${ id }`, {method: 'POST',headers: newHeaers()});
}


