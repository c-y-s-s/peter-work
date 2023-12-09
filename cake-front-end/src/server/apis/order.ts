import httpRequest from '~/service'

const postCheckOutApi = async (data: any) => {
  return httpRequest.post('/web/order/checkout', data)
}

const postOrderListApi = async (userId: any) => {
  return httpRequest.post('/web/order/member', userId)
}

export { postCheckOutApi, postOrderListApi }
