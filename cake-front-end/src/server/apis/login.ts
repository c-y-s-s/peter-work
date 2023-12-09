import httpRequest from '~/service'

/**
 * @description 分页查询员工数据
 * @return 员工信息
 */

const URL = '/users'
const getStaffInfoByPage = (params: any) => {
  return httpRequest.get(URL, params)
}

/**
 * @description 修改员工数据
 * @param {any} data
 * @returns {any}
 */
const memberLoginApi = (data: any) => {
  return httpRequest.post('/web/user/login', data)
}

const memberRegisterApi = (data: any) => {
  return httpRequest.post('/web/user/register', data)
}

const memberOrderListApi = () => {
  return httpRequest.get('/adminapi/user/home')
}

export {
  getStaffInfoByPage,
  memberLoginApi,
  memberOrderListApi,
  memberRegisterApi,
}
