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
const updateStaffInfo = (data: any) => {
  return httpRequest.post('/adminapi/user/login', data)
}

const memberOrderListApi = () => {
  return httpRequest.get('/adminapi/user/home')
}

const productListApi = async () => {
  const response = (await httpRequest.get('/adminapi/product/list')) as {
    data: any
  }
  return response.data.value
}

const putProductDataApi = async (id: any, data: any) => {
  return httpRequest.Put(`/adminapi/product/list/${id}`, data)
}

const deleteProductApi = async (id: any) => {
  return await httpRequest.Delete(`/adminapi/product/list/${id}`)
}

export {
  getStaffInfoByPage,
  updateStaffInfo,
  memberOrderListApi,
  productListApi,
  putProductDataApi,
  deleteProductApi,
}
