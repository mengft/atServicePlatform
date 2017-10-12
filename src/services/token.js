import request from '../utils/request';


export function checkToken({ page }) {
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}



