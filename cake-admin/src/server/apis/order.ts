import httpRequest from '~/service'

const getOrderListApi = async () => {
  const response = (await httpRequest.get('/adminapi/order/list')) as {
    data: any
  }

  return response.data.value
}

const putOrderDataApi = async (id: any, data: any) => {
  return httpRequest.Put(`/adminapi/order/list/${id}`, { status: data })
}

const deleteOrderDataApi = async (id: any) => {
  return httpRequest.Delete(`/adminapi/order/list/${id}`)
}

export { getOrderListApi, putOrderDataApi, deleteOrderDataApi }
